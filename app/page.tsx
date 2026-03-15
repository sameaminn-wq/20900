import { getRecipes } from "@/lib/db";
import RecipeCard from "@/components/RecipeCard";
import SearchBar from "@/components/SearchBar";
import AiGenerator from "@/components/AiGenerator"; // استيراد المولد الذكي

export default function Home() {
  const recipes = getRecipes();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-20" dir="rtl">
      
      {/* 1. قسم الترحيب والبحث - Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white rounded-[3rem] p-8 md:p-16 shadow-2xl">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          
          <div className="text-right">
            <div className="inline-block px-4 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold mb-6 tracking-widest uppercase">
              منصة الطهي الذكية الأولى
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-[1.1]">
              مستقبلك في المطبخ <br/> 
              <span className="text-orange-500">يبدأ بلمسة ذكاء</span>
            </h1>
            <p className="text-slate-400 text-lg mb-8 max-w-lg leading-relaxed">
              تصفح مئات الوصفات المختارة، أو دع ذكاءنا الاصطناعي يبتكر لك وجبة مثالية بناءً على ما لديك في الثلاجة الآن.
            </p>
            
            <div className="max-w-md">
              <SearchBar />
            </div>
          </div>

          <div className="hidden lg:block relative">
             {/* صورة فخمة تليق بموقع Luxe */}
             <div className="relative rounded-[3rem] overflow-hidden border-[12px] border-slate-800 shadow-2xl transform rotate-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop" 
                  alt="Luxe Cooking" 
                  className="w-full h-full object-cover"
                />
             </div>
          </div>
        </div>
      </section>

      {/* 2. قسم مولد الذكاء الاصطناعي (القوة الضاربة) */}
      <section id="ai-generator" className="py-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-slate-800 mb-4">ابتكار الوصفات بالذكاء الاصطناعي</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            توقف عن الحيرة! أخبرنا بالمكونات المتوفرة لديك وسيقوم الشيف &quot;العالمي&quot; بتصميم وصفة صحية وفخمة لك في ثوانٍ.
          </p>
        </div>
        <AiGenerator />
      </section>

      {/* 3. قسم الوصفات التقليدية (Grid) */}
      <section className="pb-20">
        <div className="flex justify-between items-end mb-10 border-b border-slate-100 pb-6">
          <div>
            <h2 className="text-3xl font-black text-slate-800">أحدث الوصفات المختارة</h2>
            <p className="text-slate-400 mt-2 font-medium">وصفات مجربة ومضمونة من مطبخنا</p>
          </div>
          <button className="text-orange-600 font-bold hover:underline">عرض الكل ←</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {recipes && recipes.length > 0 ? (
            recipes
              .filter((recipe) => recipe && recipe.slug)
              .map((recipe) => (
                <RecipeCard key={recipe.slug} recipe={recipe} />
              ))
          ) : (
            <div className="col-span-full py-20 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
              <h3 className="text-xl font-bold text-slate-800">نعمل على إضافة المزيد من الأطباق..</h3>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}