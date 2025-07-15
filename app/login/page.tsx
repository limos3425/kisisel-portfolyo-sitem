import AuthForm from "./auth-form"

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-white">Admin Paneli Girişi</h1>
        <AuthForm />
      </div>
    </div>
  )
}
