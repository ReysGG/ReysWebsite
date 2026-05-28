import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { Edit3, ImageIcon, MessageSquareQuote, Plus, Sparkles } from "lucide-react";
import { seedDummyTestimonials } from "@/features/admin/actions/testimonial-actions";
import { DeleteTestimonialButton } from "@/features/admin/components/testimonials/delete-testimonial-button";
import { formatTestimonialDate, getTestimonialInitials } from "@/features/admin/lib/testimonials";
import type { AdminTestimonial, AdminTestimonialsData } from "@/features/admin/types/testimonials";

type TestimonialsAdminViewProps = {
  data: AdminTestimonialsData;
};

export function TestimonialsAdminView({ data }: TestimonialsAdminViewProps) {
  const { testimonials, withAvatar, avgLength, featured, databaseError } = data;

  return (
    <div className="space-y-6">
      <div className="rounded-md border border-neutral-200 bg-white p-6 shadow-none">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#ff8a00]">Social Proof</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900">Testimonials</h1>
            <p className="mt-1 text-sm text-neutral-500">Kelola review klien yang tampil sebagai bukti kredibilitas di website publik.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/#testimonials" target="_blank" className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50">Lihat Section</Link>
            {testimonials.length === 0 && (
              <form action={seedDummyTestimonials}>
                <button type="submit" className="inline-flex items-center gap-2 rounded-md border border-[#ffcd80] bg-[#fffcc9] px-4 py-2.5 text-sm font-semibold text-[#ff8a00] hover:bg-[#ffcd80]/60"><Sparkles className="h-4 w-4" /> Isi Dummy</button>
              </form>
            )}
            <Link href="/admin/testimonials/add" className="inline-flex items-center gap-2 rounded-md bg-[#ff8a00] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#f4b738]"><Plus className="h-4 w-4" /> Tambah Testimoni</Link>
          </div>
        </div>
      </div>

      {databaseError && <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">Database tidak bisa diakses. Testimoni tidak dapat dimuat.</div>}

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard icon={<MessageSquareQuote className="h-4 w-4" />} label="Total Testimoni" value={testimonials.length.toString()} detail="Social proof aktif" />
        <StatCard icon={<ImageIcon className="h-4 w-4" />} label="Dengan Avatar" value={`${withAvatar}/${testimonials.length}`} detail="Foto meningkatkan trust" />
        <StatCard icon={<Sparkles className="h-4 w-4" />} label="Rata-rata Panjang" value={`${avgLength}`} detail="karakter per testimoni" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <section className="rounded-md border border-neutral-200 bg-white shadow-none">
          <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
            <div>
              <h2 className="text-sm font-semibold text-neutral-900">Testimonial Library</h2>
              <p className="mt-1 text-xs text-neutral-500">Kelola nama, role, avatar, dan isi testimoni.</p>
            </div>
            <span className="rounded-md bg-[#fffcc9] px-2.5 py-1 text-xs font-bold text-[#ff8a00]">{testimonials.length} item</span>
          </div>

          {testimonials.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-[#fffcc9] text-[#ff8a00]"><MessageSquareQuote className="h-6 w-6" /></div>
              <p className="text-sm font-semibold text-neutral-800">Belum ada testimoni</p>
              <p className="mt-1 text-xs text-neutral-400">Tambahkan review klien pertama untuk memperkuat trust website.</p>
              <Link href="/admin/testimonials/add" className="mt-4 inline-flex items-center gap-2 rounded-md bg-[#ff8a00] px-4 py-2 text-sm font-semibold text-white hover:bg-[#f4b738]"><Plus className="h-4 w-4" /> Tambah Sekarang</Link>
            </div>
          ) : (
            <div className="divide-y divide-neutral-100">
              {testimonials.map((item) => (
                <article key={item.id} className="grid gap-4 px-5 py-5 hover:bg-neutral-50 lg:grid-cols-[minmax(0,1fr)_220px]">
                  <div className="flex min-w-0 gap-4">
                    <Avatar name={item.name} avatar={item.avatar} />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-semibold text-neutral-900">{item.name}</h3>
                        {item.avatar ? <span className="rounded-md bg-[#fffcc9] px-2 py-0.5 text-[11px] font-semibold text-[#ff8a00]">Avatar</span> : <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[11px] font-semibold text-neutral-500">Initial</span>}
                      </div>
                      <p className="mt-1 text-xs font-medium text-neutral-500">{item.role}</p>
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral-600">&ldquo;{item.content}&rdquo;</p>
                      <p className="mt-3 text-[11px] text-neutral-400">Dibuat {formatTestimonialDate(item.createdAt)} · {item.content.length} karakter</p>
                    </div>
                  </div>
                  <div className="flex items-start justify-end gap-2">
                    <Link href={`/admin/testimonials/${item.id}/edit`} className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-700 hover:border-[#ffcd80] hover:bg-[#fffcc9] hover:text-[#ff8a00]"><Edit3 className="h-3.5 w-3.5" /> Edit</Link>
                    <DeleteTestimonialButton id={item.id} />
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <aside className="space-y-6">
          <div className="rounded-md border border-neutral-200 bg-white p-5 shadow-none">
            <h2 className="text-sm font-semibold text-neutral-900">Preview Publik</h2>
            <p className="mt-1 text-xs text-neutral-500">3 testimoni terbaru biasanya paling aman ditonjolkan di homepage.</p>
            <div className="mt-4 space-y-3">
              {featured.length ? featured.map((item) => (
                <div key={item.id} className="rounded-md border border-neutral-200 bg-neutral-50 p-4">
                  <div className="mb-3 flex items-center gap-3"><Avatar name={item.name} avatar={item.avatar} small /><div><p className="text-xs font-semibold text-neutral-900">{item.name}</p><p className="text-[11px] text-neutral-500">{item.role}</p></div></div>
                  <p className="line-clamp-4 text-xs leading-relaxed text-neutral-600">&ldquo;{item.content}&rdquo;</p>
                </div>
              )) : <p className="rounded-md bg-neutral-50 p-4 text-xs text-neutral-400">Belum ada preview.</p>}
            </div>
          </div>

          <div className="rounded-md border border-[#ffcd80] bg-[#fffcc9] p-5 shadow-none">
            <h2 className="text-sm font-semibold text-neutral-900">Quality Checklist</h2>
            <ul className="mt-4 space-y-2 text-xs leading-relaxed text-neutral-700">
              <li>• Minimal 3 testimoni untuk homepage terasa kredibel.</li>
              <li>• Gunakan role/perusahaan yang spesifik, bukan generik.</li>
              <li>• Avatar/foto membuat testimoni lebih dipercaya.</li>
              <li>• Isi ideal 120–260 karakter agar mudah dibaca.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, detail }: { icon: React.ReactNode; label: string; value: string; detail: string }) {
  return (
    <div className="rounded-md border border-neutral-200 bg-white p-5 shadow-none">
      <div className="flex items-center justify-between"><p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{label}</p><span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#fffcc9] text-[#ff8a00]">{icon}</span></div>
      <p className="mt-4 text-2xl font-bold text-neutral-900">{value}</p>
      <p className="mt-1 text-xs text-neutral-400">{detail}</p>
    </div>
  );
}

function Avatar({ name, avatar, small = false }: { name: string; avatar: AdminTestimonial["avatar"]; small?: boolean }) {
  const size = small ? "h-9 w-9" : "h-12 w-12";
  return (
    <div className={`relative flex ${size} shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#ff8a00] text-sm font-bold text-white`}>
      {avatar ? <Image src={avatar} alt={name} fill unoptimized className="object-cover" /> : <span>{getTestimonialInitials(name)}</span>}
    </div>
  );
}
