import React from "react";

export function Field({
  label,
  name,
  defaultValue,
  textarea = false,
}: {
  label: string;
  name: string;
  defaultValue: string | number;
  textarea?: boolean;
}) {
  const inputClass =
    "w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-[#ff8a00] focus:bg-white focus:ring-2 focus:ring-[#fffcc9]";

  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-semibold text-neutral-700">{label}</span>
      {textarea ? (
        <textarea
          name={name}
          defaultValue={defaultValue}
          rows={4}
          className={`${inputClass} resize-none`}
        />
      ) : (
        <input name={name} defaultValue={defaultValue} className={inputClass} />
      )}
    </label>
  );
}

export function AdminFormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-md border border-neutral-200 bg-white p-5 shadow-none">
      <div className="mb-5 border-b border-neutral-100 pb-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-900">{title}</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
    </section>
  );
}

export function NestedCard({ children }: { children: React.ReactNode }) {
  return <div className="rounded-md border border-neutral-200 bg-neutral-50 p-4">{children}</div>;
}
