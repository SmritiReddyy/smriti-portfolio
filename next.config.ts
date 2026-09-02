import type { NextConfig } from "next";

/**
 * Two deployment targets:
 *
 *   Vercel (primary)      — default config. Full Node runtime, so /admin and
 *                           the /api/admin routes work.
 *   GitHub Pages (mirror) — GITHUB_PAGES=true switches on static export. No
 *                           server, so the deploy workflow drops app/admin and
 *                           app/api before building. Served from a repo
 *                           subpath, hence basePath.
 */
const isGitHubPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = isGitHubPages
  ? {
      output: "export",
      basePath,
      images: { unoptimized: true },
      trailingSlash: true,
    }
  : {};

export default nextConfig;
