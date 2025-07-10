// غیرفعال کردن کش برای تمام صفحات دسته‌بندی
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function CategoriesLayout({ children }) {
  return (
    <div>
      {children}
    </div>
  );
} 