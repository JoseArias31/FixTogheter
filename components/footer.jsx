import Link from "next/link";


export default function Footer() {

return(

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">FixTogether</h3>
              <p className="text-gray-300">A community-driven platform for reporting and fixing local issues.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/report" className="text-gray-300 hover:text-white">
                    Report Issue
                  </Link>
                </li>
                <li>
                  <Link href="/fix" className="text-gray-300 hover:text-white">
                    Donate
                  </Link>
                </li>
                <li>
                  <Link href="/fix" className="text-gray-300 hover:text-white">
                    Fix Issues
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/faq" className="text-gray-300 hover:text-white">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/guidelines" className="text-gray-300 hover:text-white">
                    Community Guidelines
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-300 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-300 hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="https://twitter.com" className="text-gray-300 hover:text-white">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="https://facebook.com" className="text-gray-300 hover:text-white">
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link href="https://instagram.com" className="text-gray-300 hover:text-white">
                    Instagram
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; {new Date().getFullYear()} FixTogether. All rights reserved. Developer by <a className="underline" target="blank" href="https://jose-arias-portfolio.vercel.app/">Jose Arias</a></p>
          </div>
        </div>
      </footer>
)
}