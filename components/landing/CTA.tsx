"use client"

import Link from "next/link"
import { useEffect, useState, useSyncExternalStore } from "react"

const emptySubscribe = () => () => {}
const useIsMounted = () => {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}

const TimeBox = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="relative">
      <div className="bg-linear-to-b from-slate-800 to-slate-900 dark:from-slate-700 dark:to-slate-800 rounded-lg px-4 py-3 min-w-17.5 shadow-lg border border-slate-700">
        <span className="text-3xl sm:text-4xl font-bold text-white font-mono">
          {value.toString().padStart(2, "0")}
        </span>
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-transparent to-white/10 rounded-lg pointer-events-none"></div>
    </div>
    <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium uppercase tracking-wider">
      {label}
    </span>
  </div>
)

function CTA() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  })
  const mounted = useIsMounted()

  useEffect(() => {
    if (!mounted) return

    // Get or set the end time in localStorage
    const storedEndTime = localStorage.getItem("ctaEndTime")
    let endTime: number

    if (storedEndTime) {
      endTime = parseInt(storedEndTime)
    } else {
      endTime = Date.now() + 24 * 60 * 60 * 1000 // 24 hours from now
      localStorage.setItem("ctaEndTime", endTime.toString())
    }

    const timer = setInterval(() => {
      const now = Date.now()
      const difference = endTime - now

      if (difference <= 0) {
        // Reset timer
        endTime = Date.now() + 24 * 60 * 60 * 1000
        localStorage.setItem("ctaEndTime", endTime.toString())
      }

      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((difference / (1000 * 60)) % 60)
      const seconds = Math.floor((difference / 1000) % 60)

      setTimeLeft({
        hours: Math.max(0, hours),
        minutes: Math.max(0, minutes),
        seconds: Math.max(0, seconds),
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [mounted])

  return (
    <section className="pt-14 sm:pt-20 lg:pt-32.5 overflow-hidden">
      <div className="px-4 md:px-8 lg:px-12 xl:container mx-auto overflow-hidden">
        <div className="relative overflow-hidden bg-blue-600 dark:bg-blue-700 px-6 sm:px-10 py-12 sm:py-16 shadow-2xl rounded-2xl">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          {/* Sparkles */}
          <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full animate-ping"></div>
          <div className="absolute top-20 right-20 w-2 h-2 bg-yellow-300 rounded-full animate-ping delay-500"></div>
          <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-white rounded-full animate-ping delay-700"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Urgency Badge */}
            <div className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-6 animate-bounce">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              🔥 โปรโมชั่นพิเศษ! สมาชิกลด 10% ทันที
            </div>

            {/* Headline */}
            <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
              สมัครสมาชิกวันนี้
              <br />
              <span className="text-yellow-300">รับส่วนลด 10% ทุกออเดอร์!</span>
            </h2>

            <p className="text-white/80 text-base sm:text-lg mb-8 max-w-xl">
              อย่าพลาด! โปรโมชั่นสำหรับสมาชิกเท่านั้น หมดเขตใน
            </p>

            {/* Countdown Timer */}
            {mounted && (
              <div className="flex items-center gap-3 sm:gap-4 mb-10">
                <TimeBox value={timeLeft.hours} label="ชั่วโมง" />
                <span className="text-white text-3xl font-bold mb-6">:</span>
                <TimeBox value={timeLeft.minutes} label="นาที" />
                <span className="text-white text-3xl font-bold mb-6">:</span>
                <TimeBox value={timeLeft.seconds} label="วินาที" />
              </div>
            )}

            {/* CTA Button */}
            <Link
              href="#"
              className="group relative inline-flex items-center gap-3 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold text-lg sm:text-xl px-10 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <span>🛒 สั่งซื้อทันที</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-8 text-white/70 text-sm">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                เปลี่ยน/คืนสินค้าภายใน 7 วัน
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                ชำระเงินปลอดภัย SSL
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                แอดมิน จัน-เสาร์ 09.00-18.00
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA