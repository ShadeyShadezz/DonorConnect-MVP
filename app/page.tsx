import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center py-6">
          <h1 className="text-2xl font-bold text-gray-900">DonorConnect</h1>
          <div className="space-x-4">
            <Link
              href="/auth/login"
              className="inline-block px-6 py-2 text-gray-900 hover:text-gray-700"
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Get Started
            </Link>
          </div>
        </nav>

        <div className="py-20">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Donor Management Made Easy
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              DonorConnect is a modern platform for managing donors, tracking donations,
              and using AI to gain insights into donor engagement patterns and suggest
              personalized engagement strategies.
            </p>

            <div className="space-x-4">
              <Link
                href="/auth/register"
                className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Create Staff Account
              </Link>
              <Link
                href="/auth/login"
                className="inline-block px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium"
              >
                Sign In
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 mt-20 sm:grid-cols-3">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Donor Management</h3>
              <p className="text-gray-600">
                Easily manage and organize donor information with a comprehensive database.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Donation Tracking</h3>
              <p className="text-gray-600">
                Track all donations with detailed records and analytics.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">AI Insights</h3>
              <p className="text-gray-600">
                Get AI-powered analysis and personalized engagement recommendations.
              </p>
            </div>
          </div>
        </div>

        <footer className="py-8 border-t border-gray-200 mt-20 text-center text-gray-600">
          <p>© 2024 DonorConnect. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
