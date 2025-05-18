import { Post } from '../types';

export interface HashtagStats {
  tag: string;
  count: number;
  engagement: number;
}

export function extractHashtags(text: string): string[] {
  const hashtagRegex = /#[\w]+/g;
  return text.match(hashtagRegex) || [];
}

export function analyzeHashtags(posts: Post[]): HashtagStats[] {
  const hashtagStats = new Map<string, HashtagStats>();

  posts.forEach(post => {
    const hashtags = extractHashtags(post.caption || '');
    const postEngagement = post.likes + post.comments + post.shares;

    hashtags.forEach(tag => {
      const existing = hashtagStats.get(tag) || { tag, count: 0, engagement: 0 };
      hashtagStats.set(tag, {
        tag,
        count: existing.count + 1,
        engagement: existing.engagement + postEngagement,
      });
    });
  });

  return Array.from(hashtagStats.values())
    .sort((a, b) => b.engagement - a.engagement);
}