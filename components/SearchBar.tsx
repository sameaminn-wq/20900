"use client" // هذا السطر هو الحل الأساسي للمشكلة

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault() // منع تحديث الصفحة عند الضغط على Enter
    
    // تنظيف النص وتشفيره لدعم اللغة العربية في الروابط
    const trimmedQuery = query.trim()
    if (trimmedQuery) {
      router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-3 w-full max-w-lg">
      <input
  type="text"
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  placeholder="ابحث عن وصفة (مثلاً: كحك العيد)..."
  /* أضفنا text-gray-900 لضمان ظهور النص باللون الأسود/الرمادي الغامق */
  className="flex-1 p-3 rounded-lg text-right text-gray-900 bg-white border-none outline-none focus:ring-2 focus:ring-orange-500 transition-all placeholder:text-gray-400"
  dir="rtl"
/>
<button
  type="submit"
  /* غيرت النص ليكون باللون الأبيض text-white ليتناسب مع الزر البرتقالي في الصورة */
  className="bg-orange-600 hover:bg-orange-700 text-white px-8 rounded-lg transition-all font-bold active:scale-95"
>
  بحث

      </button>
    </form>
  )
}