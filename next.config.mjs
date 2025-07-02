/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.afkarnews.com',
      },
      {
        protocol: 'https',
        hostname: 'newsmedia.tasnimnews.com',
      },
      {
        protocol: 'https',
        hostname: 'media.khabaronline.ir',
      },
      {
        protocol: 'https',
        hostname: 'www.tasnimnews.com',
      },
      {
        protocol: 'https',
        hostname: 'www.khabaronline.ir',
      },
      {
        protocol: 'https',
        hostname: 'media.ettelaat.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.namehnews.com',
      },
      {
        protocol: 'https',
        hostname: 'static2.parsnews.com',
      },
      {
        protocol: 'https',
        hostname: 'static3.parsnews.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.fararu.com',
      },
      // دامنه‌های دیگر خبرگزاری‌ها را نیز در صورت نیاز اضافه کنید
    ],
  },
};

export default nextConfig;
