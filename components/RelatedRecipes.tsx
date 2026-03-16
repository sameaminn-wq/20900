import { recipes } from "@/data/recipes";
import Link from "next/link";

export default function RelatedRecipes({ currentSlug }: { currentSlug: string }) {
  // جلب 3 وصفات عشوائية لا تشمل الوصفة الحالية مع التأكد من وجود r
  const related = (recipes || [])
    .filter((r) => r && r.slug && r.slug !== currentSlug) // أضفنا فحص r و r.slug
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return (
    <section className="mt-16 pt-10 border-t border-slate-100">
      <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
        <span className="text-orange-500 text-3xl">✨</span> وصفات قد تعجبك أيضاً
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((recipe) => (
          // نستخدم علامة ! هنا لأننا قمنا بالتصفية بالأعلى ونعلم يقيناً أنها موجودة
          <Link 
            key={recipe!.slug} 
            href={`/recipes/${recipe!.slug}`}
            className="group block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100"
          >
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={recipe!.image} 
                alt={recipe!.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-slate-800 group-hover:text-orange-600 transition-colors line-clamp-1">
                {recipe!.title}
              </h3>
              <p className="text-sm text-slate-500 mt-2 flex items-center gap-1">
                ⏱ {recipe!.time} دقيقة
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}