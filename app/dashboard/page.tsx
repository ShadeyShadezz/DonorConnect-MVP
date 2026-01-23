export const dynamic = "force-dynamic";

import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import LogoutButton from "@/components/LogoutButton";
import DashboardContent from "./DashboardContent";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/auth/login");
  }

  // Staff site should reroute to itself

  const user = session.user;

  const [campaigns, tasks, donations, donors, users] = await Promise.all([
    prisma.campaign.findMany({ take: 2, orderBy: { createdAt: "desc" } }),
    prisma.task.findMany({ take: 2, orderBy: { dueDate: "asc" } }),
    prisma.donation.findMany({ orderBy: { date: "desc" } }),
    prisma.donor.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    }),
    // load users only for admin UI
    prisma.user.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);
  const donationCount = donations.length;

  const stats = {
    totalUsers: users.length,
    adminUsers: users.filter((u) => u.role === "ADMIN").length,
    staffUsers: users.filter((u) => u.role === "STAFF").length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/dashboard" className="flex items-center space-x-2 text-xl font-bold">
                <span className="text-gray-900">donor</span>
                <span className="text-indigo-600">Connect</span>
                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded font-medium">{user.role === "ADMIN" ? "Admin" : "Staff"}</span>
              </Link>
              <nav className="hidden md:flex items-center space-x-6 text-sm">
                <Link href="/dashboard" className="text-indigo-600 font-medium">Dashboard</Link>
                {user.role === "ADMIN" && (
                  <Link href="#admin" className="text-gray-600 hover:text-gray-900">Admin Panel</Link>
                )}
                <Link href="/donors" className="text-gray-600 hover:text-gray-900">Donors</Link>
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
        <DashboardContent
          campaigns={campaigns}
          tasks={tasks}
          donors={donors}
          totalDonations={totalDonations}
          donationCount={donationCount}
        />

        {user.role === "ADMIN" && (
          <section id="admin" className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Admin Panel</h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-6">
              <div className="bg-white overflow-hidden shadow rounded-lg p-6">
                <dt className="text-sm font-medium text-gray-500">Total Users</dt>
                <dd className="mt-2 text-3xl font-extrabold text-gray-900">{stats.totalUsers}</dd>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg p-6">
                <dt className="text-sm font-medium text-gray-500">Admin Users</dt>
                <dd className="mt-2 text-3xl font-extrabold text-purple-600">{stats.adminUsers}</dd>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg p-6">
                <dt className="text-sm font-medium text-gray-500">Staff Users</dt>
                <dd className="mt-2 text-3xl font-extrabold text-blue-600">{stats.staffUsers}</dd>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">User Management</h3>
              </div>

              <div className="p-4">
                {users.length === 0 ? (
                  <div className="py-12 text-center text-gray-600">No users found.</div>
                ) : (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((u) => (
                        <tr key={u.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{u.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{u.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              u.role === "ADMIN" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                            }`}>{u.role}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{new Date(u.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
