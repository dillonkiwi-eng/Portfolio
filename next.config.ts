import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2916, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
    qualities: [75, 90, 95, 100],
  },
};

export default nextConfig;
