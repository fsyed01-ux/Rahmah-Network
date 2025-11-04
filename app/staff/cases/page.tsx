"use client"

import Link from "next/link"
import { Heart, AlertCircle } from "lucide-react"

interface Case {
  id: string
  applicantName: string
  caseId: string
  status: string
  statusColor: string
  priority: string
  requestType: string
  amount: string
  submittedDate?: string
}

export default function CasesPage() {
  const cases: Case[] = [
    {
      id: "1",
      applicantName: "Ahmed Khan",
      caseId: "6f806763",
      status: "Need Info",
      statusColor: "bg-yellow-100 text-yellow-800",
      priority: "high",
      requestType: "Zakat",
      amount: "$3000",
    },
    {
      id: "2",
      applicantName: "Faizan Syed",
      caseId: "1cc2b300",
      status: "Ready for Approval",
      statusColor: "bg-purple-100 text-purple-800",
      priority: "high",
      requestType: "N/A",
      amount: "$2500",
      submittedDate: "10/10/2025",
    },
  ]

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

        {/* Cases List */}
        <div className="space-y-6">
          {cases.map((caseItem) => (
            <div key={caseItem.id} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{caseItem.applicantName}</h3>
                  <div className="flex items-center gap-4 mt-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${caseItem.statusColor}`}>
                      {caseItem.status}
                    </span>
                    {caseItem.priority === "high" && (
                      <div className="flex items-center gap-2 text-red-600">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">High Priority</span>
                      </div>
                    )}
                  </div>
                </div>
                <Link href={`/staff/cases/${caseItem.id}`}>
                  <button className="px-4 py-2 text-teal-600 font-medium hover:text-teal-700 transition">
                    View Case
                  </button>
                </Link>
              </div>

              {/* Case Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 pt-6 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Case ID</p>
                  <p className="font-semibold text-gray-900">{caseItem.caseId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Request Type</p>
                  <p className="font-semibold text-gray-900">{caseItem.requestType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Amount Requested</p>
                  <p className="font-semibold text-gray-900">{caseItem.amount}</p>
                </div>
                {caseItem.submittedDate && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Submitted</p>
                    <p className="font-semibold text-gray-900">{caseItem.submittedDate}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
