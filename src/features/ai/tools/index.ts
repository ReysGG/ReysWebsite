import "server-only";

import { generateImage, tool } from "ai";
import { z } from "zod";
import {
  createPostRecord,
  deletePostRecord,
  schedulePostRecord,
  setPostPublished,
} from "@/features/admin/services/blog-post-mutation-service";
import { safeRevalidateBlogPaths } from "@/features/blog/lib/revalidate-blog";
import {
  findInternalLinkCandidates,
  getPostForAi,
  getTaxonomy,
  listPostsForAi,
  patchPost,
  type PostPatch,
} from "@/features/ai/services/ai-blog-service";
import { getStockSources, searchStockImages, trackUnsplashDownload } from "@/features/ai/services/image-search-service";
import { getImageModel } from "@/features/ai/services/model-router";
import { auditSeo } from "@/features/ai/lib/seo-audit";
import type { AiWriterRules } from "@/features/ai/lib/writer-rules";
import { uploadImageBuffer, uploadImageFromUrl } from "@/lib/storage/image-storage";

export type ToolContextMode = "chat" | "schedule";

type ImageCandidate = {
  url: string;
  alt: string;
  credit: string;
  creditUrl?: string;
  downloadLocation?: string;
  hosted: boolean; // already in our storage
};

export type ToolContext = {
  mode: ToolContextMode;
  rules: AiWriterRules;
  siteHost: string;
  /** Post ids created during this session (used by scheduled runs to finalize). */
  createdPostIds: string[];
  imageCandidates: Map<string, ImageCandidate>;
};

export function createToolContext(mode: ToolContextMode, rules: AiWriterRules): ToolContext {
  let siteHost = "buildwithreys.com";
  try {
    siteHost = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://buildwithreys.com").host;
  } catch {
    // keep default
  }
  return { mode, rules, siteHost, createdPostIds: [], imageCandidates: new Map() };
}

/** Tools that change public state; in chat they always require admin approval. */
export const APPROVAL_TOOLS = ["publishPost", "unpublishPost", "schedulePost", "deletePost"] as const;

function errorResult(error: unknown) {
  return { ok: false as const, error: error instanceof Error ? error.message : String(error) };
}

function auditFor(ctx: ToolContext, post: NonNullable<Awaited<ReturnType<typeof getPostForAi>>>) {
  const audit = auditSeo(post, {
    minWords: ctx.rules.minWords,
    maxWords: ctx.rules.maxWords,
    internalLinks: ctx.rules.internalLinks,
    externalLinks: ctx.rules.externalLinks,
    requireFaq: ctx.rules.requireFaq,
    siteHost: ctx.siteHost,
  });
  return {
    score: audit.score,
    threshold: ctx.rules.seoScoreThreshold,
    passed: audit.score >= ctx.rules.seoScoreThreshold,
    wordCount: audit.wordCount,
    keywordDensity: audit.keywordDensity,
    issues: audit.issues,
  };
}

async function auditById(ctx: ToolContext, id: string) {
  const post = await getPostForAi(id);
  if (!post) throw new Error("Post tidak ditemukan.");
  return auditFor(ctx, post);
}

function postLinks(slug: string) {
  return { editUrl: `/admin/blog/${slug}/edit`, previewUrl: `/admin/blog/${slug}/preview`, publicUrl: `/blog/${slug}` };
}

function escapeAttr(value: string) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Inserts a figure after the first paragraph that follows the heading matching `afterHeading`. */
function insertFigure(html: string, figure: string, afterHeading?: string) {
  const headingPattern = /<h[2-4][^>]*>([\s\S]*?)<\/h[2-4]>/gi;
  let anchor = -1;
  if (afterHeading) {
    const needle = afterHeading.toLowerCase();
    for (const match of html.matchAll(headingPattern)) {
      if (match[1].replace(/<[^>]+>/g, "").toLowerCase().includes(needle)) {
        anchor = (match.index ?? 0) + match[0].length;
        break;
      }
    }
  }
  if (anchor === -1) {
    // Default: after the first paragraph of the second section.
    const headings = Array.from(html.matchAll(headingPattern));
    const target = headings[1] ?? headings[0];
    anchor = target ? (target.index ?? 0) + target[0].length : 0;
  }
  const paragraphEnd = html.indexOf("</p>", anchor);
  const insertAt = paragraphEnd === -1 ? html.length : paragraphEnd + 4;
  return `${html.slice(0, insertAt)}\n${figure}\n${html.slice(insertAt)}`;
}

