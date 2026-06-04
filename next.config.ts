import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Notion 첨부파일 임시 URL (S3 기반)
      { protocol: "https", hostname: "prod-files-secure.s3.us-west-2.amazonaws.com" },
      { protocol: "https", hostname: "*.s3.amazonaws.com" },
    ],
  },
}

export default nextConfig
