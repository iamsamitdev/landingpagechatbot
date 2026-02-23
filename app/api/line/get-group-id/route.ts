import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const body = await request.json()
  
  // Log ทุก event ที่เข้ามา
  console.log("LINE Event:", JSON.stringify(body, null, 2))
  
  for (const event of body.events || []) {
    // ดึง Group ID จาก event
    if (event.source?.groupId) {
      console.log("🎯 GROUP ID:", event.source.groupId)
    }
  }
  
  return NextResponse.json({ status: "ok" })
}