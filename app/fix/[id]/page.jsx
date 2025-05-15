"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import { use } from "react";
import Link from "next/link"

export default function IssueDetailsPage({ params }) {
  const unwrappedId = use(params)
  const paramsId = unwrappedId.id;
  const [issue, setIssue] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    available: "",
    hasExperience: "",
    tools: "",
    commitment: false,
  });


  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const { data, error } = await supabase
          .from("issues")
          .select(`
            id,
            title,
            description,
            address,
            organization,
            country,
            city,
            province,
            compensation,
            estimateTime,
            difficulty,
            skillsNeeded,
            image_urls
          `)
          .eq("id", paramsId)
          .single()

        if (error) throw error

        if (data) {
          setIssue({
            ...data,
            location: data.address || "",
            skills: data.skillsNeeded || "Overall Skills",
            estimatedTime: data.estimateTime || "1-2 hours",
            status: "funded", // Default status
            image_urls: data.image_urls?.length ? data.image_urls : ["/placeholder.svg?height=200&width=300"],
          })
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (paramsId) {
      fetchIssue()
    }
  }, [paramsId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Error Loading Issue</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link href="/fix" className="text-emerald-600 hover:underline flex items-center justify-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Issues
          </Link>
        </div>
      </div>
    )
  }

  if (!issue) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Issue Not Found</h1>
          <p className="text-gray-600 mb-4">The requested issue could not be found.</p>
          <Link href="/fix" className="text-emerald-600 hover:underline flex items-center justify-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Issues
          </Link>
        </div>
      </div>
    )
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const isEligible =
  formData.available === "yes" &&
  formData.hasExperience === "yes" &&
  formData.commitment;
  const canProceed = () => {
    switch(step) {
      case 1:
        return formData.available !== "";
      case 2:
        return formData.hasExperience !== "";
      case 3:
        return formData.tools?.trim().length >= 10;
      case 4:
        return formData.commitment;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (canProceed()) {
      setStep(prev => prev + 1);
    }
  };
  const prevStep = () => setStep(prev => prev - 1);
  const handleSubmit = () => {
    // Aquí podrías hacer validaciones adicionales o enviar a Supabase
    console.log("Form submitted:", formData);
    setStep(5); // Mostrar pantalla final de feedback
  };
  

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Link href="/fix" className="text-emerald-600 hover:underline flex items-center gap-2 mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Issues
        </Link>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="relative">
            {/* Main Image Carousel */}
            <div className="relative h-64 sm:h-96 overflow-hidden">
              {issue.image_urls?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${issue.title} - Image ${index + 1}`}
                  className={`absolute w-full h-full object-cover transition-transform duration-500 ease-in-out ${index === currentImageIndex ? 'translate-x-0' : index < currentImageIndex ? '-translate-x-full' : 'translate-x-full'}`}
                />
              ))}
              
              {/* Navigation Arrows */}
              {issue.image_urls?.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? issue.image_urls.length - 1 : prev - 1))}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev === issue.image_urls.length - 1 ? 0 : prev + 1))}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {issue.image_urls?.length > 1 && (
              <div className="flex gap-2 mt-4 px-4 overflow-x-auto pb-2">
                {issue.image_urls.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${currentImageIndex === index ? 'border-emerald-600' : 'border-transparent'}`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{issue.title}</h1>
            
            <div className="mb-4">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium
                ${issue.status === "funded" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
              >
                {issue.status === "funded" ? "Funded" : "Pending Funding"}
              </span>
            </div>

            <div className="flex flex-row items-center gap-2 mb-3">
              <p className="text-gray-500">{issue.country},</p>
              <p className="text-gray-500">{issue.city},</p>
              <p className="text-gray-500">{issue.province}</p>
            </div>

            <p className="text-gray-500 mb-3">{issue.location}</p>
            <p className="text-gray-700 mb-6">{issue.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Compensation</p>
                <p className="text-lg font-medium">${issue.compensation}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Estimated Time</p>
                <p className="text-lg font-medium">{issue.estimatedTime} Hours</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Difficulty</p>
                <p className="text-lg font-medium capitalize">{issue.difficulty}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Skills Needed</p>
                <p className="text-lg font-medium">{issue.skills}</p>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className={`w-full py-3 rounded-lg font-medium ${
                issue.status === "funded"
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              } transition-colors`}
              disabled={issue.status !== "funded"}
            >
              {issue.status === "funded" ? "Apply to Fix This Issue" : "Awaiting Funding"}
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md space-y-4 relative">
            <h2 className="text-xl font-semibold text-gray-800">Step {step} of 4</h2>

            {step === 1 && (
              <div className="space-y-3">
                <p className="text-gray-700">Are you available to complete this task within 24 hours?<span className="text-red-500">*</span></p>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50 cursor-pointer">
                    <input 
                      type="radio" 
                      name="available" 
                      value="yes" 
                      onChange={handleChange} 
                      checked={formData.available === "yes"}
                      required 
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50 cursor-pointer">
                    <input 
                      type="radio" 
                      name="available" 
                      value="no" 
                      onChange={handleChange} 
                      checked={formData.available === "no"}
                      required 
                    />
                    <span>No</span>
                  </label>
                </div>
                {!formData.available && step > 1 && <p className="text-red-500 text-sm">Please select an option</p>}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-3">
                <p className="text-gray-700">Do you have experience with this type of task?<span className="text-red-500">*</span></p>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50 cursor-pointer">
                    <input 
                      type="radio" 
                      name="hasExperience" 
                      value="yes" 
                      onChange={handleChange} 
                      checked={formData.hasExperience === "yes"}
                      required 
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50 cursor-pointer">
                    <input 
                      type="radio" 
                      name="hasExperience" 
                      value="no" 
                      onChange={handleChange} 
                      checked={formData.hasExperience === "no"}
                      required 
                    />
                    <span>No</span>
                  </label>
                </div>
                {!formData.hasExperience && step > 2 && <p className="text-red-500 text-sm">Please select an option</p>}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-3">
                <p className="text-gray-700">What tools or knowledge would you use?<span className="text-red-500">*</span></p>
                <textarea
                  name="tools"
                  value={formData.tools}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 min-h-[100px]"
                  placeholder="Please describe in detail (minimum 10 characters)"
                  required
                />
                {formData.tools?.trim().length < 10 && step > 3 && (
                  <p className="text-red-500 text-sm">Please provide a detailed description (minimum 10 characters)</p>
                )}
              </div>
            )}

            {step === 4 && (
              <div className="space-y-3">
                <p className="text-gray-700 mb-2">Commitment Confirmation<span className="text-red-500">*</span></p>
                <label className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50 cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="commitment" 
                    checked={formData.commitment}
                    onChange={handleChange}
                    required 
                  />
                  <span>I commit to completing this issue on time and following the project guidelines.</span>
                </label>
                {!formData.commitment && step > 4 && <p className="text-red-500 text-sm">Please confirm your commitment</p>}
              </div>
            )}

            {step === 5 && (
              <div className="text-center space-y-4">
                {formData.available === "yes" && formData.hasExperience === "yes" && formData.commitment ? (
                  <>
                    <div className="text-green-600 text-4xl">🎉</div>
                    <h3 className="text-lg font-semibold">Thank you for applying!</h3>
                    <p className="text-gray-600">Your request has been received. We'll notify you once it's approved.</p>
                    <button
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg mt-2"
                      onClick={() => {
                        setIsModalOpen(false);
                        setStep(1);
                      }}
                      type="button"
                    >
                      Close
                    </button>
                  </>
                ) : (
                  <>
                    <div className="text-red-500 text-4xl">⚠️</div>
                    <h3 className="text-lg font-semibold">Sorry, you don't meet the requirements</h3>
                    <p className="text-gray-600">You must be available, experienced, and fully committed to apply.</p>
                    <button
                      className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg mt-2"
                      onClick={() => {
                        setIsModalOpen(false);
                        setStep(1);
                      }}
                      type="button"
                    >
                      Got it
                    </button>
                  </>
                )}
              </div>
            )}

            {step < 5 && (
              <div className="flex justify-between items-center pt-4">
                {step > 1 ? (
                  <button 
                    onClick={prevStep} 
                    className="text-gray-600 hover:underline px-4 py-2"
                    type="button"
                  >
                    Back
                  </button>
                ) : <span />}

                {step < 4 ? (
                  <button
                    onClick={nextStep}
                    className={`px-4 py-2 rounded transition-colors ${canProceed()
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                    type="button"
                    disabled={!canProceed()}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className={`px-4 py-2 rounded transition-colors ${canProceed()
                      ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                    type="button"
                    disabled={!canProceed()}
                  >
                    Submit Application
                  </button>
                )}
              </div>
            )}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-3 text-gray-400 hover:text-gray-600"
              type="button"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
