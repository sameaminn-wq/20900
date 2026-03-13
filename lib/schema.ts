export function recipeSchema(recipe){

  return {
  
  "@context":"https://schema.org",
  "@type":"Recipe",
  
  name:recipe.title,
  
  image:recipe.image,
  
  recipeIngredient:recipe.ingredients,
  
  recipeInstructions:recipe.steps,
  
  cookTime:`PT${recipe.time}M`,
  
  aggregateRating:{
  "@type":"AggregateRating",
  ratingValue:recipe.rating,
  reviewCount:120
  }
  
  }
  
  }