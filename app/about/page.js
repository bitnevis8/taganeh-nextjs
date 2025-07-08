export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">درباره تگانه</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            سریع‌ترین موتور جستجوگر خبر ایران
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">تگانه چیست؟</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              تگانه یک پلتفرم پیشرفته خبری است که با استفاده از فناوری‌های نوین، اخبار لحظه به لحظه را از معتبرترین خبرگزاری‌های پارسی‌زبان گردآوری و ارائه می‌دهد. هدف ما ارائه سریع‌ترین و دقیق‌ترین اخبار به کاربران فارسی‌زبان است.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">ویژگی‌های کلیدی</h3>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>جستجوی لحظه‌ای اخبار از منابع معتبر</li>
              <li>دسته‌بندی هوشمند اخبار بر اساس موضوعات</li>
              <li>سیستم تگ‌گذاری پیشرفته برای دسترسی آسان</li>
              <li>رابط کاربری مدرن و کاربرپسند</li>
              <li>پشتیبانی کامل از زبان فارسی و RTL</li>
              <li>بهینه‌سازی برای موتورهای جستجو (SEO)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">منابع خبری</h3>
            <p className="text-gray-700 mb-4">
              تگانه اخبار خود را از معتبرترین خبرگزاری‌های ایران و جهان گردآوری می‌کند:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">خبرگزاری‌های رسمی</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• خبرگزاری فارس</li>
                  <li>• خبرگزاری تسنیم</li>
                  <li>• خبرگزاری ایرنا</li>
                  <li>• خبرگزاری مهر</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">خبرگزاری‌های تخصصی</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• خبرگزاری ایسنا</li>
                  <li>• خبرگزاری دانشجو</li>
                  <li>• خبرگزاری آنا</li>
                  <li>• خبرگزاری برنا</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">فناوری‌های مورد استفاده</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">هوش مصنوعی</h4>
                <p className="text-sm text-gray-600">پردازش هوشمند اخبار</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">سرعت بالا</h4>
                <p className="text-sm text-gray-600">به‌روزرسانی لحظه‌ای</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">امنیت بالا</h4>
                <p className="text-sm text-gray-600">حفاظت از اطلاعات</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">ماموریت ما</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              ماموریت تگانه ارائه سریع‌ترین و دقیق‌ترین اخبار به کاربران فارسی‌زبان است. ما متعهد به ارائه اطلاعات معتبر، به‌روز و قابل اعتماد هستیم و تلاش می‌کنیم تا تجربه‌ای منحصر به فرد در زمینه دسترسی به اخبار ارائه دهیم.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">ارزش‌های ما</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-r border-gray-200 pr-6">
                <h4 className="font-semibold text-gray-900 mb-2">دقت و اعتبار</h4>
                <p className="text-sm text-gray-600">
                  ما متعهد به ارائه اخبار دقیق و معتبر از منابع موثق هستیم.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">سرعت و به‌روزرسانی</h4>
                <p className="text-sm text-gray-600">
                  ارائه سریع‌ترین اخبار با به‌روزرسانی لحظه‌ای از منابع مختلف.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">ارتباط با ما</h2>
          <p className="text-gray-700 mb-6">
            برای ارتباط با تیم تگانه و ارائه پیشنهادات، می‌توانید از طریق روش‌های زیر با ما در تماس باشید:
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="mailto:info@taganeh.ir"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              ارسال ایمیل
            </a>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              فرم تماس
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 