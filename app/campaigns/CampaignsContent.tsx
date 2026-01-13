"use client";

import { useState } from "react";
import CampaignModal from "@/components/CampaignModal";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";

interface Campaign {
  id: string;
  name: string;
  type: string;
  raised: number;
  goal: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CampaignsContentProps {
  initialCampaigns: Campaign[];
}

export default function CampaignsContent({
  initialCampaigns,
}: CampaignsContentProps) {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | undefined>();
  const [deleteTarget, setDeleteTarget] = useState<Campaign | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleAddCampaign = () => {
    setEditingCampaign(undefined);
    setIsModalOpen(true);
  };

  const handleEditCampaign = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCampaign(undefined);
  };

  const handleSuccessSave = async () => {
    const response = await fetch("/api/campaigns");
    const updatedCampaigns = await response.json();
    setCampaigns(updatedCampaigns);
  };

  const handleDeleteClick = (campaign: Campaign) => {
    setDeleteTarget(campaign);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/campaigns/${deleteTarget.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete campaign");
      }

      setCampaigns(campaigns.filter((c) => c.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (error) {
      console.error("Error deleting campaign:", error);
      alert("Failed to delete campaign");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Campaigns</h1>
            <p className="text-gray-600 mt-2">Manage fundraising campaigns and appeals</p>
          </div>
          <button
            onClick={handleAddCampaign}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition"
          >
            Create Campaign
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {campaigns.length === 0 ? (
          <div className="col-span-2 bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-600 mb-4">No campaigns yet. Create one to get started!</p>
            <button
              onClick={handleAddCampaign}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition"
            >
              Create First Campaign
            </button>
          </div>
        ) : (
          campaigns.map((campaign) => {
            const progress = (campaign.raised / campaign.goal) * 100;
            return (
              <div
                key={campaign.id}
                className="bg-white rounded-lg border border-gray-200 p-6"
              >
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900">
                    {campaign.name}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">{campaign.type}</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-xs font-medium text-gray-600">Progress</p>
                      <p className="text-xs font-medium text-gray-600">
                        {Math.min(Math.round(progress), 100)}%
                      </p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-600">Raised</p>
                      <p className="text-2xl font-bold text-green-600 mt-1">
                        ${campaign.raised.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Goal</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        ${campaign.goal.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleEditCampaign(campaign)}
                    className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(campaign)}
                    className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      <CampaignModal
        isOpen={isModalOpen}
        campaign={editingCampaign}
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
