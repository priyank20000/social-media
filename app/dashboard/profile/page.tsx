"use client";

// Importing dependencies and components
import { useState } from "react";
import { mockImagePosts, mockReelsPosts, mockGifsPosts, mockPollsPosts, mockUsers } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileEditor } from "@/components/social/ProfileEditor";
import { StatsCard } from "@/components/metrics/StatsCard";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { NextSeo } from "next-seo";

// Type definitions for mock data
interface User {
  id: string;
  username: string;
  avatarUrl: string;
  followersCount: number;
  followingCount: number;
}

interface MockPost {
  id: string;
  userId: string;
  mediaUrl?: string;
  caption?: string;
  question?: string;
  likes: number;
  comments: number;
  shares: number;
}

interface Post extends MockPost {
  contentType: "image" | "reel" | "gif" | "poll";
}

// Type the mock data explicitly
const typedMockImagePosts: MockPost[] = mockImagePosts as MockPost[];
const typedMockReelsPosts: MockPost[] = mockReelsPosts as MockPost[];
const typedMockGifsPosts: MockPost[] = mockGifsPosts as MockPost[];
const typedMockPollsPosts: MockPost[] = mockPollsPosts as MockPost[];
const typedMockUsers: User[] = mockUsers as User[];

// Combine all posts with content type
const allPosts: Post[] = [
  ...typedMockImagePosts.map((post) => ({ ...post, contentType: "image" as const })),
  ...typedMockReelsPosts.map((post) => ({ ...post, contentType: "reel" as const })),
  ...typedMockGifsPosts.map((post) => ({ ...post, contentType: "gif" as const })),
  ...typedMockPollsPosts.map((post) => ({ ...post, contentType: "poll" as const })),
];

