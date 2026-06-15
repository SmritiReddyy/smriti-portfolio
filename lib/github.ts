import { readFileSync } from 'fs';
import { join } from 'path';
import type { Project } from './types';

export const GITHUB_USERNAME = 'SmritiReddyy';

interface StoredProject {
  repoName: string;
  title: string;
  desc: string;
  category: 'systems-cloud' | 'ml-data-science';
  badge: string | null;
  badgeStyle: Record<string, string> | null;
  badges: string[] | null;
  lang: string;
  tags: string[];
}

interface PortfolioConfig {
  projects: StoredProject[];
}

export function getPortfolioProjects(): Project[] {
  const filePath = join(process.cwd(), 'data', 'portfolio-config.json');
  const raw = readFileSync(filePath, 'utf-8');
  const config: PortfolioConfig = JSON.parse(raw);

  return config.projects.map((p): Project => ({
    name: p.repoName,
    title: p.title,
    desc: p.desc,
    link: `https://github.com/${GITHUB_USERNAME}/${p.repoName}`,
    lang: p.lang,
    badge: p.badge ?? undefined,
    badgeStyle: p.badgeStyle ?? undefined,
    badges: p.badges ?? undefined,
    category: p.category,
    tags: p.tags,
  }));
}

/** Fetch all public repos from GitHub for the admin panel */
export async function getAllRepos(): Promise<{ name: string; description: string | null; language: string | null; html_url: string }[]> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
  };
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
    { headers, cache: 'no-store' }
  );

  if (!res.ok) return [];
  return res.json();
}
