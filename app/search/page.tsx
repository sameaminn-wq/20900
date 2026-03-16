"use client"

import { useSearchParams } from "next/navigation"
import { recipes } from "@/data/recipes"
import RecipeCard from "@/components/RecipeCard"

export default function SearchPage() {
  const params = useSearchParams()
  const q = params.get("q") || ""

  const result = recipes?.filter((r) => {
    // التأكد من أن العنصر r موجود وله عنوان قبل الفلترة
    if (!r || !r.title) return false;
    
    const title = r.title.toLowerCase();
    const searchTerm = q.toLowerCase();
    
    return title.includes(searchTerm);
  }) || [];

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <h1 className="text-3xl font-bold mb-10 text-right">
        {/* تم استخدام الرمز &quot; لحل خطأ ESLint */}
        نتائج البحث عن: <span className="text-orange-500">&quot;{q}&quot;</span>
      </h1>

      {result.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {result.map((r) => {
            // إضافة تحقق أمان إضافي داخل الـ map ليرضى TypeScript
            if (!r) return null;

            return (
              <RecipeCard 
                key={r.slug || r.title || Math.random().toString()} 
                recipe={r} 
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500 italic">للأسف، لم نجد وصفات تطابق بحثك.</p>
        </div>
      )}
    </div>
  )
}