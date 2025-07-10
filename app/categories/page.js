// page.js (server component)
import CategoriesPageClient from './CategoriesPageClient';
import { API_ENDPOINTS } from '../config/api';

export default async function CategoriesPage() {
  const res = await fetch(API_ENDPOINTS.categories.getAll, { cache: 'no-store' });
  const data = await res.json();
  return <CategoriesPageClient initialData={data} />;
} 