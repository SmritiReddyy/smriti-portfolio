'use client';

import { useState, useEffect, useRef } from 'react';
import './globals.css';

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
`;

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

    const particles = Array.from({ length: 90 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 1.8 + 0.4,
      opacity: Math.random() * 0.45 + 0.08,
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
        ctx.fillStyle = `rgba(99,102,241,${p.opacity})`;
        ctx.fill();
      });

      // draw faint connecting lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99,102,241,${0.12 * (1 - dist/100)})`;
            ctx.lineWidth = 0.5;
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
          {[['About','#about-section'],['Projects','#projects-section'],['Skills','#skills-section'],['Certifications','#certifications-section'],['Research','#research-section'],['Contact','#contact-section']].map(([label, id]) => (
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

        {/* Floating tech icons */}
        {techIcons.map((icon, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: icon.top,
              left: icon.left,
              animation: `${icon.reverse ? 'floatDown' : 'floatUp'} ${5 + i * 0.4}s ease-in-out infinite`,
              animationDelay: icon.delay,
              zIndex: 2,
              userSelect: 'none' as const,
            }}
          >
            <div style={{
              width: '92px', height: '92px', borderRadius: '24px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(22, 22, 28, 0.92)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(12px)',
              padding: '18px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.1)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)';
            }}
            >
              <img src={icon.src} alt={icon.label} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
          </div>
        ))}

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

          <p style={{...styles.description, animation: 'fadeUp 0.7s ease 0.6s both'}}>
            Building scalable distributed systems and intelligent ML solutions.
            Passionate about cloud computing, full-stack development, and data-driven innovation.
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
              <span style={styles.buttonIcon}>💼</span>
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
              <span style={styles.buttonIcon}>💻</span>
              GitHub
            </a>

            <a
              href="/Smriti_Reddy_Resume.pdf"
              target="_blank"
              style={styles.secondaryButton}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <span style={styles.buttonIcon}>📄</span>
              Resume
            </a>
          </div>
        </div>

        

        {/* Floating gradient orbs */}
        <div style={{...styles.orb1, animation: 'orbDrift 20s ease-in-out infinite'}}></div>
        <div style={{...styles.orb2, animation: 'orbDrift2 26s ease-in-out infinite'}}></div>
      </section>

      <section>
      {/* Scroll Down Button */}
      <button
        className="scroll-button"
          onClick={() => {
            const skillsSection = document.querySelector('#about-section');
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


      {/* About Me Section */}
      <section id="about-section" style={styles.aboutSection}>
        <div style={styles.aboutContainer}>
          <div data-animate="up">
          <h2 style={styles.sectionTitle}>
            <span style={styles.titleAccent}></span> About Me
          </h2>
          <div style={styles.aboutContent} className="about-content">
            <p style={styles.aboutText} className="about-text">              I'm a Computer Science graduate student at Northeastern University, focused on building 
              distributed systems and intelligent ML solutions with real-world impact. What drives me 
              is working on technology that affects millions of lives daily whether that's building 
              cloud infrastructures that power the services we all use or creating predictive models 
              that tackle meaningful challenges.
            </p>
            <p style={styles.aboutText} className="about-text">              I love being at the intersection of engineering and data science, where I can build 
              things people actually depend on. The opportunity to work on infrastructure that millions 
              rely on daily like optimizing systems, developing intelligent solutions, and solving complex 
              problems at scale is what excites me the most about this field.
            </p>
            <p style={styles.aboutText} className="about-text">              My work spans fault-tolerant distributed architectures, healthcare ML applications, 
              and cloud-native solutions. I've published research on edge computing optimization 
              and environmental monitoring using satellite imagery, and I'm always looking for the 
              next challenge that pushes the boundaries of what's possible with scalable, 
              intelligent systems.
            </p>
          </div>
          </div>
        </div>
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
                <a href={p.link} target="_blank" rel="noopener noreferrer" style={styles.projectLink}>View Project →</a>
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
                <a href={p.link} target="_blank" rel="noopener noreferrer" style={styles.projectLink}>View Project →</a>
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
          <span style={styles.titleAccent}></span> Technical Skills
        </h2>
        <div style={styles.skillsList}>
          <div style={styles.skillRow}><span style={styles.skillLabel}>Languages</span><span style={styles.skillValue}>Python • Java • C++ • JavaScript • TypeScript • SQL</span></div>
          <div style={styles.skillRow}><span style={styles.skillLabel}>Frameworks</span><span style={styles.skillValue}>React • Node.js • Express • Spring Boot • FastAPI</span></div>
          <div style={styles.skillRow}><span style={styles.skillLabel}>ML / Data</span><span style={styles.skillValue}>Scikit-Learn • TensorFlow • PyTorch • Pandas • NumPy</span></div>
          <div style={styles.skillRow}><span style={styles.skillLabel}>Cloud</span><span style={styles.skillValue}>AWS (EC2, S3, Lambda) • GCP • Azure</span></div>
          <div style={styles.skillRow}><span style={styles.skillLabel}>Databases</span><span style={styles.skillValue}>MySQL • MSSQL • MongoDB</span></div>
          <div style={styles.skillRow}><span style={styles.skillLabel}>Other</span><span style={styles.skillValue}>Algorithms • Data Structures • OOP • Software Development</span></div>
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
              <div style={styles.researchIcon}>📄</div>
              <div style={styles.researchContent}>
                <h4 style={styles.researchCardTitle}>Environmental Impact Analysis using Satellite Image Processing</h4>
                <p style={styles.researchVenue}>IEEE 4th ASIANCON 2024</p>
                <p style={styles.researchDesc}>Developed automated workflows for environmental monitoring using satellite imagery, demonstrating applications in deforestation tracking and urban development analysis.</p>
              </div>
            </div>
            <div data-animate="right" data-delay="0.2s" style={styles.researchCard}>
              <div style={styles.researchIcon}>📄</div>
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
          <h2 style={styles.contactTitle}>Let's Connect</h2>
          <p style={styles.contactSubtitle}>
            I'm actively seeking opportunities in Software Engineering, Machine Learning, 
            and Data Science. Let's discuss how I can contribute to your team!
          </p>

          <div style={styles.contactGrid}>
            <a 
              href="mailto:uravakonda.s@northeastern.edu"
              style={styles.contactCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              <div style={styles.contactIcon}>📧</div>
              <h3 style={styles.contactCardTitle}>Email</h3>
              <p style={styles.contactCardText}>u.smritireddy@gmail.com</p>
            </a>

            <a 
              href="https://www.linkedin.com/in/smriti-reddy"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.contactCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              <div style={styles.contactIcon}>💼</div>
              <h3 style={styles.contactCardTitle}>LinkedIn</h3>
              <p style={styles.contactCardText}>Connect with me</p>
            </a>

            <a 
              href="https://github.com/SmritiReddyy"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.contactCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              <div style={styles.contactIcon}>💻</div>
              <h3 style={styles.contactCardTitle}>GitHub</h3>
              <p style={styles.contactCardText}>View my code</p>
            </a>

            <a 
              href="/Smriti_Reddy_Resume.pdf"
              target="_blank"
              style={styles.contactCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              <div style={styles.contactIcon}>📄</div>
              <h3 style={styles.contactCardTitle}>Resume</h3>
              <p style={styles.contactCardText}>View PDF</p>
            </a>
          </div>

          <div style={styles.locationBadge}>
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
    maxWidth: "800px",
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
    fontSize: "3.5rem",
    fontWeight: 700,
    background: "linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: "16px",
    lineHeight: 1.2,
  },

  subtitle: {
    fontSize: "1.25rem",
    color: "#9ca3af",
    marginBottom: "24px",
    fontWeight: 400,
  },

  description: {
    fontSize: "1.1rem",
    color: "#d1d5db",
    lineHeight: 1.7,
    marginBottom: "40px",
    maxWidth: "650px",
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
    bottom: "80px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "8px",
    padding: "16px 24px",
    borderRadius: "12px",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    color: "#ffffff",
    cursor: "pointer",
    transition: "all 0.3s ease",
    zIndex: 3,
  },

  scrollIcon: {
    fontSize: "1.5rem",
    animation: "bounce 2s infinite",
  },

  scrollText: {
    fontSize: "0.85rem",
    fontWeight: 500,
    color: "#9ca3af",
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

  skillsList: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "24px",
    maxWidth: "900px",
    margin: "0 auto",
  },

  skillRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "32px",
    padding: "20px 0",
    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
  },

  skillLabel: {
    fontSize: "1rem",
    fontWeight: 600,
    color: "#6366f1",
    minWidth: "140px",
    flexShrink: 0,
  },

  skillValue: {
    fontSize: "1rem",
    color: "#d1d5db",
    lineHeight: 1.7,
    flex: 1,
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
    color: "#9ca3af",
    lineHeight: 1.7,
    marginBottom: "20px",
    flex: 1,
  },

  projectTags: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap" as const,
    marginBottom: "20px",
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
    color: "#6366f1",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "0.95rem",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    transition: "all 0.3s ease",
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
