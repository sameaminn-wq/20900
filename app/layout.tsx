import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import "./globals.css"
import React from "react" // استيراد ريآكت للوصول إلى الأنواع

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-6 py-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>

  )

}