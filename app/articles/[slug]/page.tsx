import { articles } from "@/data/articles";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// 1. تعريف النوع الخاص بالـ Params لضمان توافق TypeScript
type Props = {
  params: Promise<{ slug: string }>;
};

// 2. توليد الميتا داتا بشكل احترافي
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  
  if (!article) return { title: "المقال غير موجود | CyberhLive" };
  
  return {
    title: `${article.title} | مطبخ CyberhLive`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      images: [article.image],
      type: 'article',
    },
  };
}

// 3. الصفحة الرئيسية للمقال
export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

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
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <header className="mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 leading-tight">
          {article.title}
        </h1>
        
        <div className="flex items-center gap-4 text-gray-500 font-medium">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
            بواسطة: سامي أمين
          </span>
          <span>•</span>
          <time dateTime="2026-03-14">14 مارس 2026</time>
        </div>
      </header>

      <div className="relative h-[300px] md:h-[550px] w-full mb-12 shadow-2xl rounded-[2.5rem] overflow-hidden group">
        <img 
          src={article.image} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          alt={article.title} 
        />
      </div>
      
      {/* محتوى المقال مع تحسين التنسيق */}
      <article 
        className="prose prose-xl prose-stone max-w-none 
                   prose-headings:text-amber-800 prose-headings:font-bold
                   prose-p:text-gray-800 prose-p:leading-[2.2]
                   prose-li:text-gray-700 prose-strong:text-amber-900
                   text-right"
        dangerouslySetInnerHTML={{ __html: article.content }} 
      />
      
      {/* الكلمات المفتاحية كأوسمة */}
      {article.keywords && (
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-wrap gap-3">
          {article.keywords.map((tag: string) => (
            <span 
              key={tag} 
              className="bg-gray-100 text-gray-600 hover:bg-amber-100 hover:text-amber-700 
                         transition-colors px-4 py-1.5 rounded-2xl text-sm font-semibold cursor-default"
            >
              # {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}