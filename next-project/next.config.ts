import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",  // lo que el front consuma como /api/*
        destination: "https://covertron-server.onrender.com/api/:path*", // backend en Render
      },
    ];
  },
};

export default nextConfig;
