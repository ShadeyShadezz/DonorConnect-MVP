import { getSession } from "@/lib/auth";
import Link from "next/link";

export default async function WhyPage() {
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
              <Link href="/about" className="hover:text-indigo-200 transition">
                Mission
              </Link>
              <Link href="/why" className="hover:text-indigo-200 transition font-medium">
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
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Why DonorConnect?</h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Discover why nonprofit organizations are choosing DonorConnect to revolutionize their donor management strategy.
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">📊 Data-Driven Decisions</h2>
              <p className="text-gray-600 mb-4">
                Stop relying on intuition and spreadsheets. DonorConnect provides actionable insights based on comprehensive donor data analysis. Make informed decisions about which donors to cultivate, when to reach out, and what messaging resonates most.
              </p>
              <p className="text-gray-600">
                Our AI analyzes giving patterns, frequency, and amount trends to predict future behavior and recommend optimal engagement strategies.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">💼 Save Time & Resources</h2>
              <p className="text-gray-600 mb-4">
                Reduce manual data entry and focus on what matters: building relationships with donors. DonorConnect automates the tracking and analysis so your team can spend more time on engagement.
              </p>
              <p className="text-gray-600">
                Average organizations spend 15+ hours per week on manual donor management. Imagine what you could do with that time back.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Personalized Engagement</h2>
              <p className="text-gray-600 mb-4">
                Every donor is unique. DonorConnect helps you understand what motivates each donor and provides personalized recommendations for engagement. From timing to messaging to channel selection, get specific suggestions.
              </p>
              <p className="text-gray-600">
                Personalized engagement increases donor retention by up to 35% and lifetime value by over 25%.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">📈 Increase Fundraising Impact</h2>
              <p className="text-gray-600 mb-4">
                Data shows that organizations using AI-driven donor insights see an average increase of 23% in donation revenue within the first year. By understanding your donors better, you can:
              </p>
              <ul className="space-y-2 text-gray-600 ml-6">
                <li>• Identify high-value donor prospects</li>
                <li>• Reduce donor attrition and lapsed giving</li>
                <li>• Increase average donation size through targeted cultivation</li>
                <li>• Maximize ROI on fundraising campaigns</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">🔒 Secure & Compliant</h2>
              <p className="text-gray-600 mb-4">
                Your donor data is sensitive. DonorConnect uses enterprise-grade security with encrypted databases, secure authentication, and role-based access control to ensure your data stays protected.
              </p>
              <p className="text-gray-600">
                All data is encrypted in transit and at rest, with automatic backups and compliance with data protection regulations.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">🚀 Easy to Use</h2>
              <p className="text-gray-600 mb-4">
                No complex setup or training required. DonorConnect is designed for nonprofit staff of all technical levels. Intuitive interfaces mean your team can start using it immediately.
              </p>
              <p className="text-gray-600">
                Most organizations are up and running within 24 hours of sign-up.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ready to Transform Your Donor Strategy?</h2>
            <Link
              href="/auth/register"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-lg"
            >
              Get Started Today
            </Link>
          </div>
        </div>

        <footer className="py-8 border-t border-gray-200 mt-20 text-center text-gray-600">
          <p>© 2026 DonorConnect. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
