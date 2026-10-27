'use client';

import { useState, useEffect, useRef } from 'react';
import '../app/globals.css';
import type { Project } from '../lib/types';
import { asset } from '../lib/basePath';
import ProjectsSection from './ProjectsSection';
import CertificationsCarousel from './CertificationsCarousel';
import ThemeToggle from './ThemeToggle';

type Skill = { name: string; icon?: string; invert?: boolean };
type SkillGroup = { label: string; items: Skill[] };

const DEV = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

/** Grouped to mirror the resume's skill categories, so a reader can scan for
 *  one area instead of parsing a single wall of logos. Items without a devicon
 *  render as text chips. */
const SKILL_GROUPS: SkillGroup[] = [
  {
    label: 'Languages',
    items: [
      { name: 'Java',       icon: `${DEV}/java/java-original.svg` },
      { name: 'Python',     icon: `${DEV}/python/python-original.svg` },
      { name: 'C++',        icon: `${DEV}/cplusplus/cplusplus-original.svg` },
      { name: 'JavaScript', icon: `${DEV}/javascript/javascript-original.svg` },
      { name: 'TypeScript', icon: `${DEV}/typescript/typescript-original.svg` },
      { name: 'SQL',        icon: `${DEV}/azuresqldatabase/azuresqldatabase-original.svg` },
    ],
  },
  {
    label: 'Backend & Distributed',
    items: [
      { name: 'Spring Boot',     icon: `${DEV}/spring/spring-original.svg` },
      { name: 'Spring WebFlux' },
      { name: 'FastAPI',         icon: `${DEV}/fastapi/fastapi-original.svg` },
      { name: 'Node.js',         icon: `${DEV}/nodejs/nodejs-original.svg` },
      { name: 'Django',          icon: `${DEV}/django/django-plain.svg`, invert: true },
      { name: 'Kafka',           icon: `${DEV}/apachekafka/apachekafka-original.svg`, invert: true },
      { name: 'React',           icon: `${DEV}/react/react-original.svg` },
      { name: 'REST APIs' },
      { name: 'Microservices' },
      { name: 'Raft' },
    ],
  },
  {
    label: 'Databases',
    items: [
      { name: 'PostgreSQL',    icon: `${DEV}/postgresql/postgresql-original.svg` },
      { name: 'MySQL',         icon: `${DEV}/mysql/mysql-original.svg` },
      { name: 'MongoDB',       icon: `${DEV}/mongodb/mongodb-original.svg` },
      { name: 'Redis',         icon: `${DEV}/redis/redis-original.svg` },
      { name: 'Elasticsearch', icon: `${DEV}/elasticsearch/elasticsearch-original.svg` },
      { name: 'TimescaleDB' },
      { name: 'SQLAlchemy',    icon: `${DEV}/sqlalchemy/sqlalchemy-original.svg` },
    ],
  },
  {
    label: 'Cloud & DevOps',
    items: [
      { name: 'AWS',            icon: `${DEV}/amazonwebservices/amazonwebservices-plain-wordmark.svg`, invert: true },
      { name: 'GCP',            icon: `${DEV}/googlecloud/googlecloud-original.svg` },
      { name: 'Docker',         icon: `${DEV}/docker/docker-original.svg` },
      { name: 'Kubernetes',     icon: `${DEV}/kubernetes/kubernetes-plain.svg` },
      { name: 'GitHub Actions', icon: `${DEV}/githubactions/githubactions-original.svg` },
      { name: 'Terraform',      icon: `${DEV}/terraform/terraform-original.svg` },
      { name: 'Git',            icon: `${DEV}/git/git-original.svg` },
      { name: 'Firebase',       icon: `${DEV}/firebase/firebase-plain.svg` },
    ],
  },
  {
    label: 'ML & Data',
    items: [
      { name: 'PyTorch',      icon: `${DEV}/pytorch/pytorch-original.svg` },
      { name: 'TensorFlow',   icon: `${DEV}/tensorflow/tensorflow-original.svg` },
      { name: 'Scikit-Learn', icon: `${DEV}/scikitlearn/scikitlearn-original.svg` },
      { name: 'Pandas',       icon: `${DEV}/pandas/pandas-original.svg` },
      { name: 'NumPy',        icon: `${DEV}/numpy/numpy-original.svg` },
      { name: 'Spark',        icon: `${DEV}/apachespark/apachespark-original.svg` },
      { name: 'Airflow',      icon: `${DEV}/apacheairflow/apacheairflow-original.svg` },
      { name: 'MLflow' },
    ],
  },
  {
    label: 'Testing & Fundamentals',
    items: [
      { name: 'pytest',          icon: `${DEV}/pytest/pytest-original.svg` },
      { name: 'Gatling' },
      { name: 'Testcontainers' },
      { name: 'CQRS' },
      { name: 'Event Sourcing' },
      { name: 'Sagas' },
      { name: 'Concurrency' },
    ],
  },
];

