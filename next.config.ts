import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repoName = "my-link";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ["192.168.219.111", "localhost:3000"],
};

export default nextConfig;
