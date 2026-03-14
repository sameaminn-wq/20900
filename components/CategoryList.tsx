"use client";
import { useState } from "react";
import { recipes } from "@/data/recipes";
import RecipeCard from "@/components/RecipeCard";

export default function CategoriesPage() {
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");

  // استخراج التصنيفات تلقائياً
  const categories = ["الكل", ...Array.from(new Set(recipes.map(r => r.category)))];

  // منطق الفلترة المزدوج (تصنيف + بحث)
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory = activeCategory === "الكل" || recipe.category === activeCategory;
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          recipe.ingredients.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 min-h-screen" dir="rtl">
      
      {/* قسم العنوان والبحث */}
      <div className="flex flex-col items-center mb-16 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-3">
            تصفح <span className="text-orange-500">الوصفات</span>
          </h1>
          <p className="text-slate-500">ابحث عن وجبتك المفضلة بالتصنيف أو الاسم</p>
        </div>

        {/* مربع البحث الاحترافي */}
        <div className="relative w-full max-w-2xl group">
          <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-2xl">
            🔍
          </div>
          <input 
            type="text"
            placeholder="ابحث عن وصفة، مكون، أو طبخة..."
            className="w-full pr-14 pl-6 py-5 bg-white border-2 border-slate-100 rounded-[2rem] shadow-sm outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-50 transition-all text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* أزرار التصنيفات - قابلة للتمرير في الجوال */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-7 py-2.5 rounded-full font-bold transition-all duration-300 border-2 ${
              activeCategory === cat
                ? "bg-orange-600 border-orange-600 text-white shadow-xl shadow-orange-200"
                : "bg-white border-slate-100 text-slate-500 hover:border-orange-200 hover:text-orange-500"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* إحصائية سريعة */}
      <div className="mb-8 text-slate-400 text-sm font-medium">
        تم العثور على <span className="text-orange-600">{filteredRecipes.length}</span> وصفة
      </div>

      {/* شبكة النتائج */}
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      ) : (
        /* حالة عدم وجود نتائج */
        <div className="flex flex-col items-center justify-center py-24 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
          <span className="text-6xl mb-4">👨‍🍳</span>
          <h3 className="text-xl font-bold text-slate-800 mb-2">لم نجد ما تبحث عنه!</h3>
          <p className="text-slate-500">حاول البحث بكلمات أخرى أو تغيير التصنيف</p>
          <button 
            onClick={() => {setSearchQuery(""); setActiveCategory("الكل")}}
            className="mt-6 text-orange-600 font-bold underline"
          >
            إعادة تعيين البحث
          </button>
        </div>
      )}

    </main>
  );
}