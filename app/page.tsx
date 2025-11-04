import { Heart, Shield, Users, HeartIcon } from "lucide-react"
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-blue-50">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 text-white fill-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Rahmah Exchange</h1>
        </div>
         <Link href="/staff/login">
          <button className="px-6 py-2 text-gray-900 font-medium hover:bg-gray-100 rounded-lg transition">
            Staff Login
          </button>
        </Link>
      </header>

      {/* Hero Section */}
      <section className="px-8 py-24 max-w-7xl mx-auto w-full text-center">
        <h2 className="text-6xl font-bold text-gray-900 mb-8 text-balance">Mercy-Based Giving Network</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 text-balance leading-relaxed">
          A secure and compassionate platform connecting those in need with mercy-based support. Empowering
          organizations to review and respond to assistance requests with dignity and respect.
        </p>
            <Link href="/form">
        <button className="px-8 py-3 bg-teal-600 text-white rounded-full font-semibold hover:bg-teal-700 transition inline-flex items-center gap-2 text-lg">
          Apply for Assistance
          <span>→</span>
        </button>
      </Link>
      </section>

      {/* Features Section */}
      <section className="px-8 py-24 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature Card 1 */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Shield className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Secure and Private</h3>
            <p className="text-gray-600 leading-relaxed">
              Your information is protected with enterprise-grade security. All data is encrypted and handled with the
              utmost confidentiality.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Simple Process</h3>
            <p className="text-gray-600 leading-relaxed">
              Easy step-by-step application in multiple languages. Track your application status and receive updates
              throughout the process.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition">
            <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <HeartIcon className="w-8 h-8 text-cyan-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Compassionate Care</h3>
            <p className="text-gray-600 leading-relaxed">
              Our dedicated team reviews each application with care and respect, ensuring fair and timely assistance for
              eligible applicants.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-12 bg-gradient-to-b from-blue-50 to-teal-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto w-full text-center text-gray-600">
          <p>2025 Rahmah Exchange. Mercy-based giving network for verified need.</p>
        </div>
      </footer>
    </div>
  )
}
