import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { GITHUB_USERNAME } from '../../../../lib/github';

const PORTFOLIO_REPO = process.env.PORTFOLIO_REPO ?? 'smriti-portfolio';

async function commitToGitHub(content: string): Promise<{ ok: boolean; error?: string }> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return { ok: false, error: 'GITHUB_TOKEN not set' };

  const apiUrl = `https://api.github.com/repos/${GITHUB_USERNAME}/${PORTFOLIO_REPO}/contents/data/portfolio-config.json`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  };

  // Get current file SHA (required for updates)
  let sha: string | undefined;
  const getRes = await fetch(apiUrl, { headers });
  if (getRes.ok) {
    const data = await getRes.json();
    sha = data.sha;
  }

  const body: Record<string, unknown> = {
    message: 'Update portfolio project selections',
    content: Buffer.from(content).toString('base64'),
    committer: { name: 'Portfolio Admin', email: 'admin@portfolio' },
  };
  if (sha) body.sha = sha;

  const putRes = await fetch(apiUrl, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  });

  if (!putRes.ok) {
    const err = await putRes.text();
    return { ok: false, error: err };
  }
  return { ok: true };
}

export async function POST(req: NextRequest) {
  const { password, config } = await req.json();

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const content = JSON.stringify(config, null, 2);

  if (process.env.NODE_ENV === 'development') {
    // In dev: write to the local file directly
    writeFileSync(join(process.cwd(), 'data', 'portfolio-config.json'), content, 'utf-8');
    return NextResponse.json({ ok: true, message: 'Saved locally' });
  }

  // In production: commit to GitHub → triggers Vercel redeploy
  const result = await commitToGitHub(content);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 500 });
  }
  return NextResponse.json({ ok: true, message: 'Committed to GitHub — Vercel is redeploying (~1 min)' });
}
