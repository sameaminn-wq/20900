import { getRecipes } from "@/lib/db"
import RecipeCard from "@/components/RecipeCard"

export default function Fastest(){

const fast = getRecipes().filter(r=>r.time<=15)

return(

<div>

<h1 className="text-3xl font-bold mb-10">

أسرع وصفات

</h1>

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

{fast.map(r=>(
<RecipeCard key={r.slug} recipe={r}/>
))}

</div>

</div>

)

}