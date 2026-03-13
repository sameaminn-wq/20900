import { recipes } from "@/data/recipes"; // تأكد من مسار البيانات لديك
import { notFound } from "next/navigation";
import { Metadata } from "next";

// 1. تعريف نوع البيانات لـ TypeScript (توافق Next.js 15)
type Props = {
  params: Promise<{ slug: string }>;
};

// 2. توليد الميتا داتا (SEO) للوصفة
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const recipe = recipes.find((r) => r.slug === slug);
  
  if (!recipe) return { title: "الوصفة غير موجودة" };
  
  return {
    title: `${recipe.title} - مطبخ كايبر لايف`,
    description: `تعلمي طريقة عمل ${recipe.title} الأصلية في البيت بمقادير دقيقة وخطوات سهلة.`,
  };
}

// 3. الصفحة الرئيسية للوصفة
export default async function RecipePage({ params }: Props) {
  const { slug } = await params;
  const recipe = recipes.find((r) => r.slug === slug);

  if (!recipe) return notFound();

  // نظام الـ Schema.org لتحسين ظهور الوصفة في جوجل
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    "name": recipe.title,
    "image": recipe.image,
    "recipeCategory": recipe.category,
    "totalTime": `PT${recipe.time}M`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": recipe.rating,
      "ratingCount": "15"
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10" dir="rtl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* رأس الصفحة */}
      <div className="mb-8 text-center">
        <span className="bg-amber-100 text-amber-700 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
          {recipe.category}
        </span>
        <h1 className="text-4xl md:text-5xl font-black mt-4 mb-6 text-gray-900">
          {recipe.title}
        </h1>
        <div className="flex justify-center items-center gap-6 text-gray-600 font-medium">
          <div className="flex items-center gap-2">
            <span>⏱️</span>
            <span>{recipe.time} دقيقة</span>
          </div>
          <div className="flex items-center gap-2">
            <span>⭐</span>
            <span>{recipe.rating}</span>
          </div>
        </div>
      </div>

      {/* صورة الوصفة */}
      <div className="relative h-[300px] md:h-[500px] w-full mb-12 shadow-2xl rounded-[2.5rem] overflow-hidden">
        <img 
          src={recipe.image} 
          className="w-full h-full object-cover" 
          alt={recipe.title} 
        />
      </div>

      {/* المكونات والخطوات */}
      <div className="grid md:grid-cols-3 gap-10">
        {/* عمود المكونات */}
        <div className="md:col-span-1 bg-amber-50 p-8 rounded-3xl h-fit shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-amber-900 flex items-center gap-2">
            <span>🛒</span> المكونات
          </h2>
          <ul className="space-y-4">
            {recipe.ingredients.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-700 border-b border-amber-100 pb-2 last:border-0">
                <span className="text-amber-500">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* عمود الخطوات */}
        <div className="md:col-span-2">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 flex items-center gap-2">
            <span>👨‍🍳</span> طريقة التحضير
          </h2>
          <div className="space-y-8">
            {recipe.steps.map((step, index) => (
              <div key={index} className="flex gap-6 group">
                <div className="flex-shrink-0 w-10 h-10 bg-white border-2 border-amber-500 text-amber-600 rounded-full flex items-center justify-center font-black text-lg group-hover:bg-amber-500 group-hover:text-white transition-colors">
                  {index + 1}
                </div>
                <p className="text-gray-700 text-lg leading-relaxed pt-1">
                  {step}
                </p>
              </div>
            ))}
          </div>

          {/* نصائح احترافية إذا وجدت */}
          {recipe.proTips && (
            <div className="mt-12 bg-green-50 p-6 rounded-2xl border-r-4 border-green-500">
              <h4 className="text-green-800 font-bold mb-2">💡 نصيحة احترافية:</h4>
              <p className="text-green-700 leading-relaxed">{recipe.proTips}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}