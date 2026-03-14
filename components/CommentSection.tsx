"use client";
import React, { useState } from 'react';

// 1. تعريف واجهة بيانات التعليق
interface Comment {
  id: number;
  user: string;
  text: string;
  date: string;
  avatar: string;
}

export default function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      user: "سارة أحمد",
      text: "وصفة رائعة جداً! جربتها اليوم وكانت النتيجة مذهلة.",
      date: "منذ ساعتين",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara"
    }
  ]);

  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentObj: Comment = {
      id: Date.now(),
      user: "زائر", // يمكن تخصيصه لاحقاً
      text: newComment,
      date: "الآن",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Guest"
    };

    setComments([commentObj, ...comments]);
    setNewComment("");
  };

  return (
    <section className="mt-16 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100" dir="rtl">
      <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
        <span className="text-3xl">💬</span> التعليقات 
        <span className="text-sm bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
          {comments.length}
        </span>
      </h3>

      {/* نموذج إضافة تعليق */}
      <form onSubmit={handleSubmit} className="mb-12">
        <div className="relative group">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="ما رأيك في هذه الوصفة؟ شاركنا تجربتك..."
            className="w-full p-6 bg-slate-50 border-2 border-transparent rounded-3xl outline-none focus:bg-white focus:border-orange-500 transition-all min-h-[120px] text-slate-700 resize-none"
          />
          <button 
            type="submit"
            className="absolute bottom-4 left-4 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-2xl font-bold transition-all shadow-lg shadow-orange-200 active:scale-95"
          >
            نشر التعليق
          </button>
        </div>
      </form>

      {/* قائمة التعليقات */}
      <div className="space-y-8">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4 group animate-in fade-in slide-in-from-right-4">
            {/* الصورة الرمزية */}
            <div className="shrink-0">
              <img 
                src={comment.avatar} 
                alt={comment.user} 
                className="w-12 h-12 rounded-2xl bg-orange-50 p-1 object-cover"
              />
            </div>

            {/* محتوى التعليق */}
            <div className="flex-1 bg-slate-50 p-5 rounded-3xl group-hover:bg-slate-100 transition-colors">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-slate-900">{comment.user}</h4>
                <span className="text-xs text-slate-400">{comment.date}</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                {comment.text}
              </p>
              
              {/* أزرار تفاعل بسيطة */}
              <div className="mt-4 flex gap-4">
                <button className="text-xs font-bold text-slate-400 hover:text-orange-500 transition-colors">❤️ إعجاب</button>
                <button className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors">↩️ رد</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}