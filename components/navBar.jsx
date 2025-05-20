'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
    useUser
  } from '@clerk/nextjs'
import { Menu, X, MessageSquare } from 'lucide-react'

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isLoaded, user } = useUser()

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-sm ">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo a la izquierda */}
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
              FixTogether
            </h1>
          </Link>

          {/* Navegación centrada - Desktop */}
          <nav className="hidden md:flex items-center">
            <div className="flex space-x-6">
              <Link href="/" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">
                Home
              </Link>
              <Link href="/report" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">
                Report Issue
              </Link>
            
              <Link href="/fix" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">
                Fix-Support
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">
                About
              </Link>
            </div>
          </nav>

          {/* Botones de autenticación a la derecha - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              {isLoaded && user && (
                <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-teal-50 px-3 py-1.5 rounded-full border border-emerald-200 shadow-sm transition-all hover:shadow-md hover:border-emerald-300 group">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-emerald-600 group-hover:text-emerald-700 transition-colors" />
                    <span className="font-medium text-emerald-700 group-hover:text-emerald-800 transition-colors">
                      {user.firstName || user.username || 'User'}
                    </span>
                  </div>
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full blur opacity-30 group-hover:opacity-60 transition-opacity"></div>
                    <UserButton 
                      afterSignOutUrl="/" 
                      appearance={{
                        elements: {
                          userButtonAvatarBox: "h-8 w-8 border-2 border-emerald-200 group-hover:border-emerald-300 transition-colors"
                        }
                      }}
                    />
                  </div>
                </div>
              )}
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="md:hidden">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/20 z-40 transition-opacity duration-200"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Drawer Menu Content */}
            <div className="fixed right-0 top-0 h-screen w-[280px] bg-white shadow-xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
              {/* Header with close button */}
              <div className="flex items-center justify-between p-5 border-b">
                <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 px-6 py-6 overflow-y-auto">
                <ul className="space-y-6">
                  <li>
                    <Link 
                      href="/" 
                      className="block text-gray-700 hover:text-emerald-600 transition-colors font-medium text-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/report" 
                      className="block text-gray-700 hover:text-emerald-600 transition-colors font-medium text-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Report Issue
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/donate" 
                      className="block text-gray-700 hover:text-emerald-600 transition-colors font-medium text-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Donate
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/fix" 
                      className="block text-gray-700 hover:text-emerald-600 transition-colors font-medium text-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Fix Issues
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/about" 
                      className="block text-gray-700 hover:text-emerald-600 transition-colors font-medium text-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      About
                    </Link>
                  </li>
                </ul>
              </nav>

              {/* Auth Buttons */}
              <div className="p-6 border-t bg-gray-50 rounded-b-2xl">
                <SignedOut>
                  <div className="space-y-4">
                    <SignInButton mode="modal">
                      <button 
                        className="w-full px-4 py-2.5 text-gray-700 hover:text-emerald-600 transition-colors font-medium text-lg"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign In
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button 
                        className="w-full px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium text-lg"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign Up
                      </button>
                    </SignUpButton>
                  </div>
                </SignedOut>
                <SignedIn>
                  <div className="flex justify-center">
                    {isLoaded && user && (
                      <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-2.5 rounded-xl border border-emerald-200 shadow-sm">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-5 w-5 text-emerald-600" />
                          <span className="font-medium text-emerald-700 text-lg">
                            {user.firstName || user.username || 'User'}
                          </span>
                        </div>
                        <div className="relative">
                          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full blur opacity-30"></div>
                          <UserButton 
                            afterSignOutUrl="/" 
                            appearance={{
                              elements: {
                                userButtonAvatarBox: "h-9 w-9 border-2 border-emerald-200"
                              }
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </SignedIn>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}