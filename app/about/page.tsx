export const dynamic = "force-dynamic";

import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AboutPage() {
  const session = await getSession();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2 text-2xl font-bold">
              <span>donor</span>
              <span className="text-rose-400">Connect</span>
            </Link>
            <nav className="flex items-center space-x-8">
              <Link href="/about" className="hover:text-indigo-200 transition font-medium">
                Mission
              </Link>
              <Link href="/why" className="hover:text-indigo-200 transition">
                Why Us
              </Link>
              <Link href="/ai-policy" className="hover:text-indigo-200 transition">
                AI Policy
              </Link>
              {!session ? (
                <>
                  <Link
                    href="/auth/login"
                    className="px-4 py-2 border border-white hover:bg-white hover:text-indigo-600 rounded-md font-medium transition"
                  >
                    Staff Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="px-4 py-2 bg-white text-indigo-600 hover:bg-gray-100 rounded-md font-medium transition"
                  >
                    Get Started
                  </Link>
                </>
              ) : (
                <Link href="/dashboard" className="px-4 py-2 bg-white text-indigo-600 hover:bg-gray-100 rounded-md font-medium transition">
                  Dashboard
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">About DonorConnect</h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              DonorConnect addresses the critical challenge facing nonprofit organizations: understanding and optimizing donor engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">The Problem</h2>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">•</span>
                  <span>Nonprofits struggle to track and analyze donor behavior across multiple channels</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">•</span>
                  <span>Manual data entry and spreadsheets lead to errors and missed insights</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">•</span>
                  <span>Limited resources make it difficult to personalize donor engagement</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">•</span>
                  <span>Organizations lose valuable donors due to lack of targeted strategies</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Solution</h2>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">✓</span>
                  <span>Centralized donor management system with comprehensive records</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">✓</span>
                  <span>AI-powered analysis of donation patterns and donor behavior</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">✓</span>
                  <span>Personalized engagement recommendations based on data insights</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">✓</span>
                  <span>Increase donor retention and lifetime value through strategic engagement</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">👥 Donor Database</h3>
                <p className="text-gray-600">Comprehensive donor profiles with contact information, history, and engagement metrics.</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">💰 Donation Tracking</h3>
                <p className="text-gray-600">Track all donations, amounts, types, and dates in one centralized system.</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">🤖 AI Analytics</h3>
                <p className="text-gray-600">AI-powered insights and personalized recommendations for donor engagement strategies.</p>
              </div>
            </div>
          </div>
        </div>

        <footer className="py-8 border-t border-gray-200 mt-20 text-center text-gray-600">
          <p>© 2026 DonorConnect. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
