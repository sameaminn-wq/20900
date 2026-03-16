"use client"

import { useSearchParams } from "next/navigation"
import { recipes } from "@/data/recipes"
import RecipeCard from "@/components/RecipeCard"

export default function SearchPage() {
  const params = useSearchParams()
  const q = params.get("q") || ""

  // الحل: إضافة التحقق من الوجود (Optional Chaining) وفلترة النصوص
  const result = recipes?.filter((r) => {
    if (!r || !r.title) return false; // تجاهل أي عنصر فارغ أو بدون عنوان
    
    // تحويل الكلمات لصغير لضمان دقة البحث (اختياري)
    const title = r.title.toLowerCase();
    const searchTerm = q.toLowerCase();
    
    return title.includes(searchTerm);
  }) || [];

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <h1 className="text-3xl font-bold mb-10">
        نتائج البحث عن: <span className="text-orange-500">"{q}"</span>
      </h1>

      {result.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {result.map((r) => (
            // نستخدم r.slug كـ Key، وإذا لم يوجد نستخدم title
            <RecipeCard key={r.slug || r.title} recipe={r} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500">للأسف، لم نجد وصفات تطابق بحثك.</p>
        </div>
      )}
    </div>
  )
}