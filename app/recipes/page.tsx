import { getRecipes } from "@/lib/db"
import RecipeCard from "@/components/RecipeCard"

export default function RecipesPage() {
  const recipes = getRecipes()

  return (
    // إضافة px-4 للهواتف و max-w لتوسط المحتوى في الشاشات الكبيرة
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" dir="rtl">
      
      {/* تحسين العنوان ليكون متجاوباً في الحجم */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-black mb-10 text-slate-900 border-r-8 border-orange-500 pr-4">
        جميع الوصفات
      </h1>

      {/* تحسين الـ Grid: 
          1 عمود للهواتف (default)
          2 عمود للتابلت (md)
          3 أعمدة للشاشات الكبيرة (lg) 
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
        {recipes.map((r) => (
          // إضافة wrapper بسيط لضمان التنسيق
          <div key={r.slug} className="flex justify-center">
            <RecipeCard recipe={r} />
          </div>
        ))}
      </div>

      {/* حالة عدم وجود وصفات (احتياطي) */}
      {recipes.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">لا توجد وصفات متاحة حالياً.</p>
        </div>
      )}
    </div>
  )
}