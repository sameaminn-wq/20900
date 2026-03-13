import { getRecipe } from "@/lib/db"

export default function RecipePage({params}){

const recipe = getRecipe(params.slug)

if(!recipe) return <div>Recipe not found</div>

return(

<div className="max-w-3xl">

<img src={recipe.image} className="rounded-xl mb-6"/>

<h1 className="text-4xl font-bold mb-4">

{recipe.title}

</h1>

<p className="text-gray-500 mb-6">

⏱ {recipe.time} دقيقة

</p>

<h2 className="text-2xl font-semibold mb-4">

المكونات

</h2>

<ul className="list-disc ml-6 mb-8">

{recipe.ingredients.map((i,index)=>(

<li key={index}>{i}</li>

))}

</ul>

<h2 className="text-2xl font-semibold mb-4">

طريقة التحضير

</h2>

<ol className="list-decimal ml-6 space-y-2">

{recipe.steps.map((s,index)=>(

<li key={index}>{s}</li>

))}

</ol>

</div>

)

}