import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import "./globals.css"
import React from "react"
import { Metadata } from 'next' 
import { Analytics } from "@vercel/analytics/next"
// 1. استيراد مكون Script من Next.js
import Script from 'next/script'

/**
 * إعدادات الـ Metadata: تم دمج! كود تحقق جوجل بنجاح
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
      <head>
        {/* 2. دمج كود جوجل أدسينس الخاص بك هنا داخل الـ head */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1757293962797494"
          crossOrigin="anonymous"
          strategy="afterInteractive" // لضمان تحميله بعد تفاعل الصفحة ولعدم إبطاء التحميل الأولي
        />
      </head>
      <body className="bg-slate-50 text-slate-900 antialiased selection:bg-orange-100 selection:text-orange-900">
        
        {/* الهيكل التنظيمي للموقع */}
        <div className="flex flex-col min-h-screen">
          
          {/* شريط التنقل العلوي */}
          <Navbar />

          {/* المحتوى الرئيسي */}
          <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 lg:py-12 transition-all duration-300">
            {children}
            {/* 3. وضع مكون التحليلات داخل المحتوى ليعمل في كل الصفحات */}
            <Analytics />
          </main>

          {/* تذييل الصفحة */}
          <Footer />
          
        </div>

      </body>
    </html>
  )
}