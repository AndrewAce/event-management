import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

/**
 * Returns the currently authenticated Prisma User, or redirects to login.
 * Syncs the Supabase auth user to the Prisma User table on first sign-in.
 */
export async function getCurrentUser() {
  const supabase = createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) return null;

  try {
    // Happy path: upsert by authId
    return await prisma.user.upsert({
      where: { authId: authUser.id },
      update: {},
      create: {
        authId: authUser.id,
        email: authUser.email!,
        name: authUser.user_metadata?.name ?? null,
        role: "YOUTH",
      },
    });
  } catch (e: any) {
    // P2002 = unique constraint violation
    // Either a race condition (authId) or same email re-registered
    if (e.code === "P2002") {
      // Find the existing record by authId or email and sync authId if needed
      const existing = await prisma.user.findFirstOrThrow({
        where: { OR: [{ authId: authUser.id }, { email: authUser.email! }] },
      });
      if (existing.authId !== authUser.id) {
        return prisma.user.update({
          where: { id: existing.id },
          data: { authId: authUser.id },
        });
      }
      return existing;
    }
    throw e;
  }
}

/**
 * Requires authentication — redirects to login if not signed in.
 */
export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");
  return user;
}

/**
 * Requires admin role — redirects to dashboard if not an admin.
 */
export async function requireAdmin() {
  const user = await requireAuth();
  if (user.role !== "ADMIN") redirect("/dashboard");
  return user;
}
