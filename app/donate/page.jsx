"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, DollarSign, Filter, ArrowUpRight } from "lucide-react"

export default function DonatePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")

  // Mock data for issues
  const issues = [
    {
      id: 1,
      title: "Broken Playground Equipment at Central Park",
      category: "parks",
      location: "Central Park, Main St",
      description: "The slide and swing set are damaged and unsafe for children.",
      amountNeeded: 1200,
      amountRaised: 450,
      daysLeft: 14,
      images: ["/placeholder.svg?height=200&width=300"],
    },
    {
      id: 2,
      title: "Pothole on Elm Street",
      category: "roads",
      location: "Elm St & 5th Ave",
      description: "Large pothole causing damage to vehicles and creating a hazard.",
      amountNeeded: 800,
      amountRaised: 650,
      daysLeft: 7,
      images: ["/placeholder.svg?height=200&width=300"],
    },
    {
      id: 3,
      title: "Graffiti on Community Center",
      category: "graffiti",
      location: "Downtown Community Center",
      description: "Extensive graffiti on the north wall of the community center.",
      amountNeeded: 500,
      amountRaised: 125,
      daysLeft: 21,
      images: ["/placeholder.svg?height=200&width=300"],
    },
    {
      id: 4,
      title: "Broken Street Light on Oak Avenue",
      category: "lighting",
      location: "Oak Ave & Pine St",
      description: "Street light has been out for weeks, creating safety concerns at night.",
      amountNeeded: 350,
      amountRaised: 200,
      daysLeft: 10,
      images: ["/placeholder.svg?height=200&width=300"],
    },
  ]

  // Filter issues based on search term and category filter
  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === "all" || issue.category === filter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-emerald-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              FixTogether
            </Link>
            <nav className="hidden md:block">
              <ul className="flex space-x-6">
                <li>
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/report" className="hover:underline">
                    Report Issue
                  </Link>
                </li>
                <li>
                  <Link href="/donate" className="hover:underline font-semibold">
                    Donate
                  </Link>
                </li>
                <li>
                  <Link href="/fix" className="hover:underline">
                    Fix Issues
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:underline">
                    About
                  </Link>
                </li>
              </ul>
            </nav>
            <button className="md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

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
                      <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full capitalize">
                        {issue.category}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm mb-3">{issue.location}</p>
                    <p className="text-gray-700 mb-4">{issue.description}</p>

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
                      <button className="flex-1 bg-emerald-600 text-white py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        Donate Now
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
