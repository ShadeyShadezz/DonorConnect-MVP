"use client";

import { useState } from "react";
import Link from "next/link";
import DonationModal from "@/components/DonationModal";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";

interface Donor {
  id: string;
  name: string;
  email?: string;
}

interface Donation {
  id: string;
  amount: number;
  date: Date;
  type: string;
  notes?: string;
  donorId: string;
  donor: Donor;
}

interface DonationsContentProps {
  initialDonations: Donation[];
  initialDonors: Donor[];
}

export default function DonationsContent({
  initialDonations,
  initialDonors,
}: DonationsContentProps) {
  const [donations, setDonations] = useState(initialDonations);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDonation, setEditingDonation] = useState<Donation | undefined>();
  const [deleteTarget, setDeleteTarget] = useState<Donation | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleAddDonation = () => {
    setEditingDonation(undefined);
    setIsModalOpen(true);
  };

  const handleEditDonation = (donation: Donation) => {
    setEditingDonation(donation);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingDonation(undefined);
  };

  const handleSuccessSave = async () => {
    const response = await fetch("/api/donations");
    const updatedDonations = await response.json();
    setDonations(updatedDonations);
  };

  const handleDeleteClick = (donation: Donation) => {
    setDeleteTarget(donation);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/donations/${deleteTarget.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete donation");
      }

      setDonations(donations.filter((d) => d.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (error) {
      console.error("Error deleting donation:", error);
      alert(error instanceof Error ? error.message : "Failed to delete donation");
    } finally {
      setIsDeleting(false);
    }
  };

  const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);
  const averageDonation =
    donations.length > 0 ? totalDonations / donations.length : 0;

  return (
    <>
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Donations</h1>
            <p className="text-gray-600 mt-2">Track and manage all donations</p>
          </div>
          <button
            onClick={handleAddDonation}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition"
          >
            Recent Donation
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-600 font-medium uppercase">
              Total Donations
            </p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              ${totalDonations.toFixed(0)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 font-medium uppercase">
              Number of Donations
            </p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {donations.length}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 font-medium uppercase">
              Average Donation
            </p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              ${averageDonation.toFixed(0)}
            </p>
          </div>
        </div>
      </div>

      {donations.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <p className="text-gray-600 mb-4">
            No donations found. Record one to get started!
          </p>
          <button
            onClick={handleAddDonation}
            className="inline-block px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition"
          >
            Record First Donation
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">
                    Donor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">
                    Campaign
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {donations.map((donation) => (
                  <tr key={donation.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {new Date(donation.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <Link
                        href={`/donors/${donation.donorId}`}
                        className="text-indigo-600 hover:text-indigo-700"
                      >
                        {donation.donor.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      ${donation.amount.toFixed(0)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {donation.type || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        processed
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-right space-x-2">
                      <button
                        onClick={() => handleEditDonation(donation)}
                        className="inline-block px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded font-medium transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(donation)}
                        className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded font-medium transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <DonationModal
        isOpen={isModalOpen}
        donation={editingDonation}
        donors={initialDonors}
        onClose={handleCloseModal}
        onSuccess={handleSuccessSave}
      />

      <DeleteConfirmationModal
        isOpen={deleteTarget !== null}
        itemName={`$${deleteTarget?.amount.toFixed(0)} donation from ${deleteTarget?.donor.name}`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
        isLoading={isDeleting}
      />
    </>
  );
}
