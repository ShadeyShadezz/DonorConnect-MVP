import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export default async function DonationsPage() {
  const session = await getSession();

  if (!session) {
    redirect("/auth/login");
  }

  const donations = await prisma.donation.findMany({
    include: {
      donor: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
  });

  const user = session.user as any;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/dashboard" className="text-xl font-bold text-gray-900">
                DonorConnect
              </Link>
              <div className="flex space-x-4">
                <Link href="/dashboard" className="text-gray-700 hover:text-gray-900">
                  Dashboard
                </Link>
                <Link href="/donors" className="text-gray-700 hover:text-gray-900">
                  Donors
                </Link>
                <Link href="/donations" className="text-gray-900 font-medium">
                  Donations
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">{user.email}</span>
              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Donations</h1>
          <Link
            href="/donations/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Record Donation
          </Link>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div>
                <dt className="text-sm font-medium text-gray-500">Total Donations</dt>
                <dd className="mt-1 text-3xl font-extrabold text-gray-900">
                  ${donations.reduce((sum, d) => sum + d.amount, 0).toFixed(2)}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Number of Donations</dt>
                <dd className="mt-1 text-3xl font-extrabold text-gray-900">
                  {donations.length}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Average Donation</dt>
                <dd className="mt-1 text-3xl font-extrabold text-gray-900">
                  ${donations.length > 0 ? (donations.reduce((sum, d) => sum + d.amount, 0) / donations.length).toFixed(2) : "0.00"}
                </dd>
              </div>
            </div>
          </div>
        </div>

        {donations.length === 0 ? (
          <div className="bg-white overflow-hidden shadow rounded-lg mt-8">
            <div className="px-4 py-12 sm:px-6 text-center">
              <p className="text-gray-600">No donations found. Record one to get started!</p>
            </div>
          </div>
        ) : (
          <div className="bg-white overflow-hidden shadow rounded-lg mt-8">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Donor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {donations.map((donation) => (
                  <tr key={donation.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <Link
                        href={`/donors/${donation.donorId}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        {donation.donor.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      ${donation.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {donation.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(donation.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        href={`/donations/${donation.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
