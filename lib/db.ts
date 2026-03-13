import { recipes } from "@/data/recipes"

export function getRecipes(){
return recipes
}

export function getRecipe(slug:string){

return recipes.find(r=>r.slug===slug)

}

export function getCategory(category:string){

return recipes.filter(r=>r.category===category)

}