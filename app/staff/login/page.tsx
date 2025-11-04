"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Heart } from "lucide-react"
import { useRouter } from "next/navigation"

export default function StaffLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password) {
      router.push("/staff/dashboard")
    } else {
      setError("Please enter both email and password")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-blue-50 flex flex-col">
      {/* Header */}
      <header className="px-8 py-6">
        <Link href="/" className="text-gray-900 font-medium hover:text-gray-600 flex items-center gap-2">
          <span>←</span> Back to Home
        </Link>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Logo and Title */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Rahmah Exchange</h1>
            </div>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Staff Login</h2>
            <p className="text-gray-600 mb-8">Access the case management system</p>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="staff@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                />
              </div>

              {/* Error Message */}
              {error && <p className="text-red-600 text-sm">{error}</p>}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition"
              >
                Log In
              </button>
            </form>

            {/* Footer Text */}
            <p className="text-center text-gray-600 text-sm mt-8">
              Need access? Contact your administrator to create an account.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
