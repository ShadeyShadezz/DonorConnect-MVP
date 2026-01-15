"use client";

import { useState } from "react";
import DonorModal from "@/components/DonorModal";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";

interface Donor {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  notes: string | null;
  donations: Array<{ amount: number }>;
}

interface DonorsContentProps {
  initialDonors: Donor[];
}

export default function DonorsContent({ initialDonors }: DonorsContentProps) {
  const [donors, setDonors] = useState(initialDonors);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDonor, setEditingDonor] = useState<Donor | undefined>();
  const [deleteTarget, setDeleteTarget] = useState<Donor | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleAddDonor = () => {
    setEditingDonor(undefined);
    setIsModalOpen(true);
  };

  const handleEditDonor = (donor: Donor) => {
    setEditingDonor(donor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingDonor(undefined);
  };

  const handleSuccessSave = async () => {
    const response = await fetch("/api/donors");
    const updatedDonors = await response.json();
    setDonors(updatedDonors);
  };

  const handleDeleteClick = (donor: Donor) => {
    setDeleteTarget(donor);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/donors/${deleteTarget.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete donor");
      }

      setDonors(donors.filter((d) => d.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (error) {
      console.error("Error deleting donor:", error);
      alert(error instanceof Error ? error.message : "Failed to delete donor");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Donors</h1>
            <p className="text-gray-600 mt-2">Manage donor information and records</p>
          </div>
          <button
            onClick={handleAddDonor}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition"
          >
            Add Donor
          </button>
        </div>
      </div>

      {donors.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <p className="text-gray-600 mb-4">No donors found. Add one to get started!</p>
          <button
            onClick={handleAddDonor}
            className="inline-block px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition"
          >
            Create First Donor
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">Donations</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {donors.map((donor) => {
                  const donationCount = donor.donations.length;
                  return (
                    <tr key={donor.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{donor.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{donor.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{donor.phone}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{donationCount}</td>
                      <td className="px-6 py-4 text-sm text-right space-x-2">
                        <button
                          onClick={() => handleEditDonor(donor)}
                          className="inline-block px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded font-medium transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(donor)}
                          className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded font-medium transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <DonorModal
        isOpen={isModalOpen}
        donor={editingDonor}
        onClose={handleCloseModal}
        onSuccess={handleSuccessSave}
      />

      <DeleteConfirmationModal
        isOpen={deleteTarget !== null}
        itemName={deleteTarget?.name || ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
        isLoading={isDeleting}
      />
    </>
  );
}
