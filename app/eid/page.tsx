import { getCategory } from "@/lib/db"
import RecipeCard from "@/components/RecipeCard"

export default function Eid(){

const recipes = getCategory("eid")

return(

<div>

<h1 className="text-3xl font-bold mb-10">

وصفات العيد

</h1>

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

{recipes.map(r=>(
<RecipeCard key={r.slug} recipe={r}/>
))}

</div>

</div>

)

}