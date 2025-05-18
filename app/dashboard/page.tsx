"use client";

/**
 * Main Dashboard Page
 * 
 * This is the primary analytics overview page that displays:
 * - Key metrics cards (posts, likes, comments, shares)
 * - Engagement charts and trends
 * - Analytics insights
 */

import { TrendingUp, Users, Heart, Share2, MessageCircle, Clock } from "lucide-react";
import { mockImagePosts } from "@/lib/mock-data";
import { StatsCard } from "@/components/metrics/StatsCard";
import { format, parseISO } from "date-fns";
import EngagementBarChart from "@/components/charts/engagement-bar-chart"
import { Insights } from "@/components/insights/insights"
import { Device } from "@/components/charts/device"
import { Visitor } from "@/components/charts/visitor"
import { Likes } from "@/components/charts/likes";

export default function DashboardPage() {
  // Calculate total engagement metrics
  const totalLikes = mockImagePosts.reduce((sum, post) => sum + post.likes, 0);
  const totalComments = mockImagePosts.reduce((sum, post) => sum + post.comments, 0);
  const totalShares = mockImagePosts.reduce((sum, post) => sum + post.shares, 0);

  return (
    <div className="p-8">
      <h1 className="text-2xl pl-[50px] font-bold mb-8">Analytics Overview</h1>
      
      {/* Stats Grid: Key metrics displayed as cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Posts"
          value={mockImagePosts.length}
          icon={Clock}
          gradient="from-[#017AFF] to-[#017AFF]"
          iconColor="text-[#fff]/30"
        />
        <StatsCard
          title="Total Likes"
          value={totalLikes}
          icon={Heart}
          gradient="from-[#F34971] to-[#F34971]"
          iconColor="text-[#fff]/30"
        />
        <StatsCard
          title="Total Comments"
          value={totalComments}
          icon={MessageCircle}
          gradient="from-[#00D37F] to-[#00D37F]"
          iconColor="text-[#fff]/30"
        />
        <StatsCard
          title="Total Shares"
          value={totalShares}
          icon={Share2}
          gradient="from-[#017AFF] to-[#017AFF]"
          iconColor="text-[#fff]/30"
        />
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <EngagementBarChart />
        <Insights />
        <Device />
        <Visitor />
        <Likes />
      </div>
    </div>
  );
}