const KEYFRAMES = `
  @keyframes floatUp {
    0%,100% { transform: translateY(0px); }
    50%      { transform: translateY(-18px); }
  }
  @keyframes floatDown {
    0%,100% { transform: translateY(0px); }
    50%      { transform: translateY(18px); }
  }
  @keyframes pulse {
    0%,100% { opacity:1; transform:scale(1); }
    50%      { opacity:0.5; transform:scale(0.8); }
  }
  @keyframes bounce {
    0%,100% { transform:translateY(0); }
    50%      { transform:translateY(10px); }
  }
  @keyframes gradientShift {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes slideInLeft {
    from { opacity:0; transform:translateX(-60px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes slideInRight {
    from { opacity:0; transform:translateX(60px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(50px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes heroName {
    from { opacity:0; transform:translateY(30px) scale(0.95); }
    to   { opacity:1; transform:translateY(0) scale(1); }
  }
  @keyframes orbDrift {
    0%   { transform:translate(0,0) scale(1); }
    33%  { transform:translate(40px,-30px) scale(1.08); }
    66%  { transform:translate(-20px,-50px) scale(0.94); }
    100% { transform:translate(0,0) scale(1); }
  }
  @keyframes orbDrift2 {
    0%   { transform:translate(0,0) scale(1); }
    33%  { transform:translate(-50px,25px) scale(0.94); }
    66%  { transform:translate(25px,45px) scale(1.06); }
    100% { transform:translate(0,0) scale(1); }
  }

  /* ── Mobile responsive ──────────────────────────────────── */
  @media (max-width: 768px) {
    /* Navbar: tighten padding, hide nav links, keep name + resume */
    .page-root nav { padding: 12px 16px !important; }
    .page-root nav ul { gap: 12px !important; }
    .page-root nav ul li:not(:last-child) { display: none !important; }

    /* Hero: tighten section padding */
    .page-root .hero { padding: 100px 20px 40px !important; }

    /* Hero name: smaller on very small screens */
    .hero-name { font-size: clamp(1.8rem, 8vw, 3.5rem) !important; }

    /* Hero buttons: keep on one row, shrink padding */
    .hero-links { gap: 8px !important; flex-wrap: nowrap !important; }
    .hero-links a { padding: 10px 14px !important; font-size: 0.82rem !important; }

    /* Hide scroll-down button on mobile */
    .scroll-button { display: none !important; }

    /* General sections: reduce horizontal padding */
    .page-root section { padding-left: 20px !important; padding-right: 20px !important; }
  }
`;

const LinkedInIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GitHubIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const EnvelopeIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <polyline points="2,4 12,13 22,4"/>
  </svg>
);

const FileIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <line x1="10" y1="9" x2="8" y2="9"/>
  </svg>
);

const NAV_LINKS: [string, string][] = [
  ['Projects', '#projects-section'],
  ['Skills', '#skills-section'],
  ['Certifications', '#certifications-section'],
  ['Research', '#research-section'],
  ['Contact', '#contact-section'],
];

