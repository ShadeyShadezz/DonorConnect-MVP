import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";

export async function getSession() {
  return await getServerSession();
}

export async function requireAuth(requiredRole?: Role) {
  const session = await getServerSession();

  if (!session) {
    redirect("/auth/login");
  }

  if (requiredRole && (session.user as any).role !== requiredRole) {
    redirect("/unauthorized");
  }

  return session;
}

export async function checkAuth(requiredRole?: Role) {
  const session = await getServerSession();

  if (!session) {
    return false;
  }

  if (requiredRole && (session.user as any).role !== requiredRole) {
    return false;
  }

  return true;
}
