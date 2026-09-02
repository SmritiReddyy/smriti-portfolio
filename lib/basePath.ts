/**
 * Prefix for assets referenced by plain <a href> / <img src> tags.
 *
 * Next.js rewrites its own bundles and `next/link` hrefs when `basePath` is set,
 * but not raw HTML attributes — those need this prefix applied manually.
 *
 * Empty on Vercel (served from the domain root); `/smriti-portfolio` on the
 * GitHub Pages mirror, which is served from a repo subpath.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** Absolute path to a file in `public/`, correct on both deployments. */
export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}
