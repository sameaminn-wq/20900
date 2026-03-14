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
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12" dir="rtl">
      
      {/* رأس المقال - الهيدر */}
      <header className="text-center mb-8 md:mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-4">
          {article.title}
        </h1>
        <div className="flex justify-center items-center gap-2 text-slate-500 text-sm">
          <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">وصفة مختارة</span>
          <span>•</span>
          <time>2026</time>
        </div>
      </header>

      {/* صورة المقال - متجاوبة بذكاء */}
      <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl md:rounded-[2.5rem] overflow-hidden mb-8 md:mb-12 shadow-2xl shadow-slate-200">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>

      {/* محتوى المقال */}
      <div className="max-w-3xl mx-auto">
        {/* الوصف المختصر */}
        <p className="font-bold text-lg md:text-2xl text-amber-800 mb-8 leading-relaxed border-r-4 border-amber-500 pr-4 bg-amber-50/50 py-4 rounded-l-xl">
          {article.description}
        </p>
        
        {/* المحتوى التفصيلي */}
        <div 
          className="article-content prose prose-slate prose-lg md:prose-xl max-w-none 
          prose-headings:text-slate-900 prose-headings:font-bold
          prose-p:text-slate-700 prose-p:leading-extra-loose
          prose-img:rounded-2xl prose-strong:text-amber-700
          text-right"
          dangerouslySetInnerHTML={{ __html: article.content || "" }} 
        />
      </div>

      {/* تذييل المقال (اختياري) */}
      <footer className="mt-12 pt-8 border-t border-slate-100 text-center">
        <button className="bg-slate-900 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-colors font-bold">
          مشاركة الوصفة
        </button>
      </footer>
    </article>
  );
}