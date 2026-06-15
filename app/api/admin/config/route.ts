import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  const raw = readFileSync(join(process.cwd(), 'data', 'portfolio-config.json'), 'utf-8');
  return NextResponse.json(JSON.parse(raw));
}
