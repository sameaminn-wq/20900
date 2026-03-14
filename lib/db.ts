import { recipes } from "@/data/recipes";

// 1. تعريف واجهة البيانات لتوحيد شكل الوصفة في كل التطبيق
export interface Recipe {
  slug: string;
  title: string;
  image: string;
  time: number | string;
  category: string;
  ingredients: string[];
  steps: string[];
}

// 2. جلب كل الوصفات
export function getRecipes(): Recipe[] {
  return recipes as Recipe[];
}

// 3. جلب وصفة محددة عن طريق الـ slug
export function getRecipe(slug: string): Recipe | undefined {
  return (recipes as Recipe[]).find((r) => r.slug === slug);
}

// 4. جلب الوصفات حسب التصنيف
export function getCategory(category: string): Recipe[] {
  return (recipes as Recipe[]).filter((r) => r.category === category);
}