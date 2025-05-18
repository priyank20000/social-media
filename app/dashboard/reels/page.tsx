"use client";

// Import necessary dependencies
import { useState, useRef } from "react";
import { mockReelsPosts, mockUsers } from "@/lib/mock-data"; // Mock data for reels and users
import { NextSeo } from "next-seo"; // SEO optimization
import { Heart, MessageCircle, Plus, Camera, Video } from "lucide-react"; // Icons for UI
import Masonry from "react-masonry-css"; // Library for responsive grid layout
import { Card } from "@/components/ui/card"; // Shadcn/UI Card component
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"; // Shadcn/UI Sheet components for modals
import { Separator } from "@/components/ui/separator"; // Shadcn/UI Separator component
import { Button } from "@/components/ui/button"; // Shadcn/UI Button component
import { CommentSection } from "@/components/comments/CommentSection"; // Custom component for comments
import { ShareMenu } from "@/components/social/ShareMenu"; // Custom component for sharing
import { useIsMobile } from "@/hooks/use-mobile"; // Custom hook to detect mobile devices

// Main component for Reels Analytics page
export default function ReelsPage() {
  // Initialize state with filtered and enriched reel post data
  const [posts, setPosts] = useState(
    mockReelsPosts
      .filter((post) => post.type === "reel") // Filter for reel-type posts
      .map((reel) => ({
        ...reel,
        user: mockUsers.find((u) => u.id === reel.userId) || {
          id: "",
          name: "Unknown",
        }, // Fallback for missing users
        isLiked: false, // Initialize like status
      }))
      .sort((a, b) => b.likes - a.likes) // Sort by likes (descending)
  );

  // Detect mobile device for camera functionality
  const isMobile = useIsMobile();
  // Reference to file input for video uploads
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle video file upload with validation
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 100 * 1024 * 1024) {
      // Limit to 100MB
      alert("File size exceeds 100MB limit");
      return;
    }
    if (!file.type.startsWith("video/")) {
      alert("Please upload a valid video file");
      return;
    }
    console.log("File selected:", file); // TODO: Implement actual upload logic
  };

  // Handle camera access for video recording on mobile devices
  const handleCameraUpload = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log("Camera accessed:", stream); // TODO: Implement video capture logic
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Failed to access camera. Please check permissions."); // User feedback
    }
  };

  // Handle sharing a reel by incrementing share count
  const handleShare = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, shares: post.shares + 1 } : post
      )
    );
  };

  // Handle liking a reel by toggling isLiked status
  const handleLike = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1, // Fix: Update likes count
            }
          : post
      )
    );
  };

  // Static notifications for reel insights
  const notifications = [
    {
      title: "Your reels featuring trending music gain 50% more engagement",
      description: "1 hour ago",
    },
    {
      title: "Short-form video content under 30 seconds performs best",
      description: "1 hour ago",
    },
  ];

  // Base URL for share links, with fallback for server-side rendering
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://your-app-domain.com";

  return (
    <>
      {/* SEO metadata for better search engine visibility */}
      <NextSeo
        title="Reels Analytics - DataLans"
        description="Analyze your reels performance and engagement metrics"
      />
      {/* Main container with responsive padding */}
      <div className="sm:p-8 p-4 flex flex-col">
        {/* Header with title and create reel button */}
        <div className="flex justify-between items-center sm:pl-12 pl-16 sm:mb-5 mb-6">
          <h1 className="text-2xl font-bold">Reels Analytics</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Reel
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[90vw] max-w-[400px] sm:max-w-[600px]">
              <SheetHeader>
                <SheetTitle>Create New Reel</SheetTitle>
              </SheetHeader>
              {/* Video upload and recording options */}
              <div className="mt-6 space-y-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="video/*" // Restrict to video files
                  onChange={handleFileUpload}
                />
                <Button
                  className="w-full"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Video className="h-4 w-4 mr-2" />
                  Upload Video
                </Button>
                {isMobile && (
                  <Button
                    className="w-full"
                    onClick={handleCameraUpload}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Record Video
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Masonry grid for displaying reels */}
        <Masonry
          breakpointCols={{
            default: 4,
            1280: 3,
            1024: 3,
            768: 2,
            640: 1, // Improved responsiveness for smaller screens
          }}
          className="flex justify-center items-start w-auto sm:gap-6 gap-4"
          columnClassName="bg-clip-padding"
        >
          {posts.map((reel) => (
            <div className="w-full" key={reel.id}>
              <Sheet>
                <Card className="overflow-hidden mb-6 w-full">
                  <SheetTrigger className="w-full">
                    {/* Video preview with 9:16 aspect ratio */}
                    <div className="relative w-full" style={{ aspectRatio: "9/16" }}>
                      <video
                        src={reel.mediaUrl}
                        loop
                        muted
                        playsInline
                        controls
                        // loading="lazy" // Uncomment for lazy loading
                        style={{ width: "100%", height: "100%" }}
                        className="relative inset-0 w-full h-full object-cover"
                      />
                    </div>

                    {/* Reel details and interactions */}
                    <div className="p-4">
                      <p className="text-sm mb-4">{reel.caption}</p>
                      <div className="flex items-center gap-6">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`flex items-center gap-2 ${
                            reel.isLiked ? "text-red-500" : "text-muted-foreground"
                          }`}
                          onClick={() => handleLike(reel.id)}
                        >
                          <Heart
                            className="w-4 h-4"
                            fill={reel.isLiked ? "currentColor" : "none"}
                          />
                          <span>{reel.likes.toLocaleString()}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground"
                        >
                          <MessageCircle className="w-4 h-4 mr-1" />
                          <span>{reel.comments.toLocaleString()}</span>
                        </Button>
                        <ShareMenu
                          url={
                            typeof window !== "undefined"
                              ? `${window.location.origin}/reel/${reel.id}`
                              : `${baseUrl}/reel/${reel.id}`
                          }
                          title={reel.caption}
                          shares={reel.shares}
                          onShare={() => handleShare(reel.id)}
                        />
                      </div>
                    </div>
                  </SheetTrigger>

                  {/* Detailed reel analysis view */}
                  <SheetContent className="w-[90vw] max-w-[400px] sm:max-w-[600px] overflow-scroll">
                    <SheetHeader>
                      <SheetTitle>Post Analysis</SheetTitle>
                      <div className="relative w-full" style={{ aspectRatio: "9/16" }}>
                        <video
                          src={reel.mediaUrl}
                          autoPlay
                          loop
                          muted
                          playsInline
                          controls
                          // loading="lazy"
                          style={{ width: "100%", height: "100%" }}
                          className="relative border-2 inset-0 w-full h-full object-cover"
                        />
                      </div>
                      <p className="relative text-base">{reel.caption}</p>
                    </SheetHeader>

                    {/* Comments section */}
                    <div className="mt-6">
                      <h2 className="text-lg font-semibold mb-4">Comments</h2>
                      <CommentSection postId={reel.id} />
                    </div>

                    {/* Insights section */}
                    <div className="card-container relative w-full flex justify-start items-start flex-col">
                      <Separator className="my-4" />
                      <h1 className="mt-3 text-2xl">Insights</h1>
                      <p className="text-sm text-muted-foreground">
                        You have 3 unread insights.
                      </p>

                      <div className="grid gap-4 justify-start items-start mt-5 w-full">
                        <div className="relative w-full">
                          {notifications.map((notification, index) => (
                            <div
                              key={index}
                              className="relative mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0 w-full"
                            >
                              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                              <div className="space-y-1">
                                <p className="text-sm font-normal leading-1 w-full">
                                  {notification.title}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {notification.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Card>
              </Sheet>
            </div>
          ))}
        </Masonry>
      </div>
    </>
  );
}