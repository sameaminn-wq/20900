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
        className="flex-1 border p-3 rounded-lg text-right outline-none focus:border-orange-500 transition-colors"
        dir="rtl"
      />
      <button
        type="submit"
        className="bg-orange-500 hover:bg-orange-600 text-white px-6 rounded-lg transition-colors font-bold"
      >
        بحث
      </button>
    </form>
  )
}