import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import "./globals.css"
import React from "react"

/**
 * إصلاح خطأ TypeScript: 
 * يجب تعريف واجهة (Interface) تخبر المحرك أن children هي من نوع ReactNode
 */
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-gray-50 text-slate-900 antialiased">
        <Navbar />
        {/* max-w-7xl تضمن أن المحتوى لا يتمدد بشكل مبالغ فيه في الشاشات الكبيرة */}
        <main className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}