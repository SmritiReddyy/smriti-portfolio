'use client';

import { useEffect, useState } from 'react';
import type { Project, ProjectGroup } from '../lib/types';
import { FEATURED_REPOS, projectAnchor } from './Highlights';

const GROUPS: { id: ProjectGroup; label: string }[] = [
  { id: 'distributed', label: 'Distributed Systems' },
  { id: 'fullstack',   label: 'Full-Stack & Backend' },
  { id: 'ai-data',     label: 'AI & Data Engineering' },
  { id: 'ml',          label: 'Machine Learning' },
];

/** Projects split into subtopics, one subtopic shown at a time, one row open
 *  at a time. A Highlights card links to #project-<repo>; that hash switches
 *  to the right subtopic and opens the row. */
export default function ProjectsSection({ projects }: { projects: Project[] }) {
  // Featured projects lead each subtopic, in Highlights order; the rest keep
  // their order from the data.
  const rank = (p: Project) => {
    const i = FEATURED_REPOS.indexOf(p.name);
    return i === -1 ? FEATURED_REPOS.length : i;
  };
  const ordered = [...projects].sort((a, b) => rank(a) - rank(b));
  const groups = GROUPS.filter(g => projects.some(p => p.group === g.id));
  const firstIn = (g: ProjectGroup) => ordered.find(p => p.group === g)?.name ?? null;

  const [active, setActive] = useState<ProjectGroup>(groups[0]?.id ?? 'distributed');
  const [open, setOpen] = useState<string | null>(() => firstIn(groups[0]?.id ?? 'distributed'));

  useEffect(() => {
    const fromHash = () => {
      const repo = decodeURIComponent(location.hash.replace(/^#project-/, ''));
      const project = location.hash.startsWith('#project-') && projects.find(p => p.name === repo);
      if (!project) return;
      setActive(project.group);
      setOpen(project.name);
      // Wait for the row to render in its subtopic before scrolling to it.
      requestAnimationFrame(() => requestAnimationFrame(() => {
        document.getElementById(projectAnchor(project.name))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }));
    };
    // Arriving with a #project-… link: deferred, since state can't be set
    // during the effect itself.
    const initial = requestAnimationFrame(fromHash);
    window.addEventListener('hashchange', fromHash);
    return () => {
      cancelAnimationFrame(initial);
      window.removeEventListener('hashchange', fromHash);
    };
  }, [projects]);

  const switchGroup = (g: ProjectGroup) => {
    setActive(g);
    setOpen(firstIn(g));
  };

  const shown = ordered.filter(p => p.group === active);

  return (
    <section id="projects-section" className="pj-section">
      <div data-animate="up">
        <h2 className="pj-title">Projects</h2>
      </div>

      <div data-animate="up" data-delay="0.1s" className="pj-tabs" role="tablist" aria-label="Project subtopics">
        {groups.map(g => {
          const count = projects.filter(p => p.group === g.id).length;
          return (
            <button
              key={g.id}
              role="tab"
              id={`pj-tab-${g.id}`}
              aria-selected={active === g.id}
              aria-controls="pj-panel"
              className={`pj-tab${active === g.id ? ' is-active' : ''}`}
              onClick={() => switchGroup(g.id)}
            >
              {g.label}
              <span className="pj-tab-count">{count}</span>
            </button>
          );
        })}
      </div>

      <div id="pj-panel" role="tabpanel" aria-labelledby={`pj-tab-${active}`} className="pj-list">
        {shown.map(p => {
          const isOpen = open === p.name;
          const featured = FEATURED_REPOS.includes(p.name);
          return (
            <div key={p.name} id={projectAnchor(p.name)} className={`pj-row${isOpen ? ' is-open' : ''}`}>
              <button
                className="pj-row-head"
                aria-expanded={isOpen}
                aria-controls={`${projectAnchor(p.name)}-body`}
                onClick={() => setOpen(isOpen ? null : p.name)}
              >
                <span className="pj-row-main">
                  <span className="pj-row-title">
                    {p.title}
                    {featured && <span className="pj-featured" title="Featured in Highlights">✦</span>}
                  </span>
                  {p.tagline && <span className="pj-row-tagline">{p.tagline}</span>}
                </span>
                <span className="pj-row-lang">{p.lang}</span>
                <span className="pj-row-toggle" aria-hidden="true" />
              </button>

              <div id={`${projectAnchor(p.name)}-body`} className="pj-row-body" inert={!isOpen}>
                <div className="pj-row-inner">
                  {p.metrics.length > 0 && (
                    <dl className="pj-metrics">
                      {p.metrics.map(m => (
                        <div key={m.label} className="pj-metric">
                          <dt>{m.label}</dt>
                          <dd>{m.value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  <p className="pj-desc">{p.desc}</p>
                  <div className="pj-foot">
                    <div className="pj-tags">
                      {p.tags.map(t => <span key={t} className="pj-tag">{t}</span>)}
                    </div>
                    <div className="pj-links">
                      {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" className="pj-link pj-link--primary">Live demo ↗</a>}
                      <a href={p.link} target="_blank" rel="noopener noreferrer" className="pj-link">Code ↗</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
