'use client';
import useSWR from 'swr';
import NewsCategoryBox from './components/ui/Card/NewsCategoryBox';
import SearchSection from './components/SearchSection';
import { API_ENDPOINTS } from './config/api';

const categories = [
  { id: 1, name: 'سیاست', slug: 'politics' },
  { id: 2, name: 'اقتصاد', slug: 'economy' },
  { id: 3, name: 'ورزش', slug: 'sports' },
  { id: 4, name: 'اجتماعی', slug: 'social' },
  { id: 5, name: 'بین‌الملل', slug: 'international' },
  { id: 6, name: 'فرهنگ و هنر', slug: 'culture-art' },
  { id: 7, name: 'علم و فناوری', slug: 'science-tech' },
];

const fetcher = (url) => fetch(url).then(res => res.json());

function CategoryNewsSWRBox({ cat, initialArticles }) {
  const { data, error, isLoading } = useSWR(
    API_ENDPOINTS.articles.getByCategory(cat.id, 10),
    fetcher,
    { fallbackData: { data: { articles: initialArticles } } }
  );
  const articles = data?.data?.articles || [];
  if (isLoading) return <div className="h-40 animate-pulse bg-gray-100 rounded mb-4" />;
  if (error) return <div className="text-red-500">خطا در دریافت اخبار {cat.name}</div>;
  return (
    <NewsCategoryBox
      title={cat.name}
      articles={articles}
      categorySlug={cat.slug}
    />
  );
}

export default function HomePageClient() {
  return (
    <main className="max-w-7xl mx-auto px-2 sm:px-4 py-6">
      <SearchSection />
      <div className="flex flex-col gap-8">
        {categories.map((cat) => (
          <CategoryNewsSWRBox
            key={cat.id}
            cat={cat}
            initialArticles={[]}
          />
        ))}
      </div>
    </main>
  );
} 