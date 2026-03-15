import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { ingredients } = await req.json();

    if (!ingredients || ingredients.trim() === "") {
      return NextResponse.json(
        { error: "يرجى إدخال المكونات المتاحة" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("API Key is missing from .env.local");
    }

    // --- البرومبت الخاص بك كما هو بدون تغيير حرف ---
    const prompt = `أنت الشيف العالمي كمال النوري — حاصل على نجمتَي ميشلان، ودكتوراه في علوم التغذية الإكلينيكية من جامعة هارفارد، وصاحب خبرة ميدانية تمتد لأكثر من 60 عامًا في أرقى مطابخ باريس وطوكيو والقاهرة. 

قضيت عمرك تفهم العلاقة الدقيقة بين الغذاء والجسم، وتحول أبسط المكونات إلى وجبات شافية تُغذي الخلايا وتُسعد الروح.

**المهمة:**
بناءً على المكونات المتاحة: (${ingredients})

ابتكر وصفة "دايت" صحية ذكية تراعي:
- التوازن الغذائي الدقيق (بروتين / كارب / دهون صحية / ألياف)
- السعرات الحرارية المحسوبة علميًا
- الفوائد الصحية لكل مكوّن
- أسلوب الطهي الأمثل للحفاظ على القيمة الغذائية

**تعليمات الرد الإلزامية:**
- أجب فقط بـ JSON خالص بدون أي نص خارجه، بدون backticks، بدون مقدمة
- اتبع هذا الهيكل بدقة تامة:

{
  "title": "عنوان الوصفة — جذاب، يحتوي كلمات مفتاحية SEO، لا يتجاوز 70 حرفًا",
  "description": "وصف الميتا — جملتان تشرحان الفائدة الصحية وتحفزان على التجربة، بين 120 و160 حرفًا",
  "prepTime": "وقت التحضير بالدقائق (رقم فقط)",
  "cookTime": "وقت الطهي بالدقائق (رقم فقط)",
  "servings": "عدد الحصص (رقم فقط)",
  "difficulty": "سهل | متوسط | متقدم",
  "calories": "إجمالي السعرات الحرارية للوصفة كاملة (رقم فقط)",
  "caloriesPerServing": "السعرات الحرارية للحصة الواحدة (رقم فقط)",
  "macros": {
    "protein": "البروتين بالجرام للحصة",
    "carbs": "الكربوهيدرات بالجرام للحصة",
    "fat": "الدهون بالجرام للحصة",
    "fiber": "الألياف بالجرام للحصة"
  },
  "healthBenefits": ["فائدة صحية 1", "فائدة صحية 2", "فائدة صحية 3"],
  "chefTip": "نصيحة ذهبية واحدة من الشيف — سر مهني يرفع الطبق لمستوى المطاعم",
  "steps": [
    {
      "stepNumber": 1,
      "title": "عنوان الخطوة",
      "description": "شرح تفصيلي واضح وعملي مع ذكر درجات الحرارة والأوقات إن لزم",
      "duration": "مدة الخطوة بالدقائق (رقم فقط أو null)"
    }
  ],
  "tags": ["وسم1", "وسم2", "وسم3", "وسم4"],
  "storageInstructions": "تعليمات الحفظ والتخزين الصحيح",
  "nutritionistNote": "ملاحظة الخبير الغذائي — متى تُناسب هذه الوصفة؟ من يجب أن يتجنبها؟"
}`;

    // --- الاتصال المباشر بـ Google API (تجاوز المكتبة المكسورة) ---
    // نستخدم v1 بدلاً من v1beta لتجنب الـ 404
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const googleResponse = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    if (!googleResponse.ok) {
      const errorData = await googleResponse.json();
      throw new Error(errorData.error?.message || "Google API Error");
    }

    const data = await googleResponse.json();
    const responseText = data.candidates[0].content.parts[0].text;

    // تنظيف الـ JSON
    const cleanText = responseText
      .replace(/```json\s*/gi, "")
      .replace(/```\s*/g, "")
      .trim();

    const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("لم يتم العثور على JSON صالح في الاستجابة");
    }

    return NextResponse.json(JSON.parse(jsonMatch[0]));

  } catch (error: any) {
    console.error("DEBUG_ERROR:", error); 
    return NextResponse.json(
      { error: "فشل في التوليد", details: error.message },
      { status: 500 }
    );
  }
}
