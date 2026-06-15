export type ProjectCategory = 'systems-cloud' | 'ml-data-science';

export interface ProjectOverride {
  /** Display title — falls back to formatted repo name */
  title?: string;
  /** Card description — falls back to GitHub repo description */
  desc?: string;
  /** Single badge label (systems projects) */
  badge?: string;
  /** Custom badge gradient style */
  badgeStyle?: Record<string, string>;
  /** Multiple badge labels (ML projects) */
  badges?: string[];
  /** Which filter tab this project belongs to */
  category: ProjectCategory;
  /** Language string shown on the card */
  lang?: string;
  /** Tech-stack chip tags */
  tags?: string[];
}

export interface Project {
  name: string;
  title: string;
  desc: string;
  link: string;
  lang: string;
  badge?: string;
  badgeStyle?: Record<string, string>;
  badges?: string[];
  category: ProjectCategory;
  tags: string[];
}
