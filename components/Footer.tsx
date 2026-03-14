"use client";
import React, { useState, useEffect } from 'react';

export default function Footer() {
  const [activeModal, setActiveModal] = useState(null);
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  // التأكد من حالة الموافقة على الكوكيز عند تحميل الصفحة
  useEffect(() => {
    const consent = localStorage.getItem('tasty-cookies-consent');
    if (!consent) {
      setShowCookieBanner(true);
    }
  }, []);

  const handleCookieAccept = () => {
    localStorage.setItem('tasty-cookies-consent', 'true');
    setShowCookieBanner(false);
  };

  const toggleModal = (type) => setActiveModal(type);

  const policies = {
    privacy: {
      title: "سياسة الخصوصية والكوكيز",
      content: `نحن في TastyRecipes نستخدم ملفات تعريف الارتباط (Cookies) لتحسين تجربتك. 
      - نستخدم الكوكيز لتذكر تفضيلاتك وتقديم محتوى مخصص.
      - نستخدم خدمات طرف ثالث مثل Google AdSense لعرض الإعلانات التي قد تستخدم الكوكيز لجمع بيانات غير شخصية.
      - يمكنك دائماً تعطيل الكوكيز من إعدادات متصفحك.`
    },
    terms: {
      title: "شروط الاستخدام",
      content: `باستخدامك لموقع TastyRecipes، فإنك توافق على الالتزام بالشروط الآتية:
      1. المحتوى مخصص للاستخدام الشخصي فقط.
      2. يُمنع نسخ أو إعادة توزيع الوصفات دون ذكر المصدر.
      3. الموقع غير مسؤول عن النتائج الناتجة عن سوء تطبيق الوصفات.`
    }
  };

  return (
    <footer className="relative bg-slate-950 text-gray-400 mt-20 dir-rtl" dir="rtl">
      
      {/* شريط الكوكيز - يظهر في الأسفل إذا لم يوافق المستخدم بعد */}
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-orange-500/30 p-4 z-[100] animate-bounce-in shadow-2xl">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-200 text-center md:text-right">
              نحن نستخدم ملفات تعريف الارتباط لنقدم لك أفضل تجربة. استمرارك في التصفح يعني موافقتك على ذلك. 
              <button onClick={() => toggleModal('privacy')} className="underline mr-2 hover:text-orange-400">اقرأ المزيد</button>
            </p>
            <button 
              onClick={handleCookieAccept}
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-2 rounded-full font-bold transition-all transform hover:scale-105"
            >
              موافق
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8 text-right">
        <div>
          <h3 className="text-white font-bold mb-3 text-xl tracking-tight">TastyRecipes</h3>
          <p className="text-sm leading-relaxed">المصدر الأول للوصفات العربية المبتكرة والمجربة.</p>
        </div>

        <div>
          <h4 className="text-white mb-4 font-semibold">المعلومات القانونية</h4>
          <ul className="space-y-3">
            <li>
              <button onClick={() => toggleModal('privacy')} className="hover:text-orange-400 transition-colors">
                سياسة الخصوصية والكوكيز
              </button>
            </li>
            <li>
              <button onClick={() => toggleModal('terms')} className="hover:text-orange-400 transition-colors">
                شروط الاستخدام
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-900 text-center py-6 text-xs text-gray-500">
        © 2026 TastyRecipes - جميع الحقوق محفوظة
      </div>

      {/* مودال السياسات */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-[110]">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl max-w-lg w-full shadow-2xl overflow-y-auto max-h-[80vh]">
            <h3 className="text-2xl text-white font-bold mb-4 border-b border-orange-500/20 pb-4 text-center">
              {policies[activeModal].title}
            </h3>
            <p className="text-gray-300 leading-loose text-base text-right whitespace-pre-line">
              {policies[activeModal].content}
            </p>
            <button 
              onClick={() => setActiveModal(null)}
              className="mt-8 w-full bg-slate-800 text-white py-3 rounded-xl hover:bg-slate-700 transition-all font-semibold"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}