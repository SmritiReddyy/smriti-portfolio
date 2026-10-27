'use client';

export const THEME_KEY = 'theme';

/** Flips data-theme on <html>. The saved choice is applied before paint by the
 *  inline script in app/layout.tsx, and CSS picks which icon shows, so the
 *  button needs no state of its own and can't render the wrong icon. */
export default function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = next;
    try { localStorage.setItem(THEME_KEY, next); } catch {}
  };

  return (
    <button className="theme-toggle" onClick={toggle} aria-label="Toggle light and dark mode" title="Toggle light and dark mode">
      {/* Sun: shown in dark mode, offering light */}
      <svg className="theme-toggle-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
      <svg className="theme-toggle-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
}
