/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*',
        permanent: true,
      },
    ]
  }
}

module.exports = nextConfig
