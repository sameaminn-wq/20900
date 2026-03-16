import { createClient } from '@/utils/supabase/server'; // استيراد محرك السيرفر
import { recipes as localRecipes } from "@/data/recipes"; // الداتا القديمة (Fallback)
import RecipeCard from "@/components/RecipeCard";
import SearchBar from "@/components/SearchBar";
import AiGenerator from "@/components/AiGenerator";

export default async function Home() {
  // 1. إنشاء اتصال مع Supabase
  const supabase = await createClient();

  // 2. محاولة جلب الوصفات من قاعدة البيانات
  const { data: dbRecipes, error } = await supabase
    .from('recipes')
    .select('*')
    .order('created_at', { ascending: false });

  // 3. آلية التراجع (Fallback): إذا كان هناك خطأ أو قاعدة البيانات فارغة، استخدم الملف القديم
  const finalRecipes = (dbRecipes && dbRecipes.length > 0) 
    ? dbRecipes 
    : localRecipes;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 space-y-12 md:space-y-20" dir="rtl">
      
      {/* 1. قسم الترحيب والبحث - Hero Section (يبقى كما هو) */}
      <section className="relative overflow-hidden bg-slate-900 text-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 shadow-2xl">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-10 md:gap-12">
          <div className="text-right">
            <div className="inline-block px-4 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-[10px] md:text-xs font-bold mb-4 md:mb-6 tracking-widest uppercase">
              منصة الطهي الذكية الأولى
            </div>
            <h1 className="text-3xl md:text-6xl font-black mb-4 md:mb-6 leading-[1.2] md:leading-[1.1]">
              مستقبلك في المطبخ <br/> 
              <span className="text-orange-500">يبدأ بلمسة ذكاء</span>
            </h1>
            <p className="text-slate-400 text-sm md:text-lg mb-6 md:mb-8 max-w-lg leading-relaxed">
              تصفح مئات الوصفات المختارة، أو دع ذكاءنا الاصطناعي يبتكر لك وجبة مثالية.
            </p>
            <div className="max-w-full md:max-w-md">
              <SearchBar />
            </div>
          </div>
          <div className="hidden lg:block relative">
             <div className="relative rounded-[3rem] overflow-hidden border-[12px] border-slate-800 shadow-2xl transform rotate-2">
                <img 
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop" 
                  alt="Luxe Cooking" 
                  className="w-full h-full object-cover"
                />
             </div>
          </div>
        </div>
      </section>

      {/* 2. قسم مولد الذكاء الاصطناعي (يبقى كما هو) */}
      <section id="ai-generator" className="py-6 md:py-10">
        <div className="text-center mb-8 md:mb-12 px-2">
          <h2 className="text-2xl md:text-5xl font-black text-slate-800 mb-3 md:mb-4">ابتكار الوصفات بالذكاء الاصطناعي</h2>
          <AiGenerator />
        </div>
      </section>

      {/* 3. قسم الوصفات (المصدر الديناميكي) */}
      <section className="pb-12 md:pb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-10 border-b border-slate-100 pb-6 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-800">أحدث الوصفات المختارة</h2>
            <p className="text-slate-400 mt-1 md:mt-2 text-sm md:text-base font-medium">وصفات مجربة ومضمونة من مطبخنا</p>
          </div>
          <button className="text-orange-600 font-bold hover:underline">عرض الكل ←</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {finalRecipes && finalRecipes.length > 0 ? (
            finalRecipes
              .filter((recipe) => recipe && recipe.slug)
              .map((recipe) => (
                // ملاحظة: نستخدم الـ slug كمفتاح فريد
                <RecipeCard key={recipe.slug} recipe={recipe} />
              ))
          ) : (
            <div className="col-span-full py-20 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
              <h3 className="text-xl font-bold text-slate-800 px-4">نعمل على إضافة المزيد من الأطباق..</h3>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}