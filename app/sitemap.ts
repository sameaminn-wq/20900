import { MetadataRoute } from 'next';
import { recipes } from '@/data/recipes';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tastyrecipess.vercel.app"; 

  // 1. تعريفات الروابط الثابتة
  const staticRoutes: MetadataRoute.Sitemap = ["", "/diet", "/articles", "/eid"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === "" ? 1 : 0.8,
  }));

  // 2. إنشاء روابط الوصفات مع إصلاح خطأ TypeScript
  const recipeRoutes: MetadataRoute.Sitemap = (recipes || [])
    .filter((recipe) => recipe && recipe.slug) // التصفية المنطقية
    .map((recipe) => {
      // نستخدم التأكيد هنا أو الوصول الآمن لضمان عدم وجود خطأ
      return {
        url: `${baseUrl}/recipes/${recipe!.slug}`, // علامة ! تخبر TypeScript أننا نضمن وجود القيمة
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      };
    });

  return [...staticRoutes, ...recipeRoutes];
}