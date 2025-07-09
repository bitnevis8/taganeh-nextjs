export default function CategoriesLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Loading */}
        <div className="text-center mb-12">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-300 rounded-lg mb-4 w-1/3 mx-auto"></div>
            <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto"></div>
          </div>
        </div>

        {/* Categories Grid Loading */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
              <div className="flex items-center justify-between mb-3">
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                <div className="h-5 bg-green-200 rounded-full w-12"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 