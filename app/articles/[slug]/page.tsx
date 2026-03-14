// ./app/recipes/[slug]/page.tsx
import Image from "next/image";
import { recipes } from "@/data/recipes"; 
import { notFound } from "next/navigation";
import { Metadata } from "next";

// ✅ تحديث تعريف الأنواع ليكون Promise (متوافق مع Next.js 15)
interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// 1️⃣ توليد الميتا داتا (SEO) - أضفنا await هنا
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params; // فك الوعد (await)
  const recipe = recipes.find((r) => r.slug === slug);

  if (!recipe) return { title: "الوصفة غير موجودة" };

  return {
    title: `${recipe.title} | TastyRecipes`,
    description: `تعلمي طريقة عمل ${recipe.title} الأصلية بخطوات سهلة ومقادير دقيقة.`,
  };
}

// 2️⃣ مكون الصفحة الرئيسي - جعلنا الوظيفة async وأضفنا await
export default async function RecipePage({ params }: PageProps) {
  const { slug } = await params; // فك الوعد (await)
  const recipe = recipes.find((r) => r.slug === slug);

  if (!recipe) return notFound();

  return (
    <article className="max-w-4xl mx-auto px-4 py-10" dir="rtl">
      {/* رأس الوصفة */}
      <div className="text-center mb-10">
        <span className="text-amber-600 font-bold text-sm uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full">
          {recipe.category}
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mt-4 mb-6">
          {recipe.title}
        </h1>
        <div className="flex justify-center gap-6 text-slate-500 font-medium">
          <span className="flex items-center gap-1">⏱️ {recipe.time} دقيقة</span>
          <span className="flex items-center gap-1 text-amber-500">⭐ {recipe.rating}</span>
        </div>
      </div>

      {/* صورة الوصفة باستخدام next/image */}
      <div className="relative aspect-video w-full mb-12 rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover"
          priority
        />
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        {/* المكونات */}
        <div className="md:col-span-1 bg-slate-50 p-6 rounded-3xl h-fit">
          <h2 className="text-2xl font-bold mb-6 text-slate-900 border-r-4 border-amber-500 pr-3">
            المكونات
          </h2>
          <ul className="space-y-4 text-slate-700">
            {recipe.ingredients.map((ing, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="mt-2 w-2 h-2 bg-amber-500 rounded-full flex-shrink-0" />
                <span className="leading-tight">{ing}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* الخطوات */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-6 text-slate-900 border-r-4 border-amber-500 pr-3">
            طريقة التحضير
          </h2>
          <div className="space-y-8">
            {recipe.steps.map((step, index) => (
              <div key={index} className="flex gap-5 group">
                <div className="flex-shrink-0 w-10 h-10 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-bold group-hover:bg-amber-500 transition-colors shadow-lg">
                  {index + 1}
                </div>
                <div className="pt-1">
                  <p className="text-slate-700 leading-relaxed text-lg italic">
                    {step}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}