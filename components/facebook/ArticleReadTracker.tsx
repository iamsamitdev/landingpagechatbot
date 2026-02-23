"use client"

import { useEffect, useState } from "react"
import { event } from "@/lib/fpixel"

interface ArticleReadTrackerProps {
  title: string
}

export default function ArticleReadTracker({ title }: ArticleReadTrackerProps) {
  const [hasRead, setHasRead] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // คำนวณความสูงทั้งหมด vs ตำแหน่งปัจจุบัน
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = window.scrollY / totalHeight

      // ถ้าเลื่อนเกิน 80% และยังไม่เคยส่ง Event นี้
      if (progress > 0.8 && !hasRead) {
        event("ArticleReadComplete", {
          content_name: title,
        })
        setHasRead(true) // กันไม่ให้ยิงซ้ำรัวๆ
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [hasRead, title])

  return null // Component นี้ไม่ render อะไร แค่ track อย่างเดียว
}