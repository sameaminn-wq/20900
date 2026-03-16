"use client";
import React, { useState, useEffect } from 'react';

// 1. تعريف الأنواع المسموحة للـ Modal لضمان عدم حدوث خطأ TypeScript
type ModalType = 'privacy' | 'terms' | 'ai' | null;

export default function Footer() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('tasty-cookies-consent');
    if (!consent) {
      const timer = setTimeout(() => setShowCookieBanner(true), 2000); // تأخير طفيف لجمالية الظهور
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCookieAccept = () => {
    localStorage.setItem('tasty-cookies-consent', 'true');
    setShowCookieBanner(false);
  };

  // تحديد نوع المتغير بوضوح كـ ModalType
  const toggleModal = (type: ModalType) => setActiveModal(type);

  const policies = {
    privacy: {
      title: "سياسة الخصوصية والكوكيز",
      icon: "🔒",
      content: `نحن في TastyRecipes نستخدم ملفات تعريف الارتباط (Cookies) لتحسين تجربتك.\n\n• !نستخدم الكوكيز لتذكر تفضيلاتك وتقديم محتوى مخصص.\n• نستخدم خدمات طرف ثالث مثل Google AdSense لعرض الإعلانات.\n• يمكنك دائماً تعطيل الكوكيز من إعدادات متصفحك.`
    },
    terms: {
      title: "شروط الاستخدام",
      icon: "📜",
      content: `باستخدامك لموقع TastyRecipes، فإنك توافق على:\n\n1. المحتوى مخصص لكل للاستخدامات.\n2. الموقع غير مسؤول عن النتائج الناتجة عن سوء تطبيق الوصفات.\n3. يمكنك التواصل عبر  sameaminn@gmail.com.`
    },
    ai: {
      title: "سياسة الشفافية والذكاء الاصطناعي",
      icon: "🤖",
      content: `نحن نؤمن بالشفافية الكاملة مع مستخدمينا:\n\n• نستخدم تقنيات الذذكاء الاصطناعي (AI) في توليد وتحسين محتوى الموقع بالكامل.\n• قد تحتوي بعض المعلومات على أخطاء تقنية أو مطبعية ناتجة عن المعالجة الآلية.\n• إخلاء مسؤولية: نحن غير مسؤولين عن أي سوء استخدام للمعلومات أو الوصفات الواردة، ويُنصح دائماً بالمراجعة البشرية.`
    }
  };

  return (
    <footer className="relative bg-slate-950 text-gray-400 mt-20 border-t border-slate-900" dir="rtl">
      
      {/* شريط الكوكيز المحسن */}
      {showCookieBanner && (
        <div className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-6 z-[100] rounded-[2rem] shadow-2xl animate-in fade-in slide-in-from-bottom-10 duration-700">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🍪</span>
              <p className="text-sm text-gray-100 font-medium leading-relaxed">
                نستخدم الكوكيز لنضمن لك تجربة تصفح شهية ومخصصة!
              </p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleCookieAccept}
                className="flex-1 bg-orange-600 hover:bg-orange-500 text-white py-2.5 rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-orange-900/20"
              >
                حسناً، فهمت
              </button>
              <button 
                onClick={() => toggleModal('privacy')}
                className="px-4 py-2.5 text-xs hover:text-white transition-colors"
              >
                التفاصيل
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-right">
        {/* القسم الأول: عن الموقع */}
        <div className="space-y-4">
          <h3 className="text-white font-black mb-3 text-2xl tracking-tight flex items-center gap-2">
            <span className="text-orange-500">Tasty</span>Recipess
          </h3>
          <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
            منصتكم المفضلة لاكتشاف أشهى الوصفات العربية والعالمية بطرق سهلة ومبتكرة تناسب حياتكم اليومية.
          </p>
        </div>

        {/* القسم الثاني: روابط سريعة */}
        <div>
          <h4 className="text-white mb-6 font-bold text-lg relative inline-block after:content-[''] after:absolute after:-bottom-2 after:right-0 after:w-8 after:h-1 after:bg-orange-600 after:rounded-full">
            المعلومات القانونية
          </h4>
          <ul className="space-y-4">
            <li>
              <button onClick={() => toggleModal('privacy')} className="group flex items-center gap-2 hover:text-orange-400 transition-all">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-orange-500 transition-colors"></span>
                سياسة الخصوصية والكوكيز
              </button>
            </li>
            <li>
              <button onClick={() => toggleModal('terms')} className="group flex items-center gap-2 hover:text-orange-400 transition-all">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-orange-500 transition-colors"></span>
                شروط الاستخدام
              </button>
            </li>
            <li>
              <button onClick={() => toggleModal('ai')} className="group flex items-center gap-2 hover:text-orange-400 transition-all">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-orange-500 transition-colors"></span>
                سياسة الشفافية (AI)
              </button>
            </li>
          </ul>
        </div>

        {/* القسم الثالث: تواصل معنا */}
        <div>
           <h4 className="text-white mb-6 font-bold text-lg">تابعنا</h4>
           <div className="flex gap-4">
              {[1,2,3,4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:border-orange-500 hover:text-orange-500 cursor-pointer transition-all">
                  🔗
                </div>
              ))}
           </div>
        </div>
      </div>

      <div className="border-t border-slate-900/50 text-center py-8 text-[12px] uppercase tracking-[0.2em] text-gray-600">
        © 2026 TastyRecipes - صُنع بكل ❤️ لعشاق الطبخ
      </div>

      {/* مودال السياسات المحسن */}
      {activeModal && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xl flex items-center justify-center p-6 z-[110] animate-in fade-in duration-300">
          <div className="bg-slate-900 border border-white/10 p-8 rounded-[2.5rem] max-w-lg w-full shadow-3xl transform animate-in zoom-in-95 duration-300">
            <div className="text-4xl mb-4 text-center">{policies[activeModal].icon}</div>
            <h3 className="text-2xl text-white font-bold mb-6 text-center">
              {policies[activeModal].title}
            </h3>
            <div className="bg-slate-950/50 rounded-2xl p-6 mb-8 border border-white/5">
              <p className="text-slate-300 leading-relaxed text-sm text-right whitespace-pre-line">
                {policies[activeModal].content}
              </p>
            </div>
            <button 
              onClick={() => setActiveModal(null)}
              className="w-full bg-white text-slate-950 py-4 rounded-2xl hover:bg-orange-500 hover:text-white transition-all font-bold shadow-xl"
            >
            !!!فهمت ذلك
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}