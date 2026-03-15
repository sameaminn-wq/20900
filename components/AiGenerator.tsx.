"use client";

import { useState, useRef } from "react";
import {
  Sparkles,
  Loader2,
  Clock,
  Flame,
  Users,
  Star,
  ChefHat,
  Refrigerator,
  Info,
  CheckCircle2,
  Timer,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────

interface RecipeStep {
  stepNumber: number;
  title: string;
  description: string;
  duration?: number | null;
}

interface Recipe {
  title: string;
  description: string;
  prepTime?: string;
  cookTime?: string;
  servings?: string;
  difficulty?: "سهل" | "متوسط" | "متقدم";
  calories?: number;
  caloriesPerServing?: number;
  macros?: {
    protein?: string;
    carbs?: string;
    fat?: string;
    fiber?: string;
  };
  healthBenefits?: string[];
  chefTip?: string;
  steps: RecipeStep[];
  tags?: string[];
  storageInstructions?: string;
  nutritionistNote?: string;
}

// ─── Difficulty badge color ──────────────────────────────────────────────────

const difficultyConfig = {
  سهل: "bg-green-50 text-green-700 border-green-200",
  متوسط: "bg-amber-50 text-amber-700 border-amber-200",
  متقدم: "bg-red-50 text-red-700 border-red-200",
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function MetricCard({
  label,
  value,
  unit,
}: {
  label: string;
  value?: number;
  unit: string;
}) {
  if (!value) return null;
  return (
    <div className="bg-gray-50 rounded-2xl p-4">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-2xl font-semibold text-gray-900 tabular-nums">
        {value.toLocaleString("ar-EG")}
        <span className="text-sm font-normal text-gray-400 mr-1">{unit}</span>
      </p>
    </div>
  );
}

function MacroCard({
  value,
  label,
}: {
  value?: string;
  label: string;
}) {
  if (!value) return null;
  return (
    <div className="bg-gray-50 rounded-xl p-3 text-center">
      <p className="text-base font-semibold text-gray-900">
        {value}
        <span className="text-xs font-normal text-gray-400 mr-0.5">غ</span>
      </p>
      <p className="text-[11px] text-gray-500 mt-0.5">{label}</p>
    </div>
  );
}

function StepCard({ step, index }: { step: RecipeStep; index: number }) {
  return (
    <div className="flex gap-4 group" dir="rtl">
      <div className="flex-shrink-0 w-7 h-7 rounded-full border border-gray-200 bg-white flex items-center justify-center text-sm font-medium text-gray-700">
        {step.stepNumber || index + 1}
      </div>
      <div className="flex-1 pb-4 border-b border-gray-100 last:border-0">
        {step.title && (
          <p className="text-sm font-medium text-gray-800 mb-1">{step.title}</p>
        )}
        <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
        {step.duration && (
          <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
            <Timer size={11} />
            <span>{step.duration} دقيقة</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function AiGenerator() {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recipeRef = useRef<HTMLDivElement>(null);

  const generate = async () => {
    if (!ingredients.trim() || loading) return;
    setLoading(true);
    setError(null);
    setRecipe(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "حدث خطأ غير متوقع");
      }

      setRecipe(data);
      setTimeout(() => recipeRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch (e) {
      setError(e instanceof Error ? e.message : "فشل في توليد الوصفة");
    } finally {
      setLoading(false);
    }
  };

  const charCount = ingredients.length;
  const maxChars = 300;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      {/* ── Header ── */}
      <div className="px-6 pt-6 pb-5 border-b border-gray-100">
        <div className="flex items-center gap-3" dir="rtl">
          <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
            <ChefHat size={18} className="text-amber-600" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">مولد الوصفات الذكي</h2>
            <p className="text-xs text-gray-400 mt-0.5">الشيف د. كمال النوري — خبرة 60 عامًا</p>
          </div>
        </div>
      </div>

      {/* ── Input ── */}
      <div className="px-6 py-5">
        <div className="relative">
          <textarea
            className="w-full px-4 py-3.5 text-sm bg-gray-50 border border-gray-200 rounded-2xl text-gray-800 placeholder:text-gray-400 focus:ring-1 focus:ring-gray-300 focus:border-gray-300 outline-none resize-none leading-relaxed transition-all"
            placeholder={"مثلاً: شوفان، موز، زبادي، عسل...\nاذكر ما لديك في المطبخ وسأبتكر لك الأفضل"}
            rows={3}
            maxLength={maxChars}
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            dir="rtl"
          />
          <span className="absolute bottom-3 left-3 text-[11px] text-gray-300 tabular-nums">
            {charCount}/{maxChars}
          </span>
        </div>

        <button
          onClick={generate}
          disabled={loading || charCount < 3}
          className="w-full mt-3 py-3 rounded-xl text-sm font-medium bg-gray-900 text-white flex items-center justify-center gap-2 hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[.99]"
          dir="rtl"
        >
          {loading ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              <span>جارٍ الابتكار...</span>
            </>
          ) : (
            <>
              <Sparkles size={15} />
              <span>{recipe ? "ابتكر وصفة أخرى" : "ابتكر وصفتي الآن"}</span>
            </>
          )}
        </button>

        {/* Error */}
        {error && (
          <div className="mt-3 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 text-right">
            {error}
          </div>
        )}
      </div>

      {/* ── Recipe Output ── */}
      {recipe && (
        <div
          ref={recipeRef}
          className="px-6 pb-6 animate-in fade-in slide-in-from-bottom-2 duration-500"
          dir="rtl"
        >
          <div className="border-t border-gray-100 pt-6">
            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-900 leading-snug mb-1.5">
              {recipe.title}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">{recipe.description}</p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-5">
              {recipe.prepTime && (
                <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-600">
                  <Clock size={12} /> {recipe.prepTime} د تحضير
                </span>
              )}
              {recipe.cookTime && (
                <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-600">
                  <Flame size={12} /> {recipe.cookTime} د طهي
                </span>
              )}
              {recipe.servings && (
                <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-600">
                  <Users size={12} /> {recipe.servings} حصص
                </span>
              )}
              {recipe.difficulty && (
                <span
                  className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border ${difficultyConfig[recipe.difficulty] ?? "bg-gray-50 text-gray-600 border-gray-200"}`}
                >
                  <Star size={12} /> {recipe.difficulty}
                </span>
              )}
            </div>

            {/* Calories */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <MetricCard label="السعرات الإجمالية" value={recipe.calories} unit="سعرة" />
              <MetricCard label="للحصة الواحدة" value={recipe.caloriesPerServing} unit="سعرة" />
            </div>

            {/* Macros */}
            {recipe.macros && Object.values(recipe.macros).some(Boolean) && (
              <>
                <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-2">
                  الماكروز للحصة
                </p>
                <div className="grid grid-cols-4 gap-2 mb-5">
                  <MacroCard value={recipe.macros.protein} label="بروتين" />
                  <MacroCard value={recipe.macros.carbs} label="كارب" />
                  <MacroCard value={recipe.macros.fat} label="دهون" />
                  <MacroCard value={recipe.macros.fiber} label="ألياف" />
                </div>
              </>
            )}

            {/* Health Benefits */}
            {recipe.healthBenefits && recipe.healthBenefits.length > 0 && (
              <div className="mb-5">
                <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-3">
                  الفوائد الصحية
                </p>
                <div className="space-y-2">
                  {recipe.healthBenefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 size={14} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700 leading-relaxed">{b}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Chef Tip */}
            {recipe.chefTip && (
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-5 flex gap-3 items-start">
                <ChefHat size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800 leading-relaxed">
                  <span className="font-medium">نصيحة الشيف: </span>
                  {recipe.chefTip}
                </p>
              </div>
            )}

            {/* Steps */}
            {recipe.steps?.length > 0 && (
              <div className="mb-5">
                <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-4">
                  خطوات التحضير
                </p>
                <div className="space-y-1">
                  {recipe.steps.map((step, i) => (
                    <StepCard key={i} step={step} index={i} />
                  ))}
                </div>
              </div>
            )}

            {/* Storage */}
            {recipe.storageInstructions && (
              <div className="bg-gray-50 rounded-2xl p-4 mb-4 flex gap-3 items-start">
                <Refrigerator size={15} className="text-gray-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600 leading-relaxed">
                  {recipe.storageInstructions}
                </p>
              </div>
            )}

            {/* Tags */}
            {recipe.tags && recipe.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {recipe.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-500 border border-gray-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Nutritionist Note */}
            {recipe.nutritionistNote && (
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex gap-3 items-start">
                <Info size={15} className="text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-blue-500 mb-1">ملاحظة خبير التغذية</p>
                  <p className="text-sm text-blue-700 leading-relaxed">{recipe.nutritionistNote}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 