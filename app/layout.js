import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Footer from "./components/ui/Footer/Footer";
import Link from "next/link";
import { AuthProvider } from "./context/AuthContext";
import AuthButtons from "./components/AuthButtons";
import MobileMenu from "./components/MobileMenu";

const vazirmatn = Vazirmatn({ 
  subsets: ["arabic"],
  display: 'swap',
  variable: '--font-vazirmatn',
});

export const metadata = {
  title: "تگانه",
  description: "موتور جستجوی فارسی تگانه",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body className={`${vazirmatn.className} min-h-screen flex flex-col`}>
        <AuthProvider>
          <nav className="bg-gray-800 py-3 sm:py-4 px-4 text-white relative">
            <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
              <div className="flex items-center justify-between w-full sm:w-auto">
                <Link href="/" className="text-lg sm:text-xl font-bold">
                  تگانه
                </Link>
                <div className="hidden sm:flex items-center space-x-6 mr-8">
                  <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                    صفحه اصلی
                  </Link>
                  <Link href="/categories" className="text-gray-300 hover:text-white transition-colors">
                    دسته‌بندی‌ها
                  </Link>
                  <Link href="/tags" className="text-gray-300 hover:text-white transition-colors">
                    تگ‌ها
                  </Link>
                  <Link href="/agencies" className="text-gray-300 hover:text-white transition-colors">
                    منابع خبری
                  </Link>
                  <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
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
