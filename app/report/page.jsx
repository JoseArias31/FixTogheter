"use client"

import { useState, useEffect } from "react"
import { Camera, MapPin, AlertCircle, DollarSign, Clock, Calendar, CreditCard, Toggle } from "lucide-react"
import Link from "next/link"
import { useUser } from '@clerk/nextjs'
import { uploadImage } from "@/lib/storage/cliente";
import { deleteImageFromBucket } from "@/lib/storage/deleteImageFromBucket";

export default function ReportIssuePage() {
  const { user } = useUser();
  const [location, setLocation] = useState(null)
  const [isLocating, setIsLocating] = useState(false)
  const [files, setFiles] = useState([])
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    priority: "medium",
    name: "",
    organization: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    city: "",
    province: "",
    compensation: "",
    estimateTime: "",
    difficulty: "",
    skillsNeeded: "",
    // New donation-related fields
    amount_needed: 20,
    amount_raised: 0,
    min_donation: 5,
    max_donation: 20,
    donation_active: true,
    currency: "CAD",
    daysLeft: 7
  })

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.fullName || user.username || "",
        email: user.primaryEmailAddress?.emailAddress || ""
      }));
    }
  }, [user]);

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

  const handleSave = async (e) => {
    e.preventDefault();
     // 2. Upload new images (those with File objects)
     for (const img of (currentProduct.images || [])) {
      if (img.file) {
        const { imageUrl, error } = await uploadImage({ file: img.file, bucket: "fixtogether" });
        if (!error && imageUrl) {
          await supabase.from("productimages").insert({
            product_id: productId,
            url: imageUrl,
            alt: img.alt || "",
          });
        }
      }
    }
  }

  //This is an example of how to delete images from the storage
  // await deleteImageFromBucket(img.url, "images");
  // // Remove from productimages table
  // await supabase.from("productimages(This table is fake)").delete().eq("id", img.id);


  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Starting form submission...');
    
    try {
      // Validate required fields
      const requiredFields = ['category', 'title', 'description'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        console.error('Missing required fields:', missingFields);
        alert(`Please fill in the following required fields: ${missingFields.join(', ')}`);
        return;
      }

      console.log('Form data:', formData);
      console.log('Location:', location);
      console.log('Files:', files);

      // Convert image files to base64
      const imageFiles = files.filter(f => f.type.startsWith('image/'));
      const imagePromises = imageFiles.map(file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      }));

      console.log('Converting images to base64...');
      const base64Images = await Promise.all(imagePromises);
      console.log('Converted', base64Images.length, 'images');

      // Prepare the request body
      const requestBody = {
        ...formData,
        location,
        files: files.map(f => f.name),
        images: base64Images
      };

      console.log('Sending request with body:', {
        ...requestBody,
        images: `${base64Images.length} images`
      });

      const response = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Issue reported successfully:', data);
        alert('Issue reported successfully! Thank you for your contribution.');
        
        // Reset form
        setFormData({
          category: "",
          title: "",
          description: "",
          priority: "medium",
          name: user?.fullName || user?.username || "",
          organization: "",
          email: user?.primaryEmailAddress?.emailAddress || "",
          phone: "",
          address: "",
          country: "",
          city: "",
          province: "",
          compensation: "",
          estimateTime: "",
          difficulty: "",
          skillsNeeded: "",
          // Reset donation fields to defaults
          amount_needed: 20,
          amount_raised: 0,
          min_donation: 5,
          max_donation: 20,
          donation_active: true,
          currency: "CAD",
          daysLeft: 7
        });
        setFiles([]);
        setLocation(null);
      } else {
        console.error('Error reporting issue:', data.error);
        alert(`Error reporting issue: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50  mt-16">
    
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
                {/* Details */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-gray-50 p-2 rounded">
                       
                        <label htmlFor="compensation" className="block text-gray-700 font-medium mb-2">Compensation</label>
                <input
                  type="number"
                  id="compensation"
                  name="compensation"
                  value={formData.compensation}
                  onChange={handleInputChange}
                  placeholder="Add a Donation (optional)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                         <label htmlFor="estimateTime" className="block text-gray-700 font-medium mb-2">Estimate Time</label>
                         <select
  id="estimateTime"
  name="estimateTime"
  value={formData.estimateTime}
  onChange={handleInputChange}
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
  required
>
  <option value="">Select estimated time</option>
  {[...Array(24)].map((_, i) => (
    <option key={i + 1} value={i + 1}>
      {i + 1} {i + 1 === 1 ? 'hour' : 'hours'}
    </option>
  ))}
</select>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                         <label htmlFor="difficulty" className="block text-gray-700 font-medium mb-2">Difficulty</label>
                         <select
  id="difficulty"
  name="difficulty"
  value={formData.difficulty}
  onChange={handleInputChange}
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
  required
>
  <option value="">Select difficulty</option>
  <option value="easy">Easy</option>
  <option value="medium">Medium</option>
  <option value="hard">Hard</option>
</select>

                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                         <label htmlFor="skillsNeeded" className="block text-gray-700 font-medium mb-2">Skills Needed</label>
                         <select
  id="skillsNeeded"
  name="skillsNeeded"
  value={formData.skillsNeeded}
  onChange={handleInputChange}
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
  required
>
  <option value="">Select skills</option>
  <option value="Overall">Overall Skills</option>
  <option value="Plumbing">Plumbing</option>
  <option value="Electrical">Electrical</option>
  <option value="Mechanical">Mechanical</option>
  <option value="Landscaping">Landscaping</option>
  <option value="Waste-management">Waste Management</option>
  <option value="Construction">Construction</option>
  <option value="Carpentry">Carpentry</option>
  <option value="Painting">Painting</option>
  <option value="Roofing">Roofing</option>
  <option value="Welding">Welding</option>
  <option value="HVAC">HVAC (Heating, Ventilation & AC)</option>
  <option value="Masonry">Masonry</option>
  <option value="Demolition">Demolition</option>
  <option value="Cleaning">Cleaning</option>
  <option value="Pest-control">Pest Control</option>
  <option value="Traffic-control">Traffic Control</option>
  <option value="Surveying">Surveying</option>
  <option value="Equipment-operation">Heavy Equipment Operation</option>
  <option value="Safety-inspection">Safety Inspection</option>
  <option value="First-aid">First Aid</option>
  <option value="Signage">Signage & Marking</option>
  <option value="IT-support">IT Support</option>
  <option value="Customer-service">Customer Service</option>
  <option value="Other">Other</option>
</select>
                      </div>
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

              {/* Name */}
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>

              {/* Organization */}
              <div className="mb-6">
                <label htmlFor="organization" className="block text-gray-700 font-medium mb-2">Organization</label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  placeholder="Your organization (optional)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              {/* Email Address */}
              <div className="mb-6">
                <label htmlFor="gmail" className="block text-gray-700 font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  id="gmail"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>

              {/* Phone */}
              <div className="mb-6">
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone (optional)</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Your phone number (optional)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
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
<div className="flex flex-col sm:flex-row sm:gap-4 justify-between">
 {/* Country (after Location) */}
              <div className="mb-6">
                <label htmlFor="country" className="block text-gray-700 font-medium mb-2">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Country"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              {/* City (after Location) */}
              <div className="mb-6">
                <label htmlFor="city" className="block text-gray-700 font-medium mb-2">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
                {/* Province (after Location) */}
              <div className="mb-6">
                <label htmlFor="province" className="block text-gray-700 font-medium mb-2">Province</label>
                <input
                  type="text"
                  id="province"
                  name="province"
                  value={formData.province}
                  onChange={handleInputChange}
                  placeholder="Province"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              
              </div>

             
 
              {/* Local Address (after Location) */}
              <div className="mb-6">
                <label htmlFor="address" className="block text-gray-700 font-medium mb-2">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
             

              {/* Donation Section */}
              <div className="mb-8 mt-10 border border-emerald-100 rounded-lg p-6 bg-emerald-50">
                <h3 className="text-lg font-semibold mb-4 flex items-center text-emerald-800">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Funding Information
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Set up funding details for your issue. This will allow community members to contribute to resolving this issue.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Amount Needed */}
                  <div>
                    <label htmlFor="amount_needed" className="block text-gray-700 font-medium mb-2">
                      Amount Needed ($)
                      <span className="text-xs text-gray-500 ml-1">(min $20)</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        id="amount_needed"
                        name="amount_needed"
                        min="20"
                        value={formData.amount_needed}
                        onChange={handleInputChange}
                        className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">For larger amounts, admin will review and adjust if needed.</p>
                  </div>
                  
                  {/* Currency */}
                  <div>
                    <label htmlFor="currency" className="block text-gray-700 font-medium mb-2">Currency</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CreditCard className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        id="currency"
                        name="currency"
                        value={formData.currency}
                        onChange={handleInputChange}
                        className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        <option value="CAD">Canadian Dollar (CAD)</option>
                        <option value="USD">US Dollar (USD)</option>
                        <option value="EUR">Euro (EUR)</option>
                        <option value="GBP">British Pound (GBP)</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Min Donation */}
                  <div>
                    <label htmlFor="min_donation" className="block text-gray-700 font-medium mb-2">
                      Minimum Donation
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        id="min_donation"
                        name="min_donation"
                        min="1"
                        value={formData.min_donation}
                        onChange={handleInputChange}
                        className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>
                  
                  {/* Max Donation */}
                  <div>
                    <label htmlFor="max_donation" className="block text-gray-700 font-medium mb-2">
                      Maximum Donation
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        id="max_donation"
                        name="max_donation"
                        min={formData.min_donation}
                        max={formData.amount_needed}
                        value={formData.max_donation}
                        onChange={handleInputChange}
                        className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">For larger donations, donors should contact admin.</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Days Left */}
                  <div>
                    <label htmlFor="daysLeft" className="block text-gray-700 font-medium mb-2">
                      Funding Duration (Days)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        id="daysLeft"
                        name="daysLeft"
                        value={formData.daysLeft}
                        onChange={handleInputChange}
                        className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        <option value="2">2 days</option>
                        <option value="3">3 days</option>
                        <option value="5">5 days</option>
                        <option value="7">7 days</option>
                        <option value="10">10 days</option>
                        <option value="14">14 days</option>
                        <option value="21">21 days</option>
                        <option value="30">30 days</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Donation Active */}
                  <div className="flex items-center mt-8">
                    <label htmlFor="donation_active" className="flex items-center cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="donation_active"
                          name="donation_active"
                          checked={formData.donation_active}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              donation_active: e.target.checked
                            });
                          }}
                          className="sr-only"
                        />
                        <div className={`block w-14 h-8 rounded-full ${formData.donation_active ? 'bg-emerald-500' : 'bg-gray-300'} transition-colors`}></div>
                        <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform ${formData.donation_active ? 'translate-x-6' : ''}`}></div>
                      </div>
                      <div className="ml-3 text-gray-700 font-medium">
                        Enable Donations
                      </div>
                    </label>
                  </div>
                </div>
                
                {/* Funding Preview */}
                {formData.donation_active && (
                  <div className="mt-6 p-4 border border-emerald-200 rounded-lg bg-white">
                    <h4 className="font-medium text-emerald-800 mb-2">Funding Preview</h4>
                    <div className="mb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">$0 raised</span>
                        <span className="text-gray-500">of ${formData.amount_needed} goal</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-emerald-600 h-2.5 rounded-full"
                          style={{ width: '0%' }}
                        ></div>
                      </div>
                      <div className="text-right text-xs text-gray-500 mt-1">{formData.daysLeft} days left</div>
                    </div>
                    <div className="text-xs text-gray-500">
                      Accepts donations between ${formData.min_donation} and ${formData.max_donation} in {formData.currency}
                    </div>
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
                          {file.type && file.type.startsWith('image') ? (
                            <img src={URL.createObjectURL(file)} alt={file.name} className="w-full h-24 object-cover rounded mb-2" />
                          ) : file.type && file.type.startsWith('video') ? (
                            <video src={URL.createObjectURL(file)} controls className="w-full h-24 object-cover rounded mb-2" />
                          ) : null}
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
