export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID

// Declare Facebook Pixel fbq function type
type FbqFunction = (
  action: string,
  eventName: string,
  params?: Record<string, unknown>,
  options?: { eventID?: string }
) => void

declare global {
  interface Window {
    fbq?: FbqFunction
  }
}

// ฟังก์ชันส่ง PageView (ดูหน้าเว็บ)
export const pageview = () => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "PageView")
  }
}

// Interface สำหรับ Event Options
interface EventOptions {
  eventID?: string
  [key: string]: unknown
}

// ฟังก์ชันส่ง Custom Event (เช่น สั่งซื้อ, กรอกฟอร์ม)
// รองรับ eventID สำหรับ Deduplication กับ CAPI
export const event = (
  name: string, 
  data: Record<string, unknown> = {}, 
  options: EventOptions = {}
) => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    if (options.eventID) {
      // ส่งพร้อม eventID สำหรับ Deduplication
      window.fbq("track", name, data, { eventID: options.eventID })
    } else {
      window.fbq("track", name, data)
    }
  }
}