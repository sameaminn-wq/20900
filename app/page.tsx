import { getRecipes } from "@/lib/db";
import RecipeCard from "@/components/RecipeCard";
import SearchBar from "@/components/SearchBar";

/**
 * صفحة الموقع الرئيسية (Home Page)
 * تقوم بعرض قائمة الوصفات مع شريط بحث وقسم ترحيبي.
 */
export default function Home() {
  // جلب البيانات من قاعدة البيانات المحلية أو الملف
  const recipes = getRecipes();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
      
      {/* قسم الترحيب والبحث - Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-[2rem] p-8 md:p-16 mb-12 shadow-xl shadow-orange-200">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
          
          {/* النصوص وصندوق البحث */}
          <div className="text-center md:text-right">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 leading-tight">
              أفضل وصفات الطبخ <br/> 
              <span className="text-orange-100 text-2xl sm:text-3xl font-medium">بين يديك الآن</span>
            </h1>
            <p className="text-orange-50 text-sm sm:text-base mb-8 opacity-90 max-w-lg">
              اكتشف مئات الوصفات الشهية والمجربة من أشهر المطابخ العربية والعالمية. ابدأ رحلتك في عالم الطهي الاحترافي اليوم.
            </p>
            
            <div className="max-w-md mx-auto md:mx-0">
              <SearchBar />
            </div>
          </div>

          {/* الصورة المضافة - الوجبة الشهية */}
          <div className="hidden lg:block relative group">
            <div className="relative w-full aspect-square max-w-[400px] mr-auto overflow-hidden rounded-[2.5rem] border-8 border-white/20 shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop" 
                alt="طبق شهي ومميز" 
                className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
              />
            </div>
            {/* لمسة جمالية خلف الصورة */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-amber-400 rounded-full blur-2xl opacity-50"></div>
          </div>
        </div>

        {/* عناصر ديكورية للخلفية */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-20 -translate-y-20 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-orange-400/20 rounded-full translate-x-10 translate-y-10 blur-2xl"></div>
      </section>

      {/* شبكة عرض الوصفات - Grid System */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
        {recipes && recipes.length > 0 ? (
          recipes
            .filter((recipe) => recipe && recipe.slug)
            .map((recipe) => (
              <div 
                key={recipe.slug} 
                className="transform transition-all duration-300 hover:-translate-y-2"
              >
                <RecipeCard recipe={recipe} />
              </div>
            ))
        ) : (
          <div className="col-span-full py-24 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
            <div className="text-5xl mb-4">👨‍🍳</div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">لا توجد وصفات حالياً</h3>
            <p className="text-slate-500 italic">
              نعمل حالياً على إضافة وصفات جديدة، ترقبونا قريباً!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}