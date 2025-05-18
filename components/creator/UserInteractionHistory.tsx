"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format, parseISO } from "date-fns";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import type { Post, User, Comment } from "@/lib/types";

interface UserInteractionHistoryProps {
  user: User;
  allPosts: Post[];
  allComments: Comment[];
  allUsers: User[];
}

export function UserInteractionHistory({ user, allPosts, allComments, allUsers }: UserInteractionHistoryProps) {
  // Get all comments made by the user
  const userComments = allComments.filter(comment => comment.userId === user.id);
  
  // Get posts where this user commented
  const commentedPosts = userComments.map(comment => {
    const post = allPosts.find(p => p.id === comment.postId);
    const postAuthor = post ? allUsers.find(u => u.id === post.userId) : null;
    return {
      comment,
      post,
      author: postAuthor,
    };
  }).filter(item => item.post && item.author);

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Interaction History</h2>
      <Tabs defaultValue="comments">
        <TabsList className="mb-4">
          <TabsTrigger value="comments">Comments</TabsTrigger>
          <TabsTrigger value="likes">Likes</TabsTrigger>
          <TabsTrigger value="shares">Shares</TabsTrigger>
        </TabsList>

        <TabsContent value="comments">
          <div className="space-y-4">
            {commentedPosts.map(({ comment, post, author }) => (
              <Card key={comment.id} className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={author?.avatarUrl} alt={author?.username} />
                    <AvatarFallback>{author?.username[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">{author?.username}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(parseISO(comment.createdAt), "MMM d, yyyy")}
                      </p>
                    </div>
                    <p className="text-sm mb-2">{comment.content}</p>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <img 
                          src={post?.mediaUrl} 
                          alt={post?.caption} 
                          className="w-16 h-16 object-cover rounded"
                        />
                        <p className="text-sm text-muted-foreground">{post?.caption}</p>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Heart className="w-4 h-4" /> {post?.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" /> {post?.comments}
                        </span>
                        <span className="flex items-center gap-1">
                          <Share2 className="w-4 h-4" /> {post?.shares}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="likes">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allPosts.map(post => (
              <Card key={post.id} className="overflow-hidden">
                <div className="aspect-square relative">
                  <img 
                    src={post.mediaUrl} 
                    alt={post.caption}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage 
                        src={allUsers.find(u => u.id === post.userId)?.avatarUrl} 
                        alt={allUsers.find(u => u.id === post.userId)?.username} 
                      />
                      <AvatarFallback>
                        {allUsers.find(u => u.id === post.userId)?.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">
                      {allUsers.find(u => u.id === post.userId)?.username}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{post.caption}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" /> {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" /> {post.comments}
                    </span>
                    <span className="flex items-center gap-1">
                      <Share2 className="w-4 h-4" /> {post.shares}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="shares">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allPosts.filter(post => post.shares > 0).map(post => (
              <Card key={post.id} className="overflow-hidden">
                <div className="aspect-square relative">
                  <img 
                    src={post.mediaUrl} 
                    alt={post.caption}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage 
                        src={allUsers.find(u => u.id === post.userId)?.avatarUrl} 
                        alt={allUsers.find(u => u.id === post.userId)?.username} 
                      />
                      <AvatarFallback>
                        {allUsers.find(u => u.id === post.userId)?.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">
                      {allUsers.find(u => u.id === post.userId)?.username}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{post.caption}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" /> {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" /> {post.comments}
                    </span>
                    <span className="flex items-center gap-1">
                      <Share2 className="w-4 h-4" /> {post.shares}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}