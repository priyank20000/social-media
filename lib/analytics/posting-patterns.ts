import { Post } from '../types';
import { format, parseISO } from 'date-fns';

export interface PostingPattern {
  hour: number;
  count: number;
  avgEngagement: number;
}

export function analyzePostingPatterns(posts: Post[]): PostingPattern[] {
  const hourlyStats = new Map<number, { count: number; totalEngagement: number }>();

  posts.forEach(post => {
    const date = parseISO(post.createdAt);
    const hour = date.getHours();
    const engagement = post.likes + post.comments + post.shares;

    const existing = hourlyStats.get(hour) || { count: 0, totalEngagement: 0 };
    hourlyStats.set(hour, {
      count: existing.count + 1,
      totalEngagement: existing.totalEngagement + engagement,
    });
  });

  return Array.from(hourlyStats.entries())
    .map(([hour, stats]) => ({
      hour,
      count: stats.count,
      avgEngagement: stats.totalEngagement / stats.count,
    }))
    .sort((a, b) => a.hour - b.hour);
}