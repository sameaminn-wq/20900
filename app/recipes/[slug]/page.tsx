import { getRecipe } from "@/lib/db";

export default function RecipePage({ params }) {
  const recipe = getRecipe(params.slug);

  if (!recipe) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-xl font-bold text-gray-400 border-2 border-dashed p-10 rounded-3xl">
          ⚠️ الوصفة غير موجودة
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 md:py-12" dir="rtl">
      
      {/* صورة الوصفة - متجاوبة بذكاء */}
      <div className="relative aspect-video md:aspect-[21/9] w-full overflow-hidden rounded-[2rem] shadow-2xl shadow-orange-100 mb-8 md:mb-12">
        <img 
          src={recipe.image} 
          className="w-full h-full object-cover" 
          alt={recipe.title}
        />
      </div>

      {/* تفاصيل الرأس */}
      <div className="text-center md:text-right mb-10">
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
          {recipe.title}
        </h1>
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-slate-600">
          <span className="bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
            ⏱ {recipe.time} دقيقة
          </span>
          <span className="text-sm border-r border-slate-300 pr-4 hidden md:block">
            وصفة مجربة ✅
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* المكونات - جانبية في الشاشات الكبيرة */}
        <section className="lg:col-span-1">
          <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100 sticky top-24">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="text-orange-500 text-3xl">🛒</span> المكونات
            </h2>
            <ul className="space-y-4">
              {recipe.ingredients.map((i, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-700 font-medium">
                  <span className="w-2 h-2 rounded-full bg-orange-400 mt-2.5 shrink-0"></span>
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* طريقة التحضير - الجزء الأكبر */}
        <section className="lg:col-span-2">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 flex items-center gap-2">
            <span className="text-orange-500 text-3xl">👨‍🍳</span> طريقة التحضير
          </h2>
          <ol className="space-y-6">
            {recipe.steps.map((s, index) => (
              <li key={index} className="flex gap-4 group">
                <span className="flex-shrink-0 w-10 h-10 rounded-2xl bg-orange-600 text-white flex items-center justify-center font-black text-lg shadow-lg shadow-orange-200 transition-transform group-hover:scale-110">
                  {index + 1}
                </span>
                <div className="pt-1.5">
                  <p className="text-slate-700 leading-extra-loose text-lg md:text-xl">
                    {s}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

      </div>

      {/* زر مشاركة أو طباعة */}
      <footer className="mt-16 pt-8 border-t border-slate-100 flex justify-center gap-4">
        <button className="bg-slate-900 text-white px-8 py-3 rounded-2xl hover:bg-orange-600 transition-all font-bold shadow-lg shadow-slate-200">
           مشاركة الوصفة 🔗
        </button>
      </footer>
    </div>
  );
}