import { convertToModelMessages, isStepCount, streamText, validateUIMessages, type UIMessage } from "ai";
import { requireAdmin } from "@/features/admin/lib/auth";
import { getSiteSettings } from "@/lib/site-settings";
import { getToolApprovalSecret } from "@/features/ai/lib/crypto";
import { buildChatInstructions } from "@/features/ai/lib/prompts";
import { siteUrl } from "@/features/ai/services/article-agent-service";
import { getChatSession, saveChatMessages } from "@/features/ai/services/chat-service";
import { getChatModel, NoProviderConfiguredError } from "@/features/ai/services/model-router";
import { getWriterRules } from "@/features/ai/services/writer-rules-service";
import { APPROVAL_TOOLS, buildChatTools, createToolContext } from "@/features/ai/tools";

export const dynamic = "force-dynamic";
export const maxDuration = 900;

function json(status: number, error: string) {
  return Response.json({ error }, { status });
}

export async function POST(req: Request) {
  let admin;
  try {
    admin = await requireAdmin();
  } catch (error) {
    return json(error instanceof Error && error.message === "Forbidden" ? 403 : 401, "Unauthorized");
  }

  const body = (await req.json().catch(() => null)) as { id?: string; messages?: unknown[] } | null;
  if (!body?.id || !Array.isArray(body.messages)) return json(400, "Payload tidak valid.");

  const session = await getChatSession(body.id, admin.id);
  if (!session) return json(404, "Sesi chat tidak ditemukan.");

  const [rules, settings] = await Promise.all([getWriterRules(), getSiteSettings()]);
  const tools = buildChatTools(createToolContext("chat", rules));

  let messages: UIMessage[];
  try {
    messages = await validateUIMessages({ messages: body.messages, tools });
  } catch {
    return json(400, "Format pesan tidak valid.");
  }

  let chat;
  try {
    chat = await getChatModel();
  } catch (error) {
    return json(error instanceof NoProviderConfiguredError ? 412 : 500, error instanceof Error ? error.message : "Provider error");
  }

  const result = streamText({
    model: chat.model,
    instructions: buildChatInstructions(rules, { siteName: settings.siteName || "Buildwithreys", siteUrl: siteUrl(), now: new Date() }),
    messages: await convertToModelMessages(messages),
    tools,
    toolApproval: Object.fromEntries(APPROVAL_TOOLS.map((name) => [name, "user-approval" as const])),
    experimental_toolApprovalSecret: getToolApprovalSecret(),
    stopWhen: isStepCount(rules.maxAgentSteps),
    maxRetries: 1,
  });

  // Keep generating (and saving) even if the admin closes the tab mid-article.
  void result.consumeStream();

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    onEnd: async ({ messages: finalMessages }) => {
      await saveChatMessages(session.id, admin.id, finalMessages);
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : String(error);
      const failures = chat.tracker.failures.map((f) => `${f.providerName}: ${f.error}`).join(" | ");
      return failures ? `${message} (${failures})` : message;
    },
  });
}
