import { type Metadata } from 'next'
import NavBar from '../components/navBar'
import Footer from '../components/footer'
import { Inter, Roboto_Mono } from 'next/font/google'
import './globals.css'

// Importaciones del lado del cliente se manejarán en un componente cliente separado
import ClientLayout from './client-layout'

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
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}