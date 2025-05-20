"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Footer from "@/components/footer"
import NavBar from "@/components/navBar"

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="container mx-auto px-4 py-16 mt-16">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="text-emerald-600 hover:underline flex items-center gap-2 mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          
          <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-emerald-700 mb-2">What is FixTogether?</h3>
                <p className="text-gray-700">
                  FixTogether is a community-driven platform that connects people who want to report local issues with those who can help fix them. Our mission is to empower communities to solve local problems together through reporting, funding, and volunteering.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-emerald-700 mb-2">How do I report an issue?</h3>
                <p className="text-gray-700">
                  To report an issue, sign in to your account and click on "Report Issue" in the navigation menu. Fill out the form with details about the problem, including location, photos, and any other relevant information. Once submitted, your issue will be reviewed and made available for community support.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-emerald-700 mb-2">How does the donation system work?</h3>
                <p className="text-gray-700">
                  When you report an issue, you can set up funding details including the amount needed, minimum and maximum donation amounts, and funding duration. Community members can then contribute to issues they care about. Once an issue reaches its funding goal, qualified volunteers can apply to fix it.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-emerald-700 mb-2">Who can fix issues on the platform?</h3>
                <p className="text-gray-700">
                  Anyone with the relevant skills can apply to fix issues that have been funded. Applicants must confirm their availability, experience, and commitment to completing the task. Issue owners review applications and select the most suitable person for the job.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-emerald-700 mb-2">How do I get paid for fixing an issue?</h3>
                <p className="text-gray-700">
                  After you've been selected to fix an issue and have completed the work, you'll need to submit proof of completion (photos, videos, etc.). Once the issue owner verifies the work is complete, payment will be processed according to the agreed compensation.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-emerald-700 mb-2">What types of issues can I report?</h3>
                <p className="text-gray-700">
                  You can report a wide range of non-emergency community issues, including road and sidewalk damage, graffiti, abandoned vehicles, illegal dumping, park maintenance needs, street lighting problems, water and sewer issues, public safety concerns, and accessibility issues.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-emerald-700 mb-2">Is FixTogether available in my area?</h3>
                <p className="text-gray-700">
                  FixTogether is designed to work in any community. However, the effectiveness depends on having an active user base in your area. Check the platform to see if there are already issues reported near you. If not, be the first to bring FixTogether to your community!
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-emerald-700 mb-2">How do I contact support?</h3>
                <p className="text-gray-700">
                  If you need assistance or have questions that aren't answered here, please visit our <Link href="/contact" className="text-emerald-600 hover:underline">Contact Us</Link> page to get in touch with our support team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      
    </div>
  )
}
