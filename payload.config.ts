import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    // Custom Admin Panel Branding
    components: {
      // Logo ที่แสดงใน Sidebar และหน้า Login
      graphics: {
        Logo: '/components/payload/Logo',
        Icon: '/components/payload/Icon',
      },
    },
    // Metadata สำหรับหน้า Admin
    meta: {
      titleSuffix: '- MyBizApp Admin',
      icons: [
        { url: '/images/logo/favicon.ico' }
      ],
      openGraph: {
        images: ['/images/logo/og-image.png'],
      },
    },
    // Auto Login สำหรับ Development (ปิดก่อน Production)
    // autoLogin: {
    //   email: 'admin@example.com',
    //   password: 'password123',
    //   prefillOnly: true,
    // },
  },
  collections: [Posts, Users, Media],
  editor: lexicalEditor(), // ตัวเขียนบทความแบบใหม่
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    push: false, // ปิด auto schema push เพื่อไม่ให้ลบตาราง documents (RAG)
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: true,
      // Specify which collections should use Vercel Blob
      collections: {
        media: true,
      },
      // Token provided by Vercel once Blob storage is added to your Vercel project
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
      // Do uploads directly on the client to bypass 4.5MB limit on Vercel
      clientUploads: true,
    }),
  ],
})