import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export default async function DonorDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();

  if (!session) {
    redirect("/auth/login");
  }

  const donor = await prisma.donor.findUnique({
    where: { id: params.id },
    include: {
      donations: {
        orderBy: {
          date: "desc",
        },
      },
    },
  });

  if (!donor) {
    redirect("/donors");
  }

  const user = session.user;

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
                <Link href="/donors" className="text-gray-900 font-medium">
                  Donors
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

      <div className="max-w-4xl mx-auto py-12 sm:px-6 lg:px-8">
        <Link href="/donors" className="text-blue-600 hover:text-blue-900 mb-8 inline-block">
          ← Back to Donors
        </Link>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">{donor.name}</h1>
            <p className="mt-1 text-sm text-gray-600">
              Donor ID: {donor.id}
            </p>
          </div>

          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="mt-1 text-sm text-gray-900">{donor.email || "N/A"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                <p className="mt-1 text-sm text-gray-900">{donor.phone || "N/A"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Address</h3>
                <p className="mt-1 text-sm text-gray-900">{donor.address || "N/A"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">City, State ZIP</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {donor.city || ""} {donor.state || ""} {donor.zipCode || ""}
                </p>
              </div>
            </div>

            {donor.notes && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{donor.notes}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Donation History</h2>
            <Link
              href={`/donations/new?donorId=${donor.id}`}
              className="text-blue-600 hover:text-blue-900 text-sm font-medium"
            >
              Add Donation
            </Link>
          </div>

          {donor.donations.length === 0 ? (
            <div className="px-4 py-12 sm:px-6 text-center">
              <p className="text-gray-600">No donations recorded yet.</p>
            </div>
          ) : (
            <div>
              <div className="px-4 py-5 sm:p-6 bg-gray-50 border-b border-gray-200">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Total Donated</dt>
                    <dd className="mt-1 text-2xl font-extrabold text-gray-900">
                      ${donor.donations.reduce((sum, d) => sum + d.amount, 0).toFixed(2)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Number of Donations</dt>
                    <dd className="mt-1 text-2xl font-extrabold text-gray-900">
                      {donor.donations.length}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Average Donation</dt>
                    <dd className="mt-1 text-2xl font-extrabold text-gray-900">
                      ${(donor.donations.reduce((sum, d) => sum + d.amount, 0) / donor.donations.length).toFixed(2)}
                    </dd>
                  </div>
                </div>
              </div>

              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {donor.donations.map((donation) => (
                    <tr key={donation.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(donation.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${donation.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {donation.type}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {donation.notes || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
