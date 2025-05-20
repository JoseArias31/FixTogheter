"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Footer from "@/components/footer"
import NavBar from "@/components/navBar"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="container mx-auto px-4 py-16 mt-16">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="text-emerald-600 hover:underline flex items-center gap-2 mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <p className="text-gray-700 mb-6">
              Last Updated: May 20, 2025
            </p>
            
            <p className="text-gray-700 mb-6">
              At FixTogether, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, 
              and safeguard your information when you use our platform. Please read this policy carefully.
            </p>
            
            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold text-emerald-700 mb-3">Information We Collect</h2>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h3 className="font-medium">Personal Information</h3>
                    <p>We may collect personal information that you voluntarily provide when creating an account, reporting issues, or communicating with us, including:</p>
                    <ul className="list-disc pl-8 mt-2">
                      <li>Name and contact information (email address, phone number)</li>
                      <li>Account credentials</li>
                      <li>Profile information</li>
                      <li>Payment information (processed securely through our payment providers)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Issue Reports</h3>
                    <p>When you report an issue, we collect:</p>
                    <ul className="list-disc pl-8 mt-2">
                      <li>Issue details and descriptions</li>
                      <li>Location data (address and/or GPS coordinates)</li>
                      <li>Photos or videos you upload</li>
                      <li>Funding and donation information</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Automatically Collected Information</h3>
                    <p>When you access our platform, we may automatically collect:</p>
                    <ul className="list-disc pl-8 mt-2">
                      <li>Device information (type, operating system, browser)</li>
                      <li>IP address and general location</li>
                      <li>Usage data and interactions with the platform</li>
                      <li>Cookies and similar tracking technologies</li>
                    </ul>
                  </div>
                </div>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-emerald-700 mb-3">How We Use Your Information</h2>
                <p className="text-gray-700 mb-2">We use the information we collect to:</p>
                <ul className="list-disc pl-8 text-gray-700">
                  <li>Provide, maintain, and improve our platform</li>
                  <li>Process and display issue reports</li>
                  <li>Facilitate connections between issue reporters and fixers</li>
                  <li>Process donations and payments</li>
                  <li>Communicate with you about your account, issues, or platform updates</li>
                  <li>Ensure platform security and prevent fraud</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-emerald-700 mb-3">Information Sharing</h2>
                <p className="text-gray-700 mb-2">We may share your information with:</p>
                <ul className="list-disc pl-8 text-gray-700">
                  <li>Other users (limited to information necessary for issue resolution)</li>
                  <li>Service providers who help us operate our platform</li>
                  <li>Payment processors for donation and compensation processing</li>
                  <li>Legal authorities when required by law or to protect rights and safety</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  We will never sell your personal information to third parties for marketing purposes.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-emerald-700 mb-3">Data Security</h2>
                <p className="text-gray-700">
                  We implement appropriate technical and organizational measures to protect your personal information. 
                  However, no method of transmission over the internet or electronic storage is 100% secure. 
                  While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-emerald-700 mb-3">Your Rights</h2>
                <p className="text-gray-700 mb-2">Depending on your location, you may have rights to:</p>
                <ul className="list-disc pl-8 text-gray-700">
                  <li>Access the personal information we hold about you</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Delete your personal information</li>
                  <li>Restrict or object to certain processing activities</li>
                  <li>Request portability of your information</li>
                  <li>Withdraw consent where processing is based on consent</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  To exercise these rights, please contact us at privacy@fixtogether.com.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-emerald-700 mb-3">Changes to This Policy</h2>
                <p className="text-gray-700">
                  We may update this Privacy Policy from time to time. The updated version will be indicated by an updated 
                  "Last Updated" date and will be effective as soon as it is accessible. We encourage you to review this 
                  Privacy Policy periodically to stay informed of how we protect your information.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-emerald-700 mb-3">Contact Us</h2>
                <p className="text-gray-700">
                  If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:
                </p>
                <div className="mt-2 text-gray-700">
                  <p>Email: privacy@fixtogether.com</p>
                  <p>Or visit our <Link href="/contact" className="text-emerald-600 hover:underline">Contact Us</Link> page.</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      
   
    </div>
  )
}
