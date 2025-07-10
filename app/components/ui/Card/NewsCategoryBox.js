'use client';
import useSWR from 'swr';
import Card from './Card';
import { useState } from 'react';
import Image from 'next/image';
import { API_ENDPOINTS } from '../../../config/api';

function SafeImage({ src, alt, ...props }) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  if (!src || error) return <div className="w-full h-40 bg-gray-200 rounded mb-2" />;
  return (
    <div className="relative w-full h-40 mb-2">
      {loading && (
        <div className="absolute inset-0 animate-pulse bg-gray-200 rounded z-10" />
      )}
      <Image
        src={src}
        alt={alt}
        width={400}
        height={160}
        onError={() => setError(true)}
        onLoadingComplete={() => setLoading(false)}
        className={`object-cover rounded w-full h-40 ${loading ? 'invisible' : ''}`}
        {...props}
      />
    </div>
  );
}

function timeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diff = Math.floor((now - date) / 1000); // seconds
  if (diff < 60) return 'چند ثانیه پیش';
  if (diff < 3600) return `${Math.floor(diff / 60)} دقیقه پیش`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} ساعت پیش`;
  return `${Math.floor(diff / 86400)} روز پیش`;
}

const fetcher = (url) => fetch(url).then(res => res.json());

const NewsCategoryBox = ({ cat }) => {
  const { data, error, isLoading } = useSWR(
    API_ENDPOINTS.articles.getByCategory(cat.id, 10),
    fetcher
  );
  const articles = data?.data?.articles || [];

  if (isLoading) {
    return (
      <Card title={cat.name} className="mb-6">
        <div className="h-40 animate-pulse bg-gray-100 rounded mb-4" />
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-6 bg-gray-200 rounded w-3/4 mx-auto" />
          ))}
        </div>
      </Card>
    );
  }
  if (error) return <div className="text-red-500">خطا در دریافت اخبار {cat.name}</div>;
  if (!articles || articles.length === 0) return null;
  const [first, ...rest] = articles;
  return (
    <Card title={cat.name} className="mb-6">
      {/* آخرین خبر با تصویر و استایل ویژه */}
      <a
        href={`/news/${first.id}`}
        className="block bg-white hover:bg-gray-50 rounded-lg shadow p-4 mb-4 transition border border-gray-200"
      >
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          {first.imageUrl && (
            <div className="w-full sm:w-48 flex-shrink-0">
              <SafeImage src={first.imageUrl} alt={first.title} />
            </div>
          )}
          <div className="flex-1 flex flex-col justify-between h-full">
            <h4 className="font-bold text-lg mb-2 line-clamp-2">{first.title}</h4>
            <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
              <span>{first.agency?.name}</span>
              <span>{timeAgo(first.publishedAt)}</span>
            </div>
          </div>
        </div>
      </a>
      {/* بقیه اخبار فقط متن */}
      <ul className="divide-y divide-gray-100">
        {rest.map((article) => (
          <li key={article.id}>
            <a
              href={`/news/${article.id}`}
              className="flex items-center justify-between py-3 px-2 hover:bg-gray-50 transition rounded"
            >
              <span className="flex-1 text-sm font-medium text-gray-800 line-clamp-1">{article.title}</span>
              <span className="flex items-center gap-2 text-xs text-gray-400 min-w-fit ml-2">
                <span>{article.agency?.name}</span>
                <span>·</span>
                <span>{timeAgo(article.publishedAt)}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default NewsCategoryBox; 