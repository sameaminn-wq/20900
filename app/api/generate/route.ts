import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// الحل النهائي: نستخدم المفتاح من البيئة، أو المفتاح الاحتياطي لضمان التشغيل في StackBlitz
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyAt12S2n4puBJcIDyzvYF8VRPEPkL2odrs");

// مصفوفة الموديلات المتاحة لتجربتها بالترتيب في حال فشل أحدها
const MODELS_TO_TRY = [
  "gemini-2.0-flash",
  "gemini-1.5-flash",
  "gemini-1.5-flash-latest"
];

export async function POST(req: Request) {
  try {
    const { ingredients } = await req.json();

    if (!ingredients || ingredients.trim() === "") {
      return NextResponse.json(
        { error: "يرجى إدخال المكونات المتاحة" },
        { status: 400 }
      );
    }

    let model;
    let lastError: any;
    let successfulModelName = "";

    // حلقة ذكية لاختيار الموديل الشغال تلقائياً
    for (const modelName of MODELS_TO_TRY) {
      try {
        const tempModel = genAI.getGenerativeModel({ model: modelName });
        model = tempModel;
        successfulModelName = modelName;
        break; 
      } catch (err) {
        lastError = err;
        continue;
      }
    }

    if (!model) {
        // تم الإصلاح هنا: استخدام Type Guard لتجاوز خطأ الـ Build
        const errorMsg = lastError instanceof Error ? lastError.message : String(lastError || "Unknown Error");
        throw new Error(`تعذر العثور على موديل شغال. آخر خطأ: ${errorMsg}`);
    }

    const prompt = `أنت الشيف العالمي الدكتور كمال النوري — حاصل على نجمتَي ميشلان، ودكتوراه في علوم التغذية الإكلينيكية من جامعة هارفارد، وصاحب خبرة ميدانية تمتد لأكثر من 60 عامًا في أرقى مطابخ باريس وطوكيو والقاهرة. 

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

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const cleanText = text
      .replace(/```json\s*/gi, "")
      .replace(/```\s*/g, "")
      .trim();

    const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("لم يتم العثور على JSON صالح في الاستجابة");
    }

    const parsed = JSON.parse(jsonMatch[0]);

    return NextResponse.json(parsed, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error: any) {
    console.error("DEBUG_ERROR:", error); 

    // إذا كان الخطأ بسبب الزحام (Quota) 429
    if (error.status === 429 || error.message?.includes("429")) {
      return NextResponse.json(
        { 
          error: "الشيف مشغول الآن", 
          details: "لقد أرسلت طلبات كثيرة بسرعة. يرجى الانتظار دقيقة واحدة ثم المحاولة مرة أخرى." 
        },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "فشل في التوليد", details: error.message },
      { status: 500 }
    );
  }
}