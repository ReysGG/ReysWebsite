import { ClerkProvider, SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <ClerkProvider>
      <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-4 py-16">
        <SignIn />
      </main>
    </ClerkProvider>
  );
}
