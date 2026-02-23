import { NextRequest, NextResponse } from "next/server"
import { verifySignature, replyMessage } from "@/lib/line"
import { askQuestion } from "@/lib/rag"

// กำหนด Keyword ที่ใช้เรียก Bot ในกลุ่ม
const TRIGGER_KEYWORDS = ["/bot", "!ask", "/ถาม", "@bot"]

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("x-line-signature") || ""

    // ตรวจสอบ Signature
    if (!verifySignature(body, signature)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    const data = JSON.parse(body)
    const events = data.events || []

    for (const event of events) {
      if (event.type === "message" && event.message.type === "text") {
        const userMessage = event.message.text
        const replyToken = event.replyToken
        const sourceType = event.source?.type // "user" | "group" | "room"

        let questionText = userMessage

        // ถ้าเป็นข้อความจากกลุ่มหรือห้องแชท ให้ตอบเฉพาะเมื่อมี Keyword นำหน้า
        if (sourceType === "group" || sourceType === "room") {
          const matchedKeyword = TRIGGER_KEYWORDS.find((keyword) =>
            userMessage.toLowerCase().startsWith(keyword)
          )

          // ถ้าไม่มี Keyword นำหน้า ให้ข้ามไปไม่ต้องตอบ
          if (!matchedKeyword) {
            continue
          }

          // ตัด Keyword ออกจากข้อความก่อนส่งไปประมวลผล
          questionText = userMessage.slice(matchedKeyword.length).trim()

          // ถ้าตัด Keyword แล้วไม่มีข้อความเหลือ ให้แนะนำวิธีใช้งาน
          if (!questionText) {
            await replyMessage(replyToken, [
              {
                type: "text",
                text: "สวัสดีครับ! พิมพ์คำถามตามหลัง Keyword ได้เลยครับ\nตัวอย่าง: /bot สินค้ามีอะไรบ้าง",
              },
            ])
            continue
          }
        }

        // ใช้ RAG ค้นหาและสร้างคำตอบ
        const { answer } = await askQuestion(questionText)

        // ส่งข้อความตอบกลับ
        await replyMessage(replyToken, [
          {
            type: "text",
            text: answer,
          },
        ])
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}

// LINE ต้องการให้ GET return 200
export async function GET() {
  return NextResponse.json({ status: "ok" })
}