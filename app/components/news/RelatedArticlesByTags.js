"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { API_ENDPOINTS } from "../../config/api";

export default function RelatedArticlesByTags({ tagIds, currentArticleId }) {
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("tagIds sent to getByTags:", tagIds);
    if (tagIds && tagIds.length > 0) {
      setLoading(true);
      setError(null);
      fetch(API_ENDPOINTS.articles.getByTags(tagIds, 50))
        .then(res => res.json())
        .then(data => {
          console.log("داده دریافتی از getByTags:", data);
          setRelatedArticles(((data.data && data.data.articles) || []).filter(a => a.id !== currentArticleId));
        })
        .catch(err => setError("خطا در دریافت اخبار مرتبط"))
        .finally(() => setLoading(false));
    } else {
      setRelatedArticles([]);
    }
  }, [tagIds, currentArticleId]);

  if (loading) return <div className="text-center py-2 text-gray-500 text-sm">در حال دریافت اخبار مرتبط...</div>;
  if (error) return <div className="text-center py-2 text-red-500 text-sm">{error}</div>;
  if (!relatedArticles.length) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <h2 className="text-lg font-bold text-gray-800 mb-2 text-right">اخبار مرتبط با کلمات کلیدی</h2>
      <ul className="list-disc pr-5 space-y-1 text-right">
        {relatedArticles.map(a => (
          <li key={a.id}>
            <Link href={`/news/${a.id}`} className="text-blue-600 hover:underline">
              {a.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
} 