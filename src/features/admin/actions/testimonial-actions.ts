"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import { requireAdmin } from "@/features/admin/lib/auth";
import { TESTIMONIALS_TAG } from "@/lib/testimonials";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function revalidateTestimonials() {
  revalidateTag(TESTIMONIALS_TAG, "max");
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/testimonials");
}

export async function createTestimonial(formData: FormData) {
  await requireAdmin();
  const name = getString(formData, "name");
  const role = getString(formData, "role");
  const content = getString(formData, "content");
  const avatar = getString(formData, "avatar");

  if (!name || !role || !content) {
    throw new Error("Nama, jabatan/perusahaan, dan isi testimoni wajib diisi.");
  }

  await db.testimonial.create({
    data: {
      name,
      role,
      content,
      avatar: avatar || null,
    },
  });

  revalidateTestimonials();
  redirect("/admin/testimonials");
}

export async function updateTestimonial(id: string, formData: FormData) {
  await requireAdmin();
  const name = getString(formData, "name");
  const role = getString(formData, "role");
  const content = getString(formData, "content");
  const avatar = getString(formData, "avatar");

  if (!name || !role || !content) {
    throw new Error("Nama, jabatan/perusahaan, dan isi testimoni wajib diisi.");
  }

  await db.testimonial.update({
    where: { id },
    data: {
      name,
      role,
      content,
      avatar: avatar || null,
    },
  });

  revalidateTestimonials();
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(formData: FormData) {
  await requireAdmin();
  const id = getString(formData, "id");
  if (!id) return;

  await db.testimonial.delete({ where: { id } });
  revalidateTestimonials();
}

const DUMMY_TESTIMONIALS = [
  {
    name: "Hendra Kusuma",
    role: "Owner Toko Bangunan Maju Jaya",
    content:
      "Website company profile kami selesai dalam 12 hari. Desainnya clean, loading cepat, dan langsung bisa kami kelola sendiri tanpa perlu bantuan teknis.",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=160&h=160",
  },
  {
    name: "Sari Dewi",
    role: "Manajer Operasional, Klinik Sehat Prima",
    content:
      "Dashboard operasional yang dibangun benar-benar mengubah cara kami kerja. Stok, pesanan, dan laporan harian sekarang bisa dipantau dari satu tempat.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=160&h=160",
  },
  {
    name: "Rizky Pratama",
    role: "Founder Batik Nusantara Store",
    content:
      "Toko online kami naik omzet 35% setelah redesign. Checkout lebih mulus, integrasi WhatsApp-nya sangat membantu tim sales kami.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=160&h=160",
  },
  {
    name: "Anisa Rahma",
    role: "CEO Konsultan HR Solusi",
    content:
      "Komunikasinya transparan dari awal sampai selesai. Tidak ada biaya tersembunyi, timeline ditepati, dan hasilnya melebihi ekspektasi kami.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=160&h=160",
  },
  {
    name: "Teguh Santoso",
    role: "Direktur CV Mitra Logistik",
    content:
      "SEO website kami membaik drastis dalam 2 bulan. Sekarang muncul di halaman pertama Google untuk kata kunci utama bisnis kami.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=160&h=160",
  },
];

export async function seedDummyTestimonials() {
  await requireAdmin();

  const existing = await db.testimonial.count();
  if (existing > 0) return;

  await db.testimonial.createMany({ data: DUMMY_TESTIMONIALS });
  revalidateTestimonials();
}
