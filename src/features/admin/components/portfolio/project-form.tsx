import Link from "next/link";
import { Save } from "lucide-react";
import { ImageUploadField } from "@/features/admin/components/blog/image-upload-field";

type ProjectFormValue = {
  title?: string;
  description?: string;
  imageUrl?: string;
  gifUrl?: string | null;
  link?: string | null;
};

export function ProjectForm({
  action,
  defaultValue,
  submitLabel = "Simpan Project",
}: {
  action: (formData: FormData) => void | Promise<void>;
  defaultValue?: ProjectFormValue;
  submitLabel?: string;
}) {
  return (
    <form action={action} className="rounded-md border border-neutral-200 bg-white p-6 shadow-none">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-5">
          <Field label="Judul Project" name="title" placeholder="contoh: Website Company Profile Klinik" defaultValue={defaultValue?.title} required />

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-700" htmlFor="description">Deskripsi Project</label>
            <textarea
              id="description"
              name="description"
              rows={8}
              required
              defaultValue={defaultValue?.description}
              placeholder="Jelaskan masalah yang diselesaikan, fitur utama, dan hasil project."
              className="w-full resize-none rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Link Project / Case Study" name="link" placeholder="https://..." defaultValue={defaultValue?.link ?? ""} />
            <Field label="GIF Preview URL Opsional" name="gifUrl" placeholder="https://.../preview.gif" defaultValue={defaultValue?.gifUrl ?? ""} />
          </div>
        </div>

        <aside className="space-y-5 rounded-md border border-neutral-200 bg-neutral-50 p-4">
          <ImageUploadField
            name="imageUrl"
            label="Cover Image"
            defaultValue={defaultValue?.imageUrl ?? ""}
            folder="portfolio"
            hint="Wajib. Upload akan disimpan ke Supabase S3 folder portfolio."
          />
          <div className="rounded-md border border-indigo-100 bg-indigo-50 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-indigo-700">Tips portfolio bagus</p>
            <ul className="mt-3 space-y-2 text-xs leading-relaxed text-indigo-950/80">
              <li>• Gunakan cover rasio landscape agar kartu portfolio rapi.</li>
              <li>• Deskripsi sebaiknya menyebut fitur dan outcome.</li>
              <li>• Isi link kalau project sudah live; kosongkan untuk draft.</li>
            </ul>
          </div>
        </aside>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-neutral-100 pt-5 sm:flex-row sm:justify-end">
        <Link href="/admin/portfolio" className="inline-flex items-center justify-center rounded-md border border-neutral-200 px-5 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50">
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
