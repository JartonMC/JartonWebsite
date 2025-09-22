import createMDX from "@next/mdx";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  async headers() {
    return process.env.NEXT_PUBLIC_DEPLOYMENT === "production"
      ? [
          {
            source: "/static/:path*",
            headers: [
              {
                key: "Cache-Control",
                value: "public, max-age=31536000, immutable",
              },
            ],
          },
          {
            source: "/(.*)",
            headers: [
              {
                key: "Cache-Control",
                value: "public, max-age=0, must-revalidate",
              },
            ],
          },
        ]
      : [];
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

export default withMDX(nextConfig);