const postFieldsSchema = {
  title: z.string().min(10).max(120).describe("Judul artikel (H1)."),
  content: z.string().min(200).describe("Isi artikel lengkap dalam HTML (tanpa <h1>)."),
  focusKeyword: z.string().min(2).max(80).describe("Focus keyword utama (long-tail)."),
  metaTitle: z.string().max(70).describe("Meta title 50–60 karakter."),
  metaDesc: z.string().max(170).describe("Meta description 140–160 karakter."),
  excerpt: z.string().max(220).describe("Ringkasan 1–2 kalimat."),
  category: z.string().max(60).optional(),
  tags: z.array(z.string().max(40)).max(8).optional(),
  slug: z.string().max(90).optional().describe("Opsional. Default dibuat dari focus keyword + judul."),
};

/** Research, writing, SEO and image tools — used by both scheduled runs and chat. */
export function buildArticleTools(ctx: ToolContext) {

  const readTools = {
    getBlogTaxonomy: tool({
      description: "Daftar kategori dan tag yang sudah dipakai di blog.",
      inputSchema: z.object({}),
      execute: async () => getTaxonomy(),
    }),
    listPosts: tool({
      description: "Cari/daftar artikel (judul, slug, status, keyword). Pakai untuk cek duplikasi topik.",
      inputSchema: z.object({
        query: z.string().optional().describe("Kata kunci pencarian di judul/slug/keyword."),
        status: z.enum(["all", "draft", "scheduled", "published"]).default("all"),
        limit: z.number().int().min(1).max(50).default(15),
      }),
      execute: async (input) => listPostsForAi(input),
    }),
    getPost: tool({
      description: "Ambil detail satu artikel berdasarkan id atau slug, termasuk konten HTML.",
      inputSchema: z.object({
        idOrSlug: z.string(),
        includeContent: z.boolean().default(true),
      }),
      execute: async ({ idOrSlug, includeContent }) => {
        const post = await getPostForAi(idOrSlug);
        if (!post) return { ok: false, error: "Post tidak ditemukan." };
        const { content, ...rest } = post;
        return {
          ok: true,
          post: { ...rest, content: includeContent ? content.slice(0, 40_000) : undefined, ...postLinks(post.slug) },
          seo: auditFor(ctx, post),
        };
      },
    }),
    findInternalLinks: tool({
      description: "Cari artikel published yang relevan untuk internal link.",
      inputSchema: z.object({ keyword: z.string(), excludePostId: z.string().optional() }),
      execute: async ({ keyword, excludePostId }) => findInternalLinkCandidates(keyword, excludePostId),
    }),
    seoAudit: tool({
      description: "Audit SEO on-page sebuah artikel. Mengembalikan skor 0–100 dan daftar issue yang harus diperbaiki.",
      inputSchema: z.object({ postId: z.string() }),
      execute: async ({ postId }) => {
        try {
          return { ok: true, ...(await auditById(ctx, postId)) };
        } catch (error) {
          return errorResult(error);
        }
      },
    }),
  };

  const writeTools = {
    createDraft: tool({
      description: "Simpan artikel baru sebagai DRAFT (tidak terlihat publik). Mengembalikan id, slug, dan hasil audit SEO.",
      inputSchema: z.object(postFieldsSchema),
      execute: async (input) => {
        try {
          const post = await createPostRecord(
            {
              ...input,
              category: input.category || ctx.rules.defaultCategory || null,
              tags: input.tags ?? [],
              published: false,
              aiGenerated: true,
            },
            ctx.rules.authorName,
          );
          ctx.createdPostIds.push(post.id);
          safeRevalidateBlogPaths(post.slug);
          return { ok: true, id: post.id, slug: post.slug, ...postLinks(post.slug), seo: await auditById(ctx, post.id) };
        } catch (error) {
          return errorResult(error);
        }
      },
    }),
    updatePost: tool({
      description: "Update sebagian field artikel (kirim hanya field yang berubah). Status publish tidak berubah. Mengembalikan audit SEO terbaru.",
      inputSchema: z.object({
        postId: z.string(),
        title: postFieldsSchema.title.optional(),
        content: postFieldsSchema.content.optional(),
        focusKeyword: postFieldsSchema.focusKeyword.optional(),
        metaTitle: postFieldsSchema.metaTitle.optional(),
        metaDesc: postFieldsSchema.metaDesc.optional(),
        excerpt: postFieldsSchema.excerpt.optional(),
        category: postFieldsSchema.category,
        tags: postFieldsSchema.tags,
        slug: postFieldsSchema.slug,
      }),
      execute: async ({ postId, ...patch }) => {
        try {
          const post = await patchPost(postId, patch as PostPatch);
          safeRevalidateBlogPaths(post.previousSlug, post.slug);
          return { ok: true, id: post.id, slug: post.slug, ...postLinks(post.slug), seo: await auditById(ctx, post.id) };
        } catch (error) {
          return errorResult(error);
        }
      },
    }),
  };

  const sources = getStockSources();
  const imageTools = {
    searchImages: tool({
      description: `Cari foto stock berlisensi bebas pakai komersial (${[sources.unsplash && "Unsplash", sources.pexels && "Pexels", "Openverse"].filter(Boolean).join(" + ")}). Query sebaiknya bahasa Inggris, 2–4 kata, visual konkret (mis. "laptop coffee desk", "small shop owner"). Kredit foto otomatis ikut terpasang.`,
      inputSchema: z.object({
        query: z.string().min(2).max(80),
        limit: z.number().int().min(1).max(10).default(6),
      }),
      execute: async ({ query, limit }) => {
        const { images, errors } = await searchStockImages(query, limit);
        if (images.length === 0) {
          return { ok: false, error: `Tidak ada foto untuk "${query}". Coba query lain yang lebih umum/visual, atau gunakan generateImage.`, errors: errors.length ? errors : undefined };
        }
        images.forEach((image) =>
          ctx.imageCandidates.set(image.id, {
            url: image.url, alt: image.alt, credit: image.credit, creditUrl: image.creditUrl, downloadLocation: image.downloadLocation, hosted: false,
          }),
        );
        return {
          ok: images.length > 0,
          images: images.map((image) => ({ imageId: image.id, alt: image.alt, credit: image.credit, width: image.width, height: image.height, thumbUrl: image.thumbUrl })),
          errors: errors.length ? errors : undefined,
        };
      },
    }),
    generateImage: tool({
      description: "Buat ilustrasi dengan AI image model (landscape). Prompt dalam bahasa Inggris, deskriptif, tanpa teks di gambar.",
      inputSchema: z.object({
        prompt: z.string().min(10).max(1000),
        alt: z.string().max(160).describe("Alt text Bahasa Indonesia untuk gambar ini."),
      }),
      execute: async ({ prompt, alt }) => {
        try {
          const imageModel = await getImageModel();
          if (!imageModel) return { ok: false, error: "Belum ada provider dengan image model. Isi 'Image model' di halaman Providers." };
          const isGoogle = imageModel.model.provider.startsWith("google");
          const { image } = await generateImage({
            model: imageModel.model,
            prompt: `${prompt}. Clean, modern, professional editorial style. No text, no watermark.`,
            ...(isGoogle ? { aspectRatio: "16:9" as const } : { size: "1536x1024" as const }),
            maxRetries: 1,
          });
          const url = await uploadImageBuffer(Buffer.from(image.uint8Array), "blog/ai");
          const imageId = `ai:${ctx.imageCandidates.size + 1}`;
          ctx.imageCandidates.set(imageId, { url, alt, credit: "Ilustrasi dibuat dengan AI", hosted: true });
          return { ok: true, imageId, url, provider: imageModel.providerName };
        } catch (error) {
          return errorResult(error);
        }
      },
    }),
    attachImage: tool({
      description: "Pasang gambar ke artikel sebagai cover atau inline. Gambar di-upload ulang ke storage kita.",
      inputSchema: z.object({
        postId: z.string(),
        imageId: z.string().optional().describe("imageId dari searchImages/generateImage."),
        url: z.string().url().optional().describe("Alternatif: URL https gambar langsung (jika admin memberikannya)."),
        alt: z.string().min(3).max(160),
        placement: z.enum(["cover", "inline"]),
        afterHeading: z.string().optional().describe("Untuk inline: teks (sebagian) dari heading tempat gambar diletakkan setelah paragraf pertamanya."),
      }),
      execute: async ({ postId, imageId, url, alt, placement, afterHeading }) => {
        try {
          const candidate = imageId ? ctx.imageCandidates.get(imageId) : url ? { url, alt, credit: "", hosted: false } : undefined;
          if (!candidate) return { ok: false, error: "imageId tidak dikenal. Panggil searchImages/generateImage dulu atau berikan url." };

          const hostedUrl = candidate.hosted ? candidate.url : await uploadImageFromUrl(candidate.url, "blog/ai");
          void trackUnsplashDownload(candidate.downloadLocation);

          if (placement === "cover") {
            const post = await patchPost(postId, { coverImage: hostedUrl, coverImageCredit: candidate.credit || null });
            safeRevalidateBlogPaths(post.slug);
            return { ok: true, placement, url: hostedUrl, seo: await auditById(ctx, postId) };
          }

          const current = await getPostForAi(postId);
          if (!current) return { ok: false, error: "Post tidak ditemukan." };
          const caption = candidate.credit
            ? `<figcaption>${candidate.creditUrl ? `<a href="${escapeAttr(candidate.creditUrl)}" target="_blank">${escapeAttr(candidate.credit)}</a>` : escapeAttr(candidate.credit)}</figcaption>`
            : "";
          const figure = `<figure><img src="${escapeAttr(hostedUrl)}" alt="${escapeAttr(alt)}" />${caption}</figure>`;
          const post = await patchPost(postId, { content: insertFigure(current.content, figure, afterHeading) });
          safeRevalidateBlogPaths(post.slug);
          return { ok: true, placement, url: hostedUrl, seo: await auditById(ctx, postId) };
        } catch (error) {
          return errorResult(error);
        }
      },
    }),
  };

  return { ...readTools, ...writeTools, ...imageTools };
}

