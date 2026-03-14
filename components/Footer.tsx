"use client";
import React, { useState, useEffect } from 'react';

export default function Footer() {
  const [activeModal, setActiveModal] = useState(null);
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('tasty-cookies-consent');
    if (!consent) {
      const timer = setTimeout(() => setShowCookieBanner(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCookieAccept = () => {
    localStorage.setItem('tasty-cookies-consent', 'true');
    setShowCookieBanner(false);
  };

  const policies = {
    privacy: {
      title: "سياسة الخصوصية والكوكيز",
      content: `نحن في TastyRecipes نلتزم بأقصى معايير الخصوصية:\n\n• نستخدم الكوكيز لتحسين أداء الموقع وتحليل حركة الزوار.\n• نستخدم Google AdSense لعرض إعلانات مخصصة تهمك.\n• بياناتك الشخصية (مثل البريد الإلكتروني) لا تُشارك مع أي طرف ثالث تحت أي ظرف.\n• باستمرارك في التصفح، أنت توافق على معالجة البيانات بما يخدم تجربتك.`
    },
    terms: {
      title: "شروط الاستخدام",
      content: `1. المحتوى مخصص للاستخدام الشخصي غير التجاري.\n2. يُمنع إعادة نشر الوصفات أو الصور دون الحصول على إذن مسبق.\n3. يتم تحديث الشروط دورياً لضمان أفضل حماية للمستخدم والموقع.\n4. نلتزم بتقديم معلومات دقيقة، ولكن لا نتحمل مسؤولية أي تطبيق خاطئ للوصفات.`
    }
  };

  return (
    <footer className="relative bg-[#020617] text-slate-400 mt-20 border-t border-slate-900" dir="rtl">
      
      {/* 1. بنر الكوكيز - تصميم عائم وجذاب */}
      {showCookieBanner && (
        <div className="fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:max-w-md bg-slate-900/90 backdrop-blur-xl border border-white/10 p-6 z-[100] rounded-2xl shadow-2xl animate-in slide-in-from-bottom-10 duration-500">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🍪</span>
              <h4 className="text-white font-bold">خصوصيتك تهمنا</h4>
            </div>
            <p className="text-sm leading-relaxed">
              نحن نستخدم ملفات تعريف الارتباط لضمان حصولك على أفضل تجربة طهي.
              <button onClick={() => setActiveModal('privacy')} className="text-orange-500 hover:text-orange-400 font-medium mx-1 underline underline-offset-4">التفاصيل</button>
            </p>
            <button 
              onClick={handleCookieAccept}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2.5 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-orange-600/20"
            >
              موافق، ابدأ الطهي!
            </button>
          </div>
        </div>
      )}

      {/* 2. محتوى الفوتر الأساسي */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* قسم الموقع */}
          <div className="md:col-span-5 space-y-4 text-center md:text-right">
            <h2 className="text-3xl font-black text-white bg-gradient-to-l from-orange-500 to-amber-200 bg-clip-text text-transparent">
              TastyRecipes
            </h2>
            <p className="max-w-md mx-auto md:mx-0 text-slate-300 leading-relaxed">
              وجهتكم الموثوقة لاستكشاف عالم الطهي بكل حب. نقدم لكم وصفات مختارة بعناية لتناسب جميع الأذواق والمناسبات.
            </p>
          </div>

          {/* قسم الروابط */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start">
            <h4 className="text-white font-bold mb-6 relative after:content-[''] after:absolute after:-bottom-2 after:right-0 after:w-8 after:h-1 after:bg-orange-600 after:rounded-full">
              قانونيـات
            </h4>
            <ul className="space-y-4 text-center md:text-right">
              <li><button onClick={() => setActiveModal('privacy')} className="hover:text-white transition-colors">سياسة الخصوصية</button></li>
              <li><button onClick={() => setActiveModal('terms')} className="hover:text-white transition-colors">شروط الاستخدام</button></li>
              <li><a href="#" className="hover:text-white transition-colors">اتصل بنا</a></li>
            </ul>
          </div>

          {/* قسم التواصل */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start">
            <h4 className="text-white font-bold mb-6">تابعوا رحلتنا</h4>
            <div className="flex gap-4">
              {['FB', 'IG', 'YT', 'TW'].map((social) => (
                <div key={social} className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-xs font-bold hover:bg-orange-600 hover:text-white hover:-translate-y-1 transition-all cursor-pointer">
                  {social}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* حقوق النشر */}
        <div className="mt-16 pt-8 border-t border-slate-900/50 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>© 2026 TastyRecipes. جميع الحقوق محفوظة.</p>
          <p className="flex items-center gap-1">
            صُنع بـ <span className="text-red-500 animate-pulse">❤️</span> في مصر
          </p>
        </div>
      </div>

      {/* 3. نافذة السياسات (Modal) - احترافية بالكامل */}
      {activeModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-[110] animate-in fade-in duration-300">
          <div className="bg-[#0f172a] border border-slate-800 p-8 md:p-12 rounded-[2.5rem] max-w-2xl w-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
            
            {/* زر الإغلاق العلوي */}
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-6 left-6 w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-orange-600 transition-colors"
            >
              ✕
            </button>

            <h3 className="text-2xl md:text-3xl text-white font-bold mb-8 text-center">
              {policies[activeModal].title}
            </h3>

            <div className="max-h-[50vh] overflow-y-auto custom-scrollbar pl-4 text-right">
              <p className="text-slate-300 leading-loose text-lg whitespace-pre-line">
                {policies[activeModal].content}
              </p>
            </div>

            <button 
              onClick={() => setActiveModal(null)}
              className="mt-10 w-full bg-slate-800 hover:bg-slate-700 text-white py-4 rounded-2xl font-bold transition-all"
            >
              إغلاق النافذة
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #ea580c; }
      `}</style>
    </footer>
  );
}