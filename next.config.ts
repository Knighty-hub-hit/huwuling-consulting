import type { NextConfig } from "next";

const isGitHubPages = Boolean(process.env.GITHUB_ACTIONS);
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const pagesBasePath = isGitHubPages && repositoryName ? `/${repositoryName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: pagesBasePath,
  assetPrefix: pagesBasePath,
  images: { unoptimized: true },
  turbopack: { root: process.cwd() },
};

export default nextConfig;
