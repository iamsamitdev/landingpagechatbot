import { neon } from "@neondatabase/serverless"

// สร้าง Neon SQL Client
// ใช้ tagged template literal สำหรับ query (ป้องกัน SQL Injection อัตโนมัติ)
export const sql = neon(process.env.DATABASE_URI!)