// غیرفعال کردن کش برای تمام صفحات تگ‌ها
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function TagsLayout({ children }) {
  return (
    <div>
      {children}
    </div>
  );
} 