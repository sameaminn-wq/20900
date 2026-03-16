import { MetadataRoute } from 'next';
import { recipes } from '@/data/recipes';

export default function sitemap(): MetadataRoute.Sitemap {
  // نصيحة: تأكد 100% أن هذا الرابط هو نفس الرابط الذي تفتحه في المتصفح بالضبط
  const baseUrl = "https://tastyrecipess.vercel.app"; 

  // 1. تعريفات الروابط الثابتة
  const staticRoutes: MetadataRoute.Sitemap = ["", "/diet", "/articles", "/eid"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === "" ? 1 : 0.8,
  }));

  // 2. إنشاء روابط الوصفات تلقائياً (تمت إضافة الإصلاح هنا)
  const recipeRoutes: MetadataRoute.Sitemap = (recipes || [])
    .filter((recipe) => recipe && recipe.slug) // سطر الأمان: تجاهل أي وصفة فارغة أو بدون slug
    .map((recipe) => ({
      url: `${baseUrl}/recipes/${recipe.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

  return [...staticRoutes, ...recipeRoutes];
}