"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import LogoutButton from "@/components/LogoutButton"
import { groupMetricsForDashboard, notifyAdminOnLargeDonation } from "@/lib/analytics"

type Donor = { id: string; name: string }
type Donation = { id: string; amount: number; date?: string; donorId?: string; donorName?: string }

export default function AnalyticsPage() {
  const [donors, setDonors] = useState<Donor[]>([])
  const [donations, setDonations] = useState<Donation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [grouped, setGrouped] = useState<any | null>(null)
  const [notifyResult, setNotifyResult] = useState<any | null>(null)
  // sample highlighted donor data (provided)
  const sampleTopDonor = { id: "cmkvaxz0f00059cue5oeolao1", total: 11500 }
  const sampleRecent = [
    { id: "cmkvaxz0f00069cue622gqv22", date: "2024-03-24T20:00:00Z", amount: 1000 },
    { id: "cmkvaxz0f00049cueub16hhgn", date: "2024-03-14T20:00:00Z", amount: 300 },
    { id: "cmkvaxz0f00039cue7ovy6qyq", date: "2024-03-09T19:00:00Z", amount: 750 },
    { id: "cmkvaxz0f00069cue622gqv22", date: "2024-03-04T19:00:00Z", amount: 250 },
    { id: "cmkvaxz0f00049cueub16hhgn", date: "2024-02-27T19:00:00Z", amount: 0 },
  ]

  useEffect(() => {
    async function load() {
      try {
        const [dResp, tResp] = await Promise.all([fetch("/api/donors"), fetch("/api/donations")])
        if (!dResp.ok || !tResp.ok) {
          setError("Failed to load analytics data")
          setLoading(false)
          return
        }
        const dData = await dResp.json()
        const tData = await tResp.json()
        setDonors(dData || [])
        setDonations(tData || [])
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const total = donations.reduce((s, d) => s + (Number(d.amount) || 0), 0)
  const count = donations.length
  const average = count ? total / count : 0

  // note: using sampleTopDonor and sampleRecent for highlighted display

  return (
    <div className="min-h-screen bg-gray-50">
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
                <Link href="/campaigns" className="text-gray-700 hover:text-gray-900">
                  Campaigns
                </Link>
                <Link href="/tasks" className="text-gray-700 hover:text-gray-900">
                  Tasks
                </Link>
                <Link href="/ai-insights" className="text-gray-700 hover:text-gray-900">
                  AI Insights
                </Link>
                <Link href="/analytics" className="text-gray-900 font-medium">
                  Analytics
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-sm text-gray-600">Key donation metrics and recent activity.</p>
        </header>

        {loading && <div className="text-gray-600">Loading analytics...</div>}
        {error && <div className="text-red-600">{error}</div>}

        {!loading && !error && (
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-4 rounded shadow">
              <div className="text-sm text-gray-500">Total Donations</div>
              <div className="mt-2 text-2xl font-semibold text-gray-900">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total)}</div>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <div className="text-sm text-gray-500">Donation Count</div>
              <div className="mt-2 text-2xl font-semibold text-gray-900">{count}</div>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <div className="text-sm text-gray-500">Average Donation</div>
              <div className="mt-2 text-2xl font-semibold text-gray-900">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(average)}</div>
            </div>
          </section>
        )}

        {/* Admin Tools: keep only Group Metrics and Notify for clarity */}
        {!loading && !error && (
          <section className="mt-4 mb-8 bg-white p-4 rounded shadow">
            <h3 className="font-semibold text-gray-900">Admin Tools</h3>
            <div className="mt-3 flex flex-row gap-3">
              <button
                className="px-3 py-2 bg-sky-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400 active:scale-95 active:translate-y-0.5 transition transform"
                onClick={() => setGrouped(groupMetricsForDashboard(donations))}
              >
                Group Metrics
              </button>

              <button
                className="px-3 py-2 bg-red-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 active:scale-95 active:translate-y-0.5 transition transform"
                onClick={() => {
                  const sample = donations[0]
                  if (!sample) {
                    setNotifyResult({ alerted: false, reason: 'No donations to test' })
                    return
                  }
                  setNotifyResult(notifyAdminOnLargeDonation(sample, 100))
                }}
              >
                Notify Admin (test threshold 100)
              </button>
            </div>

            <div className="mt-4 space-y-2 text-sm text-gray-700">
              {grouped && (
                <div>
                  <div>Donor Count: {donors.length}</div>
                  <div>Total: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(grouped.total)}</div>
                  <div>Avg: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(grouped.average)}</div>
                  <div className="mt-2">
                    <div className="text-sm font-medium text-gray-800">Top Donors</div>
                    <ul className="mt-1 text-xs text-gray-600 list-disc list-inside">
                      {grouped.topDonors.map((t: any) => (
                        <li key={t.name}>{t.name} — {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(t.amount)}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {!loading && !error && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded shadow">
              <h2 className="font-semibold text-gray-900">Top Donor</h2>
              <div className="mt-2 text-gray-700">
                <div className="text-lg font-medium">{sampleTopDonor.id}</div>
                <div className="text-sm text-gray-500">Total: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(sampleTopDonor.total)}</div>
              </div>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h2 className="font-semibold text-gray-900">Recent Donations</h2>
              <ul className="mt-3 space-y-2">
                {sampleRecent.length === 0 && <li className="text-sm text-gray-500">No recent donations</li>}
                {sampleRecent.map((r) => (
                  <li key={r.id + r.date} className="flex justify-between items-start">
                    <div>
                      <div className="text-sm font-medium text-gray-800">{r.id}</div>
                      <div className="text-xs text-gray-500">{new Date(r.date).toLocaleString()}</div>
                    </div>
                    <div className="text-sm font-medium text-gray-900">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(r.amount)}</div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {!loading && !error && (
          <section className="mt-8 bg-white p-4 rounded shadow">
            <h2 className="font-semibold text-gray-900">Sample Impact Summary</h2>
            <div className="mt-3 text-sm text-gray-700">
              {(() => {
                const sample = sampleRecent[0]
                if (!sample) return <p className="text-gray-600">No sample donation available.</p>
                const date = new Date(sample.date)
                const amountLabel = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(sample.amount)
                return (
                  <p>
                    Thank you for your generous gift of {amountLabel} on {date.toLocaleDateString()}. Your contribution directly supports our programs and enables immediate impact in the communities we serve. A formal receipt and a brief impact report will be sent to the donor's email address shortly.
                  </p>
                )
              })()}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
