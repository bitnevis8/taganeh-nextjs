import { API_ENDPOINTS } from '../config/api';
import Link from 'next/link';

async function getTagsByClasses() {
  try {
    const response = await fetch(API_ENDPOINTS.tags.getByClasses, {
      // استفاده از force-cache برای جلوگیری از dynamic server usage error
      cache: 'force-cache'
    });
    if (!response.ok) {
      console.error('API response not ok:', response.status, response.statusText);
      return [];
    }
    const data = await response.json();
    console.log('Tags by classes API response:', data);
    return data.data || [];
  } catch (error) {
    console.error('Error fetching tags by classes:', error);
    return [];
  }
}

async function getAllTagsWithArticleCount() {
  try {
    const response = await fetch(API_ENDPOINTS.tags.getAllWithArticleCount, {
      // استفاده از force-cache برای جلوگیری از dynamic server usage error
      cache: 'force-cache'
    });
    if (!response.ok) {
      console.error('API response not ok:', response.status, response.statusText);
      return { tags: [], stats: {} };
    }
    const data = await response.json();
    console.log('All tags with count API response:', data);
    return data.data || { tags: [], stats: {} };
  } catch (error) {
    console.error('Error fetching all tags:', error);
    return { tags: [], stats: {} };
  }
}

export default async function TagsPage({ searchParams }) {
  const params = await searchParams;
  const view = params?.view || 'all';
  
  // دریافت داده‌ها بر اساس حالت نمایش
  let allTags = [];
  let classesWithTags = [];
  
  let stats = {};
  
  if (view === 'all') {
    // در حالت "همه تگ‌ها"، همه تگ‌ها را دریافت کن
    const allTagsData = await getAllTagsWithArticleCount();
    allTags = allTagsData.tags || [];
    stats = allTagsData.stats || {};
  } else {
    // در حالت "طبقه‌بندی‌شده"، تگ‌ها را بر اساس کلاس دریافت کن
    classesWithTags = await getTagsByClasses();
    allTags = classesWithTags.flatMap(classItem => classItem.tags);
    allTags = allTags.filter((tag, idx, arr) => idx === arr.findIndex(t => t.id === tag.id));
    
    // محاسبه آمار برای حالت طبقه‌بندی‌شده
    const totalArticles = allTags.reduce((sum, tag) => sum + (tag.articleCount || 0), 0);
    const totalTags = allTags.length;
    stats = {
      totalTags,
      totalArticles,
      averageArticlesPerTag: totalTags > 0 ? Math.round(totalArticles / totalTags) : 0,
      classifiedTags: allTags.length,
      unclassifiedTags: 0
    };
  }
  
  // تگ‌های بدون کلاس (کلاس نال یا undefined)
  const tagsWithoutClass = allTags.filter(tag => !tag.classId && !tag.classSlug);
  // تگ‌های با کلاس
  const tagsWithClass = allTags.filter(tag => tag.classId || tag.classSlug);

  // مرتب کردن کلاس‌ها بر اساس سلسله‌مراتب (parent اول، سپس children)
  const sortedClasses = classesWithTags.sort((a, b) => {
    if ((!a.parentSlug && !b.parentSlug) || (a.parentSlug && b.parentSlug)) {
      return a.className.localeCompare(b.className, 'fa');
    }
    return a.parentSlug ? 1 : -1;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">تگ‌های خبری</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            تگ‌ها را به صورت لیست ساده یا طبقه‌بندی‌شده مشاهده کنید و روی هر تگ کلیک کنید تا اخبار مرتبط با آن را ببینید
          </p>
        </div>

        {/* Tabs Switch */}
        <div className="flex justify-center mb-8 gap-2">
          <Link
            href="/tags"
            className={`px-6 py-2 rounded-t-lg font-medium border-b-2 transition-all duration-200 ${view === 'all' ? 'bg-white border-blue-600 text-blue-700 shadow' : 'border-transparent text-gray-500 hover:text-blue-600'}`}
          >
            همه تگ‌ها
          </Link>
          <Link
            href="/tags?view=grouped"
            className={`px-6 py-2 rounded-t-lg font-medium border-b-2 transition-all duration-200 ${view === 'grouped' ? 'bg-white border-blue-600 text-blue-700 shadow' : 'border-transparent text-gray-500 hover:text-blue-600'}`}
          >
            تگ‌های طبقه‌بندی‌شده
          </Link>
        </div>

        {/* Stats Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{classesWithTags.length}</div>
              <div className="text-sm text-gray-600">کل دسته‌بندی‌ها</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{stats.totalTags || 0}</div>
              <div className="text-sm text-gray-600">کل تگ‌ها</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{stats.totalArticles || 0}</div>
              <div className="text-sm text-gray-600">کل اخبار</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">{stats.averageArticlesPerTag || 0}</div>
              <div className="text-sm text-gray-600">میانگین اخبار هر تگ</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">{stats.classifiedTags || 0}</div>
              <div className="text-sm text-gray-600">تگ‌های طبقه‌بندی شده</div>
            </div>
          </div>
        </div>

        {/* نمایش همه تگ‌ها */}
        {view === 'all' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-right">همه تگ‌ها ({allTags.length})</h2>
                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
               {allTags.map((tag, idx) => (
                 <Link
                   key={`all-tag-${tag.id}-${tag.name}-${idx}`}
                  href={`/tags/${encodeURIComponent(tag.name)}`}
                  className="block bg-gray-50 rounded-lg p-4 hover:bg-blue-50 transition-all border border-gray-200 hover:border-blue-300 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">{tag.name}</span>
                    <span className="text-xs text-gray-500">{tag.articleCount || 0} خبر</span>
                  </div>
                  {tag.description && <div className="text-xs text-gray-600 mb-1">{tag.description}</div>}
                </Link>
              ))}
            </div>
            {/* نمایش تگ‌های بدون کلاس اگر وجود دارند */}
            {tagsWithoutClass.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-bold text-red-600 mb-2 text-right">تگ‌های بدون دسته‌بندی ({tagsWithoutClass.length})</h3>
                                 <div className="flex flex-wrap gap-2">
                   {tagsWithoutClass.map((tag, index) => (
                     <span key={`no-class-tag-${tag.id}-${tag.name}-${index}`} className="inline-block bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs border border-red-200">
                       {tag.name}
                     </span>
                   ))}
                 </div>
              </div>
            )}
          </div>
        )}

        {/* نمایش طبقه‌بندی‌شده */}
        {view === 'grouped' && (
          <div className="space-y-8">
            {(() => {
              const parentClasses = sortedClasses.filter(c => !c.parentSlug);
              return parentClasses.map((parentClass) => {
                const childClasses = sortedClasses.filter(c => c.parentSlug === parentClass.classSlug);
                const allTagsInParent = [
                  ...parentClass.tags,
                  ...childClasses.flatMap(child => child.tags)
                ].filter((tag, idx, arr) => idx === arr.findIndex(t => t.id === tag.id));
                // فیلتر کردن تگ‌ها بر اساس انتخاب کاربر (همان منطق قبلی)
                let filteredTags = allTagsInParent;
                // پیش‌فرض همه تگ‌ها را نشان بده
                return (
                  <div key={`parent-class-${parentClass.classId}-${parentClass.classSlug}`} className="bg-white rounded-lg shadow-md overflow-hidden">
                    {/* Parent Class Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-2xl font-bold mb-2">{parentClass.className}</h2>
                          {parentClass.classDescription && (
                            <p className="text-blue-100 text-sm">{parentClass.classDescription}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold">{allTagsInParent.length}</div>
                          <div className="text-blue-100 text-sm">تگ</div>
                        </div>
                      </div>
                    </div>
                    {/* Tags Grid */}
                    <div className="p-6">
                      {filteredTags.length === 0 ? (
                        <div className="text-center py-12">
                          <div className="text-gray-400 mb-4">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                          </div>
                          <h3 className="text-lg font-medium text-gray-900 mb-2">هیچ تگی یافت نشد</h3>
                          <p className="text-gray-500">لطفاً تب دیگری را انتخاب کنید</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                          {filteredTags.map((tag, tagIndex) => (
                            <Link
                              key={`filtered-tag-${tag.id}-${tag.name}`}
                              href={`/tags/${encodeURIComponent(tag.name)}`}
                              className="group bg-gray-50 rounded-lg p-4 hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 hover:border-blue-300 relative"
                            >
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                                  {tag.name}
                                </h3>
                                {tag.description && (
                                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{tag.description}</p>
                                )}
                                <div className="flex items-center justify-between mt-2">
                                  <span className="text-xs text-gray-500">{tag.articleCount || 0} خبر</span>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        )}
      </div>
    </div>
  );
} 