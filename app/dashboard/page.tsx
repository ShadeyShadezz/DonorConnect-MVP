import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import LogoutButton from "@/components/LogoutButton";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/auth/login");
  }

  const user = session.user as any;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">DonorConnect</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">{user.email}</span>
              {user.role === "ADMIN" && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  Admin
                </span>
              )}
              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/donors">
            <div className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-lg transition-shadow">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      Donors
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Manage donor information
                    </p>
                  </div>
                  <div className="text-4xl font-bold text-blue-600">→</div>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/donations">
            <div className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-lg transition-shadow">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      Donations
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Track donations
                    </p>
                  </div>
                  <div className="text-4xl font-bold text-green-600">→</div>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/ai-insights">
            <div className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-lg transition-shadow">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      AI Insights
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Donor activity analysis & suggestions
                    </p>
                  </div>
                  <div className="text-4xl font-bold text-purple-600">→</div>
                </div>
              </div>
            </div>
          </Link>

          {user.role === "ADMIN" && (
            <Link href="/admin">
              <div className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-lg transition-shadow">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">
                        Admin Panel
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        User and system management
                      </p>
                    </div>
                    <div className="text-4xl font-bold text-red-600">→</div>
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
