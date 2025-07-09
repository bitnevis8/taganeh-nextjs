import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Footer from "./components/ui/Footer/Footer";
import Link from "next/link";
import { AuthProvider } from "./context/AuthContext";
import AuthButtons from "./components/AuthButtons";
import MobileMenu from "./components/MobileMenu";
import StructuredData from "./components/StructuredData";

const vazirmatn = Vazirmatn({ 
  subsets: ["arabic"],
  display: 'swap',
  variable: '--font-vazirmatn',
});

export const metadata = {
  title: {
    default: "تگانه - موتور جستجوی فارسی اخبار",
    template: "%s | تگانه"
  },
  description: "تگانه، سریع‌ترین موتور جستجوگر خبر ایران که اخبار لحظه به لحظه را از معتبرترین خبرگزاری‌های پارسی‌زبان گردآوری می‌کند. اخبار سیاسی، اقتصادی، ورزشی، فرهنگی و اجتماعی ایران و جهان.",
  keywords: ["اخبار", "خبر", "اخبار ایران", "اخبار جهان", "موتور جستجو", "خبرگزاری", "اخبار سیاسی", "اخبار اقتصادی", "اخبار ورزشی"],
  authors: [{ name: "تگانه" }],
  creator: "تگانه",
  publisher: "تگانه",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://taganeh.ir'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "تگانه - موتور جستجوی فارسی اخبار",
    description: "سریع‌ترین موتور جستجوگر خبر ایران که اخبار لحظه به لحظه را از معتبرترین خبرگزاری‌های پارسی‌زبان گردآوری می‌کند.",
    url: 'https://taganeh.ir',
    siteName: 'تگانه',
    locale: 'fa_IR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "تگانه - موتور جستجوی فارسی اخبار",
    description: "سریع‌ترین موتور جستجوگر خبر ایران",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#1f2937" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <StructuredData />
      </head>
      <body className={`${vazirmatn.className} min-h-screen flex flex-col`}>
        <AuthProvider>
          <nav className="bg-gray-800 py-3 sm:py-4 px-4 text-white relative">
            <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
              <div className="flex items-center justify-between w-full sm:w-auto">
                <Link href="/" className="text-lg sm:text-xl font-bold" prefetch={true}>
                  تگانه
                </Link>
                <div className="hidden sm:flex items-center space-x-6 mr-8">
                  <Link href="/" className="text-gray-300 hover:text-white transition-colors" prefetch={true}>
                    صفحه اصلی
                  </Link>
                  <Link href="/categories" className="text-gray-300 hover:text-white transition-colors" prefetch={true}>
                    دسته‌بندی‌ها
                  </Link>
                  <Link href="/tags" className="text-gray-300 hover:text-white transition-colors" prefetch={true}>
                    تگ‌ها
                  </Link>
                  <Link href="/agencies" className="text-gray-300 hover:text-white transition-colors" prefetch={true}>
                    منابع خبری
                  </Link>
                  <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors" prefetch={true}>
                    داشبورد
                  </Link>
                </div>
                <MobileMenu />
              </div>
              <AuthButtons />
            </div>
          </nav>
          <div className="min-h-screen w-full">
            {children}
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
