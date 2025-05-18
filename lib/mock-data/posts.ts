import type { Post } from '../types';

export const mockPosts: Post[] = [
  // Reels
  {
    id: '1',
    userId: '1',
    type: 'reel',
    caption: 'Morning workout routine 💪 #fitness #motivation',
    mediaUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
    createdAt: '2024-03-20T08:00:00Z',
    likes: 1523,
    comments: 89,
    shares: 45,
    views: 15234,
  },

  // Carousels
  {
    id: '3',
    userId: '3',
    type: 'carousel',
    caption: 'Travel diary: Week in Paris 🗼 #travel #paris',
    mediaUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
    createdAt: '2024-03-18T12:00:00Z',
    likes: 3456,
    comments: 234,
    shares: 123,
  },
  {
    id: '4',
    userId: '1',
    type: 'carousel',
    caption: 'Spring outfit ideas 👗 #fashion #style',
    mediaUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050',
    createdAt: '2024-03-17T09:15:00Z',
    likes: 2789,
    comments: 167,
    shares: 89,
  },
  // Images
  {
    id: '5',
    userId: '2',
    type: 'image',
    caption: 'Perfect sunset 🌅 #nature #photography',
    mediaUrl: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9',
    createdAt: '2024-03-16T18:45:00Z',
    likes: 1234,
    comments: 45,
    shares: 23,
  },
  {
    id: '6',
    userId: '3',
    type: 'image',
    caption: 'Coffee time ☕ #coffee #lifestyle',
    mediaUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
    createdAt: '2024-03-15T10:30:00Z',
    likes: 987,
    comments: 34,
    shares: 12,
  },
];