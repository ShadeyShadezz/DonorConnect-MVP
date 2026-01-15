import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">403</h1>
        <p className="mt-2 text-lg text-gray-600">
          Unauthorized Access
        </p>
        <p className="mt-2 text-sm text-gray-600">
          You don&apos;t have permission to access this resource.
        </p>
        <Link
          href="/dashboard"
          className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
