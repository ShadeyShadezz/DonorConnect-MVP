export const dynamic = "force-dynamic";

import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import DonorsContent from "./DonorsContent";

export default async function DonorsPage() {
  const session = await getSession();

  if (!session) {
    redirect("/auth/login");
  }

  const donors = await prisma.donor.findMany({
    include: {
      donations: {
        select: {
          amount: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const user = session.user;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2 text-xl font-bold">
                <span className="text-gray-900">donor</span>
                <span className="text-indigo-600">Connect</span>
                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded font-medium">Staff</span>
              </Link>
              <nav className="hidden md:flex items-center space-x-6 text-sm">
                <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
                <Link href="/donors" className="text-indigo-600 font-medium">Donors</Link>
                <Link href="/donations" className="text-gray-600 hover:text-gray-900">Donations</Link>
                <Link href="/campaigns" className="text-gray-600 hover:text-gray-900">Campaigns</Link>
                <Link href="/tasks" className="text-gray-600 hover:text-gray-900">Tasks</Link>
                <Link href="/ai-insights" className="text-gray-600 hover:text-gray-900">AI Insights</Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-gray-600 text-xs">{user.role}</p>
                </div>
              </div>
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DonorsContent initialDonors={donors} />
      </main>
    </div>
  );
}
