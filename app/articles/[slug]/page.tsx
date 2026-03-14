import { articles } from "@/data/articles";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: PageProps) {
  // 1. فك تشفير الـ params (ضروري في Next.js 15)
  const { slug } = await params;

  // 2. البحث عن المقال داخل مصفوفة البيانات
  const article = articles.find((a) => a.slug === slug);

  // 3. إذا لم يجد المقال (slug خطأ)، يظهر صفحة 404 تلقائياً
  if (!article) {
    return notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-10" dir="rtl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-slate-900">{article.title}</h1>
      </div>

      <div className="relative aspect-video rounded-3xl overflow-hidden mb-8 shadow-lg">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="prose prose-lg max-w-none text-slate-700 leading-loose">
        <p className="font-medium text-xl text-amber-700 mb-6 italic">
          {article.description}
        </p>
        {/* هنا يمكنك عرض محتوى المقال الكامل */}
        <div className="whitespace-pre-wrap">
           {article.content || "محتوى المقال سيظهر هنا..."}
        </div>
      </div>
    </article>
  );
}