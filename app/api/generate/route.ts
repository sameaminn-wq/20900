import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { ingredients } = await req.json();

    if (!ingredients || ingredients.trim() === "") {
      return NextResponse.json(
        { error: "يرجى إدخال المكونات المتاحة" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.85,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    });

    const prompt = `أنت الشيف العالمي الدكتور   — حاصل على نجمتَي ميشلان، ودكتوراه في علوم التغذية الإكلينيكية من جامعة هارفارد، وصاحب خبرة ميدانية تمتد لأكثر من 60 عامًا في أرقى مطابخ باريس وطوكيو والقاهرة. 

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

    // تنظيف الاستجابة من أي backticks أوو نص إضافي
    const cleanText = text
      .replace(/```json\s*/gi, "")
      .replace(/```\s*/g, "")
      .trim();

    // محاولة استخراج JSON من الاستجابة
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
  } catch (error) {
    console.error("Recipe generation error:", error);

    const isParseError = error instanceof SyntaxError;
    return NextResponse.json(
      {
        error: isParseError
          ? "خطأ في معالجة الاستجابة — يرجى المحاولة مرة أخرى"
          : "فشل في توليد الوصفة — تحقق من مفتاح API أو حاول لاحقًا",
      },
      { status: 500 }
    );
  }
}