import { OpenAIEmbeddings } from "@langchain/openai"
import { ChatOpenAI } from "@langchain/openai"
import { sql } from "./neon"

// สร้าง Embeddings Model
const embeddings = new OpenAIEmbeddings({
  modelName: "text-embedding-3-small",
})

// สร้าง LLM Model
const llm = new ChatOpenAI({
  modelName: "gpt-4o-mini",
  temperature: 0.7,
})

// Interface สำหรับ Document ที่ค้นหาได้
interface MatchedDocument {
  id: number
  content: string
  metadata: Record<string, unknown>
  similarity: number
}

/**
 * ค้นหาเอกสารที่เกี่ยวข้องจาก Vector Database
 * @param query - คำค้นหาหรือคำถามจากผู้ใช้
 * @param matchCount - จำนวนเอกสารที่ต้องการ (default: 5)
 * @param matchThreshold - ค่า similarity ขั้นต่ำ (default: 0.2)
 */
export async function searchDocuments(
  query: string, 
  matchCount = 5,
  matchThreshold = 0.2
): Promise<MatchedDocument[]> {
  try {
    // 1. สร้าง Embedding จากคำถาม
    const queryEmbedding = await embeddings.embedQuery(query)
    console.log("Query:", query)
    console.log("Embedding length:", queryEmbedding.length)

    // 2. ดึง documents ทั้งหมดพร้อม embedding
    const allDocs = await sql`
      SELECT id, content, metadata, embedding
      FROM documents
    `

    if (!allDocs || allDocs.length === 0) {
      console.log("No documents found")
      return []
    }

    // 3. คำนวณ cosine similarity ใน JS
    const calculateSimilarity = (vec1: number[], vec2: number[]) => {
      let dotProduct = 0
      let norm1 = 0
      let norm2 = 0
      for (let i = 0; i < vec1.length; i++) {
        dotProduct += vec1[i] * vec2[i]
        norm1 += vec1[i] * vec1[i]
        norm2 += vec2[i] * vec2[i]
      }
      return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2))
    }

    // 4. คำนวณ similarity สำหรับทุก document และ filter
    const results = allDocs
      .map(doc => {
        const dbEmbedding = typeof doc.embedding === 'string' 
          ? JSON.parse(doc.embedding) 
          : doc.embedding
        const similarity = calculateSimilarity(queryEmbedding, dbEmbedding)
        return {
          id: doc.id,
          content: doc.content,
          metadata: doc.metadata,
          similarity: similarity
        }
      })
      .filter(doc => doc.similarity >= matchThreshold)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, matchCount)

    console.log("Search results:", results.length, "documents found")
    return results
  } catch (error) {
    console.error("Error in searchDocuments:", error)
    return []
  }
}

/**
 * สร้างคำตอบจาก LLM โดยใช้ข้อมูลจาก Context
 */
export async function generateAnswer(
  question: string,
  context: string,
  chatHistory: { role: "user" | "assistant"; content: string }[] = []
): Promise<string> {
  const systemPrompt = `คุณเป็นผู้ช่วยตอบคำถามที่เป็นมิตรและช่วยเหลือลูกค้า 
ตอบคำถามโดยใช้ข้อมูลจากบริบทที่ให้มาเท่านั้น 
หากไม่มีข้อมูลเพียงพอในบริบท ให้บอกว่าไม่ทราบข้อมูลและแนะนำให้ติดต่อทีมงานโดยตรง
ตอบเป็นภาษาไทยเสมอ และใช้ภาษาที่สุภาพ เป็นกันเอง

บริบท:
${context}`

  const messages: { role: "system" | "user" | "assistant"; content: string }[] = [
    { role: "system", content: systemPrompt },
    ...chatHistory.map(msg => ({
      role: msg.role as "user" | "assistant",
      content: msg.content,
    })),
    { role: "user", content: question },
  ]

  try {
    const response = await llm.invoke(messages)
    return response.content as string
  } catch (error) {
    console.error("Error generating answer:", error)
    throw new Error("ไม่สามารถสร้างคำตอบได้ กรุณาลองใหม่อีกครั้ง")
  }
}

/**
 * ฟังก์ชันหลักสำหรับ RAG - รับคำถามและส่งคืนคำตอบ
 */
export async function askQuestion(
  question: string,
  chatHistory: { role: "user" | "assistant"; content: string }[] = []
): Promise<{ answer: string; sources: MatchedDocument[] }> {
  // 1. ค้นหาเอกสารที่เกี่ยวข้อง
  const documents = await searchDocuments(question)

  // 2. สร้าง Context จากเอกสาร
  const context = documents.length > 0
    ? documents.map(doc => doc.content).join("\n\n---\n\n")
    : "ไม่พบข้อมูลที่เกี่ยวข้อง"

  // 3. สร้างคำตอบ
  const answer = await generateAnswer(question, context, chatHistory)

  return {
    answer,
    sources: documents,
  }
}