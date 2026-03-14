import Link from "next/link";

// 1. تعريف واجهة البيانات لضمان عدم حدوث Type Error
interface RecipeProps {
  recipe: {
    slug: string;
    image: string;
    title: string;
    time: number | string;
    rating: number | string;
  };
}

export default function RecipeCard({ recipe }: RecipeProps) {
  return (
    <Link href={`/recipes/${recipe.slug}`} className="group">
      <div className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(255,115,0,0.15)] hover:-translate-y-2">
        
        {/* حاوية الصورة مع تأثير الزووم عند التمرير */}
        <div className="relative h-56 w-full overflow-hidden">
          <img 
            src={recipe.image} 
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
            alt={recipe.title}
          />
          {/* شارة الوقت فوق الصورة */}
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
            <p className="text-xs font-bold text-slate-800">
              ⏱ {recipe.time} دقيقة
            </p>
          </div>
        </div>

        {/* محتوى البطاقة */}
        <div className="p-6 text-right" dir="rtl">
          <h3 className="font-bold text-xl mb-2 text-slate-800 group-hover:text-orange-600 transition-colors line-clamp-1">
            {recipe.title}
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-lg">
              <span className="text-yellow-500 text-sm">⭐</span>
              <span className="text-yellow-700 font-bold text-sm">{recipe.rating}</span>
            </div>
            
            <span className="text-orange-500 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300">
              عرض التفاصيل ←
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}