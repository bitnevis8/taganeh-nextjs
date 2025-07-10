// page.js (server component)
import HomePageClient from './HomePageClient';
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

async function fetchCategoryArticles(categoryId) {
  try {
    const res = await fetch(API_ENDPOINTS.articles.getByCategory(categoryId, 10), {
      cache: 'no-store'
    });
    const data = await res.json();
    return data?.data?.articles || [];
  } catch {
    return [];
  }
}

export default async function Home() {
  // Fetch all categories in parallel
  const articlesByCategory = await Promise.all(
    categories.map((cat) => fetchCategoryArticles(cat.id))
  );

  return <HomePageClient initialArticlesByCategory={articlesByCategory} />;
}
