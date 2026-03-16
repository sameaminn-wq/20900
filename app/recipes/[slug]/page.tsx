import { recipes } from "@/data/recipes"; 
import { getRecipe } from "@/lib/db";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import ShareButtons from "@/components/ShareButtons";
import RelatedRecipes from "@/components/RelatedRecipes";
import { Metadata } from 'next';

// 1. تعريف واجهات البيانات
interface Recipe {
  slug: string;
  title: string;
  image: string;
  time: number | string;
  ingredients: string[];
  steps: string[];
  rating?: string | number;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

// 2. توليد البيانات الوصفية (SEO) - لجعل جوجل يقرأ كل صفحة بشكل فريد
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipe(slug) as Recipe;

  if (!recipe) return { title: "وصفة غير موجودة" };

  return {
    title: `${recipe.title} - طريقة التحضير | TastyRecipes`,
    description: `تعرفي على أسهل طريقة لتحضير ${recipe.title} بمكونات دقيقة. الوقت: ${recipe.time} دقيقة.`,
    openGraph: {
      title: recipe.title,
      images: [recipe.image],
    },
  };
}

// 3. بناء الصفحات مسبقاً (Static Site Generation) - لسرعة خارقة وأرشفة شاملة
export async function generateStaticParams() {
  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}

export default async function RecipePage({ params }: PageProps) {
  const { slug } = await params;
  const recipe = getRecipe(slug) as Recipe;

  if (!recipe) notFound();

  return (
    <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16" dir="rtl">
      
      {/* مسار التنقل - متجاوب */}
      <div className="mb-6 overflow-x-auto whitespace-nowrap pb-2">
        <Breadcrumbs title={recipe.title} />
      </div>

      {/* رأس الصفحة */}
      <header className="text-right mb-8 md:mb-14">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-[1.2]">
          {recipe.title}
        </h1>
        
        <div className="flex flex-wrap gap-3 md:gap-4">
          <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-xl text-sm md:text-base font-bold flex items-center gap-2">
            ⏱ {recipe.time} دقيقة
          </span>
          <span className="bg-yellow-50 text-yellow-700 px-4 py-2 rounded-xl text-sm md:text-base font-bold flex items-center gap-2">
            ⭐ {recipe.rating || "5.0"}
          </span>
          <span className="hidden sm:inline-flex bg-green-50 text-green-700 px-4 py-2 rounded-xl text-sm font-bold items-center gap-2">
            ✅ وصفة موثوقة
          </span>
        </div>
      </header>

      {/* صورة الوصفة - متجاوبة مع كل الشاشات */}
      <div className="relative w-full aspect-video md:aspect-[21/9] rounded-[1.5rem] md:rounded-[3rem] overflow-hidden shadow-xl mb-10 md:mb-16">
        <img 
          src={recipe.image} 
          className="w-full h-full object-cover" 
          alt={recipe.title}
          loading="lazy"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* قسم المكونات - يظهر أولاً في الجوال أو بجانب المحتوى في الشاشات الكبيرة */}
        <aside className="lg:col-span-4 lg:order-1">
          <div className="bg-slate-50 p-6 md:p-8 rounded-[2rem] border border-slate-100 sticky top-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <span className="bg-orange-500 text-white w-8 h-8 rounded-lg flex items-center justify-center text-lg">🛒</span> 
              المقادير
            </h2>
            <ul className="space-y-4">
              {recipe.ingredients.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700 text-base md:text-lg pb-3 border-b border-slate-200 last:border-0">
                  <div className="w-2 h-2 rounded-full bg-orange-400 mt-2.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* قسم التحضير */}
        <main className="lg:col-span-8 lg:order-2">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
            <span className="bg-slate-900 text-white w-8 h-8 rounded-lg flex items-center justify-center text-lg">👨‍🍳</span> 
            طريقة العمل
          </h2>
          <div className="space-y-8">
            {recipe.steps.map((step, i) => (
              <div key={i} className="flex gap-4 md:gap-6 group">
                <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg md:text-xl">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className="text-slate-700 text-lg md:text-xl leading-[1.8] md:leading-loose">
                    {step}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* قسم المشاركة والوصفات ذات الصلة */}
      <div className="mt-12 space-y-12">
        <ShareButtons title={recipe.title} />
        <RelatedRecipes currentSlug={recipe.slug} />
      </div>

      {/* التذييل */}
      <footer className="mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
        <p className="text-slate-400 text-sm italic">TastyRecipes 2026 - جميع الحقوق محفوظة</p>
        <button className="w-full sm:w-auto bg-slate-900 text-white px-8 py-3 rounded-xl font-bold active:scale-95 transition-transform">
          طباعة الوصفة 🖨️
        </button>
      </footer>

      {/* البيانات المنظمة - Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Recipe",
            "name": recipe.title,
            "image": [recipe.image],
            "recipeIngredient": recipe.ingredients,
            "recipeInstructions": recipe.steps.map(s => ({ "@type": "HowToStep", "text": s }))
          })
        }}
      />
    </article>
  );
}