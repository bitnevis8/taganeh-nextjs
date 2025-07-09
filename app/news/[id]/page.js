"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { API_ENDPOINTS } from "../../config/api";
import Link from "next/link";
import RelatedArticlesByTags from "../../components/news/RelatedArticlesByTags";
import NewsTicker from "../../components/news/NewsTicker";

// Helper for relative time
function getRelativeTime(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diff = Math.floor((now - date) / 1000); // seconds
  if (diff < 60) return 'چند ثانیه پیش';
  if (diff < 3600) return `${Math.floor(diff / 60)} دقیقه پیش`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} ساعت پیش`;
  return `${Math.floor(diff / 86400)} روز پیش`;
}

export default function ExternalNewsPage() {
  const params = useParams();
  const { id } = params;
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [showTicker, setShowTicker] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.articles.getById(id));
        if (!response.ok) {
          throw new Error('خبر یافت نشد');
        }
        const data = await response.json();
        setArticle(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  useEffect(() => {
    if (article && article.tags && article.tags.length > 0) {
      const tagIds = article.tags.map(tag => tag.id);
      fetch(API_ENDPOINTS.articles.getByTags(tagIds, 50))
        .then(res => res.json())
        .then(data => {
          const rel = ((data.data && data.data.articles) || []).filter(a => a.id !== article.id);
          setRelatedArticles(rel);
          setShowTicker(rel.length > 0);
        });
    }
  }, [article]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="text-center py-20">
          <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-gray-600">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            در حال بارگیری خبر...
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="text-center py-20">
          <div className="text-red-600 text-lg mb-4">خطا: {error || 'خبر یافت نشد'}</div>
          <Link href="/" className="text-blue-600 hover:underline">بازگشت به صفحه اصلی</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* عنوان خبر */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-2">
            <div className="flex items-center gap-2 text-xs text-gray-700 rtl flex-row-reverse max-w-2xl mx-auto">
              <h1 className="font-bold text-base truncate max-w-xs sm:max-w-md md:max-w-2xl" title={article.title}>
                {article.title}
              </h1>
              {article.sourceUrl && (
                <a
                  href={article.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 flex items-center"
                  title={`مشاهده خبر در ${article.agency?.name || 'سایت منبع'}`}
                  style={{ alignSelf: 'center' }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M1.5 12s4-7 10.5-7 10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </a>
              )}
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                </svg>
                {getRelativeTime(article.publishedAt)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* نمایش خبر منبع در iframe */}
      <div className="flex-1">
        <iframe
          src={article.sourceUrl}
          title={article.title}
          className="w-full"
          style={{ minHeight: "80vh", border: "none" }}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
          allow="fullscreen"
        />
      </div>

      {/* دکمه باز کردن در سایت اصلی */}
      <div className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
          <a
            href={article.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-yellow-300 text-gray-900 font-bold rounded-lg hover:bg-yellow-400 transition-colors"
          >
            در صورت باز نشدن خبر اینجا کلیک کنید
          </a>
        </div>
      </div>

      {/* اخبار مرتبط با کلمات کلیدی */}
      {showTicker && <NewsTicker articles={relatedArticles} />}
    </div>
  );
} 