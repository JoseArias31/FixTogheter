/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: false
  },
  images: {
    domains: ['img.clerk.com', 'images.clerk.dev']
  }
}

module.exports = nextConfig
