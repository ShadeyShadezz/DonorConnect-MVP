"use client";

import { useState } from "react";
import Link from "next/link";
import DonorModal from "@/components/DonorModal";
import DonationModal from "@/components/DonationModal";
import CampaignModal from "@/components/CampaignModal";
import TaskModal from "@/components/TaskModal";

interface Donor {
  id: string;
  name: string;
  email?: string;
}

interface Campaign {
  id: string;
  name: string;
  type: string;
  raised: number;
  goal: number;
}

interface Task {
  id: string;
  title: string;
  description: string | null;
  dueDate: Date;
  status: string;
}

interface DashboardContentProps {
  campaigns: Campaign[];
  tasks: Task[];
  donors: Donor[];
  totalDonations: number;
  donationCount: number;
}

export default function DashboardContent({
  campaigns: initialCampaigns,
  tasks: initialTasks,
  donors,
  totalDonations,
  donationCount,
}: DashboardContentProps) {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [tasks, setTasks] = useState(initialTasks);

  const [donorModalOpen, setDonorModalOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [campaignModalOpen, setCampaignModalOpen] = useState(false);
  const [taskModalOpen, setTaskModalOpen] = useState(false);

  const handleDonorSuccess = async () => {
    setDonorModalOpen(false);
  };

  const handleDonationSuccess = async () => {
    setDonationModalOpen(false);
  };

  const handleCampaignSuccess = async () => {
    setCampaignModalOpen(false);
    const response = await fetch("/api/campaigns");
    const updatedCampaigns = await response.json();
    setCampaigns(updatedCampaigns);
  };

  const handleTaskSuccess = async () => {
    setTaskModalOpen(false);
    const response = await fetch("/api/tasks");
    const updatedTasks = await response.json();
    setTasks(updatedTasks);
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of your fundraising activities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Link href="/donors" className="block">
          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition">
            <div className="text-3xl mb-2">👥</div>
            <h3 className="text-sm font-medium text-gray-600">Donors</h3>
            <p className="text-sm text-gray-600 mt-1">Manage donor database</p>
          </div>
        </Link>

        <Link href="/donations" className="block">
          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition">
            <div className="text-3xl mb-2">🎁</div>
            <h3 className="text-sm font-medium text-gray-600">Donations</h3>
            <p className="text-sm text-gray-600 mt-1">Track all donations</p>
          </div>
        </Link>

        <Link href="/campaigns" className="block">
          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="text-sm font-medium text-gray-600">Campaigns</h3>
            <p className="text-sm text-gray-600 mt-1">Fundraising campaigns</p>
          </div>
        </Link>

        <Link href="/tasks" className="block">
          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition">
            <div className="text-3xl mb-2">✅</div>
            <h3 className="text-sm font-medium text-gray-600">Tasks</h3>
            <p className="text-sm text-gray-600 mt-1">Follow-up activities</p>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-gray-600 font-medium">Total Donors</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">2 active</p>
              <p className="text-xs text-gray-600 mt-2">2 total</p>
            </div>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
              12 months
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-xs text-gray-600 font-medium">Lifetime Donations</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            ${totalDonations.toLocaleString()}
          </p>
          <p className="text-xs text-gray-600 mt-2">
            {donationCount} donations
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-xs text-gray-600 font-medium">This Month</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            ${totalDonations.toLocaleString()}
          </p>
          <p className="text-xs text-gray-600 mt-2">
            {donationCount} donations
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-xs text-gray-600 font-medium">Active Campaigns</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            {campaigns.length}
          </p>
          <p className="text-xs text-gray-600 mt-2">
            Avg: $
            {campaigns.length > 0
              ? (
                  campaigns.reduce((sum, c) => sum + c.raised, 0) /
                  campaigns.length
                ).toLocaleString(undefined, { maximumFractionDigits: 0 })
              : "0"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Donor Engagement
          </h3>
          <p className="text-xs text-gray-600 mb-4">
            Key metrics for donor relationships
          </p>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-900 mb-2">
                Active Donors ({donors.length})
              </p>
              {donors.length === 0 ? (
                <p className="text-xs text-gray-500">No active donors yet</p>
              ) : (
                <div className="space-y-2">
                  {donors.map((donor) => (
                    <div key={donor.id} className="flex items-center justify-between bg-indigo-50 rounded px-3 py-2">
                      <span className="text-sm font-medium text-gray-900">{donor.name}</span>
                      <span className="text-xs bg-indigo-200 text-indigo-700 px-2 py-0.5 rounded">Active</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Monthly Performance
          </h3>
          <p className="text-xs text-gray-600 mb-4">
            Current month vs. average
          </p>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <p className="text-xs text-rose-600 font-medium">This Month</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ${totalDonations.toLocaleString()}
              </p>
            </div>
            <div className="border-b pb-4">
              <p className="text-xs text-gray-600 font-medium">
                Donations Count
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {donationCount}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600 font-medium">
                Active Campaigns
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {campaigns.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button
            onClick={() => setDonorModalOpen(true)}
            className="px-4 py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg font-medium transition text-center"
          >
            ➕ Add New Donor
          </button>
          <button
            onClick={() => setDonationModalOpen(true)}
            className="px-4 py-3 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-lg font-medium transition text-center"
          >
            🎁 Record Donation
          </button>
          <button
            onClick={() => setCampaignModalOpen(true)}
            className="px-4 py-3 bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-lg font-medium transition text-center"
          >
            🎯 Create Campaign
          </button>
          <button
            onClick={() => setTaskModalOpen(true)}
            className="px-4 py-3 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg font-medium transition text-center"
          >
            ✓ Add Task
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Campaigns</h3>
            <Link
              href="/campaigns"
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
            >
              View All
            </Link>
          </div>
          {campaigns.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No campaigns yet</p>
          ) : (
            <div className="space-y-4">
              {campaigns.map((campaign) => {
                const progress = (campaign.raised / campaign.goal) * 100;
                return (
                  <div
                    key={campaign.id}
                    className="border-b pb-4 last:border-b-0"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {campaign.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          {campaign.type}
                        </p>
                      </div>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {Math.min(Math.round(progress), 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                      <div
                        className="bg-indigo-600 h-1.5 rounded-full"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>${campaign.raised.toLocaleString()}</span>
                      <span>${campaign.goal.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Recent Tasks</h3>
            <Link
              href="/tasks"
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
            >
              View All
            </Link>
          </div>
          {tasks.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No tasks yet</p>
          ) : (
            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="border-b pb-4 last:border-b-0">
                  <p className="font-semibold text-gray-900">{task.title}</p>
                  {task.description && (
                    <p className="text-xs text-gray-600 mt-1">
                      {task.description}
                    </p>
                  )}
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-gray-500">
                      Due:{" "}
                      {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                    <span
                      className={`text-xs px-2 py-1 rounded font-medium ${
                        task.status === "pending"
                          ? "bg-blue-100 text-blue-700"
                          : task.status === "in_progress"
                          ? "bg-yellow-100 text-yellow-700"
                          : task.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {task.status.replace(/_/g, " ")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <DonorModal
        isOpen={donorModalOpen}
        onClose={() => setDonorModalOpen(false)}
        onSuccess={handleDonorSuccess}
      />

      <DonationModal
        isOpen={donationModalOpen}
        donors={donors}
        onClose={() => setDonationModalOpen(false)}
        onSuccess={handleDonationSuccess}
      />

      <CampaignModal
        isOpen={campaignModalOpen}
        onClose={() => setCampaignModalOpen(false)}
        onSuccess={handleCampaignSuccess}
      />

      <TaskModal
        isOpen={taskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        onSuccess={handleTaskSuccess}
      />
    </>
  );
}
