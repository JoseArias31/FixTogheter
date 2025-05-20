import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../../lib/stripe'
import { supabase } from '../../../../lib/supabaseClient'

export async function POST(request) {
  try {
    const headersList = headers()
    const origin = headersList.get('origin')
    
    // Get form data from the request
    const formData = await request.formData()
    const issueId = formData.get('issueId')
    const amount = formData.get('amount') || '10' // Default to $10 if no amount provided
    
    // Convert amount to cents for Stripe
    const amountInCents = Math.round(parseFloat(amount) * 100)
    
    // Fetch issue details if issueId is provided
    let issueTitle = 'Community Support'
    if (issueId) {
      try {
        const { data: issue } = await supabase
          .from('issues')
          .select('title')
          .eq('id', issueId)
          .single()
        
        if (issue?.title) {
          issueTitle = `Support for: ${issue.title}`
        }
      } catch (error) {
        console.error('Error fetching issue details:', error)
      }
    }

    // Create Checkout Sessions with dynamic parameters
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: issueTitle,
              description: 'Thank you for supporting our community initiative!',
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      metadata: {
        issueId: issueId || '',
      },
      success_url: `${origin}/donate/checkout?success=true&issueId=${issueId || ''}&amount=${amount}`,
      cancel_url: `${origin}/donate/checkout?canceled=true&issueId=${issueId || ''}`,
    });
    
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    console.error('Stripe checkout error:', err)
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}