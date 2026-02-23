# My AI Business 🚀

เว็บไซต์ Landing Page สำหรับธุรกิจ AI สร้างด้วย Next.js 16, React 19 และ Tailwind CSS 4

[![Next.js](https://img.shields.io/badge/Next.js-16.1.4-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-blue?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-blue?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## 📋 ภาพรวมโปรเจ็กต์

โปรเจ็กต์นี้เป็น Next.js Boilerplate สำหรับสร้างเว็บไซต์ธุรกิจ, Startup, Agency หรือ SaaS ประกอบด้วยการออกแบบที่ทันสมัยและ Components ที่พร้อมใช้งาน

## ✨ คุณสมบัติหลัก

- 🎨 **การออกแบบที่สวยงาม** - UI/UX ที่ทันสมัยและใช้งานง่าย
- 🌙 **รองรับ Dark Mode** - สลับโหมดสว่าง/มืดได้
- 📱 **Responsive Design** - รองรับทุกขนาดหน้าจอ
- ⚡ **ประสิทธิภาพสูง** - ใช้ Next.js App Router และ React Server Components
- 🎯 **SEO Ready** - พร้อมใช้งาน Metadata สำหรับ SEO

## 🏗️ โครงสร้างโปรเจ็กต์
```
landingpage/
├── app/
│   ├── globals.css      # Global Styles
│   ├── layout.tsx       # Root Layout
│   └── page.tsx         # หน้าหลัก
├── components/
│   ├── landing/             # Landing Page Components
│   │   ├── About.tsx        # ส่วนเกี่ยวกับเรา
│   │   ├── Blog.tsx         # ส่วนบทความ
│   │   ├── CTA.tsx          # Call to Action
│   │   ├── Features.tsx     # ส่วนคุณสมบัติ
│   │   ├── Footer.tsx       # ส่วนท้าย
│   │   ├── Hero.tsx         # ส่วนหัวหลัก
│   │   ├── Navbar.tsx       # แถบนำทาง
│   │   ├── ScrollToTop.tsx  # ปุ่มเลื่อนขึ้นบน
│   │   ├── Team.tsx         # ส่วนทีมงาน
│   │   └── Testimonial.tsx  # ส่วนรีวิว
│   └── ui/                  # UI Components ที่ใช้ซ้ำได้
│       └── button.tsx       # Button Component
├── lib/
│   └── utils.ts             # Utility Functions
├── public/
│   └── images/              # รูปภาพต่างๆ
│       ├── about/
│       ├── blog/
│       ├── hero/
│       ├── logo/
│       ├── team/
│       └── testimonial/
├── components.json          # shadcn/ui Configuration
├── eslint.config.mjs        # ESLint Configuration
├── next.config.ts           # Next.js Configuration
├── package.json             # Dependencies
├── postcss.config.mjs       # PostCSS Configuration
├── tailwind.config.ts       # Tailwind CSS Configuration
└── tsconfig.json            # TypeScript Configuration


## 🛠️ เทคโนโลยีที่ใช้

| เทคโนโลยี | เวอร์ชัน | คำอธิบาย |
|-----------|----------|----------|
| [Next.js](https://nextjs.org/) | 16.1.4 | React Framework สำหรับ Production |
| [React](https://react.dev/) | 19.2.3 | JavaScript Library สำหรับ UI |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | JavaScript with Types |
| [Tailwind CSS](https://tailwindcss.com/) | 4.x | Utility-first CSS Framework |
| [Radix UI](https://www.radix-ui.com/) | - | Headless UI Components |
| [Lucide React](https://lucide.dev/) | 0.563.0 | Icon Library |
| [clsx](https://github.com/lukeed/clsx) | 2.1.1 | ClassName Utility |
| [tailwind-merge](https://github.com/dcastil/tailwind-merge) | 3.4.0 | Merge Tailwind Classes |

## 🚀 เริ่มต้นใช้งาน

### ข้อกำหนดเบื้องต้น

- Node.js 18.x หรือสูงกว่า
- npm, yarn, pnpm หรือ bun

### การติดตั้ง

1. **Clone โปรเจ็กต์**
   ```bash
   git clone <repository-url>
   cd my-ai-business
   ``` {data-source-line="2118"}

2. **ติดตั้ง Dependencies**
   ```bash
   npm install
   # หรือ
   yarn install
   # หรือ
   pnpm install
   # หรือ
   bun install
   ``` {data-source-line="2129"}

3. **รัน Development Server**
   ```bash
   npm run dev
   # หรือ
   yarn dev
   # หรือ
   pnpm dev
   # หรือ
   bun dev
   ``` {data-source-line="2140"}

4. **เปิดเบราว์เซอร์**
   
   เข้าไปที่ [http://localhost:3000](http://localhost:3000) เพื่อดูผลลัพธ์

## 📜 คำสั่งที่ใช้บ่อย

| คำสั่ง | คำอธิบาย |
|--------|----------|
| `npm run dev` | รัน Development Server |
| `npm run build` | Build โปรเจ็กต์สำหรับ Production |
| `npm run start` | รัน Production Server |
| `npm run lint` | ตรวจสอบโค้ดด้วย ESLint |

## 📁 รายละเอียด Components

### Landing Page Components

| Component | คำอธิบาย |
|-----------|----------|
| `Navbar` | แถบนำทางด้านบน พร้อมลิงก์ไปยังส่วนต่างๆ |
| `Hero` | ส่วนหัวหลักของหน้าเว็บ แสดงข้อความหลักและรูปภาพ |
| `Features` | แสดงคุณสมบัติหลักของบริการ |
| `About` | แสดงข้อมูลเกี่ยวกับบริษัท วิสัยทัศน์ และพันธกิจ |
| `Team` | แสดงข้อมูลทีมงาน |
| `Testimonial` | แสดงรีวิวจากลูกค้า |
| `Blog` | แสดงบทความล่าสุด |
| `CTA` | Call to Action ส่วนกระตุ้นให้ผู้ใช้ดำเนินการ |
| `Footer` | ส่วนท้ายเว็บไซต์ |
| `ScrollToTop` | ปุ่มเลื่อนขึ้นด้านบน |

## 🎨 การปรับแต่ง

### การแก้ไขเนื้อหา

- แก้ไขเนื้อหาในแต่ละ Component ที่ `components/landing/`
- แก้ไข Metadata ที่ `app/(landing)/page.tsx`

### การเปลี่ยนรูปภาพ

- เพิ่มรูปภาพใหม่ใน `public/images/` ตามโฟลเดอร์ที่เกี่ยวข้อง

### การปรับแต่ง Styles

- แก้ไข Global Styles ที่ `app/(landing)/globals.css`
- ใช้ Tailwind CSS Classes โดยตรงใน Components

## 🌐 การ Deploy

### Deploy บน Vercel (แนะนำ)

วิธีที่ง่ายที่สุดคือใช้ [Vercel Platform](https://vercel.com/new) จากผู้สร้าง Next.js

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

### Deploy บน Platform อื่นๆ

ดูรายละเอียดเพิ่มเติมที่ [Next.js Deployment Documentation](https://nextjs.org/docs/app/building-your-application/deploying)

## 📚 เรียนรู้เพิ่มเติม

- [Next.js Documentation](https://nextjs.org/docs) - เรียนรู้ฟีเจอร์และ API ของ Next.js
- [Learn Next.js](https://nextjs.org/learn) - บทเรียน Interactive สำหรับ Next.js
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - เรียนรู้การใช้งาน Tailwind CSS
- [React Documentation](https://react.dev/) - เรียนรู้ React

## 🤝 การมีส่วนร่วม

ยินดีรับ Pull Requests และ Issues! หากต้องการมีส่วนร่วมในการพัฒนา:

1. Fork โปรเจ็กต์
2. สร้าง Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit การเปลี่ยนแปลง (`git commit -m 'Add some AmazingFeature'`)
4. Push ไปยัง Branch (`git push origin feature/AmazingFeature`)
5. เปิด Pull Request

## 📄 License

โปรเจ็กต์นี้อยู่ภายใต้ MIT License

---

<p align="center">
  สร้างด้วย ❤️ โดยใช้ Next.js และ Tailwind CSS
</p>