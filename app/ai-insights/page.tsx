"use client";

import { useState, FormEvent } from "react";
import { getSession } from "next-auth/react";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface InsightData {
  donor: {
    id: string;
    name: string;
    email: string;
  };
  donationSummary: {
    totalDonations: number;
    totalAmount: number;
    averageDonation: number;
    lastDonationDate: string | null;
    donationTypes: string[];
  };
  insights: string;
}

export default function AIInsightsPage() {
  const [donors, setDonors] = useState<any[]>([]);
  const [selectedDonorId, setSelectedDonorId] = useState("");
  const [loading, setLoading] = useState(false);
  const [insightData, setInsightData] = useState<InsightData | null>(null);
  const [error, setError] = useState("");
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    async function initialize() {
      const session = await getSession();
      if (!session) {
        router.push("/auth/login");
        return;
      }
      setUser(session.user);
      fetchDonors();
    }
    initialize();
  }, [router]);

  async function fetchDonors() {
    try {
      const response = await fetch("/api/donors");
      if (response.ok) {
        const data = await response.json();
        setDonors(data);
      }
    } catch (err) {
      console.error("Error fetching donors:", err);
    }
  }

  async function handleGenerateInsights(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setInsightData(null);
    setLoading(true);

    try {
      const response = await fetch("/api/ai/insights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ donorId: selectedDonorId }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to generate insights");
      } else {
        setInsightData(data);
      }
    } catch (err) {
      setError("An error occurred while generating insights");
    }

    setLoading(false);
  }

  if (!user) {
    return <div>Loading...</div>;
  }

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
                <Link href="/donations" className="text-gray-700 hover:text-gray-900">
                  Donations
                </Link>
                <Link href="/ai-insights" className="text-gray-900 font-medium">
                  AI Insights
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">AI Donor Insights</h1>

        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <form onSubmit={handleGenerateInsights}>
            <div className="space-y-4">
              <div>
                <label htmlFor="donor" className="block text-sm font-medium text-gray-700">
                  Select Donor
                </label>
                <select
                  id="donor"
                  value={selectedDonorId}
                  onChange={(e) => setSelectedDonorId(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Choose a donor...</option>
                  {donors.map((donor) => (
                    <option key={donor.id} value={donor.id}>
                      {donor.name} - {donor.email}
                    </option>
                  ))}
                </select>
              </div>

              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={!selectedDonorId || loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? "Generating insights..." : "Generate Insights"}
              </button>
            </div>
          </form>
        </div>

        {insightData && (
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {insightData.donor.name}
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-6">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Total Donations</dt>
                  <dd className="mt-1 text-2xl font-extrabold text-gray-900">
                    {insightData.donationSummary.totalDonations}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Total Amount</dt>
                  <dd className="mt-1 text-2xl font-extrabold text-gray-900">
                    ${insightData.donationSummary.totalAmount.toFixed(2)}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Average Donation</dt>
                  <dd className="mt-1 text-2xl font-extrabold text-gray-900">
                    ${insightData.donationSummary.averageDonation.toFixed(2)}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Last Donation</dt>
                  <dd className="mt-1 text-2xl font-extrabold text-gray-900">
                    {insightData.donationSummary.lastDonationDate
                      ? new Date(insightData.donationSummary.lastDonationDate).toLocaleDateString()
                      : "N/A"}
                  </dd>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">AI Analysis & Recommendations</h3>
                <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
                  {insightData.insights}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
