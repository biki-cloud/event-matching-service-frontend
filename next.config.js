/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
    domains: ['localhost'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
}

module.exports = nextConfig
