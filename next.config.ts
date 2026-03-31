import type { NextConfig } from "next";

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // We will assume your GitHub repo will be named "my-portfolio"
  basePath: '/my-portfolio',
};

export default nextConfig;
