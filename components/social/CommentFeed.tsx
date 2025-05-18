"use client";

import { useState } from "react";
import { Heart, Reply, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface Comment {
  id: string;
  userId: string;
  content: string;
  likes: number;
  replies: Comment[];
  user: {
    name: string;
    avatar: string;
  };
}

export function CommentFeed() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      userId: "1",
      content: "This is amazing! Love the insights 🚀",
      likes: 5,
      replies: [],
      user: {
        name: "Sarah Smith",
        avatar: "/images/user/sara.jpeg"
      }
    },
    {
      id: "2",
      userId: "2",
      content: "Great analysis of the trends!",
      likes: 3,
      replies: [],
      user: {
        name: "Mike Johnson",
        avatar: "/images/user/mike.jpg"
      }
    }
  ]);

  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const handleLike = (commentId: string) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    ));
  };

  const handleReply = (commentId: string) => {
    setReplyingTo(replyingTo === commentId ? null : commentId);
  };

  const handleSubmitReply = (commentId: string, content: string) => {
    if (!content.trim()) return;

    const newReply: Comment = {
      id: Date.now().toString(),
      userId: "current-user",
      content,
      likes: 0,
      replies: [],
      user: {
        name: "Current User",
        avatar: "/images/user/sara.jpeg"
      }
    };

    setComments(comments.map(comment =>
      comment.id === commentId
        ? { ...comment, replies: [...comment.replies, newReply] }
        : comment
    ));

    setReplyingTo(null);
    setNewComment("");
  };

  return (
    <div className="space-y-4 p-4">
      {comments.map(comment => (
        <Card key={comment.id} className="p-4">
          <div className="flex items-start gap-4">
            <Avatar>
              <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
              <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{comment.user.name}</h3>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleLike(comment.id)}
                  >
                    <Heart className="h-4 w-4 mr-1" />
                    {comment.likes}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleReply(comment.id)}
                  >
                    <Reply className="h-4 w-4 mr-1" />
                    Reply
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{comment.content}</p>
              
              {replyingTo === comment.id && (
                <div className="mt-2 flex gap-2">
                  <Input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a reply..."
                    className="flex-1"
                  />
                  <Button
                    size="sm"
                    onClick={() => handleSubmitReply(comment.id, newComment)}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {comment.replies.length > 0 && (
                <div className="mt-4 space-y-4 pl-8 border-l-2">
                  {comment.replies.map(reply => (
                    <div key={reply.id} className="flex items-start gap-4">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={reply.user.avatar} alt={reply.user.name} />
                        <AvatarFallback>{reply.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-sm">{reply.user.name}</h4>
                        <p className="text-sm text-muted-foreground">{reply.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}