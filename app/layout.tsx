import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import "./globals.css"
import React from "react"
import { Metadata } from 'next' 
import { Analytics } from "@vercel/analytics/next"
import Script from 'next/script'
// استيراد المكونات الرسمية لضمان عدم وجود أخطاء في الـ Build
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google'

/**
 * 1. إعدادات الـ Metadata:
 * هذا الجزء هو المسؤول عن إثبات ملكية الموقع في Search Console.
 */
export const metadata: Metadata = {
  title: "TastyRecipes - عالم الوصفات الشهية",
  description: "اكتشف مئات الوصفات المجربة والمقالات الحصرية عن فن الطبخ",
  verification: {
    // كود التحقق الخاص بك (لا تلمسه)
    google: 'BJkbkAmhKK1kKtcmHmCXdnY37N9RqTIbWCidziUp8DE',
  },
}

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      
      {/* 2. أدوات تتبع جوجل (توضع في الـ Head تلقائياً عبر Next.js) */}
      {/* استبدل GTM-XXXXXXX و G-XXXXXXXXXX بالأكواد الخاصة بك من حسابات جوجل */}
      <GoogleTagManager gtmId="GTM-XXXXXXX" />
      <GoogleAnalytics gaId="G-XXXXXXXXXX" />

      <head>
        {/* 3. كود جوجل أدسينس (Google AdSense) */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1757293962797494"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      
      <body className="bg-slate-50 text-slate-900 antialiased selection:bg-orange-100 selection:text-orange-900 overflow-x-hidden">
        
        {/* الهيكل العام للموقع */}
        <div className="flex flex-col min-h-screen">
          
          {/* شريط التنقل (النيفبار) */}
          <Navbar />

          {/* المحتوى الرئيسي */}
          <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 lg:py-12 transition-all duration-300">
            {children}
            
            {/* 4. تحليلات Vercel لمراقبة الأداء والزوار */}
            <Analytics />
          </main>

          {/* تذييل الصفحة (الفوتر) */}
          <Footer />
          
        </div>

      </body>
    </html>
  )
}