'use client';
import useSWR from 'swr';
import Link from 'next/link';
import { API_ENDPOINTS } from '../config/api';

const fetcher = (url) => fetch(url).then(res => res.json());

export default function TagsPageClient({ initialData }) {
  const { data, error, isLoading } = useSWR(
    API_ENDPOINTS.tags.getAllWithArticleCount,
    fetcher,
    { fallbackData: initialData }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                <div className="h-4 bg-gray-100 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (error) return <div className="text-center py-12 text-red-500">خطا در دریافت تگ‌ها</div>;

  const tags = data?.data?.tags || [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">تگ‌های خبری</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            اخبار را بر اساس تگ‌های مختلف مشاهده کنید و مطالب مورد علاقه خود را پیدا کنید
          </p>
        </div>
        {tags.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tags.map((tag) => (
              <div key={tag.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <Link href={`/tags/${tag.name}`} prefetch={true}>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">{tag.name}</h3>
                      {tag.articleCount > 0 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">{tag.articleCount} خبر</span>
                      )}
                    </div>
                    {tag.description && (
                      <p className="text-gray-600 mb-4 line-clamp-3">{tag.description}</p>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto h-16 w-16 text-gray-400 mb-4">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">هیچ تگی یافت نشد</h3>
            <p className="text-gray-500">در حال حاضر هیچ تگی در سیستم وجود ندارد.</p>
          </div>
        )}
      </div>
    </div>
  );
} 