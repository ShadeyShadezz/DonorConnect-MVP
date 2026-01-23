import Link from "next/link";

export const metadata = {
  title: "DonorConnect — Auth",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-gray-900 hover:text-blue-600">
              ← DonorConnect
            </Link>
            <div className="space-x-4">
              <Link href="/auth/login" className="text-sm text-gray-600 hover:text-blue-600">
                Sign in
              </Link>
              <Link href="/auth/register" className="text-sm text-blue-600 font-medium hover:underline">
                Create account
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
