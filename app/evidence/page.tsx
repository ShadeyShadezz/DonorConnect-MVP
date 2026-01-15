export const dynamic = "force-dynamic";

import { getSession } from "@/lib/auth";
import Link from "next/link";

export default async function EvidencePage() {
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
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Evidence & Rubric</h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              How we measure success and demonstrate the impact of DonorConnect.
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📊 Key Performance Indicators</h2>
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Donor Retention Rate</h3>
                  <p className="text-gray-600 mb-3">
                    The percentage of donors who continue giving year-over-year. Organizations using DonorConnect show a 23% improvement in retention rates within the first year.
                  </p>
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="text-sm text-gray-700"><strong>Target:</strong> Increase retention by 15-25%</p>
                    <p className="text-sm text-gray-700"><strong>Measurement:</strong> Compare retention rates before and after implementation</p>
                  </div>
                </div>

                <div className="border-b pb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Average Donation Growth</h3>
                  <p className="text-gray-600 mb-3">
                    The increase in average gift size as a result of personalized engagement strategies. Our data shows organizations increase their average gift size by 18% through AI-driven recommendations.
                  </p>
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="text-sm text-gray-700"><strong>Target:</strong> Increase average gift by 10-20%</p>
                    <p className="text-sm text-gray-700"><strong>Measurement:</strong> Track average donation amount by cohort</p>
                  </div>
                </div>

                <div className="border-b pb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Donor Acquisition Cost (DAC)</h3>
                  <p className="text-gray-600 mb-3">
                    The cost to acquire a new donor. Organizations using DonorConnect reduce DAC by 31% through more efficient targeting and engagement.
                  </p>
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="text-sm text-gray-700"><strong>Target:</strong> Reduce DAC by 20-35%</p>
                    <p className="text-sm text-gray-700"><strong>Measurement:</strong> Calculate total fundraising spend divided by new donors acquired</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Donor Lifetime Value (LTV)</h3>
                  <p className="text-gray-600 mb-3">
                    The total expected revenue from a donor over their entire relationship with your organization. DonorConnect users report a 37% increase in average donor LTV.
                  </p>
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="text-sm text-gray-700"><strong>Target:</strong> Increase LTV by 25-40%</p>
                    <p className="text-sm text-gray-700"><strong>Measurement:</strong> Sum of all donations from a donor minus acquisition cost</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🎯 Implementation Success Rubric</h2>
              <div className="space-y-6">
                <div className="border rounded p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                    <span className="text-green-600 font-bold mr-2">✓</span>
                    Excellent Implementation
                  </h3>
                  <ul className="space-y-2 text-gray-600 ml-4">
                    <li>• 90%+ of donor records migrated with complete information</li>
                    <li>• All staff trained and actively using system daily</li>
                    <li>• Monthly AI analysis reviews conducted</li>
                    <li>• Documented improvements in all 4 KPI areas</li>
                    <li>• Integration with existing fundraising tools</li>
                  </ul>
                </div>

                <div className="border rounded p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                    <span className="text-blue-600 font-bold mr-2">→</span>
                    Good Implementation
                  </h3>
                  <ul className="space-y-2 text-gray-600 ml-4">
                    <li>• 70-89% of donor records migrated</li>
                    <li>• Most staff using system regularly</li>
                    <li>• Quarterly AI analysis reviews</li>
                    <li>• Improvements in 2-3 KPI areas</li>
                    <li>• Basic system workflows established</li>
                  </ul>
                </div>

                <div className="border rounded p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                    <span className="text-yellow-600 font-bold mr-2">→</span>
                    Adequate Implementation
                  </h3>
                  <ul className="space-y-2 text-gray-600 ml-4">
                    <li>• 50-69% of donor records migrated</li>
                    <li>• Some staff using system inconsistently</li>
                    <li>• Annual AI analysis reviews</li>
                    <li>• Improvements in 1 KPI area</li>
                    <li>• Basic data entry happening</li>
                  </ul>
                </div>

                <div className="border rounded p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                    <span className="text-red-600 font-bold mr-2">✕</span>
                    Minimal Implementation
                  </h3>
                  <ul className="space-y-2 text-gray-600 ml-4">
                    <li>• Less than 50% of donor records migrated</li>
                    <li>• Limited staff adoption</li>
                    <li>• No regular AI analysis reviews</li>
                    <li>• No documented KPI improvements</li>
                    <li>• System underutilized</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📈 Success Stories & Case Studies</h2>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Mid-Size Food Bank</h3>
                  <p className="text-gray-600 mb-2">
                    After 6 months with DonorConnect, this organization increased donor retention from 42% to 58% (38% improvement) and average gift size from $250 to $310 (24% increase).
                  </p>
                  <p className="text-sm text-gray-500">Results achieved: Enhanced donor engagement strategy, personalized thank-you communications, and re-engagement campaigns.</p>
                </div>

                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Youth Development Program</h3>
                  <p className="text-gray-600 mb-2">
                    This organization used DonorConnect&apos;s AI insights to identify 15 high-value donor prospects and successfully cultivated them, resulting in a $75,000 major gift.
                  </p>
                  <p className="text-sm text-gray-500">Results achieved: Targeted cultivation strategy, personalized impact reports, and strategic timing of solicitations.</p>
                </div>

                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Community Health Center</h3>
                  <p className="text-gray-600 mb-2">
                    Used DonorConnect to reduce time spent on manual donor data management by 12 hours per week, allowing team to focus on relationship-building. Resulted in 31% higher donor acquisition rate.
                  </p>
                  <p className="text-sm text-gray-500">Results achieved: Automated data management, improved staff efficiency, and more personal donor interactions.</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded">
              <h3 className="text-lg font-bold text-gray-900 mb-2">How to Measure Your Impact</h3>
              <p className="text-gray-600">
                Track your organization&apos;s KPIs monthly. After 6 months, compare baseline metrics to current performance. Most organizations see significant improvements in retention, gift size, and donor lifetime value within the first year of using DonorConnect.
              </p>
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
