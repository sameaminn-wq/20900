import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * دالة إنشاء اتصال مع Supabase من جهة السيرفر
 * تستخدم في الصفحات (Server Components) لضمان الأمان والسرعة
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // جلب جميع الكوكيز للتعرف على جلسة المستخدم
        getAll() {
          return cookieStore.getAll()
        },
        // تحديث الكوكيز عند الحاجة
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // هذا الخطأ طبيعي إذا تم الاستدعاء من مكون سيرفر (Server Component)
          }
        },
      },
    }
  )
}