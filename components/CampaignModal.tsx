"use client";

import { useState, useEffect } from "react";

interface Campaign {
  id?: string;
  name: string;
  type: string;
  raised: number;
  goal: number;
  status: string;
}

interface CampaignModalProps {
  isOpen: boolean;
  campaign?: Campaign;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CampaignModal({
  isOpen,
  campaign,
  onClose,
  onSuccess,
}: CampaignModalProps) {
  const [formData, setFormData] = useState<Campaign>(
    campaign || {
      name: "",
      type: "Fundraising",
      raised: 0,
      goal: 0,
      status: "active",
    }
  );
  const [amountToAdd, setAmountToAdd] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (campaign) {
      setFormData(campaign);
      setAmountToAdd(0);
    }
  }, [campaign, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "raised" || name === "goal" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const method = campaign?.id ? "PUT" : "POST";
      const url = campaign?.id
        ? `/api/campaigns/${campaign.id}`
        : "/api/campaigns";

      const dataToSubmit = {
        ...formData,
        raised: campaign?.id ? formData.raised + amountToAdd : formData.raised,
      };

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save campaign");
      }

      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          animation: "fadeIn 0.2s ease-out",
        }}
      >
        <div 
          className="bg-white rounded-xl shadow-2xl max-w-md mx-4 max-h-[90vh] overflow-y-auto p-6"
          style={{
            animation: "scaleIn 0.3s ease-out",
          }}
        >
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            {campaign?.id ? "Edit Campaign" : "Create New Campaign"}
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Campaign Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter campaign name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Campaign Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Fundraising">Fundraising</option>
                <option value="Health">Health</option>
                <option value="Education">Education</option>
                <option value="Emergency">Emergency</option>
                <option value="Community">Community</option>
              </select>
            </div>

            {campaign?.id ? (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Currently Raised (USD)
                    </label>
                    <input
                      type="text"
                      disabled
                      value={`$${formData.raised.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-gray-50 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Goal Amount (USD) *
                    </label>
                    <input
                      type="number"
                      name="goal"
                      value={formData.goal}
                      onChange={handleChange}
                      step="0.01"
                      min="0"
                      required
                      placeholder="0.00"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Add Funds (USD)
                  </label>
                  <input
                    type="number"
                    value={amountToAdd}
                    onChange={(e) => setAmountToAdd(parseFloat(e.target.value) || 0)}
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {amountToAdd > 0 && (
                    <p className="text-xs text-indigo-600 mt-2">
                      New total: ${(formData.raised + amountToAdd).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </p>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Initial Amount Raised (USD) *
                    </label>
                    <input
                      type="number"
                      name="raised"
                      value={formData.raised}
                      onChange={handleChange}
                      step="0.01"
                      min="0"
                      required
                      placeholder="0.00"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Goal Amount (USD) *
                    </label>
                    <input
                      type="number"
                      name="goal"
                      value={formData.goal}
                      onChange={handleChange}
                      step="0.01"
                      min="0"
                      required
                      placeholder="0.00"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-medium transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition disabled:opacity-50"
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
