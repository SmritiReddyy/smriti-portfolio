import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

// Already prerendered on Vercel; stated explicitly so `output: export` (the
// GitHub Pages mirror build) can emit it as a file too.
export const dynamic = 'force-static';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 13,
          fontWeight: 700,
          color: '#ffffff',
          letterSpacing: '-0.5px',
          fontFamily: 'sans-serif',
        }}
      >
        SR
      </div>
    ),
    { ...size }
  );
}