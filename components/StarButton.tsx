'use client';

import { useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type Star = { id: number; left: number; top: number; duration: number; delay: number; size: number; tone: number };

const PER_CLICK = 7;
const LIFETIME_MS = 6000;   // longer than the slowest fall plus its delay
const TONES = 4;            // .falling-star--0…3 in globals.css, one set per theme

/** Four-pointed sparkle, the same mark as the Highlights heading. */
const Sparkle = ({ size }: { size: number | string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M12 0c.7 6.3 5.7 11.3 12 12-6.3.7-11.3 5.7-12 12-.7-6.3-5.7-11.3-12-12C6.3 11.3 11.3 6.3 12 0z" />
  </svg>
);

/** Navbar button that drops a handful of purple stars down the page. */
export default function StarButton() {
  const [stars, setStars] = useState<Star[]>([]);
  const nextId = useRef(0);

  const drop = useCallback(() => {
    const batch = Array.from({ length: PER_CLICK }, (): Star => ({
      id: nextId.current++,
      left: 5 + Math.random() * 90,
      top: 10 + Math.random() * 70,   // only used when motion is reduced
      duration: 2.6 + Math.random() * 1.8,
      delay: Math.random() * 0.22,
      size: 10 + Math.random() * 14,
      tone: Math.floor(Math.random() * TONES),
    }));
    setStars(s => [...s, ...batch]);
    const ids = new Set(batch.map(b => b.id));
    window.setTimeout(() => setStars(s => s.filter(st => !ids.has(st.id))), LIFETIME_MS);
  }, []);

  return (
    <>
      <button className="star-button" onClick={drop} aria-label="Drop some stars" title="Drop some stars">
        <Sparkle size={18} />
      </button>
      {/* Portalled to <body>: the navbar's backdrop-filter would otherwise
          make it the containing block, trapping the fixed stars inside it. */}
      {stars.length > 0 && createPortal(
        stars.map(s => (
          <span
            key={s.id}
            className={`falling-star falling-star--${s.tone}`}
            aria-hidden="true"
            style={{
              left: `${s.left}vw`,
              animationDuration: `${s.duration}s`,
              animationDelay: `${s.delay}s`,
              ['--star-top' as string]: `${s.top}vh`,
            }}
          >
            <Sparkle size={s.size} />
          </span>
        )),
        document.body,
      )}
    </>
  );
}
