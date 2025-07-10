import TagDetailPageClient from './TagDetailPageClient';
import { API_ENDPOINTS } from '../../config/api';

async function getTagByName(name) {
  const decodedName = decodeURIComponent(name);
  const response = await fetch(API_ENDPOINTS.tags.getByName(decodedName), { cache: 'no-store' });
  if (!response.ok) return null;
  const data = await response.json();
  return data.data || null;
}

async function getArticlesByTag(tagId) {
  const response = await fetch(API_ENDPOINTS.articles.getByTag(tagId, 50), { cache: 'no-store' });
  if (!response.ok) return [];
  const data = await response.json();
  return data?.data?.articles || [];
}

export default async function TagDetailPage({ params }) {
  const { name } = params;
  const tag = await getTagByName(name);
  if (!tag) return <div className="text-center py-12 text-red-500">تگ یافت نشد</div>;
  const articles = await getArticlesByTag(tag.id);
  return <TagDetailPageClient tag={tag} initialArticles={articles} />;
} 