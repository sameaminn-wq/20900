import { getRecipe } from "@/lib/db";
import { notFound } from "next/navigation";

// 1. تعريف واجهة لبيانات الوصفة (Interface)
interface Recipe {
  slug: string; // أضفنا slug هنا للتوثيق
  title: string;
  image: string;
  time: number | string;
  ingredients: string[];
  steps: string[];
}

// 2. تعريف واجهة البارامترات (مع دعم الـ Promise لإصدارات Next.js الحديثة)
interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// 3. جعل الدالة async للتعامل مع params
export default async function RecipePage({ params }: PageProps) {
  
  // فك تشفير البارامترات (Unwrapping params)
  const { slug } = await params;

  // الحصول على الوصفة من قاعدة البيانات/الملف
  const recipe = getRecipe(slug) as Recipe;

  // 4. استخدام function (notFound) من Next.js أفضل للمستخدم ولـ SEO
  if (!recipe) {
    notFound(); 
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 md:py-12" dir="rtl">
      
      {/* صورة الوصفة مع تحسينات الأداء */}
      <div className="relative aspect-video md:aspect-[21/9] w-full overflow-hidden rounded-[2rem] shadow-2xl shadow-orange-100 mb-8 md:mb-12">
        <img 
          src={recipe.image} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
          alt={recipe.title}
        />
      </div>

      {/* تفاصيل العنوان */}
      <header className="text-center md:text-right mb-10">
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
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* قسم المكونات */}
        <aside className="lg:col-span-1">
          <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100 lg:sticky lg:top-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="text-orange-500 text-3xl">🛒</span> المكونات
            </h2>
            <ul className="space-y-4">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-700 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-400 mt-2 shrink-0"></span>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* قسم طريقة التحضير */}
        <main className="lg:col-span-2">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 flex items-center gap-2">
            <span className="text-orange-500 text-3xl">👨‍🍳</span> طريقة التحضير
          </h2>
          <ol className="space-y-6">
            {recipe.steps.map((step, index) => (
              <li key={index} className="flex gap-4 group">
                <span className="flex-shrink-0 w-10 h-10 rounded-2xl bg-orange-600 text-white flex items-center justify-center font-black text-lg shadow-lg shadow-orange-200 transition-transform group-hover:scale-110">
                  {index + 1}
                </span>
                <div className="pt-1.5">
                  <p className="text-slate-700 leading-relaxed text-lg md:text-xl">
                    {step}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </main>

      </div>
    </div>
  );
}