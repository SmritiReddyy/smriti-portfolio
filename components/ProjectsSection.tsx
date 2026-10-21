'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Project } from '../lib/types';
import ProjectCard from './ProjectCard';

const GAP = 24;

const TABS = [
  { id: 'systems-cloud',    label: 'Systems & Cloud' },
  { id: 'ml-data-science',  label: 'ML / Data Science' },
] as const;

type TabId = typeof TABS[number]['id'];

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const [activeTab, setActiveTab] = useState<TabId>('systems-cloud');
  const [index, setIndex]         = useState(0);
  const [maxIndex, setMaxIndex]   = useState(0);
  const [atEnd, setAtEnd]         = useState(false);
  const viewportRef               = useRef<HTMLDivElement>(null);

  // Auto-advance: on until the visitor takes over, and only while the carousel
  // is actually on screen and the tab is in the foreground.
  const [autoPlay, setAutoPlay]   = useState(true);
  const [paused, setPaused]       = useState(false);
  const [inView, setInView]       = useState(false);
  const directionRef              = useRef(1);

  const filtered = projects.filter(p => p.category === activeTab);
  const total    = filtered.length;

  const step = () => {
    const slot = viewportRef.current?.firstElementChild?.firstElementChild as HTMLElement | null;
    return slot ? slot.offsetWidth + GAP : 1;
  };

  // Scrolling is native, so the active dot is read back from scrollLeft —
  // that keeps swiping, clicking and the arrows all in agreement.
  const sync = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const s = step();
    const maxScroll = el.scrollWidth - el.clientWidth;
    setIndex(Math.round(el.scrollLeft / s));
    setMaxIndex(maxScroll > 1 ? Math.ceil(maxScroll / s) : 0);
    setAtEnd(el.scrollLeft >= maxScroll - 1);
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(sync);
    };
    sync();
    el.addEventListener('scroll', onScroll, { passive: true });
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('scroll', onScroll);
      ro.disconnect();
    };
  }, [sync, activeTab]);

  const scrollToIndex = (next: number) => {
    const el = viewportRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(maxIndex, next));
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollTo({ left: clamped * step(), behavior: reduced ? 'auto' : 'smooth' });
  };

  // Only stop on a deliberate gesture. Scroll events fire for our own
  // programmatic scrolling too, so they can't be used to detect intent.
  const stopAutoPlay = () => setAutoPlay(false);

  // Advancing off screen would mean arriving at a carousel already mid-way
  // through, and burning timers in a background tab.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 },
    );
    io.observe(el);
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  useEffect(() => {
    if (!autoPlay || paused || !inView || maxIndex <= 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const id = window.setInterval(() => {
      const el = viewportRef.current;
      if (!el) return;
      // Turn around using the live scroll position, not the derived index:
      // maxIndex is a ceil() and index a round(), so with a fractional last
      // step index never reaches maxIndex and the carousel parks at the end.
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 1) return;
      if (el.scrollLeft >= maxScroll - 1) directionRef.current = -1;
      if (el.scrollLeft <= 1) directionRef.current = 1;
      const target = el.scrollLeft + directionRef.current * step();
      el.scrollTo({ left: Math.max(0, Math.min(maxScroll, target)), behavior: 'smooth' });
    }, 4500);

    return () => window.clearInterval(id);
  }, [autoPlay, paused, inView, maxIndex]);

  const switchTab = (tab: TabId) => {
    setActiveTab(tab);
    setIndex(0);
    directionRef.current = 1;
    viewportRef.current?.scrollTo({ left: 0, behavior: 'auto' });
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
          onClick={() => { stopAutoPlay(); scrollToIndex(index - 1); }}
          disabled={index === 0}
          style={{ ...s.arrow, ...s.arrowLeft, opacity: index === 0 ? 0.2 : 1 }}
          aria-label="Previous project"
        >
          ‹
        </button>

        {/* Native scroll container: trackpad swipe, touch swipe and momentum
            all come from the browser rather than being reimplemented. */}
        <div
          ref={viewportRef}
          className="projects-viewport"
          style={{ ...s.viewport, ...(atEnd ? {} : s.viewportFade) }}
          tabIndex={0}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onPointerDown={stopAutoPlay}
          // Only a sideways wheel means "I'm driving this carousel". Scrolling
          // the page vertically with the cursor over it is not intent, and
          // treating it as such killed auto-advance before it was ever seen.
          onWheel={e => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) stopAutoPlay(); }}
          onTouchStart={stopAutoPlay}
          onKeyDown={stopAutoPlay}
        >
          <div style={s.track}>
            {filtered.map(project => (
              <div key={project.name} className="projects-slot" style={s.cardSlot}>
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
          onClick={() => { stopAutoPlay(); scrollToIndex(index + 1); }}
          disabled={atEnd}
          style={{ ...s.arrow, ...s.arrowRight, opacity: atEnd ? 0.2 : 1 }}
          aria-label="Next project"
        >
          ›
        </button>
      </div>

      {/* Dot indicators */}
      {maxIndex > 0 && (
        <div style={s.dots}>
          {Array.from({ length: maxIndex + 1 }, (_, i) => (
            <button
              key={i}
              onClick={() => { stopAutoPlay(); scrollToIndex(i); }}
              style={{ ...s.dot, ...(i === index ? s.dotActive : {}) }}
              aria-label={`Go to project ${i + 1}`}
              aria-current={i === index}
            />
          ))}
        </div>
      )}

      <style>{`
        .projects-viewport {
          scroll-snap-type: x mandatory;
          overscroll-behavior-x: contain;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .projects-viewport::-webkit-scrollbar { display: none; }
        .projects-viewport:focus-visible {
          outline: 2px solid rgba(99, 102, 241, 0.7);
          outline-offset: 4px;
          border-radius: 16px;
        }
        .projects-slot { scroll-snap-align: start; }
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
    overflowX: 'auto' as const,
    overflowY: 'hidden' as const,
  },
  // Only hint at more cards while there are actually more to the right.
  viewportFade: {
    maskImage: 'linear-gradient(to right, black 0%, black 88%, transparent 100%)',
    WebkitMaskImage: 'linear-gradient(to right, black 0%, black 88%, transparent 100%)',
  },
  track: {
    display: 'flex',
    gap: `${GAP}px`,
    alignItems: 'stretch',
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
