import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export default async function DonationDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();

  if (!session) {
    redirect("/auth/login");
  }

  const donation = await prisma.donation.findUnique({
    where: { id: params.id },
    include: {
      donor: true,
    },
  });

  if (!donation) {
    redirect("/donations");
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

      <div className="max-w-4xl mx-auto py-12 sm:px-6 lg:px-8">
        <Link href="/donations" className="text-blue-600 hover:text-blue-900 mb-8 inline-block">
          ← Back to Donations
        </Link>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Donation Details</h1>
            <p className="mt-1 text-sm text-gray-600">
              Donation ID: {donation.id}
            </p>
          </div>

          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Donor</h3>
                <p className="mt-1 text-sm text-gray-900">
                  <Link
                    href={`/donors/${donation.donorId}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    {donation.donor.name}
                  </Link>
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Amount</h3>
                <p className="mt-1 text-sm text-gray-900">
                  ${donation.amount.toFixed(2)}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Date</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(donation.date).toLocaleDateString()}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Type</h3>
                <p className="mt-1 text-sm text-gray-900">{donation.type}</p>
              </div>
            </div>

            {donation.notes && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">
                  {donation.notes}
                </p>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-500">Timestamps</h3>
              <p className="mt-1 text-sm text-gray-600">
                Created: {new Date(donation.createdAt).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">
                Updated: {new Date(donation.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
