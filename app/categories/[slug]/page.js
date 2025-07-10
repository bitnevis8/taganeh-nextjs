// page.js (server component)
import CategoryDetailPageClient from './CategoryDetailPageClient';
import { API_ENDPOINTS } from '../../config/api';

async function getCategoryBySlug(slug) {
  const response = await fetch(API_ENDPOINTS.categories.getAll, { cache: 'no-store' });
  if (!response.ok) return null;
  const data = await response.json();
  const categories = data.data || [];
  return categories.find(cat => cat.slug === slug) || null;
}

async function getArticlesByCategory(categoryId) {
  const response = await fetch(API_ENDPOINTS.articles.getByCategory(categoryId, 20), { cache: 'no-store' });
  if (!response.ok) return [];
  const data = await response.json();
  return data?.data?.articles || [];
}

export default async function CategoryDetailPage({ params }) {
  const { slug } = params;
  const category = await getCategoryBySlug(slug);
  if (!category) return <div className="text-center py-12 text-red-500">دسته‌بندی یافت نشد</div>;
  const articles = await getArticlesByCategory(category.id);
  return <CategoryDetailPageClient category={category} initialArticles={articles} />;
} 