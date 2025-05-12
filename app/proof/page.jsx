"use client"

import { useState } from "react"
import Link from "next/link"
import { Camera, CheckCircle, AlertCircle } from "lucide-react"

export default function ProofPage() {
  const [files, setFiles] = useState([])
  const [formData, setFormData] = useState({
    issueId: "",
    description: "",
    timeSpent: "",
    materialsUsed: "",
  })

  // Mock data for issues the user has been assigned to fix
  const assignedIssues = [
    { id: "ISS-1234", title: "Broken Playground Equipment at Central Park" },
    { id: "ISS-5678", title: "Pothole on Elm Street" },
    { id: "ISS-9012", title: "Graffiti on Community Center" },
  ]

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
    setFiles([...files, ...selectedFiles])
  }

  const handleRemoveFile = (index) => {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    setFiles(newFiles)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Form submitted:", { ...formData, files })
    alert("Proof of completion submitted successfully! Thank you for your contribution.")
    // Reset form or redirect
  }

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
                  <Link href="/donate" className="hover:underline">
                    Donate
                  </Link>
                </li>
                <li>
                  <Link href="/fix" className="hover:underline">
                    Fix Issues
                  </Link>
                </li>
                <li>
                  <Link href="/proof" className="hover:underline font-semibold">
                    Submit Proof
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
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Submit Proof of Completion</h1>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Completion Details</h2>

            <form onSubmit={handleSubmit}>
              {/* Issue Selection */}
              <div className="mb-6">
                <label htmlFor="issueId" className="block text-gray-700 font-medium mb-2">
                  Select Issue
                </label>
                <select
                  id="issueId"
                  name="issueId"
                  value={formData.issueId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                >
                  <option value="">Select the issue you fixed</option>
                  {assignedIssues.map((issue) => (
                    <option key={issue.id} value={issue.id}>
                      {issue.id}: {issue.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div className="mb-6">
                <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                  Description of Work Completed
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Describe the work you did to fix the issue..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                ></textarea>
              </div>

              {/* Time Spent */}
              <div className="mb-6">
                <label htmlFor="timeSpent" className="block text-gray-700 font-medium mb-2">
                  Time Spent
                </label>
                <input
                  type="text"
                  id="timeSpent"
                  name="timeSpent"
                  value={formData.timeSpent}
                  onChange={handleInputChange}
                  placeholder="e.g., 3 hours"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>

              {/* Materials Used */}
              <div className="mb-6">
                <label htmlFor="materialsUsed" className="block text-gray-700 font-medium mb-2">
                  Materials Used
                </label>
                <textarea
                  id="materialsUsed"
                  name="materialsUsed"
                  value={formData.materialsUsed}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="List any materials you used to complete the fix..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              {/* Photo/Video Upload */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Before/After Photos or Videos</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    id="fileUpload"
                    onChange={handleFileChange}
                    multiple
                    accept="image/*,video/*"
                    className="hidden"
                  />
                  <label htmlFor="fileUpload" className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <Camera className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-gray-600 mb-1">Click to upload before/after photos or videos</p>
                      <p className="text-gray-400 text-sm">JPG, PNG, MP4 (max 10MB each)</p>
                    </div>
                  </label>
                </div>

                {files.length > 0 && (
                  <div className="mt-4">
                    <p className="font-medium mb-2">Uploaded Files ({files.length})</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {files.map((file, index) => (
                        <div key={index} className="relative bg-gray-100 p-2 rounded-lg">
                          <p className="text-sm truncate">{file.name}</p>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center"
                >
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Submit Proof of Completion
                </button>
              </div>
            </form>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start">
            <AlertCircle className="text-blue-500 h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-700">
                <strong>Important:</strong> Please provide clear before and after photos or videos that show the issue
                has been properly fixed. This helps verify your work and ensures you receive proper compensation.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
