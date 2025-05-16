const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['placeholder.com', 'via.placeholder.com', 'images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
    unoptimized: true,
  },
  experimental: {
    serverActions: true,
    optimizeCss: true,
    serverComponentsExternalPackages: ['mongodb'],
  },
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
