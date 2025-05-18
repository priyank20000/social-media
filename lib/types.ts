export interface Post {
  id: string;
  userId: string;
  type: 'reel' | 'carousel' | 'image' | 'GIFs' | 'polls';
  caption?: string | 'hash';
  question?: string;
  option1?: string;
  option2?: string;
  option3?: string;
  option4?: string;
  mediaUrl?: string;
  createdAt: string;
  likes: number;
  shares: number;
  comments: number;
  views?: number; // for reels only
}

export interface User {
  id: string;
  name?: string;
  username: string;
  avatarUrl: string;
  followersCount: number;
  followingCount: number;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface EngagementMetrics {
  avgLikes: number;
  avgComments: number;
  avgShares: number;
  avgViews?: number;
  totalPosts: number;
  engagementRate: number;
}