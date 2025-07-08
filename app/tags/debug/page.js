import { API_ENDPOINTS } from '../../config/api';

async function testDatabase() {
  try {
    const response = await fetch(API_ENDPOINTS.tags.testDatabase, {
      cache: 'no-store'
    });
    if (!response.ok) throw new Error('Failed to fetch database test');
    const data = await response.json();
    return data.data || {};
  } catch (error) {
    console.error('Error testing database:', error);
    return {};
  }
}

export default async function DebugPage() {
  const dbInfo = await testDatabase();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">تست دیتابیس</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">اطلاعات کلی</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold text-blue-800 mb-2">مقالات</h3>
              <div className="text-2xl font-bold text-blue-600">{dbInfo.articles?.total || 0}</div>
              <div className="text-sm text-blue-600">کل مقالات</div>
              <div className="text-lg font-bold text-blue-500">{dbInfo.articles?.active || 0}</div>
              <div className="text-sm text-blue-500">مقالات فعال</div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-bold text-green-800 mb-2">تگ‌ها</h3>
              <div className="text-2xl font-bold text-green-600">{dbInfo.tags?.total || 0}</div>
              <div className="text-sm text-green-600">کل تگ‌ها</div>
              <div className="text-lg font-bold text-green-500">{dbInfo.tags?.active || 0}</div>
              <div className="text-sm text-green-500">تگ‌های فعال</div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-bold text-purple-800 mb-2">ارتباطات</h3>
              <div className="text-2xl font-bold text-purple-600">{dbInfo.relationships?.totalArticleTags || 0}</div>
              <div className="text-sm text-purple-600">کل ارتباطات مقاله-تگ</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">نمونه مقالات</h3>
              <div className="space-y-3">
                {dbInfo.articles?.sample?.map((article, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <div className="font-semibold text-gray-900">{article.title}</div>
                    <div className="text-sm text-gray-600">ID: {article.id}</div>
                    <div className="text-sm text-blue-600">تگ‌ها: {article.tagCount}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">نمونه تگ‌ها</h3>
              <div className="space-y-3">
                {dbInfo.tags?.sample?.map((tag, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <div className="font-semibold text-gray-900">{tag.name}</div>
                    <div className="text-sm text-gray-600">ID: {tag.id}</div>
                    <div className="text-sm text-green-600">مقالات: {tag.articleCount}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {dbInfo.testCounts && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">تست شمارش</h3>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {dbInfo.testCounts.map((test, index) => (
                    <div key={index} className="bg-white p-3 rounded-lg border">
                      <div className="font-semibold text-gray-900">{test.name}</div>
                      <div className="text-sm text-gray-600">ID: {test.id}</div>
                      <div className="text-sm text-red-600">Association: {test.associationCount}</div>
                      <div className="text-sm text-green-600">Direct: {test.directCount}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 