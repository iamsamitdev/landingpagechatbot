import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // คงค่า Config เดิมของคุณไว้ตรงนี้
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

// ใช้ withPayload ครอบ export default
export default withPayload(nextConfig)