"use client"

import { useState } from "react"
import Link from "next/link"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  // وظيفة لإغلاق القائمة عند الضغط على أي رابط
  const closeMenu = () => setIsOpen(false)

  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-[70px] px-6">
        
        {/* الشعار - Logo */}
        <Link href="/" className="font-black text-2xl tracking-tighter text-amber-500" onClick={closeMenu}>
          TastyRecipes
        </Link>

        {/* القائمة لمتصفحات الكمبيوتر - Desktop Menu */}
        <nav className="hidden md:flex gap-8 text-sm font-bold">
          <Link href="/" className="hover:text-amber-400 transition-colors">الرئيسية</Link>
          <Link href="/recipes" className="hover:text-amber-400 transition-colors">الوصفات</Link>
          <Link href="/fastest" className="hover:text-amber-400 transition-colors">أسرع وصفات</Link>
          <Link href="/eid" className="hover:text-amber-400 transition-colors">وصفات العيد</Link>
          <Link href="/articles" className="hover:text-amber-400 transition-colors">نصائح المطبخ</Link>
        </nav>

        {/* زر الموبايل - Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none p-2"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* القائمة الجانبية للموبايل - Mobile Drawer */}
      <div
        className={`fixed inset-0 bg-slate-900 z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ top: "70px" }}
      >
        <nav className="flex flex-col items-center gap-8 pt-10 text-xl font-bold">
          <Link href="/" onClick={closeMenu} className="hover:text-amber-400">الرئيسية</Link>
          <Link href="/recipes" onClick={closeMenu} className="hover:text-amber-400">الوصفات</Link>
          <Link href="/fastest" onClick={closeMenu} className="hover:text-amber-400">أسرع وصفات</Link>
          <Link href="/eid" onClick={closeMenu} className="hover:text-amber-400">وصفات العيد</Link>
          <Link href="/articles" onClick={closeMenu} className="hover:text-amber-400">نصائح المطبخ</Link>
        </nav>
      </div>
    </header>
  )
}