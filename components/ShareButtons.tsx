"use client";

import { FaWhatsapp, FaFacebook, FaLink } from "react-icons/fa";
import { useState } from "react";

export default function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  // وظيفة لنسخ الرابط
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="flex flex-wrap items-center gap-4 py-8 border-t border-b border-slate-100 my-10">
      <span className="text-slate-900 font-bold text-lg ml-2">شارك الوصفة:</span>
      
      {/* واتساب */}
      <a
        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-xl hover:opacity-90 transition-all font-medium shadow-md shadow-green-100"
      >
        <FaWhatsapp className="text-xl" /> واتساب
      </a>

      {/* فيسبوك */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-[#1877F2] text-white px-4 py-2 rounded-xl hover:opacity-90 transition-all font-medium shadow-md shadow-blue-100"
      >
        <FaFacebook className="text-xl" /> فيسبوك
      </a>

      {/* زر نسخ الرابط */}
      <button
        onClick={copyLink}
        className="flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-xl hover:bg-slate-200 transition-all font-medium border border-slate-200"
      >
        <FaLink className="text-lg" /> 
        {copied ? "تم النسخ! ✅" : "نسخ الرابط"}
      </button>
    </div>
  );
}