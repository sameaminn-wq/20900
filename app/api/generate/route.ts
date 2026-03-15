import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { ingredients } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `أنت شيف محترف خبير في التغذية والـ SEO. 
    بناءً على المكونات التالية: (${ingredients})، ابتكار كل الوصفات في العموم ومختص في وصفات "الدايت" الصحية جداً والسريعة.
    يجب أن يكون الرد بتنسيق JSON ويحتوي على:
    - title: عنوان جذاب يحتوي على كلمات مفتاحية.
    - description: وصف قصير للميتا (Meta Description).
    - steps: مصفوفة خطوات بأسلوب مرح وتفصيلي.
    - calories: عدد السعرات الحرارية التقريبي.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // تنظيف النص وتحويله لـ JSON
    const cleanText = text.replace(/```json|```/g, "");
    return NextResponse.json(JSON.parse(cleanText));
  } catch (error) {
    return NextResponse.json({ error: "فشل في توليد الوصفة" }, { status: 500 });
  }
}