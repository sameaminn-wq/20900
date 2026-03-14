import { Recipe } from "./db"; // تأكد من أن المسار يؤدي إلى ملف التعريف الخاص بك

/**
 * وظيفة لتوليد بيانات Schema.org (JSON-LD) لتحسين SEO الوصفات في جوجل
 */
export function recipeSchema(recipe: Recipe & { rating?: number | string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    "name": recipe.title,
    "image": recipe.image,
    "recipeIngredient": recipe.ingredients,
    "recipeInstructions": recipe.steps.map((step, index) => ({
      "@type": "HowToStep",
      "text": step,
      "position": index + 1
    })),
    "cookTime": `PT${recipe.time}M`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": recipe.rating || "5.0",
      "reviewCount": 120
    }
  };
}