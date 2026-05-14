import { currentUser } from "@clerk/nextjs/server";

export type AdminUser = {
  id: string;
  name: string;
  email?: string;
};

function clerkConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY);
}

/**
 * Server-only admin gate for mutations.
 * Admin routes are already protected by Clerk middleware. This helper adds a reusable
 * action-level check and supports Clerk metadata roles. In local development only,
 * if Clerk env vars are absent, it returns a dev admin to keep scaffolding usable.
 */
export async function requireAdmin(): Promise<AdminUser> {
  if (process.env.NODE_ENV !== "production" && !clerkConfigured()) {
    return { id: "dev-admin", name: "Development Admin" };
  }

  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const role = user.publicMetadata?.role || user.privateMetadata?.role;
  const isAdmin = role === "admin" || user.publicMetadata?.isAdmin === true || user.privateMetadata?.isAdmin === true;

  // If no explicit role convention has been configured yet, authenticated Clerk users
  // may manage the current protected admin area. Set metadata role=admin before widening access.
  if (!isAdmin && (process.env.ADMIN_REQUIRE_ROLE === "true" || process.env.NODE_ENV === "production")) {
    throw new Error("Forbidden");
  }

  return {
    id: user.id,
    name: user.fullName || user.username || user.primaryEmailAddress?.emailAddress || "Admin",
    email: user.primaryEmailAddress?.emailAddress,
  };
}
