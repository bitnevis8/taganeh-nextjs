export default function TagDetailLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Loading */}
        <div className="mb-8 animate-pulse">
          <div className="flex items-center space-x-2">
            <div className="h-4 bg-gray-300 rounded w-20"></div>
            <div className="h-4 bg-gray-300 rounded w-4"></div>
            <div className="h-4 bg-gray-300 rounded w-16"></div>
            <div className="h-4 bg-gray-300 rounded w-4"></div>
            <div className="h-4 bg-gray-300 rounded w-32"></div>
          </div>
        </div>

        {/* Tag Header Loading */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 animate-pulse">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 bg-gray-300 rounded w-1/3"></div>
                <div className="h-6 bg-green-200 rounded-full w-16"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-2/3 mb-6"></div>
              <div className="flex items-center gap-6">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
            <div className="h-10 bg-gray-200 rounded w-32"></div>
          </div>
        </div>

        {/* Articles Loading */}
        <div className="bg-white rounded-lg shadow-md animate-pulse">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="h-6 bg-gray-300 rounded w-1/3"></div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-5 bg-gray-200 rounded-full w-8"></div>
                      <div className="h-5 bg-green-200 rounded-full w-16"></div>
                      <div className="h-5 bg-purple-200 rounded-full w-20"></div>
                    </div>
                    
                    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
                    
                    <div className="flex items-center gap-4">
                      <div className="h-3 bg-gray-200 rounded w-20"></div>
                      <div className="h-3 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                  
                  <div className="ml-4">
                    <div className="h-20 w-20 bg-gray-200 rounded-lg"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 