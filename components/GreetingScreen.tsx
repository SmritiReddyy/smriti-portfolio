'use client';

import { useEffect, useState } from 'react';
import { Instrument_Serif, Noto_Serif_Devanagari, Noto_Serif_Telugu } from 'next/font/google';

const latin = Instrument_Serif({ weight: '400', subsets: ['latin'] });
const devanagari = Noto_Serif_Devanagari({ weight: '400', subsets: ['devanagari'] });
const telugu = Noto_Serif_Telugu({ weight: '400', subsets: ['telugu'] });

/** The first word animates in letter by letter; the rest swap in whole,
 *  since splitting Indic text by code point breaks its conjuncts. */
const WORDS = [
  { text: 'Hello.', font: latin.className, indic: false },
  { text: 'नमस्ते।', font: devanagari.className, indic: true },
  { text: 'స్వాగతం.', font: telugu.className, indic: true },
];

const FIRST_WORD_MS = 900;
const NEXT_WORD_MS = 500;
const LETTER_STAGGER_MS = 40;
const EXIT_MS = 900;
const PANELS = 4;
export const GREETING_SEEN_KEY = 'greeting-seen';

/** Full-screen intro shown once per browser session. A repeat visit is hidden
 *  before paint by the inline script in app/layout.tsx. */
export default function GreetingScreen() {
  const [index, setIndex] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem(GREETING_SEEN_KEY) === '1'; } catch {}
    // Already hidden by the .greeting-seen class; nothing to animate.
    if (seen) return;

    document.body.style.overflow = 'hidden';
    const timers: number[] = [];
    let cancelled = false;
    // Give the Indic fonts a moment so a word never flashes in a fallback face.
    const fontsReady = Promise.race([
      document.fonts?.ready ?? Promise.resolve(),
      new Promise((r) => window.setTimeout(r, 700)),
    ]);

    fontsReady.then(() => {
      if (cancelled) return;
      WORDS.forEach((_, i) => {
        if (i > 0) timers.push(window.setTimeout(() => setIndex(i), FIRST_WORD_MS + (i - 1) * NEXT_WORD_MS));
      });
      const exitAt = FIRST_WORD_MS + (WORDS.length - 1) * NEXT_WORD_MS;
      timers.push(window.setTimeout(() => {
        setExiting(true);
        document.body.style.overflow = '';
        try { sessionStorage.setItem(GREETING_SEEN_KEY, '1'); } catch {}
      }, exitAt));
      timers.push(window.setTimeout(() => setDone(true), exitAt + EXIT_MS));
    });

    return () => {
      cancelled = true;
      timers.forEach(window.clearTimeout);
      document.body.style.overflow = '';
    };
  }, []);

  if (done) return null;
  const word = WORDS[index];

  return (
    <div aria-hidden="true" className={`greeting-screen${exiting ? ' greeting-screen--exit' : ''}`}>
      {Array.from({ length: PANELS }, (_, i) => (
        <div key={i} className="greeting-panel" />
      ))}
      <div className="greeting-content">
        <span key={index} className={`greeting-word ${word.font}${word.indic ? ' greeting-word--indic' : ''}`}>
          {index === 0
            ? Array.from(word.text).map((ch, i) => (
                <span key={i} className="greeting-letter" style={{ animationDelay: `${i * LETTER_STAGGER_MS}ms` }}>
                  {ch}
                </span>
              ))
            : word.text}
        </span>
      </div>
    </div>
  );
}
