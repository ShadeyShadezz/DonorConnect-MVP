export const dynamic = "force-dynamic";

import { getSession } from "@/lib/auth";
import Link from "next/link";

export default async function AIPolicyPage() {
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
              <Link href="/ai-policy" className="hover:text-indigo-200 transition font-medium">
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
            <h1 className="text-4xl font-bold text-gray-900 mb-6">AI Policy & Safeguards</h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              DonorConnect is committed to responsible, ethical, and transparent use of artificial intelligence.
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">🤖 AI Usage in DonorConnect</h2>
              <p className="text-gray-600 mb-4">
                DonorConnect uses Claude AI, an advanced language model, to analyze donor data and provide insights. Our AI implementation is designed specifically for nonprofit donor analysis with the following capabilities:
              </p>
              <ul className="space-y-2 text-gray-600 ml-6">
                <li>• <strong>Pattern Recognition:</strong> Identifies trends in donation behavior and donor engagement</li>
                <li>• <strong>Predictive Analytics:</strong> Forecasts donor lifetime value and churn risk</li>
                <li>• <strong>Personalized Recommendations:</strong> Suggests tailored engagement strategies for each donor</li>
                <li>• <strong>Natural Language Analysis:</strong> Extracts insights from donor notes and interaction history</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">🔒 Data Privacy & Security</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong>Data Minimization:</strong> We only send essential donor data to the AI model - never sensitive personal information like social security numbers, financial account details, or health information.
                </p>
                <p>
                  <strong>Encryption:</strong> All data in transit and at rest is encrypted using industry-standard protocols (TLS 1.3, AES-256).
                </p>
                <p>
                  <strong>Access Control:</strong> Only authenticated staff members can access donor data, with role-based permissions.
                </p>
                <p>
                  <strong>No Training Data Reuse:</strong> Your donor data is never used to train or improve the AI model. All API calls are stateless.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">⚖️ Bias Prevention & Fairness</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong>Regular Audits:</strong> We regularly audit AI outputs for bias and fairness across different donor demographics.
                </p>
                <p>
                  <strong>Explainability:</strong> All AI recommendations include clear explanations of the reasoning behind the suggestion, so staff can verify accuracy.
                </p>
                <p>
                  <strong>Human Review:</strong> AI recommendations are always presented as suggestions. Staff members make final decisions on donor engagement strategy.
                </p>
                <p>
                  <strong>Diverse Training:</strong> Claude AI was trained on diverse sources to minimize cultural and demographic bias.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">✅ Quality & Accuracy Standards</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong>Accuracy Monitoring:</strong> We track the accuracy of AI insights and continuously improve our prompts and analysis methods.
                </p>
                <p>
                  <strong>Context Awareness:</strong> AI recommendations consider the full context of each donor relationship, not just statistical patterns.
                </p>
                <p>
                  <strong>Validation:</strong> Users can provide feedback on recommendations, which helps us improve future analysis.
                </p>
                <p>
                  <strong>Transparency:</strong> We clearly indicate confidence levels in recommendations and highlight when additional human review is recommended.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">🙅 What AI Cannot & Should Not Do</h2>
              <p className="text-gray-600 mb-4">
                Our AI is explicitly designed NOT to:
              </p>
              <ul className="space-y-2 text-gray-600 ml-6">
                <li>• Make final decisions on donor management or funding eligibility</li>
                <li>• Replace professional judgment or fundraising expertise</li>
                <li>• Discriminate based on protected characteristics (race, religion, disability, etc.)</li>
                <li>• Generate unsolicited communications to donors</li>
                <li>• Predict or infer sensitive personal information</li>
                <li>• Override donor preferences or opt-out requests</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">📋 Compliance & Regulations</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong>GDPR Compliance:</strong> We comply with GDPR requirements for data processing, including data subject rights and consent.
                </p>
                <p>
                  <strong>CCPA Compliance:</strong> California residents&apos; privacy rights are fully protected.
                </p>
                <p>
                  <strong>FERPA Compliance:</strong> If your organization handles student data, we maintain strict separation and security.
                </p>
                <p>
                  <strong>Nonprofit Standards:</strong> Our practices align with the National Council of Nonprofits and AFP (Association of Fundraising Professionals) ethical standards.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">🔄 Continuous Improvement</h2>
              <p className="text-gray-600">
                We continuously review and improve our AI policies as the technology and regulatory landscape evolve. Our advisory board includes nonprofit leaders, data ethicists, and privacy experts who provide ongoing guidance.
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Questions About Our AI Policy?</h3>
              <p className="text-gray-600">
                We welcome questions and feedback about our AI practices. Please contact our team at support@donorconnect.ai with any concerns or requests.
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
