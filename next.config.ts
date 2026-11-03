import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // iOS reads this file to decide which links open the Mivo app. It has no extension,
        // so it must be told it is JSON.
        source: "/.well-known/apple-app-site-association",
        headers: [{ key: "Content-Type", value: "application/json" }],
      },
    ];
  },
  async redirects() {
    // Mivo Spots were discontinued on 2026-11-03. Old shop, Spot and shipping links land somewhere useful.
    return [
      { source: "/shop", destination: "/", permanent: false },
      { source: "/s/:id*", destination: "/", permanent: false },
      { source: "/spot/:id*", destination: "/", permanent: false },
      { source: "/study/:id", destination: "/study", permanent: false },
      { source: "/shipping-returns", destination: "/support", permanent: false },
    ];
  },
};

export default nextConfig;
