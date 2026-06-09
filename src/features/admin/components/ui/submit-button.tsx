"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import type { ReactNode } from "react";

type SubmitButtonProps = {
  children: ReactNode;
  className?: string;
  /** Icon shown when idle. Replaced by a spinner while the action is pending. */
  idleIcon?: ReactNode;
  /** Label shown while the action is pending. Defaults to children. */
  pendingLabel?: ReactNode;
};

/**
 * Submit button bound to the parent <form action={...}>. Uses useFormStatus so it
 * disables itself and swaps in a spinner while the server action runs — giving
 * every mutation visible feedback (UI/UX gold-standard: every action has a response).
 *
 * Must be rendered as a child of a <form>, not the form component itself.
 */
export function SubmitButton({ children, className, idleIcon, pendingLabel }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className={className}
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : idleIcon}
      {pending ? pendingLabel ?? children : children}
    </button>
  );
}
