"use client"

import Link from "next/link"

export default function Navbar(){

return(

<header className="bg-slate-900 text-white sticky top-0 z-50">

<div className="max-w-7xl mx-auto flex justify-between items-center h-[70px] px-6">

<Link href="/" className="font-bold text-xl">

TastyRecipes

</Link>

<nav className="flex gap-6 text-sm">

<Link href="/">الرئيسية</Link>

<Link href="/recipes">الوصفات</Link>

<Link href="/fastest">أسرع وصفات</Link>

<Link href="/eid">وصفات العيد</Link>

<Link href="/articles">افضل الوصفات للعيد</Link>

</nav>

</div>

</header>

)

}