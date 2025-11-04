"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Heart, AlertCircle } from "lucide-react"

interface Case {
  _id: string
  firstName: string
  lastName: string
  requestType: string
  amountRequested: number | null
  status: string
  createdAt: string
}

export default function CasesPage() {
  const [cases, setCases] = useState<Case[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await fetch("https://rahmah-exchange-backend-production.up.railway.app/api/zakatApplicants", {
          cache: "no-store",
        })

        const result = await res.json()
        console.log("Fetched data:", result) // 

        // Handle both formats: array or object with 'data'
        const caseData = Array.isArray(result) ? result : result.data || []

        setCases(caseData)
      } catch (error) {
        console.error("Error fetching cases:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCases()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Caseworker Dashboard</h1>
          </div>
          <Link href="/staff/dashboard" className="text-gray-600 hover:text-gray-900 text-sm">
            Back to Overview
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Case Queue</h2>
          <p className="text-gray-600">Welcome, System</p>
        </div>

        {/* Loading */}
        {loading && <p className="text-gray-600">Loading cases...</p>}

        {/* No Cases */}
        {!loading && cases.length === 0 && (
          <p className="text-gray-600">No cases found.</p>
        )}

        {/* Cases List */}
        <div className="space-y-6">
          {cases.map((caseItem) => (
            <div
              key={caseItem._id}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {caseItem.firstName} {caseItem.lastName}
                  </h3>
                  <div className="flex items-center gap-4 mt-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        caseItem.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : caseItem.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {caseItem.status}
                    </span>

                    <div className="flex items-center gap-2 text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">High Priority</span>
                    </div>
                  </div>
                </div>

                <Link href={`/staff/cases/${caseItem._id}`}>
                  <button className="px-4 py-2 text-teal-600 font-medium hover:text-teal-700 transition">
                    View Case
                  </button>
                </Link>
              </div>

              {/* Case Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 pt-6 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Case ID</p>
                  <p className="font-semibold text-gray-900">
                    {caseItem._id.slice(-8)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Request Type</p>
                  <p className="font-semibold text-gray-900">
                    {caseItem.requestType || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Amount Requested</p>
                  <p className="font-semibold text-gray-900">
                    {caseItem.amountRequested
                      ? `$${caseItem.amountRequested}`
                      : "Not specified"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Submitted</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(caseItem.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
