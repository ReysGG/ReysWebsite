import { currentUser } from "@clerk/nextjs/server";

export type AdminUser = {
  id: string;
  name: string;
  email?: string;
  imageUrl?: string;
};

function clerkConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY);
}

/**
 * Server-only admin gate. Returns the resolved admin user so callers don't need a
 * second `currentUser()` round-trip. Role is read from privateMetadata (server-only,
 * un-spoofable from the client). In local dev without Clerk env vars, returns a dev
 * admin to keep scaffolding usable.
 */
export async function requireAdmin(): Promise<AdminUser> {
  if (process.env.NODE_ENV !== "production" && !clerkConfigured()) {
    return { id: "dev-admin", name: "Development Admin" };
  }

  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const role = String(user.privateMetadata?.role || "").toLowerCase();
  const isAdmin = role === "admin" || user.privateMetadata?.isAdmin === true;

  if (!isAdmin) {
    throw new Error("Forbidden");
  }

  return {
    id: user.id,
    name: user.fullName || user.username || user.primaryEmailAddress?.emailAddress || "Admin",
    email: user.primaryEmailAddress?.emailAddress,
    imageUrl: user.imageUrl,
  };
}
