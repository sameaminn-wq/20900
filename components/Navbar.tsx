"use client";
import React, { useState, useEffect } from 'react';

export default function Footer() {
  const [activeModal, setActiveModal] = useState(null);
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('tasty-cookies-consent');
    if (!consent) {
      // تأخير بسيط لظهور الشريط لإعطاء لمسة جمالية
      setTimeout(() => setShowCookieBanner(true), 1500);
    }
  }, []);

  const handleCookieAccept = () => {
    localStorage.setItem('tasty-cookies-consent', 'true');
    setShowCookieBanner(false);
  };

  const policies = {
    privacy: {
      title: "سياسة الخصوصية والكوكيز",
      content: `مرحباً بك في TastyRecipes. نحن نلتزم بحماية خصوصيتك وفقاً لمعايير Google AdSense و GDPR:\n\n• نستخدم ملفات تعريف الارتباط (Cookies) لتحليل حركة الزوار وتخصيص تجربتك.\n• شركاؤنا من الجهات الخارجية (مثل جوجل) قد يضعون كوكيز في متصفحك لعرض إعلانات بناءً على زياراتك السابقة.\n• لا نقوم ببيع بياناتك الشخصية لأي جهة ثالثة.\n• يمكنك إدارة تفضيلات الكوكيز من إعدادات متصفحك في أي وقت.`
    },
    terms: {
      title: "شروط الاستخدام",
      content: `باستخدامك لموقعنا، فإنك تقر بالآتي:\n\n1. المحتوى مخصص للاستخدام التعليمي والمنزلي فقط.\n2. جميع حقوق الملكية الفكرية للوصفات والصور تعود لـ TastyRecipes ما لم يذكر خلاف ذلك.\n3. يُمنع استخدام الموقع لأي غرض غير قانوني أو يضر بالخدمة.\n4. نحتفظ بالحق في تعديل هذه الشروط في أي وقت.`
    }
  };

  return (
    <footer className="relative bg-slate-950 text-gray-400 mt-20 border-t border-slate-900" dir="rtl">
      
      {/* 1. Cookie Banner - Mobile Optimized */}
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-orange-600/50 p-4 md:p-6 z-[100] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] transition-all">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-4 text-center md:text-right">
            <p className="text-sm md:text-base text-gray-200 leading-relaxed">
              🍪 نستخدم ملفات تعريف الارتباط لنضمن لك أفضل تجربة طهي! 
              <button onClick={() => setActiveModal('privacy')} className="mr-2 text-orange-500 hover:underline font-medium">التفاصيل</button>
            </p>
            <button 
              onClick={handleCookieAccept}
              className="w-full md:w-auto bg-orange-600 hover:bg-orange-700 text-white px-10 py-2.5 rounded-xl font-bold transition-all active:scale-95"
            >
              موافق، فهمت
            </button>
          </div>
        </div>
      )}

      {/* 2. Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-8">
          
          {/* Section 1: About */}
          <div className="flex flex-col items-center md:items-start text-center md:text-right">
            <h3 className="text-white font-bold mb-4 text-2xl tracking-tight">TastyRecipes</h3>
            <p className="text-sm leading-7 max-w-xs">
              منصتكم الأولى لاستكشاف أسرار المطبخ العربي والعالمي بوصفات دقيقة ونتائج مضمونة.
            </p>
          </div>

          {/* Section 2: Links */}
          <div className="flex flex-col items-center md:items-start text-center md:text-right">
            <h4 className="text-white mb-5 font-semibold text-lg underline decoration-orange-600 underline-offset-8">روابط تهمك</h4>
            <ul className="space-y-4">
              <li><button onClick={() => setActiveModal('privacy')} className="hover:text-orange-500 transition-all block">سياسة الخصوصية</button></li>
              <li><button onClick={() => setActiveModal('terms')} className="hover:text-orange-500 transition-all block">شروط الاستخدام</button></li>
              <li><a href="mailto:contact@tastyrecipes.com" className="hover:text-orange-500 transition-all block">اتصل بنا</a></li>
            </ul>
          </div>

          {/* Section 3: Newsletter or Social */}
          <div className="flex flex-col items-center md:items-start text-center md:text-right">
            <h4 className="text-white mb-5 font-semibold text-lg">تابعنا</h4>
            <div className="flex gap-4 text-xs">
              <span className="bg-slate-900 p-3 rounded-full hover:bg-orange-600 transition-colors cursor-pointer">FB</span>
              <span className="bg-slate-900 p-3 rounded-full hover:bg-orange-600 transition-colors cursor-pointer">IG</span>
              <span className="bg-slate-900 p-3 rounded-full hover:bg-orange-600 transition-colors cursor-pointer">TW</span>
            </div>
          </div>
        </div>

        {/* 3. Copyright Row */}
        <div className="mt-12 pt-8 border-t border-slate-900 text-center text-xs md:text-sm text-gray-500">
          © {new Date().getFullYear()} TastyRecipes. صُنع بكل ❤️ لعشاق الطعام.
        </div>
      </div>

      {/* 4. Policy Modal - Optimized for Mobile Scrolling */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-[110] animate-in fade-in duration-300">
          <div className="bg-slate-900 border border-slate-800 p-6 md:p-10 rounded-[2rem] max-w-2xl w-full shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
            
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-5 left-5 text-gray-400 hover:text-white text-2xl p-2"
            >
              ✕
            </button>

            <h3 className="text-xl md:text-2xl text-white font-bold mb-6 border-b border-orange-500/20 pb-4 text-center">
              {policies[activeModal].title}
            </h3>

            <div className="overflow-y-auto pr-2 custom-scrollbar text-right">
              <p className="text-gray-300 leading-relaxed text-sm md:text-base whitespace-pre-line">
                {policies[activeModal].content}
              </p>
            </div>

            <button 
              onClick={() => setActiveModal(null)}
              className="mt-8 w-full bg-orange-600 hover:bg-orange-700 text-white py-3.5 rounded-2xl transition-all font-bold shadow-lg shadow-orange-900/20"
            >
              موافق، إغلاق النافذة
            </button>
          </div>
        </div>
      )}

      {/* CSS بسيط لتحسين تجربة الموبايل (أضفه في ملف globals.css أو داخل style tag) */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #0f172a; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #ea580c; border-radius: 10px; }
      `}</style>
    </footer>
  );
}