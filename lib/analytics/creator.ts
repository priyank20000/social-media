import { Post, User, Comment } from '../types';
import { extractHashtags } from './hashtags';
import { format, parseISO } from 'date-fns';

export interface CreatorStats {
  totalPosts: number;
  totalLikes: number;
  totalComments: number;
  totalShares: number;
  avgEngagementRate: number;
  postsByType: {
    reel: number;
    carousel: number;
    image: number;
  };
  // topHashtags: Array<{
  //   tag: string;
  //   count: number;
  //   engagement: number;
  // }>;
  postingTimes: Array<{
    hour: number;
    count: number;
    engagement: number;
  }>;
  engagementTrend: Array<{
    date: string;
    engagement: number;
  }>;
}

export function analyzeCreatorStats(posts: Post[]): CreatorStats {
  const totalPosts = posts.length;
  const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);
  const totalComments = posts.reduce((sum, post) => sum + post.comments, 0);
  const totalShares = posts.reduce((sum, post) => sum + post.shares, 0);
  
  // Calculate posts by type
  const postsByType = {
    reel: posts.filter(p => p.type === 'reel').length,
    carousel: posts.filter(p => p.type === 'carousel').length,
    image: posts.filter(p => p.type === 'image').length,
  };

  // Analyze hashtags
  // const hashtagStats = new Map();
  // posts.forEach(post => {
  //   const hashtags = extractHashtags(post.caption);
  //   const engagement = post.likes + post.comments + post.shares;
  //   hashtags.forEach(tag => {
  //     const existing = hashtagStats.get(tag) || { tag, count: 0, engagement: 0 };
  //     hashtagStats.set(tag, {
  //       tag,
  //       count: existing.count + 1,
  //       engagement: existing.engagement + engagement,
  //     });
  //   });
  // });

  // Analyze posting times
  const timeStats = new Map();
  posts.forEach(post => {
    const hour = parseISO(post.createdAt).getHours();
    const engagement = post.likes + post.comments + post.shares;
    const existing = timeStats.get(hour) || { count: 0, engagement: 0 };
    timeStats.set(hour, {
      count: existing.count + 1,
      engagement: existing.engagement + engagement,
    });
  });

  // Calculate engagement trend
  const engagementTrend = posts
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    .map(post => ({
      date: format(parseISO(post.createdAt), 'MMM d'),
      engagement: post.likes + post.comments + post.shares,
    }));

  return {
    totalPosts,
    totalLikes,
    totalComments,
    totalShares,
    avgEngagementRate: (totalLikes + totalComments + totalShares) / totalPosts,
    postsByType,
    // topHashtags: Array.from(hashtagStats.values())
      // .sort((a, b) => b.engagement - a.engagement)
      // .slice(0, 10),
    postingTimes: Array.from(timeStats.entries())
      .map(([hour, stats]) => ({ hour, ...stats }))
      .sort((a, b) => a.hour - b.hour),
    engagementTrend,
  };
}