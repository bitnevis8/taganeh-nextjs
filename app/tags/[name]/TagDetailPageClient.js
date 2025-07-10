'use client';
import useSWR from 'swr';
import Link from 'next/link';
import Image from 'next/image';
import { API_ENDPOINTS } from '../../config/api';

const fetcher = (url) => fetch(url).then(res => res.json());

export default function TagDetailPageClient({ tag, initialArticles }) {
  const { data, error, isLoading } = useSWR(
    API_ENDPOINTS.articles.getByTag(tag.id, 50),
    fetcher,
    { fallbackData: { data: { articles: initialArticles } } }
  );
  const articles = data?.data?.articles || [];

  if (isLoading) {
    return (
      <div className="divide-y divide-gray-200">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-6 animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
            <div className="h-4 bg-gray-100 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    );
  }
  if (error) return <div className="text-center py-12 text-red-500">خطا در دریافت اخبار تگ</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600" prefetch={true}>
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                صفحه اصلی
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <Link href="/tags" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2" prefetch={true}>
                  تگ‌ها
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">{tag.name}</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Tag Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{tag.name}</h1>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  {articles.length} خبر
                </span>
              </div>
              {tag.description && (
                <p className="text-lg text-gray-600 mb-6">{tag.description}</p>
              )}
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>تاریخ ایجاد: {new Date(tag.createdAt).toLocaleDateString('fa-IR')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <span>تگ ID: {tag.id}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/tags" className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" prefetch={true}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                بازگشت به تگ‌ها
              </Link>
            </div>
          </div>
        </div>

        {/* Articles Section */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">اخبار مرتبط با تگ &quot;{tag.name}&quot;</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {articles.length > 0 ? (
              articles.map((article, index) => (
                <div key={article.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{index + 1}</span>
                        {article.category && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">{article.category.name}</span>
                        )}
                        {article.agency && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">{article.agency.name}</span>
                        )}
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                        <Link href={`/news/${article.id}`} prefetch={true}>{article.title}</Link>
                      </h3>
                      {article.summary && (
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{article.summary}</p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {new Date(article.createdAt).toLocaleDateString('fa-IR')}
                        </span>
                        {article.readTime && (
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            {article.readTime} دقیقه مطالعه
                          </span>
                        )}
                      </div>
                    </div>
                    {article.imageUrl && (
                      <div className="ml-4 flex-shrink-0">
                        <Image src={article.imageUrl} alt={article.title} width={80} height={80} className="w-20 h-20 object-cover rounded-lg" />
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center">
                <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">هیچ خبری یافت نشد</h3>
                <p className="text-gray-500">در حال حاضر هیچ خبری با این تگ وجود ندارد.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 