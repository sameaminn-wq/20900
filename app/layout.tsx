import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import "./globals.css"
import React from "react"
import { Metadata } from 'next' 
// 1. استيراد Analytics من Vercel
import { Analytics } from "@vercel/analytics/next"

/**
 * إعدادات الـ Metadata: ت إضافة كود تحقق جوجل فقط
 */
export const metadata: Metadata = {
  verification: {
    google: 'BJkbkAmhKK1kKtcmHmCXdnY37N9RqTIbWCidziUp8DE',
  },
}

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

          {/* المحتوى الرئيسي */}
          <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 lg:py-12 transition-all duration-300">
            {children}
            {/* 2. وضع مكون التحليلات داخل المحتوى ليعمل في كل الصفحات */}
            <Analytics />
          </main>

          {/* تذييل الصفحة */}
          <Footer />
          
        </div>

      </body>
    </html>
  )
}