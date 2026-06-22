'use client';

import { useState } from 'react';
import type { Project } from '../lib/types';
import ProjectCard from './ProjectCard';

const TABS = [
  { id: 'systems-cloud',    label: 'Systems & Cloud' },
  { id: 'ml-data-science',  label: 'ML / Data Science' },
] as const;

type TabId = typeof TABS[number]['id'];

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const [activeTab, setActiveTab] = useState<TabId>('systems-cloud');
  const [index, setIndex]         = useState(0);

  const filtered = projects.filter(p => p.category === activeTab);
  const total    = filtered.length;
  // show 3 full cards + peek; step by 1
  const maxIndex = Math.max(0, total - 1);

  const switchTab = (tab: TabId) => {
    setActiveTab(tab);
    setIndex(0);
  };

  return (
    <section id="projects-section" style={s.section}>
      {/* Title */}
      <div data-animate="up">
        <h2 style={s.title}><span style={s.accent}></span>Projects</h2>
      </div>

      {/* Tabs */}
      <div data-animate="up" data-delay="0.1s" style={s.tabs}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => switchTab(tab.id)}
            style={{ ...s.tab, ...(activeTab === tab.id ? s.tabActive : {}) }}
          >
            {tab.label}
            <span style={{ ...s.tabCount, ...(activeTab === tab.id ? s.tabCountActive : {}) }}>
              {projects.filter(p => p.category === tab.id).length}
            </span>
          </button>
        ))}
      </div>

      {/* Carousel */}
      <div style={s.carouselWrap}>
        {/* Left arrow */}
        <button
          onClick={() => setIndex(i => Math.max(0, i - 1))}
          disabled={index === 0}
          style={{ ...s.arrow, ...s.arrowLeft, opacity: index === 0 ? 0.2 : 1 }}
          aria-label="Previous"
        >
          ‹
        </button>

        {/* Track — overflow hidden so only 3+peek are visible */}
        <div style={s.viewport}>
          <div
            style={{
              ...s.track,
              transform: `translateX(calc(-${index} * (var(--card-w) + 24px)))`,
            }}
          >
            {filtered.map((project, i) => (
              <div key={project.name} style={s.cardSlot}>
                <ProjectCard project={project} />
              </div>
            ))}
            {filtered.length === 0 && (
              <p style={{ color: '#9ca3af', padding: '48px 0' }}>No projects in this category yet.</p>
            )}
          </div>
        </div>

        {/* Right arrow */}
        <button
          onClick={() => setIndex(i => Math.min(maxIndex, i + 1))}
          disabled={index >= maxIndex}
          style={{ ...s.arrow, ...s.arrowRight, opacity: index >= maxIndex ? 0.2 : 1 }}
          aria-label="Next"
        >
          ›
        </button>
      </div>

      {/* Dot indicators */}
      {total > 1 && (
        <div style={s.dots}>
          {filtered.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              style={{ ...s.dot, ...(i === index ? s.dotActive : {}) }}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>
      )}

      <style>{`
        .carousel-card-slot { flex-shrink: 0; }
        :root {
          --card-w: clamp(280px, 30vw, 380px);
        }
      `}</style>
    </section>
  );
}

const s = {
  section: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '80px 48px',
  },
  title: {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '48px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  accent: { color: '#6366f1' },
  tabs: {
    display: 'flex',
    gap: '12px',
    marginBottom: '40px',
    flexWrap: 'wrap' as const,
  },
  tab: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 24px',
    borderRadius: '24px',
    backgroundColor: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#9ca3af',
    fontSize: '0.95rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.25s ease',
  },
  tabActive: {
    backgroundColor: 'rgba(99,102,241,0.15)',
    border: '1px solid rgba(99,102,241,0.4)',
    color: '#6366f1',
  },
  tabCount: {
    padding: '1px 8px',
    borderRadius: '10px',
    backgroundColor: 'rgba(255,255,255,0.07)',
    color: '#6b7280',
    fontSize: '0.75rem',
    fontWeight: 600,
  },
  tabCountActive: {
    backgroundColor: 'rgba(99,102,241,0.2)',
    color: '#a5b4fc',
  },
  carouselWrap: {
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
    gap: '0px',
  },
  viewport: {
    flex: 1,
    overflow: 'hidden',
    // show 3 full cards + a peek of the 4th
    maskImage: 'linear-gradient(to right, black 0%, black 88%, transparent 100%)',
    WebkitMaskImage: 'linear-gradient(to right, black 0%, black 88%, transparent 100%)',
  },
  track: {
    display: 'flex',
    gap: '24px',
    transition: 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  cardSlot: {
    flexShrink: 0,
    width: 'clamp(280px, 30vw, 380px)',
  },
  arrow: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#fff',
    fontSize: '1.6rem',
    lineHeight: 1,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'opacity 0.2s, background-color 0.2s',
    zIndex: 2,
  },
  arrowLeft: { marginRight: '12px' },
  arrowRight: { marginLeft: '4px' },
  dots: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'center',
    marginTop: '28px',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.15)',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    transition: 'all 0.2s',
  },
  dotActive: {
    backgroundColor: '#6366f1',
    width: '24px',
    borderRadius: '4px',
  },
} as const;
