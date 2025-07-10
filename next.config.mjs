/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['api.taganeh.ir', 'localhost', 'taganeh.ir'],
    formats: ['image/webp', 'image/avif'],
    unoptimized: true, // برای تصاویر خارجی
  },
  // بهینه‌سازی performance
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  // تنظیم timeout برای API calls
  serverRuntimeConfig: {
    maxDuration: 120, // کاهش به 15 ثانیه برای سرعت بیشتر
  },
  // تنظیمات اضافی برای بهینه‌سازی
  experimental: {
    optimizePackageImports: ['@heroicons/react', 'react-leaflet'],
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
