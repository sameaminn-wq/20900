"use client";
import { useState } from "react";
import { createClient } from "@/utils/supabase"; // تأكد من مسار ملف السبيس الخاص بك
import { useRouter } from "next/navigation";

export default function AddRecipePage() {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // حالة النموذج (Form State)
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    image_url: "",
    prep_time: "",
    ingredients: "", // سنحولها لمصفوفة لاحقاً
    steps: "",       // سنحولها لمصفوفة لاحقاً
    category: "عام",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // تحويل النصوص المكتوبة بأسطر إلى مصفوفات برمجية
    const ingredientsArray = formData.ingredients.split("\n").filter(i => i.trim() !== "");
    const stepsArray = formData.steps.split("\n").filter(s => s.trim() !== "");

    const { error } = await supabase.from("recipes").insert([
      {
        title: formData.title,
        slug: formData.slug,
        image_url: formData.image_url,
        prep_time: parseInt(formData.prep_time),
        ingredients: ingredientsArray,
        steps: stepsArray,
        category: formData.category,
      },
    ]);

    if (error) {
      alert("خطأ في الإضافة: " + error.message);
    } else {
      alert("تمت إضافة الوصفة بنجاح! 🎉");
      router.push("/"); // العودة للرئيسية
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-8" dir="rtl">
      <h1 className="text-3xl font-bold mb-8 text-slate-900">إضافة وصفة جديدة 👨‍🍳</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <label className="block mb-2 font-bold">عنوان الوصفة</label>
          <input 
            type="text" 
            required
            className="w-full p-3 border rounded-xl"
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
        </div>

        <div>
          <label className="block mb-2 font-bold">الرابط الفريد (Slug) - بالإنجليزية</label>
          <input 
            type="text" 
            placeholder="مثال: pasta-bechamel"
            required
            className="w-full p-3 border rounded-xl"
            onChange={(e) => setFormData({...formData, slug: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-bold">رابط الصورة</label>
            <input 
              type="text" 
              className="w-full p-3 border rounded-xl"
              onChange={(e) => setFormData({...formData, image_url: e.target.value})}
            />
          </div>
          <div>
            <label className="block mb-2 font-bold">وقت التحضير (بالدقائق)</label>
            <input 
              type="number" 
              className="w-full p-3 border rounded-xl"
              onChange={(e) => setFormData({...formData, prep_time: e.target.value})}
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 font-bold">المقادير (كل مقدار في سطر)</label>
          <textarea 
            rows={5}
            className="w-full p-3 border rounded-xl"
            onChange={(e) => setFormData({...formData, ingredients: e.target.value})}
          />
        </div>

        <div>
          <label className="block mb-2 font-bold">خطوات التحضير (كل خطوة في سطر)</label>
          <textarea 
            rows={5}
            className="w-full p-3 border rounded-xl"
            onChange={(e) => setFormData({...formData, steps: e.target.value})}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition-all disabled:bg-slate-300"
        >
          {loading ? "جاري الحفظ..." : "نشر الوصفة الآن 🚀"}
        </button>
      </form>
    </div>
  );
}