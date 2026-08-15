import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Cloudflare Images (оптимизацията на next/image в Workers) е платена услуга,
    // затова снимките се сервират директно от Static Assets. Файловете в
    // public/images/ са предварително смалени и конвертирани, за да е бързо.
    unoptimized: true,
  },
};

export default nextConfig;
