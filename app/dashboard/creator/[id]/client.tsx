"use client";

import { mockUsers, mockImagePosts, mockcomments } from "@/lib/mock-data";
import { analyzeCreatorStats } from "@/lib/analytics/creator";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import EngagementBarChart from "@/components/charts/engagement-bar-chart";
import { Visitor } from "@/components/charts/visitor";
import { Likes } from "@/components/charts/likes";
import { CreatorPosts } from "@/components/creator/CreatorPosts";
import { UserStats } from "@/components/creator/UserStats";

export function CreatorPageClient({ id }: { id: string }) {
  // Get user data and their posts
  const user = mockUsers.find((u) => u.id === id);
  const userPosts = mockImagePosts.filter((p) => p.userId === id);
  const stats = analyzeCreatorStats(userPosts);
  
  if (!user) return <div>Creator not found</div>;

  return (
    <div className="p-8">
      {/* Profile Header */}
      <div className="relative w-full sm:h-[250px] h-[120px] rounded-md overflow-hidden">
        <img
          src="/images/banner.png"
          className="relative inset-0 w-full h-full object-cover"
          alt="Profile banner"
        />
      </div>
      
      {/* User Info */}
      <div className="flex items-center gap-6 mb-8 ml-2 sm:mt-[-60px] mt-[-80px]">
        <Avatar className="h-24 w-24 sm:h-40 sm:w-40">
          <AvatarImage src={user.avatarUrl} alt={user.username} />
          <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="sm:mt-20 mt-24">
          <h1 className="sm:text-3xl text-2xl font-bold uppercase mb-3">{user.name}</h1>
          <div className="flex items-center auto ml-[-60px] sm:ml-[0px] border-2 flex-wrap gap-4 text-muted-foreground">
            <Badge className="hidden">{user.username}</Badge>
            <Badge>{user.followersCount.toLocaleString()} Followers</Badge>
            <Badge>{user.followingCount.toLocaleString()} Following</Badge>
          </div>
        </div>
      </div>

      {/* User Statistics */}
      <UserStats posts={userPosts} />

      {/* Engagement Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <EngagementBarChart />
        <Likes />
      </div>

      {/* User Posts */}
      <div className="mb-8">
        <CreatorPosts 
          posts={userPosts}
          comments={mockcomments}
          users={mockUsers}
        />
      </div>
    </div>
  );
}