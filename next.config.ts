import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  images: {
    unoptimized: true,
  },
  turbopack: {
    resolveAlias: {
      fs: { browser: "./lib/empty-module.ts" },
      perf_hooks: { browser: "./lib/empty-module.ts" },
      module: { browser: "./lib/empty-module.ts" },
    },
  },
}

export default nextConfig
