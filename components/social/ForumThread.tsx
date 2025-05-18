"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Filter, MessageCircle, ThumbsUp } from "lucide-react";

interface Thread {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  tags: string[];
  likes: number;
  replies: number;
  isLiked: boolean;
}

export function ForumThread() {
  const [threads, setThreads] = useState<Thread[]>([
    {
      id: "1",
      title: "Best practices for social media analytics",
      content: "What are your top tips for analyzing social media engagement?",
      author: {
        name: "Sarah Smith",
        avatar: "/images/user/sara.jpeg"
      },
      tags: ["analytics", "social-media", "engagement"],
      likes: 24,
      replies: 12,
      isLiked: false
    },
    {
      id: "2",
      title: "Understanding engagement metrics",
      content: "How do you interpret different types of engagement metrics?",
      author: {
        name: "Mike Johnson",
        avatar: "/images/user/mike.jpg"
      },
      tags: ["metrics", "data-analysis"],
      likes: 18,
      replies: 8,
      isLiked: false
    }
  ]);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleLike = (threadId: string) => {
    setThreads(threads.map(thread =>
      thread.id === threadId
        ? {
            ...thread,
            isLiked: !thread.isLiked,
            likes: thread.isLiked ? thread.likes - 1 : thread.likes + 1
          }
        : thread
    ));
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredThreads = selectedTags.length > 0
    ? threads.filter(thread =>
        thread.tags.some(tag => selectedTags.includes(tag))
      )
    : threads;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search threads..."
          className="max-w-sm"
        />
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {Array.from(new Set(threads.flatMap(t => t.tags))).map(tag => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>

      <div className="space-y-4">
        {filteredThreads.map(thread => (
          <Card key={thread.id} className="p-6">
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src={thread.author.avatar} alt={thread.author.name} />
                <AvatarFallback>{thread.author.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">{thread.title}</h3>
                <p className="text-muted-foreground mb-4">{thread.content}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {thread.tags.map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(thread.id)}
                    className={thread.isLiked ? "text-primary" : ""}
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    {thread.likes}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {thread.replies}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}