import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'iptv-nederland.test',
      },
      {
        protocol: 'http',
        hostname: 'iptv-nederland.com.test',
      },
      {
        protocol: 'https',
        hostname: 'iptv-nederland.com',
      }
    ],
  },
};

export default nextConfig;
