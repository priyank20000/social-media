"use client";

import { Post, User, Comment } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format, parseISO } from "date-fns";

interface PostInteractionsProps {
  posts: Post[];
  comments: Comment[];
  users: User[];
}

export function PostInteractions({ posts, comments, users }: PostInteractionsProps) {
  const postComments = comments.filter(comment => 
    posts.some(post => post.id === comment.postId)
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Recent Comments</h3>
        <div className="space-y-4">
          {postComments.map((comment) => {
            const user = users.find(u => u.id === comment.userId);
            const post = posts.find(p => p.id === comment.postId);
            
            if (!user || !comment) return null;

            return (
              <Card key={comment.id} className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={user.avatarUrl} alt={user.username} />
                    <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{user.username}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(parseISO(comment.createdAt), "MMM d, yyyy")}
                      </p>
                    </div>
                    <p className="text-sm mt-1">{comment.content}</p>
                    <div className="mt-2 p-2 bg-muted/50 rounded-md">
                      <p className="text-sm text-muted-foreground">On post: {comment.content}</p>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}