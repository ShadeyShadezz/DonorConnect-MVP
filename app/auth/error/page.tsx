import Link from "next/link";

function friendlyMessage(code: string | null) {
  switch (code) {
    case "CredentialsSignin":
    case "Credentials":
      return "Invalid email or password. Please try again.";
    case "OAuthAccountNotLinked":
      return "This account is linked with a different sign-in method.";
    case "AccessDenied":
      return "Access denied. You don't have permission to sign in.";
    case "Verification":
      return "Verification failed. Check your email for instructions.";
    case "Configuration":
      return "Authentication configuration error. Contact the administrator.";
    default:
      return "An error occurred during sign in. Please try again.";
  }
}

export default async function AuthErrorPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;
  const code = params?.error ?? null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Sign-in Error</h1>
        <p className="text-gray-700 mb-6">{friendlyMessage(code)}</p>

        <div className="flex space-x-3">
          <Link
            href="/auth/login"
            className="flex-1 text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Sign In
          </Link>

          <Link
            href="/auth/register"
            className="flex-1 text-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Create Account
          </Link>
        </div>

        <p className="text-xs text-gray-400 mt-4">Error code: {code ?? "unknown"}</p>
      </div>
    </div>
  );
}
