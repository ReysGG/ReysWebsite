import { CheckCircle2, XCircle } from "lucide-react";

export function BlogFormMessage({ message, ok }: { message?: string; ok?: boolean }) {
  if (!message) return null;
  return (
    <div
      className={`flex items-start gap-3 rounded-md border px-4 py-3 text-sm font-medium ${
        ok
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-red-200 bg-red-50 text-red-700"
      }`}
    >
      {ok ? (
        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-500" />
      ) : (
        <XCircle size={16} className="mt-0.5 shrink-0 text-red-500" />
      )}
      <span>{message}</span>
    </div>
  );
}
