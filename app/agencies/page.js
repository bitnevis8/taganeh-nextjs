// page.js (server component)
import AgenciesPageClient from './AgenciesPageClient';
import { API_ENDPOINTS } from '../config/api';

export default async function AgenciesPage() {
  const res = await fetch(API_ENDPOINTS.agencies.getAll, { cache: 'no-store' });
  const data = await res.json();
  return <AgenciesPageClient initialData={data} />;
} 