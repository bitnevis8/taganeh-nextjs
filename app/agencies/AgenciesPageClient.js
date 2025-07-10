'use client';
import useSWR from 'swr';
import Link from 'next/link';
import { API_ENDPOINTS } from '../config/api';

const fetcher = (url) => fetch(url).then(res => res.json());

export default function AgenciesPageClient({ initialData }) {
  const { data, error, isLoading } = useSWR(
    API_ENDPOINTS.agencies.getAll,
    fetcher,
    { fallbackData: initialData }
  );

  if (isLoading) return <div className="text-center py-12">در حال بارگذاری...</div>;
  if (error) return <div className="text-center py-12 text-red-500">خطا در دریافت منابع خبری</div>;

  const agencies = data?.data || [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">منابع خبری</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            لیست خبرگزاری‌ها و منابع خبری معتبر
          </p>
        </div>
        {agencies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agencies.map((agency) => (
              <div key={agency.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <Link href={agency.websiteUrl || '#'} target="_blank" rel="noopener noreferrer">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">{agency.name}</h3>
                      {agency.isActive && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">فعال</span>
                      )}
                    </div>
                    {agency.description && (
                      <p className="text-gray-600 mb-4 line-clamp-3">{agency.description}</p>
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">هیچ منبع خبری یافت نشد</h3>
            <p className="text-gray-500">در حال حاضر هیچ منبع خبری در سیستم وجود ندارد.</p>
          </div>
        )}
      </div>
    </div>
  );
} 