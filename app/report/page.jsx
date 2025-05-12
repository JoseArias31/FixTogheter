"use client"

import { useState } from "react"
import { Camera, MapPin, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function ReportIssuePage() {
  const [location, setLocation] = useState(null)
  const [isLocating, setIsLocating] = useState(false)
  const [files, setFiles] = useState([])
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    priority: "medium",
  })

  const handleGetLocation = () => {
    setIsLocating(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
          setIsLocating(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          setIsLocating(false)
          alert("Unable to get your location. Please try again or enter it manually.")
        },
      )
    } else {
      alert("Geolocation is not supported by your browser.")
      setIsLocating(false)
    }
  }

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
    console.log("Form submitted:", { ...formData, location, files })
    alert("Issue reported successfully! Thank you for your contribution.")
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
                  <Link href="/report" className="hover:underline font-semibold">
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
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Report an Issue</h1>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Issue Details</h2>

            <form onSubmit={handleSubmit}>
              {/* Category Selection */}
              <div className="mb-6">
                <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="roads">Road & Sidewalk Damage</option>
                  <option value="graffiti">Graffiti & Vandalism</option>
                  <option value="vehicles">Abandoned Vehicles</option>
                  <option value="dumping">Illegal Dumping</option>
                  <option value="parks">Park Maintenance</option>
                  <option value="lighting">Street Lighting</option>
                  <option value="water">Water & Sewer Issues</option>
                  <option value="safety">Public Safety Concerns</option>
                  <option value="accessibility">Accessibility Issues</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Issue Title */}
              <div className="mb-6">
                <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                  Issue Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Brief title describing the issue"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>

              {/* Description */}
              <div className="mb-6">
                <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Provide details about the issue..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                ></textarea>
              </div>

              {/* Priority */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Priority</label>
                <div className="flex space-x-4">
                  {["low", "medium", "high"].map((priority) => (
                    <label key={priority} className="flex items-center">
                      <input
                        type="radio"
                        name="priority"
                        value={priority}
                        checked={formData.priority === priority}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span className="capitalize">{priority}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Location</label>
                <div className="flex items-center mb-2">
                  <button
                    type="button"
                    onClick={handleGetLocation}
                    disabled={isLocating}
                    className="flex items-center bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    <MapPin className="mr-2 h-5 w-5" />
                    {isLocating ? "Getting Location..." : "Get My Location"}
                  </button>
                </div>

                {location && (
                  <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                    <p className="text-sm">
                      <strong>Latitude:</strong> {location.latitude.toFixed(6)}
                      <br />
                      <strong>Longitude:</strong> {location.longitude.toFixed(6)}
                    </p>
                  </div>
                )}
              </div>

              {/* Photo/Video Upload */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Photos/Videos</label>
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
                      <p className="text-gray-600 mb-1">Click to upload photos or videos</p>
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
                  className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start">
            <AlertCircle className="text-yellow-500 h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> FixTogether is for non-emergency issues only. For emergencies requiring immediate
                attention, please call 911 or your local emergency number.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
