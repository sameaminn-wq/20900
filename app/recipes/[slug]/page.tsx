import { getRecipe } from "@/lib/db";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import ShareButtons from "@/components/ShareButtons"; // 1. استيراد أزرار المشاركة

// 1. تعريف واجهة لبيانات الوصفة (Interface)
interface Recipe {
  slug: string;
  title: string;
  image: string;
  time: number | string;
  ingredients: string[];
  steps: string[];
  rating?: string | number;
}

// 2. تعريف واجهة البارامترات (Next.js 15+)
interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function RecipePage({ params }: PageProps) {
  
  // فك تشفير البارامترات
  const { slug } = await params;

  // الحصول على الوصفة
  const recipe = getRecipe(slug) as Recipe;

  // 4. التحقق من وجود الوصفة
  if (!recipe) {
    notFound(); 
  }

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 py-6 md:py-16" dir="rtl">
      
      {/* --- إضافة مسار التنقل هنا قبل رأس الصفحة --- */}
      <Breadcrumbs title={recipe.title} />

      {/* رأس الصفحة - Responsive Typography */}
      <header className="text-center md:text-right mb-10 md:mb-16">
        <h1 className="text-3xl md:text-6xl font-black text-slate-900 mb-6 leading-tight tracking-tight">
          {recipe.title}
        </h1>
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-slate-600">
          <span className="bg-orange-100 text-orange-700 px-5 py-2 rounded-2xl text-sm md:text-base font-bold flex items-center gap-2 shadow-sm">
            ⏱ {recipe.time} دقيقة
          </span>
          <span className="bg-yellow-50 text-yellow-700 px-5 py-2 rounded-2xl text-sm md:text-base font-bold flex items-center gap-2 shadow-sm">
            ⭐ {recipe.rating || "5.0"}
          </span>
          <span className="text-sm font-medium text-slate-400 border-r border-slate-200 pr-4 hidden md:block">
            وصفة موثوقة من TastyRecipes ✅
          </span>
        </div>
      </header>

      {/* صورة الوصفة - احترافية ومتجاوبة */}
      <div className="relative aspect-video md:aspect-[21/9] w-full overflow-hidden rounded-[2.5rem] shadow-2xl shadow-orange-100/50 mb-12 md:mb-20 border-8 border-white">
        <img 
          src={recipe.image} 
          className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" 
          alt={recipe.title}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* قسم المكونات - Sidebar ذكي */}
        <aside className="lg:col-span-4 order-2 lg:order-1">
          <div className="bg-slate-50 p-8 md:p-10 rounded-[2.5rem] border border-slate-100 lg:sticky lg:top-24 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <span className="bg-orange-500 text-white w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-orange-200">🛒</span> 
              المكونات
            </h2>
            <ul className="space-y-5">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-4 text-slate-700 text-lg md:text-xl leading-relaxed border-b border-slate-200/50 pb-3 last:border-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-400 mt-2.5 shrink-0"></span>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* قسم طريقة التحضير - المحتوى الأساسي */}
        <main className="lg:col-span-8 order-1 lg:order-2">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-10 flex items-center gap-3">
            <span className="bg-slate-900 text-white w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-lg">👨‍🍳</span> 
            طريقة التحضير بالتفصيل
          </h2>
          <div className="space-y-10">
            {recipe.steps.map((step, index) => (
              <div key={index} className="flex gap-6 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-xl shadow-xl transition-all duration-300 group-hover:bg-orange-600 group-hover:scale-110">
                  {index + 1}
                </div>
                <div className="pt-2">
                  <p className="text-slate-700 leading-extra-loose text-lg md:text-2xl font-medium">
                    {step}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </main>

      </div>

      {/* 2. إضافة أزرار المشاركة هنا */}
      <ShareButtons title={recipe.title} />
      
      {/* تذييل الوصفة */}
      <footer className="mt-20 pt-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-slate-400 text-sm italic">تمت مراجعة هذه الوصفة من قبل فريق TastyRecipes لعام 2026</p>
        <button className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-orange-600 transition-all">
          طباعة الوصفة 🖨️
        </button>
      </footer>

      {/* --- إضافة البيانات المنظمة لـ SEO --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Recipe",
            "name": recipe.title,
            "image": [recipe.image],
            "author": {
              "@type": "Organization",
              "name": "TastyRecipes"
            },
            "datePublished": "2026-03-14",
            "description": `طريقة تحضير ${recipe.title} بخطوات سهلة ومقادير دقيقة ومجربة.`,
            "prepTime": `PT${recipe.time}M`,
            "totalTime": `PT${recipe.time}M`,
            "recipeIngredient": recipe.ingredients,
            "recipeInstructions": recipe.steps.map((step: any) => ({
              "@type": "HowToStep",
              "text": step
            })),
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": recipe.rating || "5",
              "reviewCount": "24"
            }
          })
        }}
      />
    </article>
  );
}