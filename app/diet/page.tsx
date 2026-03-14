import { getCategory } from "@/lib/db";
import RecipeCard from "@/components/RecipeCard";

export default function DietPage() {
  // جلب وصفات الدايت فقط من قاعدة البيانات
  const dietRecipes = getCategory("diet");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16" dir="rtl">
      
      {/* رأس الصفحة - تصميم هادئ ومريح للعين (Healthy Vibes) */}
      <header className="relative mb-12 text-center md:text-right overflow-hidden bg-emerald-50 rounded-[2.5rem] p-10 md:p-16 border border-emerald-100">
        <div className="relative z-10">
          <span className="inline-block bg-emerald-200 text-emerald-800 text-xs font-bold px-4 py-1 rounded-full mb-4 uppercase tracking-widest">
            نمط حياة صحي
          </span>
          <h1 className="text-3xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
            وصفات <span className="text-emerald-600">الرشاقة والدايت</span>
          </h1>
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl leading-relaxed">
            استمتع بأشهى المأكولات دون الشعور بالذنب. وصفات محسوبة السعرات الحرارية، غنية بالبروتين ومصممة لمساعدتك في الوصول لوزنك المثالي.
          </p>
        </div>
        
        {/* لمسة ديكور خضراء خلفية */}
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl"></div>
      </header>

      {/* شبكة وصفات الدايت */}
      {dietRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {dietRecipes.map((recipe) => (
            <div key={recipe.slug} className="h-full transform transition-all duration-500 hover:-translate-y-2">
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
          <span className="text-5xl mb-4 block">🥗</span>
          <h2 className="text-2xl font-bold text-slate-400">نعمل على تحضير وجبات صحية جديدة...</h2>
          <p className="text-slate-400 mt-2">انتظرونا قريباً بأقوى وصفات الكيتو واللو كارب.</p>
        </div>
      )}

      {/* نصيحة دايت سريعة في الأسفل */}
      <footer className="mt-20 p-8 bg-slate-900 rounded-3xl text-center text-white">
        <h3 className="text-xl font-bold mb-2">💡 نصيحة TastyRecipes اليوم</h3>
        <p className="text-slate-400 italic">"الأكل الصحي ليس حرماناً، بل هو فن اختيار البدائل الأذكى لذات الطعم الرائع."</p>
      </footer>
    </div>
  );
}