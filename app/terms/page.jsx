"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Footer from "@/components/footer"
import NavBar from "@/components/navBar"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="container mx-auto px-4 py-16 mt-16">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="text-emerald-600 hover:underline flex items-center gap-2 mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          
          <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <p className="text-gray-700 mb-6">
              Last Updated: May 20, 2025
            </p>
            
            <p className="text-gray-700 mb-6">
              Welcome to FixTogether. Please read these Terms of Service ("Terms") carefully as they contain important 
              information about your legal rights, remedies, and obligations. By accessing or using the FixTogether platform, 
              you agree to comply with and be bound by these Terms.
            </p>
            
            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold text-emerald-700 mb-3">1. Acceptance of Terms</h2>
                <p className="text-gray-700">
                  By accessing or using our platform, you agree to these Terms and our Privacy Policy. If you do not agree 
                  to these Terms, you may not access or use the FixTogether platform. We may modify these Terms at any time, 
                  and such modifications will be effective immediately upon posting. Your continued use of the platform 
                  following any changes indicates your acceptance of the modified Terms.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-emerald-700 mb-3">2. Platform Description</h2>
                <p className="text-gray-700">
                  FixTogether is a community-driven platform that connects people who want to report local issues with those 
                  who can help fix them. Our platform allows users to report issues, donate funds to support issue resolution, 
                  and apply to fix reported issues. FixTogether acts as an intermediary and is not responsible for the actual 
                  resolution of reported issues.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-emerald-700 mb-3">3. User Accounts</h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    To use certain features of our platform, you must create an account. You agree to:
                  </p>
                  <ul className="list-disc pl-8">
                    <li>Provide accurate, current, and complete information</li>
                    <li>Maintain the security of your account credentials</li>
                    <li>Promptly update any changes to your information</li>
                    <li>Accept responsibility for all activities that occur under your account</li>
                  </ul>
                  <p>
                    We reserve the right to suspend or terminate your account if we suspect any unauthorized access or violation of these Terms.
                  </p>
                </div>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-emerald-700 mb-3">4. User Conduct</h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    You agree not to:
                  </p>
                  <ul className="list-disc pl-8">
                    <li>Violate any applicable laws or regulations</li>
                    <li>Infringe on the rights of others</li>
                    <li>Submit false or misleading information</li>
                    <li>Upload harmful content or malware</li>
                    <li>Attempt to gain unauthorized access to the platform</li>
                    <li>Use the platform for any illegal or unauthorized purpose</li>
                    <li>Harass, abuse, or harm other users</li>
                    <li>Interfere with the proper functioning of the platform</li>
                  </ul>
                </div>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-emerald-700 mb-3">5. Issue Reporting and Resolution</h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    When reporting an issue, you:
                  </p>
                  <ul className="list-disc pl-8">
                    <li>Confirm that the information provided is accurate and truthful</li>
                    <li>Grant us permission to display the issue and related information on our platform</li>
                    <li>Understand that we do not guarantee that any issue will be resolved</li>
                  </ul>
                  <p>
                    When applying to fix an issue, you:
                  </p>
                  <ul className="list-disc pl-8">
                    <li>Confirm that you have the necessary skills and resources to address the issue</li>
                    <li>Agree to complete the work as described if selected</li>
                    <li>Accept responsibility for your actions while fixing the issue</li>
                  </ul>
                </div>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-emerald-700 mb-3">6. Donations and Payments</h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    When making donations:
                  </p>
                  <ul className="list-disc pl-8">
                    <li>You authorize us to charge your selected payment method</li>
                    <li>You understand that donations are used to fund issue resolution</li>
                    <li>You acknowledge that donations may be non-refundable once an issue has been assigned to a fixer</li>
                  </ul>
                  <p>
                    When receiving compensation for fixing an issue:
                  </p>
                  <ul className="list-disc pl-8">
                    <li>You must complete the work as agreed before receiving payment</li>
                    <li>Payments are subject to verification of work completion</li>
                    <li>You are responsible for any applicable taxes on compensation received</li>
                  </ul>
                </div>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-emerald-700 mb-3">7. Limitation of Liability</h2>
                <p className="text-gray-700">
                  FixTogether is provided "as is" without warranties of any kind. We are not liable for any damages 
                  arising from your use of our platform, including but not limited to direct, indirect, incidental, 
                  consequential, or punitive damages. We do not guarantee the quality, safety, or legality of issue 
                  resolution services provided by users.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-emerald-700 mb-3">8. Dispute Resolution</h2>
                <p className="text-gray-700">
                  Any disputes arising from your use of FixTogether shall be resolved through binding arbitration 
                  in accordance with the laws of the jurisdiction in which our company is registered. You agree to 
                  resolve disputes on an individual basis and waive any right to participate in class actions.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-emerald-700 mb-3">9. Termination</h2>
                <p className="text-gray-700">
                  We reserve the right to suspend or terminate your access to FixTogether at our sole discretion, 
                  without notice, for any reason, including but not limited to a violation of these Terms. Upon 
                  termination, your right to use the platform will immediately cease.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-emerald-700 mb-3">10. Contact Information</h2>
                <p className="text-gray-700">
                  If you have any questions about these Terms, please contact us at terms@fixtogether.com or visit 
                  our <Link href="/contact" className="text-emerald-600 hover:underline">Contact Us</Link> page.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      
     
    </div>
  )
}
