import { NextResponse } from 'next/server';
import { mockImagePosts } from '@/lib/mock-data';
import { calculateMetrics } from '@/lib/analytics/metrics';
import type { EngagementMetrics } from '@/lib/types';

export async function GET() {
  try {
    const metrics: Record<string, EngagementMetrics> = {
      reel: calculateMetrics(mockImagePosts.filter(p => p.type === 'reel')),
      carousel: calculateMetrics(mockImagePosts.filter(p => p.type === 'carousel')),
      image: calculateMetrics(mockImagePosts.filter(p => p.type === 'image')),
    };

    return NextResponse.json(metrics);
  } catch (error) {
    console.error('Failed to fetch analytics:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}