// import type { NextConfig } from "next";

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
  basePath: '', // Leave empty since you're using a custom domain
  sassOptions: {
    loadPaths: ['./src'],
  },
  turbopack: {
    root: __dirname,
  },
}

export default nextConfig;
