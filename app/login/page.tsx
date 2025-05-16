import Link from "next/link"
import LoginForm from "./login-form"

export default function LoginPage({
  searchParams,
}: {
  searchParams: { redirect?: string; error?: string }
}) {
  const redirectTo = searchParams.redirect || "/account"
  const error = searchParams.error

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6" role="alert">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <LoginForm redirectTo={redirectTo} />

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/register" className="text-green-600 hover:underline">
                Register
              </Link>
            </p>
            <Link href="/forgot-password" className="text-sm text-green-600 hover:underline">
              Forgot your password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
