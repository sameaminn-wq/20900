import { recipes } from "@/data/recipes";

/**
 * 1. تعريف واجهة البيانات (Interface)
 * هذا القالب يضمن أن كل وصفة مضافة تحتوي على جميع الحقول المطلوبة.
 */
export interface Recipe {
  slug: string;
  title: string;
  image: string;
  time: number | string;
  category: string;
  ingredients: string[];
  steps: string[];
}

/**
 * 2. جلب كل الوصفات (قراءة آلية لجميع الوصفات الجديدة)
 * تقوم هذه الدالة بمسح ملف البيانات بالكامل وإرجاع الوصفات الجاهزة فقط.
 */
export function getRecipes(): Recipe[] {
  // التأكد من أن الملف ليس فارغاً وأنه مصفوفة
  if (!recipes || !Array.isArray(recipes)) return [];

  return (recipes as Recipe[])
    .filter(r => r && r.slug && r.title) // استبعاد أي وصفة ناقصة آلياً
    .reverse(); // اختيارية: عرض آخر الوصفات المضافة أولاً
}

/**
 * 3. جلب وصفة محددة آلياً
 */
export function getRecipe(slug: string): Recipe | undefined {
  if (!slug) return undefined;
  const allRecipes = getRecipes(); // نستخدم الدالة المفلترة لضمان الجودة
  return allRecipes.find((r) => r.slug === slug);
}

/**
 * 4. جلب الوصفات حسب التصنيف (آلياً)
 */
export function getCategory(category: string): Recipe[] {
  if (!category) return [];
  const allRecipes = getRecipes();
  return allRecipes.filter((r) => r.category === category);
}

/**
 * 5. استخراج كافة التصنيفات المتاحة (فريدة)
 * مفيدة جداً لإنشاء أزرار التصنيفات آلياً بناءً على الوصفات الجديدة.
 */
export function getAllCategories(): string[] {
  const allRecipes = getRecipes();
  const categories = allRecipes.map(r => r.category);
  // استخدام Set للتخلص من التكرار (مثلاً: "حلويات" تظهر مرة واحدة فقط)
  return Array.from(new Set(categories));
}