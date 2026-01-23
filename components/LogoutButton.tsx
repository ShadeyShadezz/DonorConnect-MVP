"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleSignOut() {
    // Prevent next-auth from doing its own redirect so we can reliably navigate client-side
    await signOut({ redirect: false });
    router.push("/auth/login");
  }

  return (
    <button
      onClick={handleSignOut}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
    >
      Sign out
    </button>
  );
}
