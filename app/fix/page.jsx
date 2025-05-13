"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Filter, PenToolIcon as Tool, Clock, ArrowUpRight } from "lucide-react"

export default function FixPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")
  const [skillFilter, setSkillFilter] = useState("all")

  // Mock data for issues that need fixing
  const issues = [
    {
      id: 1,
      title: "Broken Playground Equipment at Central Park",
      category: "parks",
      skills: ["carpentry", "welding"],
      location: "Central Park, Main St",
      description: "The slide and swing set are damaged and unsafe for children.",
      estimatedTime: "4-6 hours",
      difficulty: "medium",
      status: "funded",
      compensation: 250,
      images: ["/placeholder.svg?height=200&width=300"],
    },
    {
      id: 2,
      title: "Pothole on Elm Street",
      category: "roads",
      skills: ["construction"],
      location: "Elm St & 5th Ave",
      description: "Large pothole causing damage to vehicles and creating a hazard.",
      estimatedTime: "2-3 hours",
      difficulty: "medium",
      status: "funded",
      compensation: 150,
      images: ["/placeholder.svg?height=200&width=300"],
    },
    {
      id: 3,
      title: "Graffiti on Community Center",
      category: "graffiti",
      skills: ["painting"],
      location: "Downtown Community Center",
      description: "Extensive graffiti on the north wall of the community center.",
      estimatedTime: "3-4 hours",
      difficulty: "easy",
      status: "pending",
      compensation: 100,
      images: ["/placeholder.svg?height=200&width=300"],
    },
    {
      id: 4,
      title: "Broken Street Light on Oak Avenue",
      category: "lighting",
      skills: ["electrical"],
      location: "Oak Ave & Pine St",
      description: "Street light has been out for weeks, creating safety concerns at night.",
      estimatedTime: "1-2 hours",
      difficulty: "hard",
      status: "funded",
      compensation: 120,
      images: ["/placeholder.svg?height=200&width=300"],
    },
  ]

  // Filter issues based on search term, category filter, and skill filter
  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === "all" || issue.category === filter
    const matchesSkill = skillFilter === "all" || issue.skills.includes(skillFilter)
    return matchesSearch && matchesFilter && matchesSkill
  })

  return (
    <div className="min-h-screen bg-gray-50  mt-16">
     

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
                        <p className="font-medium capitalize">{issue.skills.join(", ")}</p>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button
                        className={`flex-1 py-2 rounded-lg font-medium flex items-center justify-center ${
                          issue.status === "funded"
                            ? "bg-emerald-600 text-white hover:bg-emerald-700"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        } transition-colors`}
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
    </div>
  )
}
