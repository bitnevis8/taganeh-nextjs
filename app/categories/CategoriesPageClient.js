'use client';
import useSWR from 'swr';
import Link from 'next/link';
import { API_ENDPOINTS } from '../config/api';

const fetcher = (url) => fetch(url).then(res => res.json());

export default function CategoriesPageClient({ initialData }) {
  const { data, error, isLoading } = useSWR(API_ENDPOINTS.categories.getAll, fetcher, { fallbackData: initialData });

  if (isLoading) return <div className="text-center py-12">در حال بارگذاری...</div>;
  if (error) return <div className="text-center py-12 text-red-500">خطا در دریافت دسته‌بندی‌ها</div>;

  const categories = data?.data || [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">دسته‌بندی‌های خبری</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            اخبار را بر اساس دسته‌بندی‌های مختلف مشاهده کنید و مطالب مورد علاقه خود را پیدا کنید
          </p>
        </div>
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div key={category.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <Link href={`/categories/${category.slug}`} prefetch={true}>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">{category.name}</h3>
                      {category.isActive && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">فعال</span>
                      )}
                    </div>
                    {category.description && (
                      <p className="text-gray-600 mb-4 line-clamp-3">{category.description}</p>
                    )}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(category.createdAt).toLocaleDateString('fa-IR')}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        مشاهده اخبار
                      </span>
                    </div>
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">هیچ دسته‌بندی یافت نشد</h3>
            <p className="text-gray-500">در حال حاضر هیچ دسته‌بندی در سیستم وجود ندارد.</p>
          </div>
        )}
      </div>
    </div>
  );
} 