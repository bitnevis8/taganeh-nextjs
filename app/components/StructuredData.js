export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "تگانه",
    "description": "سریع‌ترین موتور جستجوگر خبر ایران که اخبار لحظه به لحظه را از معتبرترین خبرگزاری‌های پارسی‌زبان گردآوری می‌کند",
    "url": "https://taganeh.ir",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://taganeh.ir/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "تگانه",
      "url": "https://taganeh.ir"
    },
    "inLanguage": "fa-IR",
    "isAccessibleForFree": true
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
} 