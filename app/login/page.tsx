"use client";
import { useState } from "react";
import { createClient } from "@/utils/supabase"; // تأكد من اسم المجلد (utils أو lib)
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("خطأ في الدخول: " + error.message);
    } else {
      alert("تم تسجيل الدخول بنجاح! 🎉");
      router.push("/admin/add-recipe"); // توجيهك مباشرة للوحة التحكم
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4" dir="rtl">
      <div className="max-w-md w-full bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
        <h1 className="text-3xl font-black text-slate-900 mb-2 text-center">مرحباً بك مجدداً 👋</h1>
        <p className="text-slate-500 text-center mb-8">سجل دخولك لإدارة وصفاتك</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">البريد الإلكتروني</label>
            <input
              type="email"
              required
              className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
              placeholder="admin@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">كلمة المرور</label>
            <input
              type="password"
              required
              className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-slate-200 disabled:bg-slate-300"
          >
            {loading ? "جاري التحقق..." : "تسجيل الدخول 🚀"}
          </button>
        </form>
      </div>
    </div>
  );
}