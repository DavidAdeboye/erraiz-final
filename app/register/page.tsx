import Link from "next/link"
import RegisterForm from "./register-form"

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Create an Account</h1>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <RegisterForm />

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-green-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
