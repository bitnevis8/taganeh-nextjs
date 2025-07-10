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

function useArticlesByCategory() {
  // Use SWR for each category
  return categories.map((cat) => {
    const { data, error, isLoading } = useSWR(
      API_ENDPOINTS.articles.getByCategory(cat.id, 10),
      fetcher
    );
    return {
      articles: data?.data?.articles || [],
      isLoading,
      error
    };
  });
}

export default function HomePageClient({ initialArticlesByCategory }) {
  const swrArticlesByCategory = useArticlesByCategory();

  return (
    <main className="max-w-7xl mx-auto px-2 sm:px-4 py-6">
      <SearchSection />
      <div className="flex flex-col gap-8">
        {categories.map((cat, idx) => {
          const swrData = swrArticlesByCategory[idx];
          const articles = swrData.articles.length > 0
            ? swrData.articles
            : (initialArticlesByCategory[idx] || []);
          return (
            <NewsCategoryBox
              key={cat.id}
              title={cat.name}
              articles={articles}
              categorySlug={cat.slug}
            />
          );
        })}
      </div>
    </main>
  );
} 