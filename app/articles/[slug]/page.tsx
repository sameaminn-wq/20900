import { articles } from "@/data/articles";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) return notFound();

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

      <div className="prose prose-amber prose-lg max-w-none text-slate-700 leading-loose">
        <p className="font-medium text-xl text-amber-700 mb-6 italic">
          {article.description}
        </p>
        
        {/* التعديل هنا: استخدام dangerouslySetInnerHTML لعرض التنسيق بدلاً من الرموز */}
        <div 
          className="article-content"
          dangerouslySetInnerHTML={{ __html: article.content || "" }} 
        />
      </div>
    </article>
  );
}