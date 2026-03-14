// app/articles/page.tsx
import { articles } from ".//data/articles";
import Link from "next/link";

export default function ArticlesPage() {
  // ملاحظة: تأكد أن ملف data/articles يصدر مصفوفة باسم articles
  if (!articles || articles.length === 0) {
    return <div className="text-center py-20">جاري تحميل المقالات...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12" dir="rtl">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-gray-900 mb-4">أسرار حلويات العيد 2026</h1>
        <p className="text-gray-600 text-xl">دليلك الكامل لتحضير أشهى المخبوزات والحلويات الشرقية في المنزل</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {articles.map((a) => (
          <Link key={a.slug} href={`/articles/${a.slug}`} className="group">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
              <div className="relative overflow-hidden h-64">
                <img 
                  src={a.image} 
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  alt={a.title} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-6 flex-grow">
                <h2 className="text-2xl font-bold text-gray-800 group-hover:text-amber-600 transition-colors mb-3">
                  {a.title}
                </h2>
                <p className="text-gray-500 line-clamp-3 text-sm leading-relaxed">
                  {a.description}
                </p>
              </div>
              
              <div className="p-6 pt-0 text-left">
                <span className="text-amber-600 font-bold inline-flex items-center gap-2">
                   إقرأ المزيد
                  <span className="group-hover:translate-x-[-5px] transition-transform">←</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}