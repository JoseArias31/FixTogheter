import Link from 'next/link'
import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
  } from '@clerk/nextjs'

  export default function NavBar() {
    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-sm">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center h-16">
                {/* Logo a la izquierda */}
                <Link href="/" className="flex items-center">
                  <h1 className="text-2xl font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
                    FixTogether
                  </h1>
                </Link>

                {/* Navegación centrada */}
                <nav className=" md:flex items-center  ">
                  <div className="flex space-x-6">
                    <Link href="/" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">
                      Home
                    </Link>
                    <Link href="/report" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">
                      Report Issue
                    </Link>
                    <Link href="/donate" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">
                      Donate
                    </Link>
                    <Link href="/fix" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">
                      Fix Issues
                    </Link>
                    <Link href="/about" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">
                      About
                    </Link>
                  </div>
                </nav>

                {/* Botones de autenticación a la derecha */}
                <div className="flex items-center space-x-4">
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
                    <UserButton afterSignOutUrl="/" />
                  </SignedIn>
                  
                  {/* Botón de menú móvil */}
                  <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </header>
    )
  }