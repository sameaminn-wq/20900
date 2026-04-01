import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import "./globals.css"
import React from "react"
import { Metadata } from 'next' 
import { Analytics } from "@vercel/analytics/next"
import Script from 'next/script'
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google'

/**
 * إعدادات الـ Metadata:
 * تم إضافة metadataBase لحل مشكلة التنبيه وضمان عمل صور المشاركة (Social Media Images).
 */
export const metadata: Metadata = {
  metadataBase: new URL('https://tastyrecipess.vercel.app'),
  title: "TastyRecipes - عالم الوصفات الشهية",
  description: "اكتشف مئات الوصفات المجربة والمقالات الحصرية عن فن الطبخ",
  verification: {
    google: 'BJkbkAmhKK1kKtcmHmCXdnY37N9RqTIbWCidziUp8DE',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ar_EG',
    url: 'https://tastyrecipess.vercel.app',
    siteName: 'TastyRecipes',
  },
}

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      {/* أدوات تتبع جوجل */}
      <GoogleTagManager gtmId="GTM-N7VWW5NK" />
      <GoogleAnalytics gaId="G-8D5ZLNDDJV" />

      <head>
        {/* كود جوجل أدسينس */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1757293962797494"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      
      <body className="bg-slate-50 text-slate-900 antialiased selection:bg-orange-100 selection:text-orange-900 overflow-x-hidden">
        <div className="flex flex-col min-h-screen">
          <Navbar />

          <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 lg:py-12 transition-all duration-300">
            {children}
            <Analytics />
          </main>

          <Footer />
        </div>
      </body>
    </html>
  )
}