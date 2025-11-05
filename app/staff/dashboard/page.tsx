"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { CheckCircle2, TrendingUp, DollarSign, FileText, Heart } from "lucide-react"

type ZakatApplicant = {
  id?: string | number
  status?: string
  createdAt?: string
  normalizedStatus?: string
  [key: string]: any
}

type StatCardProps = {
  title: string
  value: string | number
  icon: React.ReactNode
  color?: string
}

type StatusRowProps = {
  label: string
  value: number
  color: string
}

export default function DashboardPage() {
  const [activeTab, ] = useState("overview")
  // const [showSuccess, ] = useState(true)
  const [applicants, setApplicants] = useState<ZakatApplicant[]>([])
  const [totalFromAPI, setTotalFromAPI] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [showDebug,] = useState(false)

  const normalizeStatus = (status?: string) => {
    return (status || "")
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ")
  }

  // fetch applicants and attach a normalized status for reliable counting
 useEffect(() => {
  const fetchApplicants = async () => {
    try {
      const res = await fetch("https://rahmah-exchange-backend-production.up.railway.app/api/zakatApplicants")
      const json = await res.json()

      // ✅ FIX: handle API shape properly
      const dataArray: any[] =
        Array.isArray(json)
          ? json
          : json.items || json.data || []

      const normalizedArray: ZakatApplicant[] = dataArray.map((a) => ({
        ...a,
        normalizedStatus: normalizeStatus(a?.status),
      }))

      setApplicants(normalizedArray)

      if (typeof json.total === "number") {
        setTotalFromAPI(json.total)
      } else if (typeof json.totalCount === "number") {
        setTotalFromAPI(json.totalCount)
      } else {
        // ✅ fallback if total isn’t given
        setTotalFromAPI(normalizedArray.length)
      }
    } catch (error) {
      console.error("Error fetching applicants:", error)
      setApplicants([])
    } finally {
      setLoading(false)
    }
  }

  fetchApplicants()
}, [])

  // counts - use the precomputed normalizedStatus for exact matching
  const approvedCount = applicants.filter((app) => app.normalizedStatus === "approved").length
  const submittedCount = applicants.filter((app) => app.normalizedStatus === "submitted").length
  const pendingCount = applicants.filter((app) => app.normalizedStatus === "pending").length
  const rejectedCount = applicants.filter((app) => app.normalizedStatus === "rejected").length

  // Today's submissions (robust date handling)
  const todayISO = new Date().toISOString().split("T")[0]
  const todaysSubmissions = applicants.filter((app) => {
    if (!app.createdAt) return false
    try {
      const createdISO = new Date(app.createdAt).toISOString().split("T")[0]
      return createdISO === todayISO
    } catch (e) {
      // fallback: string comparison if the field is already a date-only string
      return app.createdAt?.toString().startsWith(todayISO)
    }
  }).length

  // unique statuses (normalized, capitalized for display)
  const uniqueStatuses = [...new Set(applicants.map((a) => a.normalizedStatus || ""))]
    .filter(Boolean)
    .sort()
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))

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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        {activeTab === "overview" && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-8">Welcome, To Admin Dashboard</h2>

            {loading ? (
              <p className="text-gray-600">...</p>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  <StatCard title="Total Applications" value={totalFromAPI ?? applicants.length} icon={<FileText className="w-5 h-5 text-gray-400" />} />

                  <StatCard
                    title="New Submissions"
                    value={todaysSubmissions}
                    color="text-blue-600"
                    icon={<TrendingUp className="w-5 h-5 text-blue-600" />}
                  />

                  <StatCard
                    title="Approved"
                    value={approvedCount}
                    color="text-green-600"
                    icon={<CheckCircle2 className="w-5 h-5 text-green-600" />}
                  />

                  <StatCard
                    title="Total Disbursed"
                    value={"$0.00"}
                    color="text-teal-600"
                    icon={<DollarSign className="w-5 h-5 text-teal-600" />}
                  />
                </div>

                {/* Application Status Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white rounded-lg p-8 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-8">Application Status Breakdown</h3>
                    <div className="space-y-6">
                      <StatusRow label="Submitted" value={submittedCount} color="text-blue-600" />
                      <StatusRow label="Pending" value={pendingCount} color="text-gray-400" />
                      <StatusRow label="Approved" value={approvedCount} color="text-green-600" />
                      <StatusRow label="Rejected" value={rejectedCount} color="text-gray-400" />
                    </div>

                    {showDebug && (
                      <div className="mt-6 text-sm text-gray-600">
                        <div>Unique statuses: {uniqueStatuses.join(", ")}</div>
                        <div>Total raw applicants: {applicants.length}</div>
                      </div>
                    )}
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
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ title, value, icon, color = "text-gray-900" }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 font-medium">{title}</h3>
        {icon}
      </div>
      <p className={`text-4xl font-bold ${color}`}>{value}</p>
    </div>
  )
}

function StatusRow({ label, value, color }: StatusRowProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-700">{label}</span>
      <span className={`text-lg font-semibold ${color}`}>{value}</span>
    </div>
  )
}
