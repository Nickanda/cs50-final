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
        destination: 'http://127.0.0.1:3001/api/:path*',
        permanent: true,
      },
    ]
  }
}

module.exports = nextConfig
