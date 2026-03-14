import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import "./globals.css"
import React from "react"

/**
 * RootLayoutProps: تعريف الأنواع لضمان توافق تام مع TypeScript و React 18+
 */
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <body className="bg-slate-50 text-slate-900 antialiased selection:bg-orange-100 selection:text-orange-900">
        
        {/* الهيكل التنظيمي للموقع */}
        <div className="flex flex-col min-h-screen">
          
          {/* شريط التنقل العلوي */}
          <Navbar />

          {/* المحتوى الرئيسي:
            - min-h-screen: لضمان بقاء الفوتر في الأسفل دائماً حتى لو كان المحتوى قليلاً.
            - flex-grow: تجعل المحتوى يتمدد لملء الفراغ.
            - px-4/sm:px-6/lg:px-8: نظام هوامش متطور يتغير حسب حجم شاشة الموبايل أو التابلت.
          */}
          <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 lg:py-12 transition-all duration-300">
            {children}
          </main>

          {/* تذييل الصفحة */}
          <Footer />
          
        </div>

      </body>
    </html>
  )
}