"use client"

import Link from "next/link"
import { ArrowLeft, Shield, Users, AlertTriangle, CheckCircle } from "lucide-react"
import Footer from "@/components/footer"
import NavBar from "@/components/navBar"

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="container mx-auto px-4 py-16 mt-16">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="text-emerald-600 hover:underline flex items-center gap-2 mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          
          <h1 className="text-3xl font-bold mb-8">Community Guidelines</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <p className="text-gray-700 mb-8">
              At FixTogether, we're building a community dedicated to improving local neighborhoods through collaboration. 
              To ensure a positive experience for everyone, we ask all users to follow these guidelines.
            </p>
            
            <div className="space-y-10">
              <div>
                <div className="flex items-center mb-4">
                  <Shield className="h-6 w-6 text-emerald-600 mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-800">Respectful Communication</h2>
                </div>
                <ul className="list-disc pl-10 space-y-2 text-gray-700">
                  <li>Treat all community members with respect and courtesy</li>
                  <li>Avoid offensive language, personal attacks, or harassment</li>
                  <li>Be constructive in your feedback and comments</li>
                  <li>Listen to different perspectives and engage in good-faith discussions</li>
                </ul>
              </div>
              
              <div>
                <div className="flex items-center mb-4">
                  <Users className="h-6 w-6 text-emerald-600 mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-800">Issue Reporting</h2>
                </div>
                <ul className="list-disc pl-10 space-y-2 text-gray-700">
                  <li>Report only genuine community issues that need attention</li>
                  <li>Provide accurate and detailed information</li>
                  <li>Include clear photos that respect privacy (avoid capturing people's faces or private property details)</li>
                  <li>Only report non-emergency issues; for emergencies, contact local authorities directly</li>
                  <li>Avoid duplicate reports; check if the issue has already been reported</li>
                </ul>
              </div>
              
              <div>
                <div className="flex items-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-emerald-600 mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-800">Prohibited Content</h2>
                </div>
                <ul className="list-disc pl-10 space-y-2 text-gray-700">
                  <li>Illegal content or promotion of illegal activities</li>
                  <li>Hate speech, discriminatory content, or harassment</li>
                  <li>Misleading information or false reports</li>
                  <li>Spam, advertising, or promotional content unrelated to community issues</li>
                  <li>Content that violates others' privacy or intellectual property rights</li>
                </ul>
              </div>
              
              <div>
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-800">Accountability</h2>
                </div>
                <ul className="list-disc pl-10 space-y-2 text-gray-700">
                  <li>Follow through on commitments to fix issues you've agreed to address</li>
                  <li>Provide honest and accurate updates on your progress</li>
                  <li>Submit authentic proof of completed work</li>
                  <li>Be transparent about your skills and capabilities when applying to fix issues</li>
                  <li>Respect agreed-upon timelines and communicate any delays</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-10 p-4 bg-emerald-50 border border-emerald-100 rounded-lg">
              <h3 className="text-lg font-semibold text-emerald-700 mb-2">Enforcement</h3>
              <p className="text-gray-700">
                FixTogether moderators review reports of guideline violations and may take action including content removal, 
                warnings, temporary suspension, or permanent account termination. Serious violations may be reported to 
                appropriate authorities. If you see content that violates these guidelines, please report it through the platform.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      
    </div>
  )
}