export default function PortfolioPage({ projects }: { projects: Project[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Escape closes the mobile menu, matching the expectation set by the overlay.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  // Canvas particle background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // CSS hides the canvas under reduced motion; skip the animation loop too
    // rather than burn a rAF every frame drawing something nobody sees.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = canvas.getContext('2d')!;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 160 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      size: Math.random() * 2.2 + 0.6,
      opacity: Math.random() * 0.7 + 0.2,
    }));

    let id: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139,92,246,${p.opacity})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99,102,241,${0.40 * (1 - dist/150)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize); };
  }, []);

  // Scroll-triggered slide animations
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-animate]');

    // These hide content with inline opacity, which CSS can't override without
    // !important — so honour the reduced-motion preference here and simply
    // leave everything visible.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    const getHidden = (dir: string | undefined) =>
      dir === 'left' ? 'translateX(-50px)' : dir === 'right' ? 'translateX(50px)' : 'translateY(40px)';

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target as HTMLElement;
        const delay = el.dataset.delay ?? '0s';
        if (entry.isIntersecting) {
          el.style.transition = `opacity 0.7s ease ${delay}, transform 0.7s ease ${delay}`;
          el.style.opacity = '1';
          el.style.transform = 'translate(0,0)';
        } else {
          el.style.transition = 'none';
          el.style.opacity = '0';
          el.style.transform = getHidden(el.dataset.animate);
        }
      });
    }, { threshold: 0.1 });

    els.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = getHidden(el.dataset.animate);
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main style={styles.container} className="page-root">
      <style>{KEYFRAMES}</style>

      {/* Navbar */}
      <nav className="navbar" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: scrolled ? '12px 48px' : '18px 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled || menuOpen ? 'rgb(var(--bg-rgb) / 0.85)' : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(20px)' : 'none',
        borderBottom: scrolled || menuOpen ? '1px solid rgb(var(--fg-rgb) / 0.06)' : 'none',
        transition: 'all 0.3s ease',
      }}>
        <span onClick={() => scrollTo('#hero-section')} style={{
          fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)', cursor: 'pointer', letterSpacing: '-0.5px'
        }}>Smriti Reddy</span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <ul className="nav-links" style={{ display: 'flex', gap: '32px', listStyle: 'none', margin: 0, padding: 0, alignItems: 'center' }}>
          {NAV_LINKS.map(([label, id]) => (
            <li key={id}><span onClick={() => scrollTo(id)} style={{
              color: 'var(--text-2)', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500,
              transition: 'color 0.2s', textDecoration: 'none'
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-2)')}
            >{label}</span></li>
          ))}
          <li><a href={asset('/Smriti_Reddy_Resume.pdf')} target="_blank" style={{
            padding: '8px 18px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: '#fff', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none'
          }}>Resume</a></li>
        </ul>

        <ThemeToggle />

        {/* Mobile: the links above are hidden under 768px, so sections are
            only reachable through this menu. */}
        <button
          className="nav-toggle"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className={`nav-toggle-bar${menuOpen ? ' is-open-top' : ''}`} />
          <span className={`nav-toggle-bar${menuOpen ? ' is-open-mid' : ''}`} />
          <span className={`nav-toggle-bar${menuOpen ? ' is-open-bot' : ''}`} />
        </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`mobile-menu${menuOpen ? ' open' : ''}`}
        hidden={!menuOpen}
      >
        {NAV_LINKS.map(([label, id]) => (
          <button
            key={id}
            className="mobile-menu-link"
            onClick={() => { setMenuOpen(false); scrollTo(id); }}
          >
            {label}
          </button>
        ))}
        <a
          href={asset('/Smriti_Reddy_Resume.pdf')}
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-menu-resume"
          onClick={() => setMenuOpen(false)}
        >
          Resume
        </a>
      </div>

      {/* Hero Section */}
      <section id="hero-section" style={styles.hero} className="hero">
        <canvas ref={canvasRef} className="hero-canvas" style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }} aria-hidden="true" />

        <div style={styles.heroContent}>
          <div style={{...styles.statusBadge, animation: 'fadeUp 0.6s ease 0.1s both'}}>
            <span style={styles.statusDot}></span>
            Open to Work
          </div>

          <h1 style={{...styles.name, animation: 'heroName 0.8s ease 0.25s both'}} className="hero-name">
            Smriti Reddy Uravakonda
          </h1>

          <p style={{...styles.subtitle, animation: 'fadeUp 0.7s ease 0.45s both'}}>
            MS Computer Science @ Northeastern University
          </p>

          <p style={{...styles.tagline, animation: 'fadeUp 0.7s ease 0.52s both'}}>
            Software Engineer · ML · Data Science
          </p>

          <p style={{...styles.description, animation: 'fadeUp 0.7s ease 0.6s both'}}>
            I build systems that scale, models that ship, and sometimes both at the same time.<br />
          </p>

          <p style={{...styles.descriptionSecond, animation: 'fadeUp 0.7s ease 0.72s both'}}>
            From fault-tolerant distributed stores to real-time legal translation pipelines — I've built across the stack.
            I build reliable systems, ship ML models end to end, and make data tell a story.
          </p>

          <div style={styles.links} className="hero-links">
            <a
              href="https://www.linkedin.com/in/smriti-reddy"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.secondaryButton}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <LinkedInIcon size={18} />
              LinkedIn
            </a>

            <a
              href="https://github.com/SmritiReddyy"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.secondaryButton}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <GitHubIcon size={18} />
              GitHub
            </a>

            <a
              href={asset('/Smriti_Reddy_Resume.pdf')}
              target="_blank"
              style={styles.secondaryButton}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <FileIcon size={18} />
              Resume
            </a>
          </div>
        </div>
      </section>

      <section>
        <button
          className="scroll-button"
          onClick={() => {
            document.querySelector('#projects-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
          style={styles.scrollButton}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.4)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgb(var(--fg-rgb) / 0.2)'; }}
        >
          <span style={styles.scrollIcon}>↓</span>
          <span style={styles.scrollText}>Scroll Down</span>
        </button>
      </section>

      {/* Projects Section — powered by GitHub */}
      <ProjectsSection projects={projects} />

      {/* Education Section */}
      <section id="education-section" style={styles.section}>
        <div data-animate="up">
          <h2 style={styles.sectionTitle}>
            <span style={styles.titleAccent}></span> Education
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px', alignItems: 'stretch' }}>
          {[
            {
              logo: asset('/NEU.png'),
              degree: 'Master of Science',
              field: 'Computer Science',
              school: 'Northeastern University',
              location: 'Boston, MA',
              period: 'Sep 2024 – May 2026',
              gpa: '3.6 / 4.0',
              courses: ['Distributed Systems','Cloud Computing','Artificial Intelligence','Algorithms','Database Systems','Parallel Data Processing'],
              animate: 'left',
            },
            {
              logo: asset('/DSU.png'),
              degree: 'Bachelor of Technology',
              field: 'Computer Science',
              school: 'Dayananda Sagar University',
              location: 'Bangalore, India',
              period: 'Aug 2020 – Jun 2024',
              gpa: '3.7 / 4.0',
              courses: ['Data Structures & Algorithms','Operating Systems','Computer Networks','Database Management','Machine Learning'],
              animate: 'right',
            },
          ].map((edu, i) => (
            <div key={i} data-animate={edu.animate} data-delay={`${(i+1)*0.1}s`} style={styles.eduCard} className="cert-card-hover">
              <div style={{
                background: 'rgba(255,255,255,0.97)',
                borderRadius: '14px 14px 0 0',
                margin: '-32px -32px 0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                height: '220px',
                padding: '24px 32px',
              }}>
                <img src={edu.logo} alt={edu.school} style={{ width: '125%', height: '125%', objectFit: 'contain' }} />
              </div>
              <div style={{ height: '1px', background: 'rgb(var(--fg-rgb) / 0.08)', margin: '0 -32px' }} />
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
                <div style={{ textAlign: 'center' as const }}>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', margin: '0 0 6px' }}>{edu.degree}</h3>
                  <p style={{ fontSize: '1rem', fontWeight: 600, color: '#6366f1', margin: '0 0 4px' }}>{edu.field}</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-2)', margin: 0 }}>{edu.school} · {edu.location}</p>
                </div>
                <div style={styles.eduMeta}>
                  <span style={styles.eduMetaItem}>{edu.period}</span>
                  <span style={styles.eduMetaDot}>·</span>
                  <span style={styles.eduMetaItem}>GPA: {edu.gpa}</span>
                </div>
                <div style={styles.eduCourseWrap}>
                  <p style={styles.eduCourseLabel}>RELEVANT COURSEWORK</p>
                  <div style={styles.eduCourseGrid}>
                    {edu.courses.map(c => <span key={c} style={styles.eduCourseTag}>{c}</span>)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills-section" style={styles.section}>
        <div data-animate="up">
          <h2 style={styles.sectionTitle}>
            <span style={styles.titleAccent}></span> Tech Stack
          </h2>
        </div>

        <div style={styles.skillGroups}>
          {SKILL_GROUPS.map((group, gi) => (
            <div
              key={group.label}
              data-animate="up"
              data-delay={`${0.05 * (gi + 1)}s`}
              style={styles.skillGroup}
            >
              <h3 style={styles.skillGroupLabel}>{group.label}</h3>
              <div style={styles.skillItems}>
                {group.items.map(item => (
                  <div key={item.name} style={styles.skillChip} className="skill-chip">
                    {item.icon && (
                      <img
                        src={item.icon}
                        alt=""
                        aria-hidden="true"
                        style={{
                          width: '22px',
                          height: '22px',
                          objectFit: 'contain',
                          ...(item.invert ? { filter: 'var(--logo-filter)' } : {}),
                        }}
                      />
                    )}
                    <span style={styles.skillChipLabel}>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications-section" style={styles.aboutSection}>
        <div style={styles.aboutContainer}>
          <div data-animate="up">
            <h2 style={styles.sectionTitle}>
              <span style={styles.titleAccent}></span> Certifications
            </h2>
            <div data-animate="up" data-delay="0.1s">
              <CertificationsCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* Research Publications */}
      <section id="research-section" style={styles.section}>
        <div data-animate="up">
          <h2 style={styles.sectionTitle}>
            <span style={styles.titleAccent}></span> Research Publications
          </h2>
          <div style={styles.researchSection}>
            <div data-animate="left" data-delay="0.1s" style={styles.researchCard}>
              <div style={styles.researchIcon}><FileIcon size={32} /></div>
              <div style={styles.researchContent}>
                <h4 style={styles.researchCardTitle}>Environmental Impact Analysis using Satellite Image Processing</h4>
                <p style={styles.researchVenue}>IEEE 4th ASIANCON 2024</p>
                <p style={styles.researchDesc}>Developed automated workflows for environmental monitoring using satellite imagery, demonstrating applications in deforestation tracking and urban development analysis.</p>
              </div>
            </div>
            <div data-animate="right" data-delay="0.2s" style={styles.researchCard}>
              <div style={styles.researchIcon}><FileIcon size={32} /></div>
              <div style={styles.researchContent}>
                <h4 style={styles.researchCardTitle}>Optimising Computation Offloading for Mobile Edge Devices</h4>
                <p style={styles.researchVenue}>ICAECT 2024</p>
                <p style={styles.researchDesc}>Researched and proposed optimization strategies for computation offloading in mobile edge computing environments, addressing latency and resource constraints.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-section" style={styles.contactSection}>
        <div style={styles.contactContainer}>
          <h2 data-animate="up" style={styles.contactTitle}>Let's Connect</h2>
          <p data-animate="up" data-delay="0.05s" style={styles.contactSubtitle}>
            I'm actively seeking opportunities in Software Engineering, Machine Learning,
            and Data Science. Let's discuss how I can contribute to your team!
          </p>

          <div style={styles.contactGrid}>
            <a data-animate="up" data-delay="0.0s" href="mailto:uravakonda.s@northeastern.edu" style={styles.contactCard} className="contact-card-hover">
              <div style={styles.contactIcon}><EnvelopeIcon size={40} /></div>
              <h3 style={styles.contactCardTitle}>Email</h3>
              <p style={styles.contactCardText}>u.smritireddy@gmail.com</p>
            </a>
            <a data-animate="up" data-delay="0.1s" href="https://www.linkedin.com/in/smriti-reddy" target="_blank" rel="noopener noreferrer" style={styles.contactCard} className="contact-card-hover">
              <div style={styles.contactIcon}><LinkedInIcon size={40} /></div>
              <h3 style={styles.contactCardTitle}>LinkedIn</h3>
              <p style={styles.contactCardText}>Connect with me</p>
            </a>
            <a data-animate="up" data-delay="0.2s" href="https://github.com/SmritiReddyy" target="_blank" rel="noopener noreferrer" style={styles.contactCard} className="contact-card-hover">
              <div style={styles.contactIcon}><GitHubIcon size={40} /></div>
              <h3 style={styles.contactCardTitle}>GitHub</h3>
              <p style={styles.contactCardText}>View my code</p>
            </a>
            <a data-animate="up" data-delay="0.3s" href={asset('/Smriti_Reddy_Resume.pdf')} target="_blank" style={styles.contactCard} className="contact-card-hover">
              <div style={styles.contactIcon}><FileIcon size={40} /></div>
              <h3 style={styles.contactCardTitle}>Resume</h3>
              <p style={styles.contactCardText}>View PDF</p>
            </a>
          </div>

          <div data-animate="up" data-delay="0.4s" style={styles.locationBadge}>
            <span style={styles.locationIcon}>📍</span>
            <span>Boston, MA • Open to relocation</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>
          Built by Smriti • Open to opportunities in Software Engineering,
          Machine Learning, and Data Science
        </p>
      </footer>
    </main>
  );
}

const styles = {
  container: {
    backgroundColor: "var(--bg)",
    color: "var(--text)",
    minHeight: "100vh",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  hero: {
    minHeight: "90vh",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center" as const,
    padding: "40px 20px",
    position: "relative" as const,
    overflow: "hidden",
  },
  heroContent: {
    position: "relative" as const,
    zIndex: 2,
    maxWidth: "1000px",
    width: "100%",
  },
  statusBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    borderRadius: "20px",
    backgroundColor: "rgba(52, 211, 153, 0.1)",
    border: "1px solid rgba(52, 211, 153, 0.3)",
    color: "var(--green)",
    fontSize: "0.875rem",
    marginBottom: "24px",
    fontWeight: 500,
  },
  statusDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "var(--green)",
    animation: "pulse 2s ease-in-out infinite",
  },
  name: {
    fontSize: "4rem",
    fontWeight: 700,
    background: "linear-gradient(135deg, var(--text) 0%, var(--violet-soft) 50%, var(--indigo-mid) 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: "16px",
    lineHeight: 1.2,
  },
  subtitle: {
    fontSize: "1.15rem",
    color: "var(--text-2)",
    marginBottom: "10px",
    fontWeight: 400,
  },
  tagline: {
    fontSize: "0.9rem",
    color: "var(--indigo-soft)",
    fontWeight: 700,
    letterSpacing: "3px",
    textTransform: "uppercase" as const,
    marginBottom: "28px",
  },
  description: {
    fontSize: "1.1rem",
    color: "var(--text-1)",
    lineHeight: 1.9,
    maxWidth: "900px",
    margin: "0 auto 16px",
  },
  descriptionSecond: {
    fontSize: "1rem",
    color: "var(--text-1)",
    lineHeight: 1.75,
    maxWidth: "760px",
    margin: "0 auto 40px",
  },
  links: {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
    flexWrap: "wrap" as const,
  },
  secondaryButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "14px 28px",
    borderRadius: "12px",
    backgroundColor: "rgb(var(--fg-rgb) / 0.05)",
    border: "1px solid rgb(var(--fg-rgb) / 0.1)",
    color: "var(--text)",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "1rem",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  scrollButton: {
    position: "absolute" as const,
    bottom: "32px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "4px",
    padding: "8px 16px",
    borderRadius: "10px",
    backgroundColor: "rgb(var(--fg-rgb) / 0.03)",
    border: "1px solid rgb(var(--fg-rgb) / 0.12)",
    color: "var(--text)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    zIndex: 3,
  },
  scrollIcon: {
    fontSize: "1rem",
    animation: "bounce 2s infinite",
  },
  scrollText: {
    fontSize: "0.72rem",
    fontWeight: 500,
    color: "var(--text-3)",
  },
  section: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "80px 40px",
  },
  sectionTitle: {
    fontSize: "2.5rem",
    fontWeight: 700,
    marginBottom: "48px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  titleAccent: {
    color: "#6366f1",
    fontSize: "2rem",
  },
  skillGroups: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "28px",
  },
  skillGroup: {
    padding: "24px",
    borderRadius: "16px",
    backgroundColor: "rgb(var(--fg-rgb) / 0.03)",
    border: "1px solid rgb(var(--fg-rgb) / 0.08)",
  },
  skillGroupLabel: {
    margin: "0 0 16px",
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: "var(--indigo-mid)",
  },
  skillItems: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "10px",
  },
  skillChip: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "7px 12px",
    borderRadius: "10px",
    backgroundColor: "rgb(var(--fg-rgb) / 0.04)",
    border: "1px solid rgb(var(--fg-rgb) / 0.08)",
    transition: "border-color 0.2s ease, background-color 0.2s ease",
  },
  skillChipLabel: {
    fontSize: "0.82rem",
    color: "var(--text-1)",
    fontWeight: 500,
    whiteSpace: "nowrap" as const,
  },
  researchSection: {
    marginTop: "48px",
  },
  researchCard: {
    display: "flex",
    gap: "24px",
    padding: "32px",
    borderRadius: "20px",
    backgroundColor: "rgb(var(--fg-rgb) / 0.03)",
    border: "1px solid rgb(var(--fg-rgb) / 0.08)",
    marginBottom: "24px",
    transition: "all 0.3s ease",
  },
  researchIcon: {
    fontSize: "2rem",
    flexShrink: 0,
  },
  researchContent: {
    flex: 1,
  },
  researchCardTitle: {
    fontSize: "1.2rem",
    fontWeight: 600,
    marginBottom: "8px",
    color: "var(--text)",
  },
  researchVenue: {
    fontSize: "0.9rem",
    color: "#6366f1",
    fontWeight: 600,
    marginBottom: "12px",
  },
  researchDesc: {
    fontSize: "0.95rem",
    color: "var(--text-2)",
    lineHeight: 1.7,
  },
  footer: {
    borderTop: "1px solid rgb(var(--fg-rgb) / 0.08)",
    padding: "40px 20px",
    textAlign: "center" as const,
  },
  footerText: {
    color: "var(--text-3)",
    fontSize: "0.9rem",
    lineHeight: 1.6,
  },
  contactSection: {
    backgroundColor: "rgba(99, 102, 241, 0.03)",
    borderTop: "1px solid rgba(99, 102, 241, 0.1)",
    padding: "80px 40px",
  },
  contactContainer: {
    maxWidth: "1000px",
    margin: "0 auto",
    textAlign: "center" as const,
  },
  contactTitle: {
    fontSize: "2.5rem",
    fontWeight: 700,
    marginBottom: "16px",
    background: "linear-gradient(135deg, var(--text) 0%, var(--text-2) 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  contactSubtitle: {
    fontSize: "1.1rem",
    color: "var(--text-2)",
    marginBottom: "48px",
    lineHeight: 1.6,
    maxWidth: "700px",
    margin: "0 auto 48px",
  },
  contactGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "24px",
    marginBottom: "40px",
  },
  contactCard: {
    padding: "32px 24px",
    borderRadius: "16px",
    backgroundColor: "rgb(var(--fg-rgb) / 0.03)",
    border: "1px solid rgb(var(--fg-rgb) / 0.1)",
    textDecoration: "none",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "12px",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  contactIcon: {
    fontSize: "2.5rem",
    marginBottom: "8px",
  },
  contactCardTitle: {
    fontSize: "1.1rem",
    fontWeight: 600,
    color: "var(--text)",
    margin: 0,
  },
  contactCardText: {
    fontSize: "0.9rem",
    color: "var(--text-2)",
    margin: 0,
  },
  locationBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 24px",
    borderRadius: "24px",
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    border: "1px solid rgba(99, 102, 241, 0.2)",
    color: "var(--indigo-soft)",
    fontSize: "0.95rem",
    fontWeight: 500,
  },
  locationIcon: {
    fontSize: "1.2rem",
  },
  aboutSection: {
    backgroundColor: "rgba(99, 102, 241, 0.02)",
    padding: "80px 40px",
  },
  aboutContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 40px",
  },
  eduCard: {
    padding: "32px",
    borderRadius: "20px",
    backgroundColor: "rgb(var(--fg-rgb) / 0.03)",
    border: "1px solid rgb(var(--fg-rgb) / 0.08)",
    display: "flex",
    flexDirection: "column" as const,
    gap: "24px",
    transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
  },
  eduMeta: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding: "12px 16px",
    borderRadius: "10px",
    backgroundColor: "rgb(var(--fg-rgb) / 0.03)",
    border: "1px solid rgb(var(--fg-rgb) / 0.06)",
  },
  eduMetaItem: {
    fontSize: "0.875rem",
    color: "var(--text-2)",
  },
  eduMetaDot: {
    color: "rgb(var(--fg-rgb) / 0.2)",
    fontSize: "1rem",
  },
  eduCourseWrap: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px",
  },
  eduCourseLabel: {
    fontSize: "0.72rem",
    fontWeight: 700,
    color: "var(--text-3)",
    letterSpacing: "1.5px",
    margin: 0,
  },
  eduCourseGrid: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "8px",
  },
  eduCourseTag: {
    padding: "4px 12px",
    borderRadius: "6px",
    backgroundColor: "rgba(99, 102, 241, 0.08)",
    border: "1px solid rgba(99, 102, 241, 0.18)",
    color: "var(--indigo-soft)",
    fontSize: "0.8rem",
    fontWeight: 500,
  },
} as const;
