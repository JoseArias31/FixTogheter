import Link from "next/link"
import { ArrowRight, MapPin, DollarSign, Wrench, CheckCircle } from "lucide-react"
import { SignedIn, SignedOut,SignInButton } from '@clerk/nextjs'

export default function Home() {
  return (
    <div className="min-h-screen">
     

      {/* Hero Section */}
      <section className="bg-emerald-600 text-white py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Fix Your Community Together</h1>
            <p className="text-xl mb-8">
              Report local issues, fund solutions, and help fix problems in your neighborhood.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SignedIn>
                <Link
                  href="/report"
                  className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center"
                >
                  Report an Issue <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center">
                    Sign in to Report an Issue <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </SignInButton>
              </SignedOut>
              
              <Link
                href="/fix"
                className="bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-800 transition-colors flex items-center justify-center"
              >
                Browse Issues
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How FixTogether Works</h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Report Issues</h3>
              <p className="text-gray-600">Use geolocation and upload photos/videos to report community issues.</p>
            </div>

            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Donate</h3>
              <p className="text-gray-600">Contribute funds to issues that matter most to you.</p>
            </div>

            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Apply to Fix</h3>
              <p className="text-gray-600">Volunteer your skills to help resolve community issues.</p>
            </div>

            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verify Completion</h3>
              <p className="text-gray-600">Upload proof of completed fixes and get community verification.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Issue Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Can You Report?</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Road & Sidewalk Damage",
              "Graffiti & Vandalism",
              "Abandoned Vehicles",
              "Illegal Dumping",
              "Park Maintenance",
              "Street Lighting",
              "Water & Sewer Issues",
              "Public Safety Concerns",
              "Accessibility Issues",
            ].map((category, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <p className="font-medium text-lg">{category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community of problem solvers and help make your neighborhood a better place.
          </p>
         <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SignedIn>
                <Link
                  href="/report"
                  className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center"
                >
                  Report an Issue <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center">
                    Sign up now <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </SignInButton>
              </SignedOut>
              
              <Link
                href="/fix"
                className="bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-800 transition-colors flex items-center justify-center"
              >
                Support Communites
              </Link>
            </div>
        </div>
      </section>

     
    </div>
  )
}
