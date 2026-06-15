'use client';

import type { Project } from '../lib/types';

const styles = {
  card: {
    padding: '32px',
    borderRadius: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    transition: 'all 0.3s ease',
    cursor: 'default',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
    gap: '12px',
  },
  badgeGroup: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap' as const,
  },
  badge: {
    padding: '6px 12px',
    borderRadius: '8px',
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  lang: {
    padding: '6px 12px',
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    fontSize: '0.75rem',
    color: '#9ca3af',
    fontWeight: 500,
    whiteSpace: 'nowrap' as const,
  },
  title: {
    fontSize: '1.35rem',
    fontWeight: 600,
    marginBottom: '16px',
    color: '#ffffff',
    lineHeight: 1.3,
  },
  desc: {
    fontSize: '0.95rem',
    color: '#d1d5db',
    lineHeight: 1.7,
    marginBottom: '16px',
    flexGrow: 1,
  },
  tags: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap' as const,
    marginBottom: '16px',
  },
  tag: {
    padding: '4px 12px',
    borderRadius: '6px',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    border: '1px solid rgba(99, 102, 241, 0.2)',
    color: '#a5b4fc',
    fontSize: '0.8rem',
    fontWeight: 500,
  },
  bottom: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 'auto',
  },
  link: {
    color: '#ffffff',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '0.875rem',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.3s ease',
    padding: '6px 14px',
    borderRadius: '8px',
    backgroundColor: 'rgba(99,102,241,0.2)',
    border: '1px solid rgba(99,102,241,0.3)',
  },
} as const;

const ML_BADGE_GRADIENTS = [
  'linear-gradient(135deg,#667eea,#764ba2)',
  'linear-gradient(135deg,#f59e0b,#d97706)',
  'linear-gradient(135deg,#10b981,#059669)',
];

export default function ProjectCard({
  project,
  animateDir,
  delay,
}: {
  project: Project;
  animateDir?: 'left' | 'right';
  delay?: string;
}) {
  return (
    <div
      data-animate={animateDir}
      data-delay={delay}
      style={styles.card}
      className="project-card-hover"
    >
      <div style={styles.header}>
        <div style={styles.badgeGroup}>
          {project.badges ? (
            project.badges.map((b, i) => (
              <span
                key={b}
                style={{ ...styles.badge, background: ML_BADGE_GRADIENTS[i] ?? ML_BADGE_GRADIENTS[0] }}
              >
                {b}
              </span>
            ))
          ) : project.badge ? (
            <span style={{ ...styles.badge, ...(project.badgeStyle ?? {}) }}>
              {project.badge}
            </span>
          ) : null}
        </div>
        {project.lang && <span style={styles.lang}>{project.lang}</span>}
      </div>

      <h3 style={styles.title}>{project.title}</h3>
      <p style={styles.desc}>{project.desc}</p>

      <div style={styles.tags}>
        {project.tags.map((t) => (
          <span key={t} style={styles.tag}>{t}</span>
        ))}
      </div>

      <div style={styles.bottom}>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          style={styles.link}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(99,102,241,0.35)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(99,102,241,0.2)';
          }}
        >
          View Project →
        </a>
      </div>
    </div>
  );
}
