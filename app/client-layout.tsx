'use client'

import { FloatingWhatsApp } from 'react-floating-whatsapp'
import { ClerkProvider } from '@clerk/nextjs'
import NavBar from '../components/navBar'
import Footer from '../components/footer'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <FloatingWhatsApp
        phoneNumber="16474252986"
        accountName="Fix Together Support"
        allowClickAway
        notification
        notificationDelay={60000}
        notificationSound
        chatMessage="Hello! How can we assist you today?"
      />
      <ClerkProvider>
        <NavBar />
        {children}
        <Footer />
      </ClerkProvider>
    </>
  )
}
