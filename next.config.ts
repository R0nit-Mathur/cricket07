import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/_netplay_ticket",
        destination: "/api/netplay_ticket",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
