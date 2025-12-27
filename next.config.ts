import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Disable development features in production
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
