import Link from "next/link"
import { ArrowRight, MapPin, DollarSign, Wrench, CheckCircle, Sparkles, Leaf, Users, Globe, Shield } from "lucide-react"
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Decorative background pattern */}
      <div className="fixed inset-0 dot-pattern -z-10 opacity-70"></div>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-32">
        {/* Decorative blobs */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-emerald-400/20 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-teal-400/20 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-32 left-1/3 w-72 h-72 bg-emerald-300/20 rounded-full filter blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
              Fix Your Community <span className="relative inline-block">Together
                <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 200 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 3C50 0.5 150 0.5 200 3" stroke="url(#paint0_linear)" strokeWidth="5" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="paint0_linear" x1="0" y1="3" x2="200" y2="3" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#10b981" />
                      <stop offset="1" stopColor="#0d9488" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-600 dark:text-gray-300">
              Report local issues, fund solutions, and help fix problems in your neighborhood.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SignedIn>
                <Link
                  href="/report"
                  className="neo-brutalism px-8 py-4 rounded-xl font-medium text-lg flex items-center justify-center group"
                >
                  Report an Issue
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="neo-brutalism px-8 py-4 rounded-xl font-medium text-lg flex items-center justify-center group">
                    Sign in to Report
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </button>
                </SignInButton>
              </SignedOut>
              
              <Link
                href="/fix"
                className="gradient-border relative px-8 py-4 rounded-xl font-medium text-lg flex items-center justify-center bg-white dark:bg-gray-900 hover-lift group"
              >
                <span className="relative z-10 flex items-center">
                  Browse Issues
                  <Sparkles className="ml-2 h-5 w-5 text-emerald-500 transition-transform group-hover:rotate-12" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 glass-effect my-16 mx-4 md:mx-8 lg:mx-16 rounded-3xl">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">How <span className="gradient-text">FixTogether</span> Works</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-16 max-w-2xl mx-auto">Our simple process makes community improvement accessible to everyone</p>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="hover-lift">
              <div className="blob-shape bg-gradient-to-br from-emerald-400/20 to-teal-400/20 w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <div className="bg-white dark:bg-gray-800 rounded-full p-4 shadow-lg">
                  <MapPin className="h-8 w-8 text-emerald-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Report Issues</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">Use geolocation and upload photos/videos to report community issues.</p>
            </div>

            <div className="hover-lift">
              <div className="blob-shape-alt bg-gradient-to-br from-teal-400/20 to-emerald-400/20 w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <div className="bg-white dark:bg-gray-800 rounded-full p-4 shadow-lg">
                  <DollarSign className="h-8 w-8 text-emerald-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Donate</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">Contribute funds to issues that matter most to you.</p>
            </div>

            <div className="hover-lift">
              <div className="blob-shape bg-gradient-to-br from-emerald-400/20 to-teal-400/20 w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <div className="bg-white dark:bg-gray-800 rounded-full p-4 shadow-lg">
                  <Wrench className="h-8 w-8 text-emerald-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Apply to Fix</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">Volunteer your skills to help resolve community issues.</p>
            </div>

            <div className="hover-lift">
              <div className="blob-shape-alt bg-gradient-to-br from-teal-400/20 to-emerald-400/20 w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <div className="bg-white dark:bg-gray-800 rounded-full p-4 shadow-lg">
                  <CheckCircle className="h-8 w-8 text-emerald-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Verify Completion</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">Upload proof of completed fixes and get community verification.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Issue Categories */}
      <section className="py-24 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 line-pattern opacity-70"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-bold text-center mb-4">What Can You <span className="gradient-text">Report?</span></h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-16 max-w-2xl mx-auto">Our platform supports a wide range of community issues</p>

          <div className="grid md:grid-cols-3 gap-6">
            {
              [
                { name: "Road & Sidewalk Damage", icon: <MapPin className="h-5 w-5" /> },
                { name: "Graffiti & Vandalism", icon: <Shield className="h-5 w-5" /> },
                { name: "Abandoned Vehicles", icon: <ArrowRight className="h-5 w-5" /> },
                { name: "Illegal Dumping", icon: <Leaf className="h-5 w-5" /> },
                { name: "Park Maintenance", icon: <Leaf className="h-5 w-5" /> },
                { name: "Street Lighting", icon: <Sparkles className="h-5 w-5" /> },
                { name: "Water & Sewer Issues", icon: <Globe className="h-5 w-5" /> },
                { name: "Public Safety Concerns", icon: <Shield className="h-5 w-5" /> },
                { name: "Accessibility Issues", icon: <Users className="h-5 w-5" /> },
              ].map((category, index) => (
                <div key={index} className="glass-card p-6 rounded-2xl hover-lift">
                  <div className="flex items-center">
                    <div className="mr-3 text-emerald-600">
                      {category.icon}
                    </div>
                    <p className="font-medium text-lg">{category.name}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 my-16 animated-gradient text-white rounded-3xl mx-4 md:mx-8 lg:mx-16 overflow-hidden relative">
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/10"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/5"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Join our community of problem solvers and help make your neighborhood a better place.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <SignedIn>
              <Link
                href="/report"
                className="bg-white/90 backdrop-blur-sm text-emerald-600 px-8 py-4 rounded-xl font-medium hover:bg-white transition-colors flex items-center justify-center group"
              >
                Report an Issue
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-white/90 backdrop-blur-sm text-emerald-600 px-8 py-4 rounded-xl font-medium hover:bg-white transition-colors flex items-center justify-center group">
                  Sign up now
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </SignInButton>
            </SignedOut>
            
            <Link
              href="/fix"
              className="border-2 border-white/80 bg-transparent px-8 py-4 rounded-xl font-medium hover:bg-white/10 transition-colors flex items-center justify-center group"
            >
              Support Communities
              <Users className="ml-2 h-5 w-5 transition-transform group-hover:scale-110" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer wave decoration */}
      <div className="w-full h-24 overflow-hidden relative -mt-8">
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 0L48 8.875C96 17.75 192 35.5 288 53.25C384 71 480 88.75 576 71C672 53.25 768 0 864 0C960 0 1056 53.25 1152 71C1248 88.75 1344 71 1392 62.125L1440 53.25V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V0Z" fill="url(#paint1_linear)"/>
          <defs>
            <linearGradient id="paint1_linear" x1="720" y1="0" x2="720" y2="120" gradientUnits="userSpaceOnUse">
              <stop stopColor="#10b981" stopOpacity="0.2"/>
              <stop offset="1" stopColor="#10b981" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
     
    </div>
  )
}
