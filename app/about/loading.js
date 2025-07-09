export default function AboutLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Loading */}
        <div className="text-center mb-12">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-300 rounded-lg mb-4 w-1/2 mx-auto"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
          </div>
        </div>

        {/* Content Loading */}
        <div className="bg-white rounded-lg shadow-md p-8 animate-pulse">
          <div className="space-y-6">
            <div className="h-6 bg-gray-300 rounded w-1/3"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            </div>
            
            <div className="h-6 bg-gray-300 rounded w-1/4 mt-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 