// Main component for user profile page
export default function ProfilePage() {
  // State for toggling edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Get first user with fallback
  const user: User = typedMockUsers[0] || {
    id: "",
    username: "Unknown",
    avatarUrl: "",
    followersCount: 0,
    followingCount: 0,
  };

  // Filter posts for the current user
  const userPosts: Post[] = allPosts.filter((post) => post.userId === user.id);

  // Calculate user stats for display
  const stats = {
    posts: userPosts.length,
    followers: user.followersCount,
    following: user.followingCount,
    likes: userPosts.reduce((sum, post) => sum + post.likes, 0),
    comments: userPosts.reduce((sum, post) => sum + post.comments, 0),
    shares: userPosts.reduce((sum, post) => sum + post.shares, 0),
    reels: userPosts.filter((post) => post.contentType === "reel").length,
    images: userPosts.filter((post) => post.contentType === "image").length,
    gifs: userPosts.filter((post) => post.contentType === "gif").length,
    polls: userPosts.filter((post) => post.contentType === "poll").length,
  };

  // Render ProfileEditor when editing
  if (isEditing) {
    return <ProfileEditor onClose={() => setIsEditing(false)} />;
  }

  return (
    <>
      {/* SEO metadata */}
      <NextSeo
        title={`${user.username}'s Profile - DataLans`}
        description={`View ${user.username}'s posts, stats, and social activity`}
      />
      {/* Main container */}
      <div className="p-4 sm:p-6 md:p-8">
        {/* User profile card */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Avatar className="w-24 h-24 sm:w-32 sm:h-32">
              <AvatarImage src={user.avatarUrl} alt={user.username} />
              <AvatarFallback>{user.username[0] || "U"}</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold mb-2">{user.username}</h1>
              <div className="flex flex-wrap justify-center sm:justify-start gap-6 mb-4">
                <div>
                  <div className="text-2xl font-bold">{stats.posts}</div>
                  <div className="text-sm text-muted-foreground">Posts</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.followers}</div>
                  <div className="text-sm text-muted-foreground">Followers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.following}</div>
                  <div className="text-sm text-muted-foreground">Following</div>
                </div>
              </div>
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            </div>
          </div>
        </Card>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <StatsCard
            title="Total Likes"
            value={stats.likes}
            icon={Heart}
            gradient="from-[#F34971] to-[#F34971]"
            iconColor="text-[#fff]/30"
          />
          <StatsCard
            title="Total Comments"
            value={stats.comments}
            icon={MessageCircle}
            gradient="from-[#00D37F] to-[#00D37F]"
            iconColor="text-[#fff]/30"
          />
          <StatsCard
            title="Total Shares"
            value={stats.shares}
            icon={Share2}
            gradient="from-[#017AFF] to-[#017AFF]"
            iconColor="text-[#fff]/30"
          />
        </div>

        {/* Posts section with tabs */}
        <Card className="p-6">
          <Tabs defaultValue="posts">
            <TabsList className="mb-6">
              <TabsTrigger value="posts">All Posts</TabsTrigger>
              <TabsTrigger value="reels">Reels</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="gifs">GIFs</TabsTrigger>
              <TabsTrigger value="polls">Polls</TabsTrigger>
            </TabsList>

            {/* All Posts tab */}
            <TabsContent value="posts">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {userPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden">
                    {post.mediaUrl && (
                      <div className="aspect-square relative">
                        {post.contentType === "reel" ? (
                          <video
                            src={post.mediaUrl}
                            className="absolute inset-0 w-full h-full object-cover"
                            controls
                            muted
                            playsInline
                          />
                        ) : (
                          <img
                            src={post.mediaUrl}
                            alt={post.caption || post.question || "Post"}
                            className="absolute inset-0 w-full h-full object-cover"
                            loading="lazy"
                          />
                        )}
                      </div>
                    )}
                    <div className="p-4">
                      <p className="text-sm line-clamp-2">{post.caption || post.question || "No description"}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Heart className="w-4 h-4" /> {post.likes}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MessageCircle className="w-4 h-4" /> {post.comments}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Reels tab */}
            <TabsContent value="reels">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {userPosts
                  .filter((post) => post.contentType === "reel")
                  .map((post) => (
                    <Card key={post.id} className="overflow-hidden">
                      <div className="aspect-square relative">
                        <video
                          src={post.mediaUrl}
                          className="absolute inset-0 w-full h-full object-cover"
                          controls
                          muted
                          playsInline
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-sm line-clamp-2">{post.caption || "No caption"}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Heart className="w-4 h-4" /> {post.likes}
                          </span>
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MessageCircle className="w-4 h-4" /> {post.comments}
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            {/* Images tab */}
            <TabsContent value="images">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {userPosts
                  .filter((post) => post.contentType === "image")
                  .map((post) => (
                    <Card key={post.id} className="overflow-hidden">
                      <div className="aspect-square relative">
                        <img
                          src={post.mediaUrl}
                          alt={post.caption || "Image"}
                          className="absolute inset-0 w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-sm line-clamp-2">{post.caption || "No caption"}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Heart className="w-4 h-4" /> {post.likes}
                          </span>
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MessageCircle className="w-4 h-4" /> {post.comments}
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            {/* GIFs tab */}
            <TabsContent value="gifs">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {userPosts
                  .filter((post) => post.contentType === "gif")
                  .map((post) => (
                    <Card key={post.id} className="overflow-hidden">
                      <div className="aspect-square relative">
                        <img
                          src={post.mediaUrl}
                          alt={post.caption || "GIF"}
                          className="absolute inset-0 w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-sm line-clamp-2">{post.caption || "No caption"}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Heart className="w-4 h-4" /> {post.likes}
                          </span>
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MessageCircle className="w-4 h-4" /> {post.comments}
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            {/* Polls tab */}
            <TabsContent value="polls">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {userPosts
                  .filter((post) => post.contentType === "poll")
                  .map((post) => (
                    <Card key={post.id} className="overflow-hidden">
                      {post.mediaUrl && (
                        <div className="aspect-square relative">
                          <img
                            src={post.mediaUrl}
                            alt={post.question || "Poll"}
                            className="absolute inset-0 w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <p className="text-sm line-clamp-2">{post.question || "No question"}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Heart className="w-4 h-4" /> {post.likes}
                          </span>
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MessageCircle className="w-4 h-4" /> {post.comments}
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </>
  );
}