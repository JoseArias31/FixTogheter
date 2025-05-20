"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, DollarSign, Filter, ArrowUpRight } from "lucide-react"
import {supabase} from "@/lib/supabaseClient"

export default function DonatePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")
  const [issues, setIssues] = useState([])

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
          image_urls,
          amount_needed, amount_raised, min_donation, max_donation, donation_active, currency
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
        skills: issue.skillsNeeded || "Overall Skills",
        estimatedTime: issue.estimateTime || "1-2 hours",
        difficulty: issue.difficulty || "medium",
        status: issue.donation_active ? "funded" : "pending",
        compensation: issue.compensation || 0,
        // Use the first image from image_urls or fallback to placeholder
        images: issue.image_urls?.length ? [issue.image_urls[0]] : ["/placeholder.svg?height=200&width=300"],
        // Use the actual donation data from the database
        amountNeeded: issue.amount_needed || 1200,
        amountRaised: issue.amount_raised || 0,
        minDonation: issue.min_donation || 5,
        maxDonation: issue.max_donation || 1000,
        currency: issue.currency || "USD",
        daysLeft: 14, // This could be calculated based on a deadline field if you add one
        category: "parks" // Default category for filtering
      }))

      setIssues(formattedIssues)
    }

    fetchIssues()
  }, [])

  // Filter issues based on search term and category filter
  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === "all" || issue.category === filter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-gray-50 mt-16">
     

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Donate to Community Issues</h1>
          <p className="text-gray-600 mb-8">
            Support local issues that matter to you and help make your community better.
          </p>

          {/* Search and Filter */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
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

              <div className="w-full md:w-64">
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
                      <span className={`text-xs px-2 py-1 rounded-full capitalize ${
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

                    <div className="flex space-x-3">
                      <button
                        className={`w-full md:flex-1 rounded-lg font-medium flex items-center justify-center transition-colors ${
                          issue.status === "funded"
                            ? "p-2 bg-emerald-600 text-white hover:bg-emerald-700"
                            : "p-2 bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                        onClick={() => {
                          if (issue.status === "funded") {
                            // Handle donation flow
                            console.log("Processing donation for", issue.id);
                          } else {
                            // Handle support action
                            console.log("Processing support for", issue.id);
                          }
                        }}
                      >
                        {issue.status === "funded" ? (
                          <>
                            <DollarSign className="h-4 w-4 mr-1" />
                            Donate now
                          </>
                        ) : (
                          <>
                            <DollarSign className="h-4 w-4 mr-1" />
                            Support
                          </>
                        )}
                      </button>
                      <Link
                        href={`/issues/${issue.id}`}
                        className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
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
    </div>
  )
}
