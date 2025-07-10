// page.js (server component)
import TagsPageClient from './TagsPageClient';
import { API_ENDPOINTS } from '../config/api';

export default async function TagsPage() {
  const res = await fetch(API_ENDPOINTS.tags.getAllWithArticleCount, { cache: 'no-store' });
  const data = await res.json();
  return <TagsPageClient initialData={data} />;
} 