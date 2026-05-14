export function BlogFormMessage({ message, ok }: { message?: string; ok?: boolean }) {
  if (!message) return null;
  return <div className={`rounded-md border px-4 py-3 text-sm font-medium ${ok ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-red-200 bg-red-50 text-red-700"}`}>{message}</div>;
}
