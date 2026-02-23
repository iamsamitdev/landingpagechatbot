import { NextRequest, NextResponse } from "next/server"
import { askQuestion } from "@/lib/rag"

export async function POST(request: NextRequest) {
  try {
    const { message, chatHistory = [] } = await request.json()

    // ตรวจสอบว่ามี message หรือไม่
    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "กรุณาระบุข้อความที่ต้องการถาม" },
        { status: 400 }
      )
    }

    // ตรวจสอบ message length
    if (message.length > 2000) {
      return NextResponse.json(
        { error: "ข้อความยาวเกินไป (สูงสุด 2000 ตัวอักษร)" },
        { status: 400 }
      )
    }

    // เรียกใช้ RAG เพื่อตอบคำถาม
    const { answer, sources } = await askQuestion(message, chatHistory)

    return NextResponse.json({
      success: true,
      answer,
      sources: sources.map(s => ({
        content: s.content.substring(0, 200) + "...",
        similarity: s.similarity,
        metadata: s.metadata,
      })),
    })
  } catch (error) {
    console.error("Chat API error:", error)
    
    const errorMessage = error instanceof Error ? error.message : "เกิดข้อผิดพลาด"
    
    return NextResponse.json(
      { 
        success: false,
        error: "ขออภัย เกิดข้อผิดพลาดในการประมวลผล กรุณาลองใหม่อีกครั้ง",
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined,
      },
      { status: 500 }
    )
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({ 
    status: "ok",
    message: "Chat API is running",
    timestamp: new Date().toISOString(),
  })
}