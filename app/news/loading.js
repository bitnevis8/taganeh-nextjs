export default function NewsLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Loading */}
        <div className="mb-8 animate-pulse">
          <div className="flex items-center space-x-2">
            <div className="h-4 bg-gray-300 rounded w-20"></div>
            <div className="h-4 bg-gray-300 rounded w-4"></div>
            <div className="h-4 bg-gray-300 rounded w-24"></div>
          </div>
        </div>

        {/* Article Loading */}
        <div className="bg-white rounded-lg shadow-md p-8 animate-pulse">
          {/* Title */}
          <div className="h-8 bg-gray-300 rounded mb-4"></div>
          <div className="h-8 bg-gray-300 rounded w-3/4 mb-6"></div>
          
          {/* Meta Info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
          
          {/* Image */}
          <div className="h-64 bg-gray-300 rounded-lg mb-6"></div>
          
          {/* Content */}
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
} 