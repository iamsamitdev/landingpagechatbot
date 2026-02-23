import { NextRequest, NextResponse } from "next/server"
import { verifySignature, replyMessage } from "@/lib/line"
import { askQuestion } from "@/lib/rag"

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

        // ใช้ RAG ค้นหาและสร้างคำตอบ
        const { answer } = await askQuestion(userMessage)

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