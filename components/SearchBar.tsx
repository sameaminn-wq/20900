"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SearchBar(){

const [query,setQuery]=useState("")
const router = useRouter()

function search(){

router.push(`/search?q=${query}`)

}

return(

<div className="flex gap-3">

<input

value={query}

onChange={(e)=>setQuery(e.target.value)}

placeholder="ابحث عن وصفة..."

className="flex-1 border p-3 rounded-lg"

/>

<button

onClick={search}

className="bg-orange-500 text-white px-6 rounded-lg"

>

بحث

</button>

</div>

)

}