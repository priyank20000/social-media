"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share2, Flame } from "lucide-react";

interface Post {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isTrending: boolean;
}

export function PostFeed() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      content: "Just launched our new analytics dashboard! 🚀",
      author: {
        name: "Sarah Smith",
        avatar: "/images/user/sara.jpeg"
      },
      image: "/images/image95.jpg",
      likes: 124,
      comments: 18,
      shares: 5,
      isLiked: false,
      isTrending: true
    },
    {
      id: "2",
      content: "Check out these engagement metrics from last month! 📈",
      author: {
        name: "Mike Johnson",
        avatar: "/images/user/mike.jpg"
      },
      image: "/images/image96.jpg",
      likes: 89,
      comments: 12,
      shares: 3,
      isLiked: false,
      isTrending: false
    }
  ]);

  const [loading, setLoading] = useState(false);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const loadMorePosts = () => {
    setLoading(true);
    // Simulate loading more posts
    setTimeout(() => {
      const newPosts: Post[] = [
        {
          id: Date.now().toString(),
          content: "Another interesting post about analytics! 🤓",
          author: {
            name: "Sarah Smith",
            avatar: "/images/user/sara.jpeg"
          },
          image: "/images/image94.jpg",
          likes: Math.floor(Math.random() * 100),
          comments: Math.floor(Math.random() * 20),
          shares: Math.floor(Math.random() * 10),
          isLiked: false,
          isTrending: Math.random() > 0.8
        }
      ];
      setPosts([...posts, ...newPosts]);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        loadMorePosts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [posts]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {posts.map(post => (
            <Card key={post.id} className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Avatar>
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{post.author.name}</span>
                    {post.isTrending && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Flame className="h-3 w-3" />
                        Trending
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <p className="mb-4">{post.content}</p>

              {post.image && (
                <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
                  <img
                    src={post.image}
                    alt="Post image"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(post.id)}
                  className={`group ${post.isLiked ? "text-red-500" : ""}`}
                >
                  <Heart className={`h-4 w-4 mr-1 ${
                    post.isLiked ? "fill-current" : ""
                  } transition-transform group-hover:scale-125`} />
                  {post.likes}
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  {post.comments}
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4 mr-1" />
                  {post.shares}
                </Button>
              </div>
            </Card>
          ))}

          {loading && (
            <div className="text-center py-4">
              <span className="text-muted-foreground">Loading more posts...</span>
            </div>
          )}
        </div>

        <Card className="p-6 h-fit">
          <h3 className="text-lg font-semibold mb-4">Trending Posts</h3>
          <div className="space-y-4">
            {posts.filter(post => post.isTrending).map(post => (
              <div key={post.id} className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{post.author.name}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{post.content}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}