'use client';

import { useState, useEffect, useRef } from 'react';
import './globals.css';

const allSkills = [
  { name: 'Python',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  { name: 'Java',           icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
  { name: 'C++',            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg' },
  { name: 'JavaScript',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
  { name: 'Node.js',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
  { name: 'SQL',            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg' },
  { name: 'React',          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'Spring Boot',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg' },
  { name: 'Django',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg', invert: true },
  { name: 'FastAPI',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg' },
  { name: 'PyTorch',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg' },
  { name: 'TensorFlow',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg' },
  { name: 'Scikit-Learn',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg' },
  { name: 'Pandas',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg' },
  { name: 'NumPy',          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg' },
  { name: 'SQLAlchemy',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlalchemy/sqlalchemy-original.svg' },
  { name: 'AWS',            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg', invert: true },
  { name: 'GCP',            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg' },
  { name: 'Firebase',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg' },
  { name: 'Docker',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
  { name: 'Kubernetes',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg' },
  { name: 'GitHub Actions', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg' },
  { name: 'MySQL',          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
  { name: 'PostgreSQL',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
  { name: 'MongoDB',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
  { name: 'Redis',          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg' },
];
const row1 = allSkills.slice(0, 13);
const row2 = allSkills.slice(13);

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
  @keyframes marqueeLeft {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes marqueeRight {
    from { transform: translateX(-50%); }
    to   { transform: translateX(0); }
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

const techIcons = [
  // Left triangle — shifted down ~6%, closer to center at name height, spreading out above/below
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',          label: 'Python',     top: '13%', left: '3%',  delay: '0s',    reverse: false },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',  label: 'TypeScript', top: '29%', left: '8%',  delay: '0.6s',  reverse: true  },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',          label: 'Docker',     top: '46%', left: '13%', delay: '1.2s',  reverse: false },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg',          label: 'Spring',     top: '63%', left: '8%',  delay: '0.9s',  reverse: true  },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',        label: 'MongoDB',    top: '79%', left: '3%',  delay: '1.8s',  reverse: false },

  // Right triangle — mirrored
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',            label: 'React',      top: '13%', left: '89%', delay: '0.3s',  reverse: true  },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg',label: 'GCP',        top: '29%', left: '84%', delay: '1.4s',  reverse: false },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg',    label: 'C++',        top: '46%', left: '79%', delay: '0.7s',  reverse: true  },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',              label: 'Java',       top: '63%', left: '84%', delay: '1.7s',  reverse: false },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg', label: 'AWS', top: '79%', left: '89%', delay: '1.0s', reverse: true },

  // Bottom inner — mirroring the top position, filling the empty bottom corners
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',          label: 'Node.js',    top: '86%', left: '24%', delay: '1.1s',  reverse: false },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg',        label: 'FastAPI',    top: '86%', left: '68%', delay: '1.5s',  reverse: true  },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [scrolled, setScrolled] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Canvas particle background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
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

      // connecting lines between nearby particles
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

  // Scroll-triggered slide animations — re-trigger every time element enters/exits viewport
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-animate]');

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

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'systems', label: 'Systems & Cloud' },
    { id: 'ml', label: 'ML / Data Science' },
  ];
  
  return (
    <main style={styles.container} className="page-root">
      <style>{KEYFRAMES}</style>

      {/* Navbar */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: scrolled ? '12px 48px' : '18px 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(10,10,10,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'all 0.3s ease',
      }}>
        <span onClick={() => scrollTo('#hero-section')} style={{
          fontSize: '1.1rem', fontWeight: 700, color: '#fff', cursor: 'pointer', letterSpacing: '-0.5px'
        }}>Smriti Reddy</span>
        <ul style={{ display: 'flex', gap: '32px', listStyle: 'none', margin: 0, padding: 0, alignItems: 'center' }}>
          {[['Projects','#projects-section'],['Skills','#skills-section'],['Certifications','#certifications-section'],['Research','#research-section'],['Contact','#contact-section']].map(([label, id]) => (
            <li key={id}><span onClick={() => scrollTo(id)} style={{
              color: '#9ca3af', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500,
              transition: 'color 0.2s', textDecoration: 'none'
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = '#9ca3af')}
            >{label}</span></li>
          ))}
          <li><a href="/Smriti_Reddy_Resume.pdf" target="_blank" style={{
            padding: '8px 18px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: '#fff', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none'
          }}>Resume</a></li>
        </ul>
      </nav>

      {/* Animated Hero Section */}
      <section id="hero-section" style={styles.hero} className="hero">

        {/* Particle canvas */}
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }} />


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
              href="/Smriti_Reddy_Resume.pdf"
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
      {/* Scroll Down Button */}
      <button
        className="scroll-button"
          onClick={() => {
            const skillsSection = document.querySelector('#projects-section');
            if (skillsSection) {
              skillsSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          style={styles.scrollButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
          }}
        >
          <span style={styles.scrollIcon}>↓</span>
          <span style={styles.scrollText}>Scroll Down</span>
        </button>
      
      </section>


      {/* Projects Section with Filter */}
      <section id="projects-section" style={styles.section}>
        <div data-animate="up">
          <h2 style={styles.sectionTitle}>
            <span style={styles.titleAccent}></span>Projects
          </h2>
        </div>

        {/* Category Filter */}
        <div data-animate="up" data-delay="0.1s" style={styles.categoryFilter}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                ...styles.filterButton,
                ...(activeCategory === cat.id ? styles.filterButtonActive : {})
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Systems & Cloud Projects */}
        {(activeCategory === 'all' || activeCategory === 'systems') && (
          <div style={styles.projectsGrid}>
            {[
              {
                badge: 'Featured', badgeStyle: { background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' },
                lang: 'Python · React',
                title: 'CourtAccess AI — Multilingual Legal Document Pipeline',
                desc: 'Modular document processing pipeline for digital PDFs, scanned documents, and handwritten pages across 3 distinct paths with a 12-stage orchestration layer. Presented at Google Expo for Massachusetts Trial Court. Reduced critical mistranslation rate by ~30% using Groq LLaMA 3.3 70B verification; processes a 10-page legal form end-to-end in under 40 seconds.',
                tags: ['FastAPI','NLLB-200','PaddleOCR','GCP · Firebase','LLM'],
                link: 'https://github.com/SunnyYadav16/court-access-ai',
              },
              {
                badge: 'Distributed Systems', lang: 'C++',
                title: 'Fault-Tolerant Distributed Key-Value Store',
                desc: 'Fault-tolerant replicated key-value store in C++ supporting concurrent reads/writes across a 5-node cluster. Implemented RAFT consensus from scratch — leader election, log replication, state machine replication — achieving 8,000+ ops/sec under 30% node failure. Reduced failover recovery to under 200ms.',
                tags: ['RAFT Consensus','Fault Tolerance','Replication'],
                link: 'https://github.com/SmritiReddyy/distributed-cluster-monitoring-system',
              },
              {
                badge: 'Microservices', lang: 'Java · Python',
                title: 'Secure Payment Microservice',
                desc: 'Dual-service microservices architecture — Spring Boot REST API for transaction management and Django fraud-scoring service — containerized with Docker, orchestrated via docker-compose. OAuth2/JWT auth, MySQL for transactions, MongoDB for session/audit logs, deployed on AWS EC2.',
                tags: ['Spring Boot','Docker','AWS EC2','OAuth2/JWT'],
                link: 'https://github.com/SmritiReddyy/secure-payment-microservices',
              },
              {
                badge: 'Distributed Systems', lang: 'C++',
                title: 'Distributed Client-Server Performance Analysis',
                desc: 'Implemented a distributed client-server architecture to analyze performance metrics under varying loads. Conducted comprehensive benchmarking of throughput, latency, and resource utilization.',
                tags: ['Benchmarking','Load Testing','Optimization'],
                link: 'https://github.com/SmritiReddyy/Distributed-ClientServer-Performance',
              },
              {
                badge: 'Software Engineering', lang: 'Java',
                title: 'Image Manipulation Application',
                desc: 'Developed a modular image-processing application using Java MVC architecture supporting CLI, GUI, and batch execution modes with advanced filters like blur, sharpen, resize, and dithering.',
                tags: ['MVC','Design Patterns','GUI'],
                link: 'https://github.com/SmritiReddyy/ImageProcessingApplication',
              },
            ].map((p, i) => (
              <div
                key={i}
                data-animate={i % 2 === 0 ? 'left' : 'right'}
                data-delay={`${i * 0.1}s`}
                style={styles.projectCard}
                className="project-card-hover"
              >
                <div style={styles.projectHeader}>
                  <span style={{...styles.projectBadge, ...(p.badgeStyle ?? {})}}>{p.badge}</span>
                  <span style={styles.projectLang}>{p.lang}</span>
                </div>
                <h3 style={styles.projectCardTitle}>{p.title}</h3>
                <p style={styles.projectCardDesc}>{p.desc}</p>
                <div style={styles.projectTags}>
                  {p.tags.map(t => <span key={t} style={styles.tag}>{t}</span>)}
                </div>
                <div style={styles.projectBottom}>
                  <a href={p.link} target="_blank" rel="noopener noreferrer" style={styles.projectLink}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(99,102,241,0.35)'; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(99,102,241,0.2)'; }}
                  >View Project →</a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ML / Data Science Projects */}
        {(activeCategory === 'all' || activeCategory === 'ml') && (
          <div style={styles.projectsGrid}>
            {[
              {
                badges: ['ML','Data Science'],
                title: "Alzheimer's Disease Detection with ML",
                desc: 'Built binary classification models using clinical datasets to predict early-stage Alzheimer\'s disease. Compared five supervised learning algorithms with comprehensive evaluation metrics and statistical analysis.',
                tags: ['Classification','Healthcare Analytics','Model Comparison'],
                link: 'https://github.com/SmritiReddyy/Alzheimer-s-Disease-Detection-with-ML',
              },
              {
                badges: ['ML','Data Science'],
                title: 'Cardio Risk Predictor',
                desc: 'Predicting heart disease risk using ensemble learning methods. Implemented multiple classification algorithms with comprehensive model evaluation and feature importance analysis for healthcare analytics.',
                tags: ['Ensemble Methods','Feature Engineering','Predictive Analytics'],
                link: 'https://github.com/SmritiReddyy/Cardio-Risk-Predictor',
              },
              {
                badges: ['ML','Data Science'],
                title: 'Stellar Classifier',
                desc: 'Predicting star types using supervised machine learning models. Built classification models to categorize stars based on astronomical features with multi-class classification and exploratory data analysis.',
                tags: ['Multi-class Classification','Scientific Data','Data Analysis'],
                link: 'https://github.com/SmritiReddyy/Stellar-Classifier',
              },
              {
                badges: ['ML'],
                title: 'Convolutional AutoEncoders',
                desc: 'Implemented convolutional autoencoders for unsupervised feature learning and dimensionality reduction. Explored deep learning architectures for image reconstruction and denoising.',
                tags: ['Deep Learning','Unsupervised','Computer Vision'],
                link: 'https://github.com/SmritiReddyy/ConvolutionalAutoEncoders',
              },
            ].map((p, i) => (
              <div
                key={i}
                data-animate={i % 2 === 0 ? 'left' : 'right'}
                data-delay={`${i * 0.1}s`}
                style={styles.projectCard}
                className="project-card-hover"
              >
                <div style={styles.projectHeader}>
                  <div style={styles.badgeGroup}>
                    {p.badges.map((b,bi) => (
                      <span key={b} style={{...styles.projectBadge, background: bi === 0 ? 'linear-gradient(135deg,#667eea,#764ba2)' : 'linear-gradient(135deg,#f59e0b,#d97706)'}}>{b}</span>
                    ))}
                  </div>
                  <span style={styles.projectLang}>Python</span>
                </div>
                <h3 style={styles.projectCardTitle}>{p.title}</h3>
                <p style={styles.projectCardDesc}>{p.desc}</p>
                <div style={styles.projectTags}>
                  {p.tags.map(t => <span key={t} style={styles.tag}>{t}</span>)}
                </div>
                <div style={styles.projectBottom}>
                  <a href={p.link} target="_blank" rel="noopener noreferrer" style={styles.projectLink}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(99,102,241,0.35)'; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(99,102,241,0.2)'; }}
                  >View Project →</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

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
              logo: '/NEU.png',
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
              logo: '/DSU.png',
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
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '0 -32px' }} />
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
                <div style={{ textAlign: 'center' as const }}>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', margin: '0 0 6px' }}>{edu.degree}</h3>
                  <p style={{ fontSize: '1rem', fontWeight: 600, color: '#6366f1', margin: '0 0 4px' }}>{edu.field}</p>
                  <p style={{ fontSize: '0.9rem', color: '#9ca3af', margin: 0 }}>{edu.school} · {edu.location}</p>
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

        {/* Marquee row 1 — scrolls left */}
        <div style={styles.marqueeWrapper}>
          <div style={{ ...styles.marqueeTrack, animation: 'marqueeLeft 28s linear infinite' }}>
            {[...row1, ...row1].map((item, i) => (
              <div key={i} style={styles.marqueeCard}>
                <img src={item.icon} alt={item.name} style={{ width: '36px', height: '36px', objectFit: 'contain', ...(item.invert ? { filter: 'brightness(0) invert(1)' } : {}) }} />
                <span style={styles.marqueeLabel}>{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Marquee row 2 — scrolls right */}
        <div style={{ ...styles.marqueeWrapper, marginTop: '16px' }}>
          <div style={{ ...styles.marqueeTrack, animation: 'marqueeRight 32s linear infinite' }}>
            {[...row2, ...row2].map((item, i) => (
              <div key={i} style={styles.marqueeCard}>
                <img src={item.icon} alt={item.name} style={{ width: '36px', height: '36px', objectFit: 'contain', ...(item.invert ? { filter: 'brightness(0) invert(1)' } : {}) }} />
                <span style={styles.marqueeLabel}>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications-section" style={styles.aboutSection}>
        <div style={styles.aboutContainer}>
          <div data-animate="up">
          <h2 style={styles.sectionTitle}>
            <span style={styles.titleAccent}></span> Certifications
          </h2>
          <div style={styles.certGrid}>
            <div data-animate="left" data-delay="0.1s" style={styles.certCard} className="cert-card-hover">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" alt="AWS" style={{width:'52px',height:'52px',flexShrink:0,filter:'brightness(0) invert(1)'}} />
              <div style={styles.certContent}>
                <h3 style={styles.certTitle}>AWS Academy Graduate — Cloud Architecting</h3>
                <p style={styles.certIssuer}>Amazon Web Services</p>
                <p style={styles.certDate}>April 2026</p>
                <a href="https://www.credly.com/org/amazon-web-services/badge/aws-academy-graduate-aws-academy-cloud-architecting" target="_blank" rel="noopener noreferrer" style={styles.certBadgeLink} onMouseEnter={e=>e.currentTarget.style.color='#818cf8'} onMouseLeave={e=>e.currentTarget.style.color='#6366f1'}>View Badge →</a>
              </div>
            </div>
            <div data-animate="right" data-delay="0.2s" style={styles.certCard} className="cert-card-hover">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" alt="AWS" style={{width:'52px',height:'52px',flexShrink:0,filter:'brightness(0) invert(1)'}} />
              <div style={styles.certContent}>
                <h3 style={styles.certTitle}>AWS Academy Graduate — Cloud Foundations</h3>
                <p style={styles.certIssuer}>Amazon Web Services</p>
                <p style={styles.certDate}>February 2026</p>
                <a href="https://www.credly.com/org/amazon-web-services/badge/aws-academy-graduate-aws-academy-cloud-foundations" target="_blank" rel="noopener noreferrer" style={styles.certBadgeLink} onMouseEnter={e=>e.currentTarget.style.color='#818cf8'} onMouseLeave={e=>e.currentTarget.style.color='#6366f1'}>View Badge →</a>
              </div>
            </div>
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
            <a
              data-animate="up" data-delay="0.0s"
              href="mailto:uravakonda.s@northeastern.edu"
              style={styles.contactCard}
              className="contact-card-hover"
            >
              <div style={styles.contactIcon}><EnvelopeIcon size={40} /></div>
              <h3 style={styles.contactCardTitle}>Email</h3>
              <p style={styles.contactCardText}>u.smritireddy@gmail.com</p>
            </a>

            <a
              data-animate="up" data-delay="0.1s"
              href="https://www.linkedin.com/in/smriti-reddy"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.contactCard}
              className="contact-card-hover"
            >
              <div style={styles.contactIcon}><LinkedInIcon size={40} /></div>
              <h3 style={styles.contactCardTitle}>LinkedIn</h3>
              <p style={styles.contactCardText}>Connect with me</p>
            </a>

            <a
              data-animate="up" data-delay="0.2s"
              href="https://github.com/SmritiReddyy"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.contactCard}
              className="contact-card-hover"
            >
              <div style={styles.contactIcon}><GitHubIcon size={40} /></div>
              <h3 style={styles.contactCardTitle}>GitHub</h3>
              <p style={styles.contactCardText}>View my code</p>
            </a>

            <a
              data-animate="up" data-delay="0.3s"
              href="/Smriti_Reddy_Resume.pdf"
              target="_blank"
              style={styles.contactCard}
              className="contact-card-hover"
            >
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
    backgroundColor: "#0a0a0a",
    color: "#ffffff",
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
    color: "#34d399",
    fontSize: "0.875rem",
    marginBottom: "24px",
    fontWeight: 500,
  },

  statusDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "#34d399",
    animation: "pulse 2s ease-in-out infinite",
  },

  name: {
    fontSize: "4rem",
    fontWeight: 700,
    background: "linear-gradient(135deg, #ffffff 0%, #c4b5fd 50%, #818cf8 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: "16px",
    lineHeight: 1.2,
  },

  subtitle: {
    fontSize: "1.15rem",
    color: "#9ca3af",
    marginBottom: "10px",
    fontWeight: 400,
  },

  tagline: {
    fontSize: "0.9rem",
    color: "#a5b4fc",
    fontWeight: 700,
    letterSpacing: "3px",
    textTransform: "uppercase" as const,
    marginBottom: "28px",
  },

  description: {
    fontSize: "1.1rem",
    color: "#e2e8f0",
    lineHeight: 1.9,
    maxWidth: "900px",
    margin: "0 auto 16px",
  },

  descriptionSecond: {
    fontSize: "1rem",
    color: "#e2e8f0",
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

  primaryButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "14px 28px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    color: "#ffffff",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "1rem",
    transition: "all 0.3s ease",
    border: "none",
    cursor: "pointer",
  },

  secondaryButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "14px 28px",
    borderRadius: "12px",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    color: "#ffffff",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "1rem",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },

  buttonIcon: {
    fontSize: "1.2rem",
  },

  orb1: {
    position: "absolute" as const,
    top: "10%",
    right: "15%",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
    filter: "blur(60px)",
    zIndex: 1,
  },

  orb2: {
    position: "absolute" as const,
    bottom: "20%",
    left: "10%",
    width: "350px",
    height: "350px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
    filter: "blur(60px)",
    zIndex: 1,
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
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    color: "#ffffff",
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
    color: "#6b7280",
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

  marqueeWrapper: {
    overflow: "hidden",
    width: "100%",
    maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
    WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
  },

  marqueeTrack: {
    display: "flex",
    gap: "16px",
    width: "max-content",
  },

  marqueeCard: {
    display: "inline-flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "10px",
    padding: "18px 22px",
    borderRadius: "16px",
    backgroundColor: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    minWidth: "96px",
    flexShrink: 0,
  },

  marqueeLabel: {
    fontSize: "0.78rem",
    color: "#d1d5db",
    fontWeight: 500,
    whiteSpace: "nowrap" as const,
  },

  categoryFilter: {
    display: "flex",
    gap: "12px",
    marginBottom: "48px",
    flexWrap: "wrap" as const,
  },

  filterButton: {
    padding: "10px 24px",
    borderRadius: "24px",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    color: "#9ca3af",
    fontSize: "0.95rem",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  filterButtonActive: {
    backgroundColor: "rgba(99, 102, 241, 0.15)",
    border: "1px solid rgba(99, 102, 241, 0.4)",
    color: "#6366f1",
  },

  projectsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
    gap: "32px",
    marginBottom: "48px",
  },

  projectCard: {
    padding: "32px",
    borderRadius: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    transition: "all 0.3s ease",
    cursor: "default",
    display: "flex",
    flexDirection: "column" as const,
  },

  projectHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "20px",
    gap: "12px",
  },

  badgeGroup: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap" as const,
  },

  projectBadge: {
    padding: "6px 12px",
    borderRadius: "8px",
    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    fontSize: "0.75rem",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
  },

  projectLang: {
    padding: "6px 12px",
    borderRadius: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    fontSize: "0.75rem",
    color: "#9ca3af",
    fontWeight: 500,
  },

  projectCardTitle: {
    fontSize: "1.35rem",
    fontWeight: 600,
    marginBottom: "16px",
    color: "#ffffff",
    lineHeight: 1.3,
  },

  projectCardDesc: {
    fontSize: "0.95rem",
    color: "#d1d5db",
    lineHeight: 1.7,
    marginBottom: "16px",
  },

  projectTags: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap" as const,
    marginBottom: "16px",
  },

  projectBottom: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "auto",
  },

  tag: {
    padding: "4px 12px",
    borderRadius: "6px",
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    border: "1px solid rgba(99, 102, 241, 0.2)",
    color: "#a5b4fc",
    fontSize: "0.8rem",
    fontWeight: 500,
  },

  projectLink: {
    color: "#ffffff",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "0.875rem",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    transition: "all 0.3s ease",
    alignSelf: "flex-end" as const,
    marginTop: "auto",
    padding: "6px 14px",
    borderRadius: "8px",
    backgroundColor: "rgba(99,102,241,0.2)",
    border: "1px solid rgba(99,102,241,0.3)",
  },

  researchSection: {
    marginTop: "48px",
  },

  researchTitle: {
    fontSize: "1.75rem",
    fontWeight: 600,
    marginBottom: "32px",
    color: "#ffffff",
  },

  researchCard: {
    display: "flex",
    gap: "24px",
    padding: "32px",
    borderRadius: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
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
    color: "#ffffff",
  },

  researchVenue: {
    fontSize: "0.9rem",
    color: "#6366f1",
    fontWeight: 600,
    marginBottom: "12px",
  },

  researchDesc: {
    fontSize: "0.95rem",
    color: "#9ca3af",
    lineHeight: 1.7,
  },

  footer: {
    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
    padding: "40px 20px",
    textAlign: "center" as const,
  },

  footerText: {
    color: "#6b7280",
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
    background: "linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },

  contactSubtitle: {
    fontSize: "1.1rem",
    color: "#9ca3af",
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
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
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
    color: "#ffffff",
    margin: 0,
  },

  contactCardText: {
    fontSize: "0.9rem",
    color: "#9ca3af",
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
    color: "#a5b4fc",
    fontSize: "0.95rem",
    fontWeight: 500,
  },

  locationIcon: {
    fontSize: "1.2rem",
  },

  certGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "24px",
    maxWidth: "1000px",
    margin: "0 auto",
  },

  certCard: {
    display: "flex",
    gap: "20px",
    alignItems: "flex-start",
    padding: "28px",
    borderRadius: "16px",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    transition: "all 0.3s ease",
  },

  certLogo: {
    fontSize: "2.2rem",
    flexShrink: 0,
    lineHeight: 1,
  },

  certContent: {
    flex: 1,
  },

  certTitle: {
    fontSize: "1.05rem",
    fontWeight: 600,
    color: "#ffffff",
    marginBottom: "6px",
    lineHeight: 1.4,
  },

  certIssuer: {
    fontSize: "0.9rem",
    color: "#6366f1",
    fontWeight: 600,
    margin: "0 0 4px",
  },

  certDate: {
    fontSize: "0.85rem",
    color: "#6b7280",
    margin: "0 0 12px",
  },

  certBadgeLink: {
    color: "#6366f1",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "0.9rem",
    transition: "color 0.2s ease",
  },

  aboutSection: {
    backgroundColor: "rgba(99, 102, 241, 0.02)",
    padding: "80px 40px",
  },
  
  aboutTitle: {
    fontSize: "2.5rem",
    fontWeight: 700,
    marginBottom: "48px",
  },


  aboutContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 40px",
  },
  
  aboutContent: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "24px",
    maxWidth: "1000px",
    margin: "0 auto",
    paddingLeft: "60px",
    paddingRight: "60px",
  },
  
  aboutText: {
    fontSize: "1.1rem",
    color: "#d1d5db",
    lineHeight: 1.8,
    margin: 0,
    textAlign: "justify" as const,
  },

  eduCard: {
    padding: "32px",
    borderRadius: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    display: "flex",
    flexDirection: "column" as const,
    gap: "24px",
    transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
  },

  eduHeader: {
    display: "flex",
    gap: "20px",
    alignItems: "flex-start",
  },

  eduIconWrap: {
    width: "52px",
    height: "52px",
    borderRadius: "14px",
    backgroundColor: "rgba(99, 102, 241, 0.12)",
    border: "1px solid rgba(99, 102, 241, 0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  eduDegree: {
    fontSize: "1.2rem",
    fontWeight: 700,
    color: "#ffffff",
    margin: "0 0 4px",
  },

  eduField: {
    fontSize: "1rem",
    fontWeight: 600,
    color: "#6366f1",
    margin: "0 0 4px",
  },

  eduSchool: {
    fontSize: "0.9rem",
    color: "#9ca3af",
    margin: 0,
  },

  eduMeta: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding: "12px 16px",
    borderRadius: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
  },

  eduMetaItem: {
    fontSize: "0.875rem",
    color: "#9ca3af",
  },

  eduMetaDot: {
    color: "rgba(255,255,255,0.2)",
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
    color: "#6b7280",
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
    color: "#a5b4fc",
    fontSize: "0.8rem",
    fontWeight: 500,
  },
};
