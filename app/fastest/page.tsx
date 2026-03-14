import { getCategory } from "@/lib/db";
import RecipeCard from "@/components/RecipeCard";

export default function Eid() {
  const recipes = getCategory("eid");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12" dir="rtl">
      
      {/* رأس الصفحة - تصميم مخصص للعيد */}
      <header className="relative mb-12 text-center md:text-right overflow-hidden bg-orange-50 rounded-3xl p-8 md:p-12 border border-orange-100">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">
            وصفات <span className="text-orange-600"> الخاصة</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl leading-relaxed">
            مجموعة مختارة من أشهى الحلويات الشرقية والمخبوزات التقليدية لتزين مائدتكم في  في كل وقت 2026.
          </p>
        </div>
        
        {/* لمسة ديكور خلفية (اختياري) */}
        <div className="absolute -left-10 -top-10 w-40 h-40 bg-orange-200/30 rounded-full blur-3xl"></div>
      </header>

      {/* شبكة الوصفات المتجاوبة */}
      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {recipes.map((r) => (
            <div key={r.slug} className="h-full transform transition-all duration-300 hover:-translate-y-2">
              <RecipeCard recipe={r} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 text-xl italic">قريباً.. سنضيف ألذ وصفات العيد هنا.</p>
        </div>
      )}

      {/* تذييل بسيط للقسم */}
      <footer className="mt-16 text-center">
        <hr className="border-slate-100 mb-8" />
        <p className="text-slate-400 text-sm italic">جميع الوصفات للتعليم فقط   %</p>
      </footer>
    </div>
  );
}