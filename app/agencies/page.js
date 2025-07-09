import { API_ENDPOINTS } from '../config/api';

async function getAgencies() {
  try {
    const response = await fetch(API_ENDPOINTS.agencies.getAll, {
      // کش غیرفعال شده - بعداً فعال خواهد شد
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch agencies');
    }
    
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching agencies:', error);
    return [];
  }
}

export default async function AgenciesPage() {
  const agencies = await getAgencies();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">منابع خبری</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            معتبرترین خبرگزاری‌های ایران و جهان که اخبار خود را در تگانه منتشر می‌کنند
          </p>
        </div>

        {/* Agencies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {agencies.map((agency) => (
            <a
              key={agency.id}
              href={`/agencies/${agency.id}`}
              className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {agency.name}
                  </h3>
                  {agency.isActive && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      فعال
                    </span>
                  )}
                </div>
                
                {agency.description && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {agency.description}
                  </p>
                )}
                
                {agency.website && (
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                    </svg>
                    <span className="truncate">{agency.website}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>تاریخ ثبت:</span>
                  <span>{new Date(agency.createdAt).toLocaleDateString('fa-IR')}</span>
                </div>
              </div>
              
              {/* Hover effect indicator */}
              <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </a>
          ))}
        </div>

        {/* Empty state */}
        {agencies.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">هیچ منبع خبری یافت نشد</h3>
            <p className="mt-1 text-sm text-gray-500">در حال حاضر هیچ منبع خبری در سیستم وجود ندارد.</p>
          </div>
        )}
      </div>
    </div>
  );
} 