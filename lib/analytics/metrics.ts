import type { Post, EngagementMetrics } from '../types';

export function calculateMetrics(posts: Post[]): EngagementMetrics {
  if (posts.length === 0) {
    return {
      avgLikes: 0,
      avgComments: 0,
      avgShares: 0,
      avgViews: 0,
      totalPosts: 0,
      engagementRate: 0,
    };
  }

  const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);
  const totalComments = posts.reduce((sum, post) => sum + post.comments, 0);
  const totalShares = posts.reduce((sum, post) => sum + post.shares, 0);
  const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0);

  const avgLikes = totalLikes / posts.length;
  const avgComments = totalComments / posts.length;
  const avgShares = totalShares / posts.length;
  const avgViews = totalViews / posts.length;

  const engagementRate = (totalLikes + totalComments + totalShares) / posts.length;

  return {
    avgLikes,
    avgComments,
    avgShares,
    avgViews,
    totalPosts: posts.length,
    engagementRate,
  };
}