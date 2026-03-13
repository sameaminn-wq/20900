// ./app/recipes/[slug]/page.tsx
import Image from "next/image";
import { recipes } from "@/data/recipes"; // تأكد أن المسار صحيح
import { notFound } from "next/navigation";
import { Metadata } from "next";

// ✅ تعريف الأنواع بشكل صحيح
interface PageProps {
  params: {
    slug: string;
  };
}

// 1️⃣ توليد الميتا داتا (SEO)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;
  const recipe = recipes.find((r) => r.slug === slug);

  if (!recipe) return { title: "الوصفة غير موجودة" };

  return {
    title: `${recipe.title} | TastyRecipes`,
    description: `تعلمي طريقة عمل ${recipe.title} الأصلية بخطوات سهلة ومقادير دقيقة.`,
  };
}

// 2️⃣ مكون الصفحة الرئيسي
export default function RecipePage({ params }: PageProps) {
  const { slug } = params;
  const recipe = recipes.find((r) => r.slug === slug);

  if (!recipe) return notFound();

  return (
    <article className="max-w-4xl mx-auto px-4 py-10" dir="rtl">
      {/* رأس الوصفة */}
      <div className="text-center mb-10">
        <span className="text-amber-600 font-bold text-sm uppercase tracking-widest">
          {recipe.category}
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mt-4 mb-6">
          {recipe.title}
        </h1>
        <div className="flex justify-center gap-6 text-slate-500 font-medium">
          <span>⏱️ {recipe.time} دقيقة</span>
          <span>⭐ {recipe.rating}</span>
        </div>
      </div>

      {/* صورة الوصفة باستخدام next/image */}
      <div className="relative aspect-video w-full mb-12 rounded-[2rem] overflow-hidden shadow-2xl">
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-[2rem]"
          priority
        />
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        {/* المكونات */}
        <div className="md:col-span-1">
          <h2 className="text-2xl font-bold mb-6 text-slate-900 border-r-4 border-amber-500 pr-3">
            المكونات
          </h2>
          <ul className="space-y-4 text-slate-700">
            {recipe.ingredients.map((ing, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                {ing}
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
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <p className="text-slate-700 leading-loose text-lg">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}