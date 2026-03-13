import { articles } from "@/data/articles";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// توليد الميتا داتا بشكل صحيح
export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { slug } = await params; // فك تشفير الرابط
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: "المقال غير موجود" };
  
  return {
    title: article.title,
    description: article.description,
  };
}

// الصفحة الرئيسية للمقال
export default async function ArticlePage({ params }: { params: any }) {
  // فك تشفير params لضمان الحصول على slug
  const { slug } = await params;
  
  const article = articles.find((a) => a.slug === slug);

  // إذا لم يطابق الـ slug أي مقال، أظهر 404
  if (!article) return notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "image": article.image,
    "description": article.description,
    "author": {
      "@type": "Person",
      "name": "Sami Amin"
    },
    "datePublished": "2026-03-14"
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10" dir="rtl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 leading-tight">
        {article.title}
      </h1>
      
      <div className="flex items-center gap-4 mb-8 text-gray-500">
        <span>بواسطة: قسم الحلويات</span>
        <span>•</span>
        <span>تاريخ النشر: 2026-03-14</span>
      </div>

      <div className="relative h-[300px] md:h-[500px] w-full mb-10 shadow-2xl rounded-3xl overflow-hidden">
        <img 
          src={article.image} 
          className="w-full h-full object-cover" 
          alt={article.title} 
        />
      </div>
      
      <div 
        className="prose prose-xl prose-stone max-w-none 
                   prose-headings:text-amber-700 prose-p:text-gray-700 
                   prose-p:leading-loose text-right"
        dangerouslySetInnerHTML={{ __html: article.content }} 
      />
      
      <div className="mt-12 pt-6 border-t flex flex-wrap gap-2">
        {article.keywords?.map((tag: string) => (
          <span key={tag} className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}