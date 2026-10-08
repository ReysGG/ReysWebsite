import { CheckCircle2, TriangleAlert } from "lucide-react";

export function FormFeedback({ state }: { state: { ok?: boolean; message?: string; error?: string } }) {
  if (state.error) {
    return (
      <p role="alert" className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
        <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" /> {state.error}
      </p>
    );
  }
  if (state.ok && state.message) {
    return (
      <p role="status" className="flex items-start gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> {state.message}
      </p>
    );
  }
  return null;
}
