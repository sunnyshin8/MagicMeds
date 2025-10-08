/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Allow production builds to complete with ESLint warnings
    ignoreDuringBuilds: true,
    dirs: ['pages', 'utils', 'components', 'lib', 'src'],
  },
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has TypeScript errors
    ignoreBuildErrors: false,
  },
  experimental: {
    // Enable experimental features without custom loaders
  },
  // Disable strict mode for better performance during development
  reactStrictMode: true,
  // Enable webpack bundle analyzer in development
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Only run in development on client side
      config.devtool = 'eval-source-map'
    }
    return config
  },
  // Environment variables for client-side
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
  // Image configuration for external domains
  images: {
    domains: ['localhost', 'api.placeholder.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig