import { getSession } from "@/lib/auth";
import Link from "next/link";

export default async function ReflectionPage() {
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
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Project Reflection</h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Insights, learnings, and considerations from the development of DonorConnect.
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Project Goals</h2>
              <p className="text-gray-600 mb-4">
                DonorConnect was built with three primary objectives:
              </p>
              <ol className="space-y-3 text-gray-600 ml-6">
                <li><strong>1. Simplify Donor Management</strong> - Create an intuitive, centralized system for nonprofit staff to manage donor information and donations without technical expertise.</li>
                <li><strong>2. Leverage AI for Insights</strong> - Integrate advanced AI to analyze donor patterns and provide actionable recommendations that improve fundraising effectiveness.</li>
                <li><strong>3. Maximize Social Impact</strong> - Enable nonprofit organizations to allocate more resources to their missions by saving time on administrative tasks and improving donor retention.</li>
              </ol>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">🏗️ Technical Architecture Decisions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Next.js 14 with App Router</h3>
                  <p className="text-gray-600 mb-2">
                    Chose Next.js for its seamless integration of frontend and backend, server-side rendering capabilities, and excellent developer experience. The App Router provides a modern file-based routing system.
                  </p>
                  <p className="text-sm text-gray-500">Trade-off: Learning curve for newer patterns, but benefits from faster performance and better maintainability.</p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Neon PostgreSQL</h3>
                  <p className="text-gray-600 mb-2">
                    Selected Neon for its serverless PostgreSQL offering, automatic scaling, and excellent Vercel integration. Provides enterprise-grade database without infrastructure management.
                  </p>
                  <p className="text-sm text-gray-500">Trade-off: Vendor lock-in with Neon, but eliminated operational overhead.</p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Prisma ORM</h3>
                  <p className="text-gray-600 mb-2">
                    Prisma provides type-safe database access, automatic migration management, and excellent TypeScript support. The schema is self-documenting and migrations are version-controlled.
                  </p>
                  <p className="text-sm text-gray-500">Trade-off: Additional abstraction layer, but eliminates SQL errors and improves productivity.</p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-2">NextAuth.js for Authentication</h3>
                  <p className="text-gray-600 mb-2">
                    NextAuth provides secure authentication with JWT sessions, easy integration with Next.js, and built-in protection against common vulnerabilities.
                  </p>
                  <p className="text-sm text-gray-500">Trade-off: Learning curve for OAuth flows, but provides enterprise-grade security out of the box.</p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Claude AI for Insights</h3>
                  <p className="text-gray-600 mb-2">
                    Selected Claude for its reasoning capabilities, alignment with safety considerations, and effectiveness at understanding nonprofit context. Provides nuanced analysis tailored to donor engagement.
                  </p>
                  <p className="text-sm text-gray-500">Trade-off: API costs scale with usage, but provides better quality insights than statistical models alone.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">💭 Key Learnings</h2>
              <div className="space-y-4 text-gray-600">
                <div className="border-l-4 border-blue-600 pl-4">
                  <p><strong>User-Centric Design Matters:</strong> The most important feature is not the most technically impressive - it's the one that saves staff time and directly serves user needs. Simple donor search is more valuable than complex analytics.</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <p><strong>AI as Assistant, Not Replacement:</strong> Staff expertise is irreplaceable. AI is most effective when it augments human decision-making with data insights, not when it tries to replace human judgment about donor relationships.</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <p><strong>Data Quality is Critical:</strong> Garbage in, garbage out. The quality of AI insights depends entirely on data quality. Investment in clean data upfront pays dividends in analysis accuracy.</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <p><strong>Simplicity Scales Better:</strong> Complex features add maintenance burden. Simple, focused features that work reliably are better than ambitious features with edge cases and bugs.</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <p><strong>Security is Not Optional:</strong> In a nonprofit context, protecting donor information is a trust issue. Investing in security best practices is essential, not optional.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">🤔 Ethical Considerations</h2>
              <div className="space-y-4 text-gray-600">
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Privacy & Consent</h3>
                  <p>Nonprofit donors entrust organizations with sensitive personal information. DonorConnect implements strict privacy controls, never shares donor data without explicit consent, and provides organizations tools to respect donor preferences.</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Bias & Fairness</h3>
                  <p>AI can inadvertently perpetuate or amplify existing biases. DonorConnect is designed to analyze behavior, not make demographic assumptions. Recommendations are presented as suggestions, requiring human review and judgment.</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Informed Use</h3>
                  <p>Organizations must understand how AI works and its limitations. DonorConnect includes comprehensive documentation on AI decision-making, bias prevention, and proper usage to ensure responsible implementation.</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Social Impact</h3>
                  <p>The ultimate goal is to improve nonprofit effectiveness and mission impact. If DonorConnect helps organizations raise more funds to serve more people, it succeeds regardless of technological sophistication.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">🚀 Future Directions</h2>
              <p className="text-gray-600 mb-4">
                Potential enhancements to DonorConnect:
              </p>
              <ul className="space-y-2 text-gray-600 ml-6">
                <li>• <strong>Volunteer Management:</strong> Extend platform to track volunteer involvement and engagement</li>
                <li>• <strong>Campaign Management:</strong> Tools for organizing fundraising campaigns and tracking performance</li>
                <li>• <strong>API Integrations:</strong> Connect with popular nonprofit tools (Salesforce NPO Cloud, DonorChoice, etc.)</li>
                <li>• <strong>Advanced Analytics:</strong> More sophisticated dashboards and reporting capabilities</li>
                <li>• <strong>Mobile App:</strong> On-the-go access to donor information and engagement tools</li>
                <li>• <strong>Event Management:</strong> Track donor attendance and engagement at nonprofit events</li>
                <li>• <strong>Planned Giving:</strong> Tools for managing major gifts and planned giving relationships</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 Resources & References</h2>
              <div className="space-y-3 text-gray-600">
                <p><strong>For Nonprofit Leaders:</strong> The AFP Code of Ethical Principles provides guidance on responsible donor management and ethical fundraising practices.</p>
                <p><strong>For Technologists:</strong> The Partnership on AI's documentation on responsible AI development informed our approach to bias prevention and transparency.</p>
                <p><strong>For Data Privacy:</strong> GDPR, CCPA, and nonprofit-specific privacy regulations guided our data protection architecture.</p>
                <p><strong>For Product Design:</strong> Jobs to Be Done methodology helped us prioritize features that address real staff needs rather than technical features.</p>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded">
              <h3 className="text-lg font-bold text-gray-900 mb-2">What Success Looks Like</h3>
              <p className="text-gray-600">
                Success for DonorConnect isn't measured by user metrics alone - it's measured by mission impact. If DonorConnect helps a food bank serve 20% more families, or enables a youth program to reach more underserved communities, then it's working. That's what matters.
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
