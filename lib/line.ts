import crypto from "crypto"

const CHANNEL_SECRET = process.env.LINE_CHANNEL_SECRET!
const CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN!

// ตรวจสอบ Signature
export function verifySignature(body: string, signature: string): boolean {
  const hash = crypto
    .createHmac("sha256", CHANNEL_SECRET)
    .update(body)
    .digest("base64")
  return hash === signature
}

// ส่งข้อความตอบกลับ
export async function replyMessage(replyToken: string, messages: any[]) {
  const response = await fetch("https://api.line.me/v2/bot/message/reply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      replyToken,
      messages,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error("LINE API error:", error)
    throw new Error("Failed to send message")
  }

  return response.json()
}

// ส่งข้อความแบบ Push
export async function pushMessage(userId: string, messages: any[]) {
  const response = await fetch("https://api.line.me/v2/bot/message/push", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      to: userId,
      messages,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error("LINE API error:", error)
    throw new Error("Failed to push message")
  }

  return response.json()
}