/** Article tools + lifecycle tools. Lifecycle tools are chat-only and gated by `toolApproval` in the chat route. */
export function buildChatTools(ctx: ToolContext) {
  const lifecycleTools = {
    publishPost: tool({
      description: "Publish artikel sekarang (terlihat publik). Butuh persetujuan admin.",
      inputSchema: z.object({ postId: z.string(), title: z.string().describe("Judul artikel, untuk ditampilkan di dialog persetujuan.") }),
      execute: async ({ postId }) => {
        try {
          const post = await setPostPublished(postId, true);
          safeRevalidateBlogPaths(post.slug);
          return { ok: true, status: "published", ...postLinks(post.slug) };
        } catch (error) {
          return errorResult(error);
        }
      },
    }),
    unpublishPost: tool({
      description: "Kembalikan artikel published menjadi draft. Butuh persetujuan admin.",
      inputSchema: z.object({ postId: z.string(), title: z.string() }),
      execute: async ({ postId }) => {
        try {
          const post = await setPostPublished(postId, false);
          safeRevalidateBlogPaths(post.slug);
          return { ok: true, status: "draft", ...postLinks(post.slug) };
        } catch (error) {
          return errorResult(error);
        }
      },
    }),
    schedulePost: tool({
      description: "Jadwalkan draft agar terbit otomatis. publishAt dalam ISO 8601 dengan offset (+07:00). Butuh persetujuan admin.",
      inputSchema: z.object({
        postId: z.string(),
        title: z.string(),
        publishAt: z.string().describe("Contoh: 2026-10-09T09:00:00+07:00"),
      }),
      execute: async ({ postId, publishAt }) => {
        try {
          const post = await schedulePostRecord(postId, new Date(publishAt));
          safeRevalidateBlogPaths(post.slug);
          return { ok: true, status: "scheduled", scheduledAt: new Date(publishAt).toISOString(), ...postLinks(post.slug) };
        } catch (error) {
          return errorResult(error);
        }
      },
    }),
    deletePost: tool({
      description: "Hapus artikel permanen. Butuh persetujuan admin. Hanya jika admin memintanya secara eksplisit.",
      inputSchema: z.object({ postId: z.string(), title: z.string() }),
      execute: async ({ postId }) => {
        try {
          const post = await deletePostRecord(postId);
          safeRevalidateBlogPaths(post.slug);
          return { ok: true, deleted: post.slug };
        } catch (error) {
          return errorResult(error);
        }
      },
    }),
  };

  return { ...buildArticleTools(ctx), ...lifecycleTools };
}

export type ChatTools = ReturnType<typeof buildChatTools>;
