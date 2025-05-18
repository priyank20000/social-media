"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Reply, Send } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Comment {
  id: string;
  userId: string;
  content: string;
  likes: number;
  createdAt: string;
  user: {
    name: string;
    avatar: string;
  };
  replies?: Comment[];
}

interface CommentSectionProps {
  postId: string;
  initialComments?: Comment[];
}

export function CommentSection({ postId, initialComments = [] }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      userId: "current-user",
      content: newComment,
      likes: 0,
      createdAt: new Date().toISOString(),
      user: {
        name: "You",
        avatar: "/images/user/sara.jpeg"
      }
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  const handleLike = (commentId: string) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    ));
  };

  const handleReply = (commentId: string) => {
    if (!replyContent.trim()) return;

    const reply: Comment = {
      id: Date.now().toString(),
      userId: "current-user",
      content: replyContent,
      likes: 0,
      createdAt: new Date().toISOString(),
      user: {
        name: "You",
        avatar: "/images/user/sara.jpeg"
      }
    };

    setComments(comments.map(comment =>
      comment.id === commentId
        ? { ...comment, replies: [...(comment.replies || []), reply] }
        : comment
    ));

    setReplyingTo(null);
    setReplyContent("");
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1"
        />
        <Button onClick={handleAddComment}>
          <Send className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {comments.map(comment => (
          <div key={comment.id} className="space-y-2">
            <div className="flex items-start gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={comment.user.avatar} />
                <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{comment.user.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-sm mt-1">{comment.content}</p>
                <div className="flex items-center gap-4 mt-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleLike(comment.id)}
                    className="h-8 px-2"
                  >
                    <Heart className="h-4 w-4 mr-1" />
                    {comment.likes}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setReplyingTo(comment.id)}
                    className="h-8 px-2"
                  >
                    <Reply className="h-4 w-4 mr-1" />
                    Reply
                  </Button>
                </div>
              </div>
            </div>

            {replyingTo === comment.id && (
              <div className="ml-10 flex gap-2 mt-2">
                <Input
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write a reply..."
                  className="flex-1"
                />
                <Button onClick={() => handleReply(comment.id)}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            )}

            {comment.replies && comment.replies.length > 0 && (
              <div className="ml-10 space-y-2 mt-2">
                {comment.replies.map(reply => (
                  <div key={reply.id} className="flex items-start gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={reply.user.avatar} />
                      <AvatarFallback>{reply.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">{reply.user.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm">{reply.content}</p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleLike(reply.id)}
                        className="h-6 px-2 mt-1"
                      >
                        <Heart className="h-3 w-3 mr-1" />
                        {reply.likes}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}