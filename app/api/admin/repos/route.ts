import { NextResponse } from 'next/server';
import { getAllRepos } from '../../../../lib/github';

export async function GET() {
  const repos = await getAllRepos();
  return NextResponse.json(repos);
}
