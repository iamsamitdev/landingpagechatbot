import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'
import Hero from '@/components/landing/Hero'
import Features from '@/components/landing/Features'
import About from '@/components/landing/About'
import Team from '@/components/landing/Team'
import Testimonial from '@/components/landing/Testimonial'
import Blog from '@/components/landing/Blog'
import CTA from '@/components/landing/CTA'
import HowToOrder from '@/components/landing/HowToOrder'
import ReturnPolicy from '@/components/landing/ReturnPolicy'
import Contact from '@/components/landing/Contact'
// import ScrollToTop from '@/components/landing/ScrollToTop'
import ChatWidget from '@/components/chat/ChatWidget'

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Smart Electronic Thailand | อุปกรณ์เสริมสมาร์ทโฟนครบวงจร",
  description: "ร้านอุปกรณ์เสริมสมาร์ทโฟนครบวงจร สินค้าของแท้ 100% รับประกัน 6 เดือน - 1 ปี จัดส่งรวดเร็ว ส่งฟรีทั่วไทยเมื่อซื้อครบ 500 บาท",
  keywords: [
    "อุปกรณ์เสริมสมาร์ทโฟน",
    "เคสมือถือ",
    "สายชาร์จ",
    "หัวชาร์จ",
    "Power Bank",
    "หูฟัง TWS",
    "ฟิล์มกระจก",
    "Smart Electronic Thailand",
    "อุปกรณ์มือถือของแท้",
    "ร้านอุปกรณ์มือถือออนไลน์",
  ],
}

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <About />
      <HowToOrder />
      <ReturnPolicy />
      <Team />
      <Testimonial />
      <Blog />
      <CTA />
      <Contact />
      <Footer />
      {/* <ScrollToTop /> */}
      <ChatWidget />
    </div>
  )
}