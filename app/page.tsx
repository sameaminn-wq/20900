import { getRecipes } from "@/lib/db"
import RecipeCard from "@/components/RecipeCard"
import SearchBar from "@/components/SearchBar"

export default function Home(){

const recipes = getRecipes()

return(

<div>

<section className="bg-orange-500 text-white rounded-2xl p-12 mb-12">

<h1 className="text-4xl font-bold mb-4">

أفضل وصفات الطبخ

</h1>

<SearchBar/>

</section>

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

{recipes.map(recipe=>(

<RecipeCard key={recipe.slug} recipe={recipe}/>

))}

</div>

</div>

)

}