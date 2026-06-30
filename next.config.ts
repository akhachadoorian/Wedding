// import type { NextConfig } from "next";

const nextConfig = {
  images: {},
  basePath: '', // Leave empty since you're using a custom domain
  sassOptions: {
    loadPaths: ['./src'],
  },
  turbopack: {
    root: __dirname,
  },
  allowedDevOrigins: ['192.168.1.85'],
}


export default nextConfig;
