/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
  images: {
    domains: ['api.taganeh.ir', 'localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  // بهینه‌سازی performance
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  // افزایش timeout برای API calls
  serverRuntimeConfig: {
    maxDuration: 30,
  },
  // بهینه‌سازی bundle
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      };
    }
    return config;
  },
};

export default nextConfig;
