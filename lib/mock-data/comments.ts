import type { Comment } from '../types';

export const mockComments: Comment[] = [
  {
    id: '1',
    postId: '1',
    userId: '2',
    content: 'Amazing routine! 🔥',
    createdAt: '2024-03-20T08:15:00Z',
    likes: 45,
  },
  {
    id: '2',
    postId: '1',
    userId: '3',
    content: 'Thanks for sharing! 👏',
    createdAt: '2024-03-20T08:30:00Z',
    likes: 23,
  },
];