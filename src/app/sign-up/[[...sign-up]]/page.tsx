import { ClerkProvider, SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <ClerkProvider>
      <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-4 py-16">
        <SignUp />
      </main>
    </ClerkProvider>
  );
}
