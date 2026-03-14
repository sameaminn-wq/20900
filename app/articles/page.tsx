// app/articles/page.tsx
import { articles } from "@/data/articles";
import Link from "next/link";
import Image from "next/image"; // استيراد Image لتحسين الأداء

export default function ArticlesPage() {
  // التحقق من وجود البيانات لتجنب خطأ الـ Runtime
  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-20" dir="rtl">
        <h2 className="text-2xl font-bold text-gray-600">لا توجد مقالات حالياً...</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12" dir="rtl">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">أسرار حلويات العيد 2026</h1>
        <p className="text-gray-600 text-xl font-medium">دليلك الكامل لتحضير أشهى المخبوزات والحلويات الشرقية في المنزل</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {articles.map((a) => (
          <Link key={a.slug} href={`/articles/${a.slug}`} className="group block h-full">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full flex flex-col transform hover:-translate-y-2">
              
              {/* جزء الصورة المحسن */}
              <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                <img 
                  src={a.image} 
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                  alt={a.title}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <h2 className="text-2xl font-bold text-gray-800 group-hover:text-amber-600 transition-colors mb-3 leading-snug">
                  {a.title}
                </h2>
                <p className="text-gray-500 line-clamp-3 text-sm leading-relaxed mb-4">
                  {a.description}
                </p>
                
                <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                  <span className="text-amber-600 font-bold inline-flex items-center gap-2">
                     إقرأ المزيد
                    <span className="group-hover:-translate-x-1 transition-transform">←</span>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}