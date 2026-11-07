'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { Project } from '../lib/types';

type Tone = 'lavender' | 'indigo' | 'plum';
/** Name and tagline come from the project data, so they're edited in one place. */
type Highlight = { repo: string; tone: Tone; icon: ReactNode };

/** Lucide-style 24px stroke icons, drawn with currentColor. */
const Icon = ({ children }: { children: ReactNode }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

/** Tones cycle lavender → indigo → plum so neighbours never match. */
const HIGHLIGHTS: Highlight[] = [
  {
    repo: 'NexLedger', tone: 'lavender',
    icon: <Icon><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20M6 15h4" /></Icon>,
  },
  {
    repo: 'raft-kv', tone: 'indigo',
    icon: <Icon><rect x="9" y="2" width="6" height="6" rx="1" /><rect x="2" y="16" width="6" height="6" rx="1" /><rect x="16" y="16" width="6" height="6" rx="1" /><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3M12 12V8" /></Icon>,
  },
  {
    repo: 'Argus', tone: 'plum',
    icon: <Icon><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></Icon>,
  },
  {
    repo: 'meridian', tone: 'lavender',
    icon: <Icon><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" /></Icon>,
  },
  {
    repo: 'tideline', tone: 'indigo',
    icon: <Icon><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" /></Icon>,
  },
  {
    repo: 'contractpilot', tone: 'plum',
    icon: <Icon><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h5" /></Icon>,
  },
  {
    repo: 'lodestar', tone: 'lavender',
    icon: <Icon><circle cx="12" cy="12" r="10" /><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36z" /></Icon>,
  },
  {
    repo: 'trustpaws', tone: 'indigo',
    icon: <Icon><circle cx="11" cy="4" r="2" /><circle cx="18" cy="8" r="2" /><circle cx="20" cy="16" r="2" /><path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.05Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z" /></Icon>,
  },
];

export const FEATURED_REPOS = HIGHLIGHTS.map(h => h.repo);
/** Id of a project's row in the projects list, which a card links to. */
export const projectAnchor = (repo: string) => `project-${repo}`;

const COPIES = 3;           // middle copy is "home"; the outer two let it loop
const OVERLAP = 28;         // px each card tucks under the next
const AUTO_MS = 2800;
const QUIET_MS = 6000;      // pause after the visitor drives it
const DRAG_THRESHOLD = 6;

export default function Highlights({ projects }: { projects: Project[] }) {
  // Skip a featured repo that's been removed from the data, so the loop maths
  // only ever counts cards that exist.
  const byRepo = new Map(projects.map(p => [p.name, p]));
  const items = HIGHLIGHTS.flatMap(h => {
    const p = byRepo.get(h.repo);
    return p ? [{ ...h, p }] : [];
  });
  const N = items.length;

  const deckRef = useRef<HTMLDivElement>(null);
  const [cardW, setCardW] = useState(300);
  const [index, setIndex] = useState(N);
  const [animate, setAnimate] = useState(true);
  const [dragDx, setDragDx] = useState(0);
  const live = useRef({ hover: false, inView: false, quietUntil: 0, dragX: null as number | null, moved: false });

  const step = cardW - OVERLAP;

  // Card width follows the deck: ~1.2 cards visible on a phone, up to 300px wide.
  useEffect(() => {
    const el = deckRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setCardW(Math.round(Math.min(300, Math.max(220, e.contentRect.width * 0.78)))));
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => { live.current.inView = e.isIntersecting; }, { threshold: 0.3 });
    io.observe(el);
    return () => { ro.disconnect(); io.disconnect(); };
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      const s = live.current;
      if (s.hover || s.dragX !== null || !s.inView || document.hidden || performance.now() < s.quietUntil) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      setAnimate(true);
      setIndex(i => i + 1);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, []);

  const quiet = () => { live.current.quietUntil = performance.now() + QUIET_MS; };
  const go = (delta: number) => { quiet(); setAnimate(true); setIndex(i => i + delta); };

  // Once a move lands in an outer copy, jump to the same card in the middle
  // copy with transitions off. It's pixel-identical, so the loop looks endless.
  const onTransitionEnd = (e: React.TransitionEvent) => {
    if (e.target !== e.currentTarget) return;
    if (index >= N && index < 2 * N) return;
    setAnimate(false);
    setIndex(i => ((i % N) + N) % N + N);
    requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    live.current.dragX = e.clientX;
    live.current.moved = false;
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const s = live.current;
    if (s.dragX === null) return;
    const dx = e.clientX - s.dragX;
    if (!s.moved && Math.abs(dx) < DRAG_THRESHOLD) return;
    if (!s.moved) { s.moved = true; deckRef.current?.setPointerCapture(e.pointerId); }
    setAnimate(false);
    setDragDx(dx);
  };
  const onPointerUp = () => {
    const s = live.current;
    if (s.dragX === null) return;
    s.dragX = null;
    if (!s.moved) return;
    const shift = Math.round(-dragDx / step) || (Math.abs(dragDx) > step * 0.2 ? -Math.sign(dragDx) : 0);
    setDragDx(0);
    go(shift);
  };

  const cards = Array.from({ length: N * COPIES }, (_, i) => ({ ...items[i % N], clone: i < N || i >= 2 * N, i }));

  return (
    <section id="highlights-section" className="hl-section">
      <div data-animate="up" className="hl-heading">
        <h2 className="hl-title">
          Highlights
          <svg className="hl-spark" width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d="M12 0c.7 6.3 5.7 11.3 12 12-6.3.7-11.3 5.7-12 12-.7-6.3-5.7-11.3-12-12C6.3 11.3 11.3 6.3 12 0z" />
          </svg>
        </h2>
        <p className="hl-sub">A few things I&apos;ve built along the way</p>
      </div>

      <div
        className="hl-stage"
        onPointerEnter={e => { if (e.pointerType === 'mouse') live.current.hover = true; }}
        onPointerLeave={e => { if (e.pointerType === 'mouse') live.current.hover = false; }}
      >
        <button className="hl-arrow" onClick={() => go(-1)} aria-label="Previous highlight">‹</button>

        <div
          ref={deckRef}
          className="hl-deck"
          role="region"
          aria-label="Highlights. Drag or swipe sideways for more."
          style={{ height: Math.round(cardW * 0.92) + 44 }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onClickCapture={e => { if (live.current.moved) { e.preventDefault(); e.stopPropagation(); live.current.moved = false; } }}
        >
          <div
            className="hl-track"
            onTransitionEnd={onTransitionEnd}
            style={{
              transform: `translateX(${-index * step + dragDx}px)`,
              transition: animate ? 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
            }}
          >
            {cards.map(({ tone, icon, p, clone, i }) => (
              <a
                key={i}
                href={`#${projectAnchor(p.name)}`}
                className="hl-card"
                draggable={false}
                tabIndex={clone ? -1 : undefined}
                aria-hidden={clone || undefined}
                aria-label={`${p.title}: ${p.tagline} Show project details.`}
                onFocus={() => { quiet(); setAnimate(true); setIndex(i); }}
                // Re-clicking the card already in the URL fires no hashchange.
                onClick={() => { if (location.hash === `#${projectAnchor(p.name)}`) window.dispatchEvent(new HashChangeEvent('hashchange')); }}
                style={{ width: cardW, left: i * step }}
              >
                <span className={`hl-card-in hl-tone-${tone}`}>
                  <span className="hl-card-name">{p.title}</span>
                  <span className="hl-card-line">{p.tagline}</span>
                  <span className="hl-card-icon">{icon}</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <button className="hl-arrow" onClick={() => go(1)} aria-label="Next highlight">›</button>
      </div>
    </section>
  );
}
