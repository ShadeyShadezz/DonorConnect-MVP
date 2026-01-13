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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2 text-xl font-bold">
                <span className="text-gray-900">donor</span>
                <span className="text-indigo-600">Connect</span>
                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded font-medium">Staff</span>
              </Link>
              <nav className="hidden md:flex items-center space-x-6 text-sm">
                <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
                <Link href="/donors" className="text-gray-600 hover:text-gray-900">Donors</Link>
                <Link href="/donations" className="text-gray-600 hover:text-gray-900">Donations</Link>
                <Link href="/campaigns" className="text-gray-600 hover:text-gray-900">Campaigns</Link>
                <Link href="/tasks" className="text-gray-600 hover:text-gray-900">Tasks</Link>
                <Link href="/ai-insights" className="text-indigo-600 font-medium">AI Insights</Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{user.name || user.email}</p>
                  <p className="text-gray-600 text-xs">Staff</p>
                </div>
              </div>
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">AI Donor Insights</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={!selectedDonorId || loading}
                className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition disabled:opacity-50"
              >
                {loading ? "Generating insights..." : "Generate Insights"}
              </button>
            </div>
          </form>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
              @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
              }
            `}</style>
            <div 
              className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full"
              style={{
                animation: "spin 1s linear infinite",
              }}
            />
            <p className="mt-4 text-gray-600 font-medium">Generating AI insights...</p>
            <p 
              className="text-sm text-gray-400 mt-2"
              style={{
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            >
              Analyzing donor data and patterns
            </p>
          </div>
        )}

        {insightData && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
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
      </main>
    </div>
  );
}
