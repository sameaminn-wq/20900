import Link from "next/link";
// استيراد النوع من db
import { Recipe } from "@/lib/db"; 

// 1. تعريف واجهة محلية (Interface) تضمن وجود الخصائص المطلوبة
interface RecipeCardProps {
  recipe: Recipe & {
    rating?: number | string; 
  }; 
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    /* تم تعديل الرابط أدناه من /recipe/ إلى /recipes/ 
       ليطابق اسم المجلد الموجود في الـ Explorer الخاص بك 
    */
    <Link href={`/recipes/${recipe.slug}`} className="group block h-full">
      <div className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(255,115,0,0.15)] hover:-translate-y-2 h-full flex flex-col">
        
        {/* حاوية الصورة */}
        <div className="relative h-56 w-full overflow-hidden bg-slate-100">
          <img 
            src={recipe.image} 
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
            alt={recipe.title}
            loading="lazy"
          />
          {/* شارة الوقت */}
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
            <p className="text-xs font-bold text-slate-800">
              ⏱ {recipe.time} دقيقة
            </p>
          </div>
        </div>

        {/* محتوى البطاقة */}
        <div className="p-6 text-right flex flex-col flex-grow" dir="rtl">
          <h3 className="font-bold text-xl mb-3 text-slate-800 group-hover:text-orange-600 transition-colors line-clamp-1">
            {recipe.title}
          </h3>
          
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-lg">
              <span className="text-yellow-500 text-sm">⭐</span>
              <span className="text-yellow-700 font-bold text-sm">
                {recipe.rating ? String(recipe.rating) : "5.0"}
              </span>
            </div>
            
            <div className="flex items-center gap-1 text-orange-500 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
              <span>عرض الوصفة</span>
              <span className="text-lg">←</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}