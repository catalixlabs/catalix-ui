import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/docs",
        destination: "/docs/get-started/introduction",
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX();
export default withMDX(nextConfig);
