"use client"

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft, Check, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const canceled = searchParams.get('canceled')
  const success = searchParams.get('success')
  const issueId = searchParams.get('issueId')
  const amount = searchParams.get('amount')

  useEffect(() => {
    if (canceled) {
      console.log('Order canceled -- continue to shop around and checkout when you\'re ready.')
    }
    if (success) {
      console.log('Order placed! You will receive an email confirmation.')
    }
  }, [canceled, success])

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-12">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {success ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Thank You for Your Support!</h1>
            <p className="text-gray-600 mb-6">
              Your donation of ${amount} has been successfully processed. Together, we're making our community better.
            </p>
            <Link 
              href={issueId ? `/fix/${issueId}` : "/fix"} 
              className="inline-flex items-center text-emerald-600 hover:text-emerald-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {issueId ? "Return to issue" : "Browse more issues"}
            </Link>
          </div>
        ) : canceled ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-8 w-8 text-yellow-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Donation Canceled</h1>
            <p className="text-gray-600 mb-6">
              Your donation process was canceled. No worries! You can try again whenever you're ready.
            </p>
            <Link 
              href={issueId ? `/fix/${issueId}` : "/fix"} 
              className="inline-flex items-center text-emerald-600 hover:text-emerald-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {issueId ? "Return to issue" : "Browse more issues"}
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Processing Your Donation</h1>
            <p className="text-gray-600 mb-6">
              Please wait while we process your request...
            </p>
            <Link 
              href={issueId ? `/fix/${issueId}` : "/fix"} 
              className="inline-flex items-center text-emerald-600 hover:text-emerald-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {issueId ? "Return to issue" : "Browse more issues"}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
