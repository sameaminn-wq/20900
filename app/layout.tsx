import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import "./globals.css"
import React from "react"
import { Metadata } from 'next' 
import { Analytics } from "@vercel/analytics/next"
import Script from 'next/script'
// استيراد المكون الرسمي لـ GTM من مكتبة Next.js الرسمية
import { GoogleTagManager } from '@next/third-parties/google'

/**
 * 1. إعدادات الـ Metadata: 
 * تشمل عنوان الموقع وكود إثبات الملكية لجوجل (Search Console)
 */
export const metadata: Metadata = {
  title: "TastyRecipes - عالم الوصفات الشهية",
  description: "اكتشف مئات الوصفات المجربة والمقالات الحصرية عن فن الطبخ",
  verification: {
    google: 'BJkbkAmhKK1kKtcmHmCXdnY37N9RqTIbWCidziUp8DE',
  },
}

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      
      {/* 2. إضافة Google Tag Manager (GTM) 
          يتم وضعه هنا ليعمل في أعلى الـ head والـ body تلقائياً
          تأكد من استبدال GTM-XXXXXXX بالكود الخاص بك
      */}
      <GoogleTagManager gtmId="GTM-XXXXXXX" />

      <head>
        {/* 3. كود جوجل أدسينس (AdSense) 
            موضع في الـ head مع استراتيجية عدم إبطاء الموقع
        */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1757293962797494"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      
      <body className="bg-slate-50 text-slate-900 antialiased selection:bg-orange-100 selection:text-orange-900 overflow-x-hidden">
        
        {/* الهيكل التنظيمي للموقع (Layout Structure) */}
        <div className="flex flex-col min-h-screen">
          
          {/* شريط التنقل العلوي الثابت */}
          <Navbar />

          {/* المحتوى الرئيسي للموقع */}
          <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 lg:py-12">
            {children}
            
            {/* 4. تحليلات Vercel لمراقبة الزوار لحظياً */}
            <Analytics />
          </main>

          {/* تذييل الصفحة */}
          <Footer />
          
        </div>

      </body>
    </html>
  )
}