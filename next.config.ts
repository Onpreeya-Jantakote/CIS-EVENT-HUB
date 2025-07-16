import type { NextConfig } from "next";

const nextConfig = {
  experimental: {
    allowedDevOrigins: ["http://192.168.0.0:3000", "http://192.168.89.7:3000"]
  },
  images: {
    domains: [
      "images.unsplash.com", 
      "www.classcentral.com",
    ],
  },
};

export default nextConfig;
