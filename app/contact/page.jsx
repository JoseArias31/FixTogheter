"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react"
import Footer from "@/components/footer"
import NavBar from "@/components/navBar"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all required fields")
      setIsSubmitting(false)
      return
    }
    
    // Simulate form submission
    try {
      // In a real implementation, you would send the form data to your backend
      // await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      })
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="container mx-auto px-4 py-16 mt-16">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-emerald-600 hover:underline flex items-center gap-2 mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          
          <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold text-emerald-700 mb-6">Get in Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-emerald-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:info@fixtogether.com" className="text-gray-600 hover:text-emerald-600 transition-colors">
                        info@fixtogether.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-emerald-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <a href="tel:+15551234567" className="text-gray-600 hover:text-emerald-600 transition-colors">
                        +1 (555) 123-4567
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-emerald-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-gray-600">
                        123 Community Ave<br />
                        Toronto, ON M5V 2K4<br />
                        Canada
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-emerald-50 rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-emerald-700 mb-3">Support Hours</h2>
                <div className="space-y-2 text-gray-700">
                  <p><span className="font-medium">Monday - Friday:</span> 9:00 AM - 6:00 PM EST</p>
                  <p><span className="font-medium">Saturday:</span> 10:00 AM - 2:00 PM EST</p>
                  <p><span className="font-medium">Sunday:</span> Closed</p>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-emerald-700 mb-6">Send Us a Message</h2>
                
                {isSubmitted ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="bg-emerald-100 rounded-full p-3">
                        <CheckCircle className="h-8 w-8 text-emerald-600" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-emerald-700 mb-2">Thank You!</h3>
                    <p className="text-gray-700 mb-4">
                      Your message has been sent successfully. We'll get back to you as soon as possible.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg">
                        {error}
                      </div>
                    )}
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="5"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      ></textarea>
                    </div>
                    
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-emerald-700 mb-2">How quickly will I get a response?</h3>
                  <p className="text-gray-700">
                    We aim to respond to all inquiries within 24-48 business hours. For urgent matters, please call our support line.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-emerald-700 mb-2">I'm having technical issues. What should I do?</h3>
                  <p className="text-gray-700">
                    Please provide details about the issue you're experiencing, including your device, browser, and steps to reproduce the problem.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-emerald-700 mb-2">Can I report an emergency through this form?</h3>
                  <p className="text-gray-700">
                    No. FixTogether is not for emergencies. Please contact local emergency services (911) for urgent situations requiring immediate attention.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-emerald-700 mb-2">How do I become a partner?</h3>
                  <p className="text-gray-700">
                    If you're interested in partnering with FixTogether, please contact us with details about your organization and how you'd like to collaborate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
     
    </div>
  )
}
