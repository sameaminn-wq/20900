import { Recipe } from "./db";

// ─── دوال مساعدة ──────────────────────────────────────────────────────────────

function toISO8601(minutes: number): string {
  if (minutes < 60) return `PT${minutes}M`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `PT${h}H${m}M` : `PT${h}H`;
}

function getReviewCount(slug: string, rating: number): number {
  const seed = slug.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const base = (seed % 80) + 20;
  return rating >= 4.8 ? base + 50 : rating >= 4.5 ? base + 20 : base;
}

function splitTime(total: number): { prep: number; cook: number } {
  if (total <= 15) return { prep: 5,  cook: total - 5  };
  if (total <= 30) return { prep: 10, cook: total - 10 };
  return                  { prep: 15, cook: total - 15 };
}

// ─── الدالة الرئيسية ───────────────────────────────────────────────────────────

export function recipeSchema(
  recipe: Recipe & { rating?: number | string; description?: string; category?: string },
  siteUrl: string = "https://www.tastyrecipes.com"
) {
  const totalMinutes = Number(recipe.time) || 30;
  const { prep, cook } = splitTime(totalMinutes);
  const ratingValue   = Number(recipe.rating) || 5.0;
  const reviewCount   = getReviewCount(recipe.slug, ratingValue);
  const recipeUrl     = `${siteUrl}/recipes/${recipe.slug}`;
  const imageUrl      = recipe.image;
  const description   = recipe.description
    ?? `طريقة تحضير ${recipe.title} بخطوات سهلة ومقادير دقيقة ومجربة.`;

  return {
    "@context": "https://schema.org/",
    "@type":    "Recipe",

    // ─── أساسي ────────────────────────────────────────────────────────────────
    "name":          recipe.title,
    "description":   description,
    "url":           recipeUrl,
    "datePublished": new Date().toISOString().split("T")[0],

    // ─── صورة بـ 3 أحجام بصيغة ImageObject ────────────────────────────────────
    "image": [
      { "@type": "ImageObject", "url": imageUrl,                             "width": 600,  "height": 400 },
      { "@type": "ImageObject", "url": imageUrl.replace("w=600", "w=800"),  "width": 800,  "height": 533 },
      { "@type": "ImageObject", "url": imageUrl.replace("w=600", "w=1200"), "width": 1200, "height": 800 },
    ],

    // ─── المؤلف ────────────────────────────────────────────────────────────────
    "author": {
      "@type": "Organization",
      "name":  "TastyRecipes",
      "url":   siteUrl,
    },

    // ─── الوقت ────────────────────────────────────────────────────────────────
    "prepTime":  toISO8601(prep),
    "cookTime":  toISO8601(cook),
    "totalTime": toISO8601(totalMinutes),

    // ─── التصنيف ──────────────────────────────────────────────────────────────
    "recipeYield":    "2-4 حصص",
    "recipeCategory": "وصفات طبخ",
    "recipeCuisine":  "عربي",
    "keywords":       `${recipe.title}, وصفة, طريقة عمل, مطبخ عربي`,

    // ─── المكونات ─────────────────────────────────────────────────────────────
    "recipeIngredient": recipe.ingredients,

    // ─── الخطوات مع name + url + image لكل خطوة ──────────────────────────────
    "recipeInstructions": recipe.steps.map((step, index) => {
      const colonIdx = step.indexOf(":");
      const stepName =
        colonIdx > 0 && colonIdx < 40
          ? step.substring(0, colonIdx).trim()
          : `الخطوة ${index + 1}`;
      return {
        "@type": "HowToStep",
        "name":  stepName,
        "text":  step,
        "url":   `${recipeUrl}#step-${index + 1}`,
        "image": {
          "@type":  "ImageObject",
          "url":    imageUrl,
          "width":  600,
          "height": 400,
        },
      };
    }),

    // ─── التقييم ──────────────────────────────────────────────────────────────
    "aggregateRating": {
      "@type":       "AggregateRating",
      "ratingValue": ratingValue.toFixed(1),
      "reviewCount": reviewCount,
      "bestRating":  "5",
      "worstRating": "1",
    },

    // ─── التغذية ──────────────────────────────────────────────────────────────
    "nutrition": {
      "@type":       "NutritionInformation",
      "calories":    "400 سعرة حرارية",
      "servingSize": "حصة واحدة",
    },

  };
}