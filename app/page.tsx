import { getRecipes } from "@/lib/db";
import RecipeCard from "@/components/RecipeCard";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  const recipes = getRecipes();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
      
      {/* قسم الترحيب والبحث - Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-[2rem] p-8 md:p-16 mb-12 shadow-xl shadow-orange-200">
        <div className="relative z-10 max-w-2xl text-center md:text-right">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 leading-tight">
            أفضل وصفات الطبخ <br/> 
            <span className="text-orange-100 text-2xl sm:text-3xl font-medium">بين يديك الآن</span>
          </h1>
          <p className="text-orange-50 text-sm sm:text-base mb-8 opacity-90">
            اكتشف مئات الوصفات الشهية والمجربة من أشهر المطابخ العربية والعالمية.
          </p>
          
          {/* شريط البحث */}
          <div className="max-w-md">
            <SearchBar />
          </div>
        </div>

        {/* لمسة ديكور خلفية (دوائر شفافة) */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-20 -translate-y-20 blur-3xl"></div>
      </section>

      {/* شبكة الوصفات - Grid System */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.slug} className="transform transition-all duration-300 hover:-translate-y-2">
              <RecipeCard recipe={recipe} />
            </div>
          ))
        ) : (
          <p className="text-center col-span-full py-20 text-gray-500 italic">
            لا توجد وصفات متاحة حالياً..
          </p>
        )}
      </div>
    </div>
  );
}