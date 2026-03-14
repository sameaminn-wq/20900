// app/articles/page.tsx
import { articles } from "@/data/articles";
import Link from "next/link";

export default function ArticlesPage() {
  if (!articles || articles.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-center px-4" dir="rtl">
        <div className="bg-slate-50 p-8 rounded-3xl border border-dashed border-slate-300">
          <h2 className="text-2xl font-bold text-slate-400 font-sans">لا توجد مقالات حالياً...</h2>
          <p className="text-slate-400 mt-2">نعمل على إضافة وصفات جديدة قريباً!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16" dir="rtl">
      
      {/* رأس الصفحة - Responsive Typography */}
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-slate-900 mb-4 leading-tight">
          أسرار حلويات العيد <span className="text-orange-600">2026</span>
        </h1>
        <p className="text-slate-600 text-base sm:text-lg md:text-xl font-medium leading-relaxed px-2">
          دليلك الكامل لتحضير أشهى المخبوزات والحلويات الشرقية في المنزل بأدوات بسيطة ونتائج مضمونة.
        </p>
      </div>

      {/* شبكة المقالات - Smart Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
        {articles.map((a) => (
          <Link key={a.slug} href={`/articles/${a.slug}`} className="group block h-full">
            <article className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-orange-200/50 transition-all duration-500 border border-slate-100 h-full flex flex-col transform hover:-translate-y-2">
              
              {/* الحاوية النسبية للصورة */}
              <div className="relative aspect-[4/3] sm:aspect-video md:aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img 
                  src={a.image} 
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                  alt={a.title}
                  loading="lazy"
                />
                {/* Overlay جمالي يظهر عند التحويم */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* شارة صغيرة */}
                <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-orange-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                  وصفة العيد
                </span>
              </div>
              
              <div className="p-6 md:p-8 flex-grow flex flex-col">
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 group-hover:text-orange-600 transition-colors mb-4 leading-snug">
                  {a.title}
                </h2>
                <p className="text-slate-500 line-clamp-2 md:line-clamp-3 text-sm md:text-base leading-relaxed mb-6">
                  {a.description}
                </p>
                
                {/* زر قراءة المزيد السفلي */}
                <div className="mt-auto pt-5 border-t border-slate-50 flex justify-between items-center">
                  <span className="text-orange-600 font-extrabold text-sm inline-flex items-center gap-2">
                    عرض التفاصيل الكاملة
                    <span className="text-lg group-hover:translate-x-[-4px] transition-transform">←</span>
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all">
                    <span className="text-xs">🍪</span>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* لمسة نهائية: زر للعودة للأعلى أو تصفح المزيد */}
      <div className="mt-20 text-center">
        <p className="text-slate-400 text-sm italic">يتم تحديث الوصفات يومياً • تابعونا للمزيد</p>
      </div>
    </div>
  ); 
}