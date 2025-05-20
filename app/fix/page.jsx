"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Filter, PenToolIcon as Tool, Clock, ArrowUpRight, DollarSign, X } from "lucide-react"
import {supabase} from "@/lib/supabaseClient"

export default function FixPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")
  const [skillFilter, setSkillFilter] = useState("all")
  const [issues, setIssues] = useState([])
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false)
  const [donationAmount, setDonationAmount] = useState(10)
  const [customAmount, setCustomAmount] = useState('')
  const [selectedIssueId, setSelectedIssueId] = useState(null)

  useEffect(() => {
    const fetchIssues = async () => {
      const { data, error } = await supabase
        .from("issues")
        .select(`
          id,
          title,
          description,
          address,
          organization, country, city, province, compensation, estimateTime, difficulty, skillsNeeded,
          image_urls, amount_needed, amount_raised, min_donation, max_donation, donation_active, currency, daysLeft
        `)

      if (error) {
        console.error("Error fetching issues:", error)
        return
      }

      const formattedIssues = data.map(issue => ({
        id: issue.id,
        title: issue.title,
        description: issue.description,
        location: issue.address || "",
        country: issue.country || "",
        city: issue.city || "",
        province: issue.province || "",
        organization: issue.organization || "",
        // name: issue.users?.name || "",
        skills: issue.skillsNeeded || "Overall Skills",
        estimatedTime: issue.estimateTime || "1-2 hours",
        difficulty: issue.difficulty || "medium",
        status: issue.donation_active ? "funded" : "pending", // Set status based on donation_active
        compensation: issue.compensation || 0,
        // Use the first image from image_urls or fallback to placeholder
        images: issue.image_urls?.length ? [issue.image_urls[0]] : ["/placeholder.svg?height=200&width=300"],
        category: "parks", // Default category for filtering
        amountNeeded: issue.amount_needed || 0,
        amountRaised: issue.amount_raised || 0,
        minDonation: issue.min_donation || 5,
        maxDonation: issue.max_donation || 1000,
        currency: issue.currency || "USD",
        daysLeft: issue.daysLeft // This could be calculated based on a deadline field if you add one
      }))

      setIssues(formattedIssues)
    }

    fetchIssues()
  }, [])


  // Filter issues based on search term, category filter, and skill filter
  const filteredIssues = issues?.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.province.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === "all" || issue.category === filter
    const matchesSkill = skillFilter === "all" || issue.skills.includes(skillFilter)
    return matchesSearch && matchesFilter && matchesSkill
  })

  return (
    <div className=" min-h-screen bg-gray-50  mt-16">
     

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Apply to Fix Issues</h1>
          <p className="text-gray-600 mb-8">
            Use your skills to help improve your community and earn compensation for your work.
          </p>

          {/* Search and Filter */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search issues..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none"
                >
                  <option value="all">All Categories</option>
                  <option value="roads">Roads & Sidewalks</option>
                  <option value="parks">Parks & Recreation</option>
                  <option value="graffiti">Graffiti & Vandalism</option>
                  <option value="lighting">Street Lighting</option>
                  <option value="water">Water & Sewer</option>
                  <option value="safety">Public Safety</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Tool className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={skillFilter}
                  onChange={(e) => setSkillFilter(e.target.value)}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none"
                >
                  <option value="all">All Skills</option>
                  <option value="carpentry">Carpentry</option>
                  <option value="electrical">Electrical</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="painting">Painting</option>
                  <option value="welding">Welding</option>
                  <option value="construction">Construction</option>
                  <option value="landscaping">Landscaping</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Issues Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredIssues.length > 0 ? (
              filteredIssues.map((issue) => (
                <div key={issue.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={issue.images[0] || "/placeholder.svg"}
                    alt={issue.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold">{issue.title}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full capitalize ${
                          issue.status === "funded" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {issue.status === "funded" ? "Funded" : "Pending Funding"}
                      </span>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                    <p className="text-gray-500 text-sm mb-3">{issue.country},</p>
                    <p className="text-gray-500 text-sm mb-3">{issue.city},</p>
                    <p className="text-gray-500 text-sm mb-3">{issue.province}</p>
                    </div>
                    <p className="text-gray-500 text-sm mb-3">{issue.location}</p>
                    <p className="text-gray-700 mb-4">{issue.description}</p>

                    {/* Details */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-xs text-gray-500">Compensation</p>
                        <p className="font-medium">${issue.compensation}</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-xs text-gray-500">Estimated Time</p>
                        <p className="font-medium">{issue.estimatedTime}</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-xs text-gray-500">Difficulty</p>
                        <p className="font-medium capitalize">{issue.difficulty}</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-xs text-gray-500">Skills Needed</p>
                        <p className="font-medium capitalize">{issue.skills}</p>
                      </div>
                    </div>

                   <div className="flex flex-col md:flex-row gap-3 mb-4 justify-between items-stretch md:items-center">
  <button 
    onClick={() => {
      setSelectedIssueId(issue.id);
      setIsDonateModalOpen(true);
    }}
    className="w-full md:flex-1 p-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center"
  >
    <DollarSign className="h-4 w-4 mr-1" />
    Support
  </button>


  <button
    className={`w-full md:flex-1 rounded-lg font-medium flex items-center justify-center transition-colors ${
      issue.status === "funded"
        ? "p-2 bg-emerald-600 text-white hover:bg-emerald-700"
        : "p-2 bg-gray-200 text-gray-500 cursor-not-allowed"
    }`}
    disabled={issue.status !== "funded"}
  >
    {issue.status === "funded" ? (
      <>
        <Tool className="h-4 w-4 mr-1" />
        Apply to Fix
      </>
    ) : (
      <>
        <Clock className="h-4 w-4 mr-1" />
        Awaiting Funding
      </>
    )}
  </button>

  <Link
    href={`/fix/${issue.id}`}
    className="w-full md:w-auto p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
  >
    <ArrowUpRight className="h-4 w-4" />
  </Link>
</div>
      {/* Funding Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">${issue.amountRaised} raised</span>
                        <span className="text-gray-500">of ${issue.amountNeeded} goal</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-emerald-600 h-2.5 rounded-full"
                          style={{ width: `${(issue.amountRaised / issue.amountNeeded) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-right text-xs text-gray-500 mt-1">{issue.daysLeft} days left</div>
                    </div>

                    
                  </div>
                  
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <p className="text-gray-500 text-lg">No issues found matching your search criteria.</p>
                <button
                  onClick={() => {
                    setSearchTerm("")
                    setFilter("all")
                    setSkillFilter("all")
                  }}
                  className="mt-4 text-emerald-600 hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Donation Modal */}
      {isDonateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md space-y-4 relative">
            <button 
              onClick={() => setIsDonateModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
            
            <h2 className="text-xl font-semibold text-gray-800">Support This Issue</h2>
            <p className="text-gray-600">Choose an amount to donate:</p>
            
            <div className="grid grid-cols-3 gap-2">
              {[5, 10, 25].map((amount) => (
                <button
                  key={amount}
                  onClick={() => {
                    setDonationAmount(amount);
                    setCustomAmount('');
                  }}
                  className={`p-3 rounded-lg border ${donationAmount === amount && !customAmount ? 'bg-emerald-50 border-emerald-500' : 'border-gray-300 hover:border-emerald-500'}`}
                >
                  ${amount}
                </button>
              ))}
              {[50, 100, 200].map((amount) => (
                <button
                  key={amount}
                  onClick={() => {
                    setDonationAmount(amount);
                    setCustomAmount('');
                  }}
                  className={`p-3 rounded-lg border ${donationAmount === amount && !customAmount ? 'bg-emerald-50 border-emerald-500' : 'border-gray-300 hover:border-emerald-500'}`}
                >
                  ${amount}
                </button>
              ))}
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Custom Amount</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="number"
                  min="1"
                  placeholder="Enter amount"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    if (e.target.value) {
                      setDonationAmount(parseFloat(e.target.value));
                    } else {
                      setDonationAmount(10); // Default
                    }
                  }}
                  className="pl-8 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
            
            <form action="/api/report/checkout_sessions" method="POST" className="mt-6">
              <input type="hidden" name="issueId" value={selectedIssueId} />
              <input type="hidden" name="amount" value={donationAmount} />
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsDonateModalOpen(false)}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Donate ${customAmount || donationAmount}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
