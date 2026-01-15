export const dynamic = "force-dynamic";

import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

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
              <Link
                href="/auth/register"
                className="px-4 py-2 bg-rose-500 hover:bg-rose-600 rounded-md font-medium transition"
              >
                Donate
              </Link>
              <Link
                href="/auth/register"
                className="px-4 py-2 bg-white text-indigo-600 hover:bg-gray-100 rounded-md font-medium transition"
              >
                Volunteer Sign Up
              </Link>
              <Link
                href="/auth/login"
                className="px-4 py-2 border border-white hover:bg-white hover:text-indigo-600 rounded-md font-medium transition"
              >
                Staff Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-20 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-indigo-600">donor</span><span className="text-indigo-600">Connect</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Connecting generous donors with meaningful causes to create positive change.
          </p>
          <Link
            href="/auth/register"
            className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition text-lg"
          >
            Start Donating
          </Link>
        </section>

        <section className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Make an Impact</h3>
              <p className="text-gray-600">
                Your donations directly support verified causes that make a real difference in communities.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Transparent Process</h3>
              <p className="text-gray-600">
                Track exactly where your contributions go with real-time updates and detailed reporting.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Community Focused</h3>
              <p className="text-gray-600">
                Support local initiatives in your area and connect with like-minded donors and causes.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-400 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-white mb-4">Learning Center</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:text-white transition">About DonorConnect</Link></li>
                <li><Link href="/why" className="hover:text-white transition">Why DonorConnect</Link></li>
                <li><Link href="/evidence" className="hover:text-white transition">Evidence & Results</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Transparency</h3>
              <ul className="space-y-2">
                <li><Link href="/ai-policy" className="hover:text-white transition">AI Policy & Safeguards</Link></li>
                <li><Link href="/reflection" className="hover:text-white transition">Project Reflection</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Get Started</h3>
              <ul className="space-y-2">
                <li><Link href="/auth/login" className="hover:text-white transition">Staff Login</Link></li>
                <li><Link href="/auth/register" className="hover:text-white transition">Create Account</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p>© 2026 donorConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
