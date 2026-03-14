import { MetadataRoute } from 'next';
import { recipes } from '@/data/recipes'; // استيراد الوصفات لجعل الروابط ديناميكية

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tasty-recipes.vercel.app"; // استبدله برابط موقعك الحقيقي

  // 1. تعريف الروابط الثابتة (Static Routes)
  const staticRoutes = ["", "/categories", "/diet", "/articles", "/eid"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === "" ? 1 : 0.8, // الصفحة الرئيسية لها الأولوية القصوى
  }));

  // 2. إنشاء روابط الوصفات تلقائياً (Dynamic Routes)
  const recipeRoutes = recipes.map((recipe) => ({
    url: `${baseUrl}/recipes/${recipe.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...recipeRoutes];
}