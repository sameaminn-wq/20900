"use client";
import { useState, useEffect } from "react";
import { recipes } from "@/data/recipes";
import RecipeCard from "@/components/RecipeCard";

export default function CategoriesPage() {
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const categories = ["الكل", ...Array.from(new Set(recipes.map(r => r.category)))];

  // محاكاة تأثير التحميل عند تغيير التصنيف
  const handleCategoryChange = (cat: string) => {
    setIsLoading(true);
    setActiveCategory(cat);
    
    // تأخير بسيط لمدة 600ms لإظهار تأثير التحميل بوضوح
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory = activeCategory === "الكل" || recipe.category === activeCategory;
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 min-h-screen" dir="rtl">
      
      {/* قسم البحث (كما هو سابقاً) */}
      <div className="flex flex-col items-center mb-16 space-y-6">
        <h1 className="text-4xl font-black text-slate-900">تصفح <span className="text-orange-500">الوصفات</span></h1>
        <input 
          type="text"
          placeholder="ابحث عن اسم الوصفة..."
          className="w-full max-w-xl px-6 py-4 bg-white border-2 border-slate-100 rounded-2xl shadow-sm focus:border-orange-500 outline-none transition-all"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* أزرار التصنيفات */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-6 py-2 rounded-full font-bold transition-all ${
              activeCategory === cat ? "bg-orange-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* عرض النتائج أو الهياكل (Skeletons) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          // عرض 6 بطاقات تحميل وهمية
          Array.from({ length: 6 }).map((_, i) => <RecipeSkeleton key={i} />)
        ) : (
          filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))
        )}
      </div>
    </main>
  );
}

// مكون هيكل التحميل (Skeleton Component)
function RecipeSkeleton() {
  return (
    <div className="bg-slate-50 border border-slate-100 rounded-[2rem] overflow-hidden animate-pulse">
      <div className="h-56 bg-slate-200 w-full" />
      <div className="p-6 space-y-4">
        <div className="h-6 bg-slate-200 rounded-lg w-3/4" />
        <div className="flex justify-between items-center">
          <div className="h-4 bg-slate-200 rounded-lg w-1/4" />
          <div className="h-4 bg-slate-200 rounded-lg w-1/4" />
        </div>
      </div>
    </div>
  );
}