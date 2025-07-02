"use client"

import Link from 'next/link';
import Image from 'next/image';
import NewsCategoryBox from './components/ui/Card/NewsCategoryBox';

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
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/articles/category/${categoryId}?limit=10`,
      { cache: 'no-store' }
    );
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

  return (
    <main className="max-w-7xl mx-auto px-2 sm:px-4 py-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">جدیدترین اخبار دسته‌بندی‌ها</h1>
      <div className="flex flex-col gap-8">
        {categories.map((cat, idx) => (
          <NewsCategoryBox
            key={cat.id}
            title={cat.name}
            articles={articlesByCategory[idx]}
            categorySlug={cat.slug}
          />
        ))}
      </div>
    </main>
  );
}
