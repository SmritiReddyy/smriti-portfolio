'use client';

import { useState } from 'react';
import type { Project } from '../lib/types';
import ProjectCard from './ProjectCard';

const CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'systems-cloud', label: 'Systems & Cloud' },
  { id: 'ml-data-science', label: 'ML / Data Science' },
] as const;

const styles = {
  section: {
    padding: '120px 48px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  titleWrap: { marginBottom: '16px' },
  sectionTitle: {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '64px',
  },
  titleAccent: {
    color: '#6366f1',
    marginRight: '12px',
  },
  filter: {
    display: 'flex',
    gap: '12px',
    marginBottom: '48px',
    flexWrap: 'wrap' as const,
  },
  filterBtn: {
    padding: '10px 24px',
    borderRadius: '24px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#9ca3af',
    fontSize: '0.95rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  filterBtnActive: {
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    border: '1px solid rgba(99, 102, 241, 0.4)',
    color: '#6366f1',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    gap: '32px',
    marginBottom: '48px',
  },
  empty: {
    color: '#9ca3af',
    textAlign: 'center' as const,
    padding: '48px 0',
    fontSize: '1rem',
  },
} as const;

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<string>('all');

  const filtered =
    active === 'all' ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects-section" style={styles.section}>
      <div data-animate="up" style={styles.titleWrap}>
        <h2 style={styles.sectionTitle}>
          <span style={styles.titleAccent}></span>Projects
        </h2>
      </div>

      <div data-animate="up" data-delay="0.1s" style={styles.filter}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.id)}
            style={{
              ...styles.filterBtn,
              ...(active === cat.id ? styles.filterBtnActive : {}),
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p style={styles.empty}>No projects in this category yet.</p>
      ) : (
        <div style={styles.grid}>
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.name}
              project={project}
              animateDir={i % 2 === 0 ? 'left' : 'right'}
              delay={`${i * 0.1}s`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
