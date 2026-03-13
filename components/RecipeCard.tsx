import Link from "next/link"

export default function RecipeCard({recipe}){

return(

<Link href={`/recipes/${recipe.slug}`}>

<div className="border rounded-xl overflow-hidden hover:shadow-lg">

<img src={recipe.image} className="h-48 w-full object-cover"/>

<div className="p-4">

<h3 className="font-semibold text-lg mb-2">

{recipe.title}

</h3>

<p className="text-sm text-gray-500">

⏱ {recipe.time} دقيقة

</p>

<p className="text-yellow-500">

⭐ {recipe.rating}

</p>

</div>

</div>

</Link>

)

}