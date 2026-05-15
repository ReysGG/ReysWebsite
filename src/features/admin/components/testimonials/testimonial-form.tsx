import Link from "next/link";
import { Save } from "lucide-react";
import { ImageUploadField } from "@/features/admin/components/blog/image-upload-field";

type TestimonialFormValue = {
  name?: string;
  role?: string;
  content?: string;
  avatar?: string | null;
};

export function TestimonialForm({
  action,
  defaultValue,
  submitLabel = "Simpan Testimoni",
}: {
  action: (formData: FormData) => void | Promise<void>;
  defaultValue?: TestimonialFormValue;
  submitLabel?: string;
}) {
  return (
    <form action={action} className="rounded-md border border-neutral-200 bg-white p-6 shadow-none">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Field label="Nama Klien" name="name" placeholder="contoh: Hendra Kusuma" defaultValue={defaultValue?.name} required />
            <Field label="Jabatan / Perusahaan" name="role" placeholder="contoh: Owner Toko Maju Jaya" defaultValue={defaultValue?.role} required />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-700" htmlFor="content">Isi Testimoni</label>
            <textarea
              id="content"
              name="content"
              rows={8}
              required
              defaultValue={defaultValue?.content}
              placeholder="Apa hasil konkret yang klien rasakan setelah bekerja sama?"
              className="w-full resize-none rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
            <p className="text-xs text-neutral-400">Ideal 1–3 kalimat. Fokus ke hasil, trust, dan pengalaman kerja.</p>
          </div>
        </div>

        <aside className="space-y-5 rounded-md border border-neutral-200 bg-neutral-50 p-4">
          <ImageUploadField
            name="avatar"
            label="Foto / Avatar Klien"
            defaultValue={defaultValue?.avatar ?? ""}
            folder="testimonials"
            hint="Upload akan disimpan ke Supabase S3. Kalau env belum lengkap, error dari API akan muncul di sini."
          />
          <div className="rounded-md border border-indigo-100 bg-indigo-50 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-indigo-700">Tips testimoni bagus</p>
            <ul className="mt-3 space-y-2 text-xs leading-relaxed text-indigo-900/80">
              <li>• Sebutkan hasil spesifik atau perubahan yang terasa.</li>
              <li>• Hindari kalimat terlalu generik seperti “bagus sekali”.</li>
              <li>• Foto/avatar membuat social proof terasa lebih kredibel.</li>
            </ul>
          </div>
        </aside>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-neutral-100 pt-5 sm:flex-row sm:justify-end">
        <Link href="/admin/testimonials" className="inline-flex items-center justify-center rounded-md border border-neutral-200 px-5 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50">
          Batal
        </Link>
        <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
          <Save className="h-4 w-4" /> {submitLabel}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  placeholder,
  defaultValue,
  required,
}: {
  label: string;
  name: string;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-neutral-700" htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      />
    </div>
  );
}
