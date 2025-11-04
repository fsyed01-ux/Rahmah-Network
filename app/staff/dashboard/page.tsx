"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckCircle2, TrendingUp, DollarSign, FileText } from "lucide-react"
import { Heart } from "lucide-react"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showSuccess, setShowSuccess] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            Logout
          </Link>
        </div>
      </header>

      {/* Success Banner */}
      {showSuccess && (
        <div className="bg-green-50 border-b border-green-200 px-8 py-4 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3 text-green-700">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-medium">Login successful!</span>
            <button onClick={() => setShowSuccess(false)} className="ml-auto text-green-700 hover:text-green-900">
              ×
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Tabs */}
        <div className="flex gap-8 mb-12 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("overview")}
            className={`pb-4 font-semibold transition ${
              activeTab === "overview" ? "text-teal-600 border-b-2 border-teal-600" : "text-gray-600"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`pb-4 font-semibold transition ${
              activeTab === "users" ? "text-teal-600 border-b-2 border-teal-600" : "text-gray-600"
            }`}
          >
            User Management
          </button>
        </div>

        {activeTab === "overview" && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-8">Welcome, System</h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {/* Total Applications */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-600 font-medium">Total Applications</h3>
                  <FileText className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-4xl font-bold text-gray-900">6</p>
              </div>

              {/* New Submissions */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-600 font-medium">New Submissions</h3>
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-4xl font-bold text-blue-600">1</p>
              </div>

              {/* Approved */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-600 font-medium">Approved</h3>
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-4xl font-bold text-green-600">0</p>
              </div>

              {/* Total Disbursed */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-600 font-medium">Total Disbursed</h3>
                  <DollarSign className="w-5 h-5 text-teal-600" />
                </div>
                <p className="text-4xl font-bold text-teal-600">$6000.00</p>
              </div>
            </div>

            {/* Application Status and Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Application Status Breakdown */}
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-8">Application Status Breakdown</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Submitted</span>
                    <span className="text-lg font-semibold text-blue-600">1</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">In Review</span>
                    <span className="text-lg font-semibold text-gray-400">0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Approved</span>
                    <span className="text-lg font-semibold text-green-600">0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Rejected</span>
                    <span className="text-lg font-semibold text-gray-400">0</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-8">Quick Actions</h3>
                <div className="space-y-4">
                  <Link href="/staff/cases">
                    <button className="w-full px-6 py-3 border border-gray-300 rounded-lg text-gray-900 font-medium hover:bg-gray-50 transition text-left flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gray-600" />
                      View All Cases
                    </button>
                  </Link>
                  <button className="w-full px-6 py-3 border border-gray-300 rounded-lg text-gray-900 font-medium hover:bg-gray-50 transition text-left flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-gray-600" />
                    Pending Approvals
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">User Management</h2>
            <p className="text-gray-600 mt-4">User management features coming soon...</p>
          </div>
        )}
      </div>
    </div>
  )
}
