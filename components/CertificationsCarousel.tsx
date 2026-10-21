'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type Certification = {
  title: string;
  issuer: string;
  /** Omitted when the issue date isn't known. */
  date?: string;
  badgeUrl: string;
  icon: string;
  iconAlt: string;
};

const AWS_ICON =
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg';
const GCP_ICON =
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-plain-wordmark.svg';

const CERTIFICATIONS: Certification[] = [
  {
    title: 'AWS Academy Graduate — Cloud Architecting',
    issuer: 'Amazon Web Services',
    date: 'April 2026',
    badgeUrl:
      'https://www.credly.com/org/amazon-web-services/badge/aws-academy-graduate-aws-academy-cloud-architecting',
    icon: AWS_ICON,
    iconAlt: 'AWS',
  },
  {
    title: 'AWS Academy Graduate — Cloud Foundations',
    issuer: 'Amazon Web Services',
    date: 'February 2026',
    badgeUrl:
      'https://www.credly.com/org/amazon-web-services/badge/aws-academy-graduate-aws-academy-cloud-foundations',
    icon: AWS_ICON,
    iconAlt: 'AWS',
  },
  {
    title: 'The Basics of Google Cloud Compute — Skill Badge',
    issuer: 'Google Cloud',
    date: 'July 2026',
    badgeUrl:
      'https://www.credly.com/org/google-cloud/badge/the-basics-of-google-cloud-compute-skill-badge',
    icon: GCP_ICON,
    iconAlt: 'Google Cloud',
  },
];

const GAP = 24;

/**
 * Scrolling is native (overflow-x + scroll-snap) rather than a CSS transform,
 * so trackpad two-finger swipes, touch swipes and momentum all come from the
 * browser. The arrows and dots just drive scrollLeft; the active dot is read
 * back from the scroll position so dragging and clicking stay in agreement.
 */
export default function CertificationsCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [atEnd, setAtEnd] = useState(false);

  const step = () => {
    const slot = viewportRef.current?.firstElementChild?.firstElementChild as HTMLElement | null;
    return slot ? slot.offsetWidth + GAP : 1;
  };

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
  }, [sync]);

  const scrollToIndex = (next: number) => {
    const el = viewportRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(maxIndex, next));
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollTo({ left: clamped * step(), behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Certifications"
      onKeyDown={e => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); scrollToIndex(index - 1); }
        if (e.key === 'ArrowRight') { e.preventDefault(); scrollToIndex(index + 1); }
      }}
    >
      <div style={s.carouselWrap}>
        <button
          onClick={() => scrollToIndex(index - 1)}
          disabled={index === 0}
          style={{ ...s.arrow, ...s.arrowLeft, opacity: index === 0 ? 0.2 : 1 }}
          aria-label="Previous certification"
        >
          ‹
        </button>

        <div
          ref={viewportRef}
          className="cert-viewport"
          style={{ ...s.viewport, ...(atEnd ? {} : s.viewportFade) }}
          tabIndex={0}
        >
          <div style={s.track}>
            {CERTIFICATIONS.map(cert => (
              <div key={cert.title} className="cert-slot" style={s.cardSlot}>
                <div style={s.certCard} className="cert-card-hover">
                  <img src={cert.icon} alt={cert.iconAlt} style={s.certIcon} />
                  <div style={s.certContent}>
                    <h3 style={s.certTitle}>{cert.title}</h3>
                    <p style={s.certIssuer}>{cert.issuer}</p>
                    {cert.date && <p style={s.certDate}>{cert.date}</p>}
                    <a
                      href={cert.badgeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={s.certBadgeLink}
                      onMouseEnter={e => (e.currentTarget.style.color = '#818cf8')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#6366f1')}
                    >
                      View Badge →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => scrollToIndex(index + 1)}
          disabled={atEnd}
          style={{ ...s.arrow, ...s.arrowRight, opacity: atEnd ? 0.2 : 1 }}
          aria-label="Next certification"
        >
          ›
        </button>
      </div>

      {maxIndex > 0 && (
        <div style={s.dots}>
          {Array.from({ length: maxIndex + 1 }, (_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              style={{ ...s.dot, ...(i === index ? s.dotActive : {}) }}
              aria-label={`Go to certification ${i + 1}`}
              aria-current={i === index}
            />
          ))}
        </div>
      )}

      <style>{`
        .cert-viewport {
          scroll-snap-type: x mandatory;
          /* Keep the vertical page scroll from being hijacked by the gesture. */
          overscroll-behavior-x: contain;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .cert-viewport::-webkit-scrollbar { display: none; }
        .cert-viewport:focus-visible {
          outline: 2px solid rgba(99, 102, 241, 0.7);
          outline-offset: 4px;
          border-radius: 16px;
        }
        .cert-slot { scroll-snap-align: start; }
      `}</style>
    </div>
  );
}

const s = {
  carouselWrap: {
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
  },
  viewport: {
    flex: 1,
    overflowX: 'auto' as const,
    overflowY: 'hidden' as const,
  },
  // Only hint at more cards when there are actually more to the right.
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
    width: 'clamp(300px, 42vw, 460px)',
  },
  certCard: {
    display: 'flex',
    gap: '20px',
    alignItems: 'flex-start',
    padding: '28px',
    borderRadius: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    transition: 'all 0.3s ease',
    height: '100%',
    boxSizing: 'border-box' as const,
  },
  certIcon: {
    width: '52px',
    height: '52px',
    flexShrink: 0,
    filter: 'brightness(0) invert(1)',
  },
  certContent: { flex: 1 },
  certTitle: {
    fontSize: '1.05rem',
    fontWeight: 600,
    color: '#ffffff',
    marginBottom: '6px',
    lineHeight: 1.4,
  },
  certIssuer: {
    fontSize: '0.9rem',
    color: '#6366f1',
    fontWeight: 600,
    margin: '0 0 4px',
  },
  certDate: {
    fontSize: '0.85rem',
    color: '#6b7280',
    margin: '0 0 12px',
  },
  certBadgeLink: {
    color: '#6366f1',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '0.9rem',
    transition: 'color 0.2s ease',
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
  arrowRight: { marginLeft: '12px' },
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
