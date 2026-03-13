"use client"

import { useSearchParams } from "next/navigation"
import { recipes } from "@/data/recipes"
import RecipeCard from "@/components/RecipeCard"

export default function SearchPage(){

const params = useSearchParams()

const q = params.get("q") || ""

const result = recipes.filter(r=>r.title.includes(q))

return(

<div>

<h1 className="text-3xl font-bold mb-10">

نتائج البحث

</h1>

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

{result.map(r=>(
<RecipeCard key={r.slug} recipe={r}/>
))}

</div>

</div>

)

}