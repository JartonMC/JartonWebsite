import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const withMDX = createMDX({ extension: /\.(md|mdx)$/ });

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

  // Force Webpack instead of Turbopack
  webpack: (config) => {
    return config; // simply use Webpack, do not modify Turbopack
  },
};

export default withMDX(nextConfig);
