'use client';

import { useEffect, useRef, useState } from 'react';

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
    badgeUrl:
      'https://www.credly.com/org/google-cloud/badge/the-basics-of-google-cloud-compute-skill-badge',
    icon: GCP_ICON,
    iconAlt: 'Google Cloud',
  },
];

const GAP = 24;

/** Card width in px, matching the clamp() used for the slot below. */
function cardWidth(viewportWidth: number): number {
  return Math.min(460, Math.max(300, viewportWidth * 0.42));
}

export default function CertificationsCarousel() {
  const [index, setIndex] = useState(0);
  const [metrics, setMetrics] = useState({ cardW: 0, viewportW: 0 });
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const measure = () => {
      const el = viewportRef.current;
      if (!el) return;
      setMetrics({ cardW: cardWidth(window.innerWidth), viewportW: el.clientWidth });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const total = CERTIFICATIONS.length;
  const step = metrics.cardW + GAP;
  const trackW = total * metrics.cardW + (total - 1) * GAP;
  // Furthest the track may travel before its right edge clears the viewport.
  const maxOffset = Math.max(0, trackW - metrics.viewportW);
  const maxIndex = step > 0 ? Math.ceil(maxOffset / step) : 0;
  // Clamping in pixels (not index steps) keeps the last slide flush right
  // instead of overscrolling into blank space when cards fit fractionally.
  const offset = Math.min(index * step, maxOffset);

  // A narrower window can leave the index past the new last slide.
  useEffect(() => {
    setIndex(i => Math.min(i, maxIndex));
  }, [maxIndex]);

  const go = (next: number) => setIndex(Math.max(0, Math.min(maxIndex, next)));

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Certifications"
      onKeyDown={e => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1); }
        if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1); }
      }}
    >
      <div style={s.carouselWrap}>
        <button
          onClick={() => go(index - 1)}
          disabled={index === 0}
          style={{ ...s.arrow, ...s.arrowLeft, opacity: index === 0 ? 0.2 : 1 }}
          aria-label="Previous certification"
        >
          ‹
        </button>

        <div ref={viewportRef} style={{ ...s.viewport, ...(offset < maxOffset ? s.viewportFade : {}) }}>
          <div
            className="cert-track"
            style={{ ...s.track, transform: `translateX(-${offset}px)` }}
          >
            {CERTIFICATIONS.map((cert, i) => (
              <div
                key={cert.title}
                style={s.cardSlot}
                aria-hidden={
                  metrics.cardW > 0 &&
                  (i * step + metrics.cardW <= offset || i * step >= offset + metrics.viewportW)
                }
              >
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
          onClick={() => go(index + 1)}
          disabled={index >= maxIndex}
          style={{ ...s.arrow, ...s.arrowRight, opacity: index >= maxIndex ? 0.2 : 1 }}
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
              onClick={() => go(i)}
              style={{ ...s.dot, ...(i === index ? s.dotActive : {}) }}
              aria-label={`Go to certification ${i + 1}`}
              aria-current={i === index}
            />
          ))}
        </div>
      )}

      <style>{`
        :root { --cert-card-w: clamp(300px, 42vw, 460px); }
        @media (prefers-reduced-motion: reduce) {
          .cert-track { transition: none !important; }
        }
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
    overflow: 'hidden',
  },
  // Only hint at more cards when there are actually more to the right.
  viewportFade: {
    maskImage: 'linear-gradient(to right, black 0%, black 88%, transparent 100%)',
    WebkitMaskImage: 'linear-gradient(to right, black 0%, black 88%, transparent 100%)',
  },
  track: {
    display: 'flex',
    gap: `${GAP}px`,
    transition: 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  cardSlot: {
    flexShrink: 0,
    width: 'var(--cert-card-w)',
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
