import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters"
import { OpenAIEmbeddings } from "@langchain/openai"
import { Document } from "@langchain/core/documents"
import { neon } from "@neondatabase/serverless"
import fs from "fs"
import path from "path"
import dotenv from "dotenv"

// โหลด environment variables
dotenv.config({ path: ".env.local" })
dotenv.config({ path: ".env" })

// ตรวจสอบ environment variables
const databaseUri = process.env.DATABASE_URI
const openaiApiKey = process.env.OPENAI_API_KEY

if (!databaseUri) {
  console.error("❌ Missing DATABASE_URI in environment variables")
  process.exit(1)
}

if (!openaiApiKey) {
  console.error("❌ Missing OPENAI_API_KEY in environment variables")
  process.exit(1)
}

// สร้าง Neon SQL Client
const sql = neon(databaseUri)

const DOCUMENTS_PATH = "./documents" // โฟลเดอร์เก็บเอกสาร

async function ingestDocuments() {
  console.log("🚀 Starting document ingestion...")
  console.log(`📂 Looking for documents in: ${path.resolve(DOCUMENTS_PATH)}`)

  // ตรวจสอบว่ามีโฟลเดอร์ documents หรือไม่
  if (!fs.existsSync(DOCUMENTS_PATH)) {
    fs.mkdirSync(DOCUMENTS_PATH, { recursive: true })
    console.log("📁 Created documents folder. Please add PDF or TXT files and run again.")
    return
  }

  // 1. อ่านไฟล์ทั้งหมดในโฟลเดอร์
  const files = fs.readdirSync(DOCUMENTS_PATH)
  const pdfFiles = files.filter(f => f.endsWith(".pdf"))
  const txtFiles = files.filter(f => f.endsWith(".txt"))
  
  if (pdfFiles.length === 0 && txtFiles.length === 0) {
    console.log("⚠️ No PDF or TXT files found in documents folder.")
    return
  }

  console.log(`📚 Found ${pdfFiles.length} PDF files and ${txtFiles.length} TXT files`)

  const allDocs: Document[] = []

  // โหลด PDF files
  for (const file of pdfFiles) {
    const filePath = path.join(DOCUMENTS_PATH, file)
    console.log(`📄 Loading PDF: ${file}`)
    
    try {
      const loader = new PDFLoader(filePath)
      const docs = await loader.load()
      
      docs.forEach(doc => {
        doc.metadata = { ...doc.metadata, source: file, type: "pdf" }
      })
      
      allDocs.push(...docs)
      console.log(`   ✅ Loaded ${docs.length} pages from ${file}`)
    } catch (error) {
      console.error(`   ❌ Error loading ${file}:`, error)
    }
  }

  // โหลด TXT files
  for (const file of txtFiles) {
    const filePath = path.join(DOCUMENTS_PATH, file)
    console.log(`📄 Loading TXT: ${file}`)
    
    try {
      const content = fs.readFileSync(filePath, "utf-8")
      const doc = new Document({
        pageContent: content,
        metadata: { source: file, type: "txt" },
      })
      allDocs.push(doc)
      console.log(`   ✅ Loaded ${file}`)
    } catch (error) {
      console.error(`   ❌ Error loading ${file}:`, error)
    }
  }

  if (allDocs.length === 0) {
    console.log("❌ No documents could be loaded.")
    return
  }

  console.log(`\n📚 Total documents loaded: ${allDocs.length}`)

  // 2. แบ่งเอกสารเป็น Chunks
  console.log("\n✂️ Splitting documents into chunks...")
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  })

  const splitDocs = await textSplitter.splitDocuments(allDocs)
  console.log(`✅ Created ${splitDocs.length} chunks`)

  // 3. สร้าง Embeddings
  console.log("\n🔄 Creating embeddings...")
  const embeddingsModel = new OpenAIEmbeddings({
    modelName: "text-embedding-3-small",
    openAIApiKey: openaiApiKey,
  })

  // 4. ลบข้อมูลเก่าออกก่อน (optional)
  console.log("🗑️ Clearing existing documents...")
  await sql`DELETE FROM documents WHERE id > 0`

  // 5. บันทึกลง Neon Postgres
  console.log("\n💾 Saving to Neon Postgres...")
  let successCount = 0
  let errorCount = 0

  for (let i = 0; i < splitDocs.length; i++) {
    const doc = splitDocs[i]
    
    try {
      // สร้าง embedding สำหรับ chunk นี้
      const embedding = await embeddingsModel.embedQuery(doc.pageContent)

      // แปลง embedding array เป็น pgvector format string: [0.1,0.2,0.3,...]
      const embeddingString = `[${embedding.join(",")}]`

      // บันทึกลง database ผ่าน Neon SQL
      await sql`
        INSERT INTO documents (content, metadata, embedding)
        VALUES (${doc.pageContent}, ${JSON.stringify(doc.metadata)}, ${embeddingString}::vector)
      `
      
      successCount++
      
      // แสดง progress ทุก 10 chunks
      if ((i + 1) % 10 === 0 || i === splitDocs.length - 1) {
        const progress = Math.round(((i + 1) / splitDocs.length) * 100)
        console.log(`   📊 Progress: ${i + 1}/${splitDocs.length} (${progress}%)`)
      }
    } catch (error) {
      console.error(`❌ Error saving chunk ${i + 1}:`, error)
      errorCount++
    }
  }

  console.log("\n" + "=".repeat(50))
  console.log("🎉 Document ingestion completed!")
  console.log(`✅ Successfully saved: ${successCount} chunks`)
  if (errorCount > 0) {
    console.log(`❌ Failed: ${errorCount} chunks`)
  }
  console.log("=".repeat(50))
}

ingestDocuments().catch(error => {
  console.error("❌ Fatal error:", error)
  process.exit(1)
})