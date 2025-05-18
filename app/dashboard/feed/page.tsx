"use client";

import { useState, useEffect, useRef } from "react";
import { mockImagePosts, mockReelsPosts, mockGifsPosts, mockPollsPosts, mockUsers } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share2, Plus } from "lucide-react";
import { CommentSection } from "@/components/comments/CommentSection";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Combine and sort all posts by date
const allPosts = [
  ...mockImagePosts.map(post => ({ ...post, contentType: 'image' })),
  ...mockReelsPosts.map(post => ({ ...post, contentType: 'reel' })),
  ...mockGifsPosts.map(post => ({ ...post, contentType: 'gif' })),
  ...mockPollsPosts.map(post => ({ ...post, contentType: 'poll' }))
].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

// Default user fallback
const defaultUser = {
  id: 'default',
  username: 'Unknown User',
  avatarUrl: '/images/user/mike.jpg'
};

export default function FeedPage() {
  // State management
  const [posts, setPosts] = useState(
    allPosts.map(post => ({
      ...post,
      isLiked: false,
      user: mockUsers.find(u => u?.id === post.userId) || defaultUser
    }))
  );
  
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showComments, setShowComments] = useState<string | null>(null);
  const isMobile = useIsMobile();

  // Filter posts based on selected type
  const filteredPosts = selectedType 
    ? posts.filter(post => post.contentType === selectedType)
    : posts;

  // Handle post like/unlike
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

  // Render post content based on type
  const renderPostContent = (post: any) => {
    switch (post.contentType) {
      case 'image':
      case 'gif':
        return (
          <div className="relative aspect-square mb-4 rounded-lg overflow-hidden">
            <img
              src={post.mediaUrl}
              alt={post.caption}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              onLoad={(e) => (e.target as HTMLImageElement).classList.add('loaded')}
            />
          </div>
        );
      case 'reel':
        return (
          <div className="relative aspect-square mb-4 rounded-lg overflow-hidden">
            <video
              src={post.mediaUrl}
              loop
              muted
              playsInline
              controls
              className="absolute inset-0 w-full h-full object-cover"
              preload="metadata"
            />
          </div>
        );
      case 'poll':
        return (
          <div className="space-y-2 mb-4">
            <p className="font-medium">{post.question}</p>
            <div className="space-y-2">
              {[post.option1, post.option2, post.option3, post.option4]
                .filter(Boolean)
                .map((option, index) => (
                  <div
                    key={index}
                    className="p-3 bg-secondary rounded-md hover:bg-secondary/80 cursor-pointer transition-colors"
                  >
                    {option}
                  </div>
                ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      {/* Filter buttons */}
      <div className="sticky top-0 z-10 bg-background pb-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            <Button
              variant={selectedType === null ? "default" : "outline"}
              onClick={() => setSelectedType(null)}
              className="whitespace-nowrap"
            >
              All
            </Button>
            <Button
              variant={selectedType === 'image' ? "default" : "outline"}
              onClick={() => setSelectedType('image')}
              className="whitespace-nowrap"
            >
              Images
            </Button>
            <Button
              variant={selectedType === 'reel' ? "default" : "outline"}
              onClick={() => setSelectedType('reel')}
              className="whitespace-nowrap"
            >
              Reels
            </Button>
            <Button
              variant={selectedType === 'gif' ? "default" : "outline"}
              onClick={() => setSelectedType('gif')}
              className="whitespace-nowrap"
            >
              GIFs
            </Button>
            <Button
              variant={selectedType === 'poll' ? "default" : "outline"}
              onClick={() => setSelectedType('poll')}
              className="whitespace-nowrap"
            >
              Polls
            </Button>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Post
              </Button>
            </SheetTrigger>
            <SheetContent>
              {/* <SheetHeader>
                <SheetTitle>Create New Post</SheetTitle>
              </SheetHeader> */}
              {/* Add post creation form here */}
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Posts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPosts.map(post => (
          <Card key={post.id} className="overflow-hidden">
            {/* Post header */}
            <div className="p-4 flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={post.user?.avatarUrl} alt={post.user?.username} />
                <AvatarFallback>{post.user?.username[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{post.user?.username}</p>
                <Badge variant="secondary" className="text-xs">
                  {post.contentType}
                </Badge>
              </div>
            </div>

            {/* Post content */}
            {renderPostContent(post)}

            {/* Post caption */}
            <div className="px-4 pb-2">
              <p className="text-sm line-clamp-2">{post.caption}</p>
            </div>

            {/* Post actions */}
            <div className="p-4 pt-2 flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLike(post.id)}
                className={post.isLiked ? "text-red-500" : ""}
              >
                <Heart className={`h-4 w-4 mr-1 ${post.isLiked ? "fill-current" : ""}`} />
                {post.likes}
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowComments(showComments === post.id ? null : post.id)}
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                {post.comments}
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4 mr-1" />
                {post.shares}
              </Button>
            </div>

            {/* Comments section */}
            {showComments === post.id && (
              <div className="px-4 pb-4">
                <CommentSection postId={post.id} />
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}