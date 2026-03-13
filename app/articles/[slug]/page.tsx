import { recipes } from "@/data/recipes"; // تأكد من المسار الصحيح لبياناتك
import { notFound } from "next/navigation";
import { Metadata } from "next";

// 1. تعريف الأنواع (Types) لضمان توافق تام مع TypeScript و Next.js 15
type Props = {
  params: Promise<{ slug: string }>;
};

// 2. دالة توليد الميتا داتا لتحسين الـ SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const recipe = recipes.find((r) => r.slug === slug);
  
  if (!recipe) return { title: "الوصفة غير موجودة" };
  
  return {
    title: `${recipe.title} - مطبخ كايبر لايف`,
    description: `تعرفي على أسهل طريقة لتحضير ${recipe.title} بمكونات اقتصادية وخطوات احترافية.`,
  };
}

// 3. المكون الرئيسي للصفحة (Page Component)
export default async function RecipePage({ params }: Props) {
  // فك تشفير الـ params لأنها Promise في النسخ الجديدة
  const { slug } = await params;
  const recipe = recipes.find((r) => r.slug === slug);

  if (!recipe) return notFound();

  // نظام JSON-LD لمساعدة جوجل في عرض الوصفة بشكل غني (Rich Results)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    "name": recipe.title,
    "image": recipe.image,
    "description": `طريقة عمل ${recipe.title} الأصلية.`,
    "recipeCategory": recipe.category,
    "prepTime": `PT${recipe.time}M`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": recipe.rating,
      "ratingCount": "20"
    }
  };

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12" dir="rtl">
      {/* حقن بيانات الـ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* الرأس (Header) - متجاوب تماماً */}
      <header className="mb-10 text-center">
        <div className="inline-block px-4 py-1 mb-4 text-xs font-bold tracking-widest text-amber-700 uppercase bg-amber-100 rounded-full">
          {recipe.category}
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-gray-900 mb-6">
          {recipe.title}
        </h1>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm font-medium text-gray-500">
          <span className="flex items-center gap-2">⏱️ {recipe.time} دقيقة</span>
          <span className="flex items-center gap-2">⭐ {recipe.rating} تقييم</span>
        </div>
      </header>

      {/* الصورة الكبيرة - تصميم متجاوب (Aspect Ratio) */}
      <div className="relative aspect-video w-full mb-12 overflow-hidden shadow-2xl rounded-2xl md:rounded-[3rem]">
        <img 
          src={recipe.image} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
          alt={recipe.title} 
        />
      </div>

      {/* المحتوى - مقسم لشبكة (Grid) تتغير حسب الشاشة */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* المكونات - تأخذ مساحة أقل في الشاشات الكبيرة */}
        <aside className="lg:col-span-4 bg-gray-50 p-6 sm:p-8 rounded-3xl border border-gray-100 h-fit">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b-2 border-amber-500 pb-2 inline-block">
            المكونات
          </h2>
          <ul className="space-y-4">
            {recipe.ingredients.map((ing, idx) => (
              <li key={idx} className="flex items-start gap-3 text-gray-700">
                <span className="mt-1.5 w-2 h-2 bg-amber-500 rounded-full flex-shrink-0" />
                <span className="text-lg">{ing}</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* الطريقة - تأخذ مساحة أكبر */}
        <main className="lg:col-span-8">
          <h2 className="text-2xl font-bold mb-8 text-gray-900">طريقة التحضير</h2>
          <div className="space-y-10">
            {recipe.steps.map((step, index) => (
              <div key={index} className="flex gap-5 sm:gap-8 group">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-amber-500 text-white font-black text-xl shadow-lg shadow-amber-200 group-hover:rotate-12 transition-transform">
                  {index + 1}
                </div>
                <p className="text-lg sm:text-xl text-gray-700 leading-relaxed pt-1">
                  {step}
                </p>
              </div>
            ))}
          </div>

          {/* نصيحة إضافية للمسة احترافية */}
          {recipe.proTips && (
            <div className="mt-16 p-6 bg-blue-50 border-r-8 border-blue-500 rounded-xl">
              <h3 className="text-blue-900 font-bold text-xl mb-2">💡 نصيحة سرية:</h3>
              <p className="text-blue-800 text-lg leading-relaxed">{recipe.proTips}</p>
            </div>
          )}
        </main>
      </div>
    </article>
  );
}