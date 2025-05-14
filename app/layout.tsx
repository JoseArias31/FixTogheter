import { type Metadata } from 'next'
import NavBar from '../components/navBar'
import {
  ClerkProvider

} from '@clerk/nextjs'
import { Inter, Roboto_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Roboto_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'FixTogether',
  description: 'Community-driven platform for reporting and fixing local issues',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <ClerkProvider>
          <NavBar />
          {children}
        </ClerkProvider>
      </body>
    </html>
  )
}