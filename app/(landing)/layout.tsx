import type { Metadata } from "next"
import { Inter, Anuphan } from "next/font/google"
import "./globals.css";
import FacebookPixel from "@/components/facebook/FacebookPixel"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const anuphan = Anuphan({
  variable: "--font-anuphan",
  subsets: ["thai", "latin"],
})

export const metadata: Metadata = {
  title: "My AI Business",
  description: "Build and grow your AI-powered business with ease.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark:bg-slate-950">
      <body
        className={`${inter.variable} ${anuphan.variable} antialiased bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100`}
      >
        <FacebookPixel />
        {children}
      </body>
    </html>
  )
}