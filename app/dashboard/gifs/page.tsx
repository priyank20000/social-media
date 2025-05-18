"use client";

// Import necessary dependencies
import { useState, useEffect } from "react"; // Added useEffect for client-side window access
import { mockGifsPosts, mockUsers } from "@/lib/mock-data"; // Mock data for GIF posts and users
import { Heart, MessageCircle, Share2, Plus, Image as ImageIcon } from "lucide-react"; // Icons for UI
import Masonry from "react-masonry-css"; // Library for masonry grid layout
import { Card } from "@/components/ui/card"; // Shadcn/UI Card component
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"; // Shadcn/UI Sheet components for modals
import { Separator } from "@/components/ui/separator"; // Shadcn/UI Separator component
import { CardDescription } from "@/components/ui/card"; // Shadcn/UI CardDescription component
import { Button } from "@/components/ui/button"; // Shadcn/UI Button component
import { CommentSection } from "@/components/comments/CommentSection"; // Custom component for comments
import { ShareMenu } from "@/components/social/ShareMenu"; // Custom component for sharing

export default function GifsPage() {
  // Initialize state with filtered and enriched GIF post data
  const [posts, setPosts] = useState(
    mockGifsPosts
      .filter((post) => post.type === "GIFs") // Filter for GIF-type posts
      .map((post) => ({
        ...post,
        user: mockUsers.find((u) => u.id === post.userId)!, // Attach user data
        isLiked: false, // Initialize like status
      }))
      .sort((a, b) => b.likes - a.likes) // Sort by likes (descending)
  );

  // State to store the origin (base URL) for client-side URL construction
  const [origin, setOrigin] = useState("");

  // Set origin only on client-side to avoid window access during SSR
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  // Reference to file input for GIF uploads
  const [fileInputRef, setFileInputRef] = useState<HTMLInputElement | null>(null);

  // Handle file selection for GIF uploads
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    console.log("File selected:", file); // TODO: Implement actual upload logic
  };

  // Toggle like status and update like count for a post
  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  // Increment share count for a post
  const handleShare = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, shares: post.shares + 1 } : post
      )
    );
  };

  // Static notifications for GIF insights
  const notifications = [
    {
      title: "Reaction GIFs receive 45% more engagement than other types",
      description: "1 hour ago",
    },
    {
      title: "Original GIF content performs better than reposts",
      description: "1 hour ago",
    },
  ];

  return (
    // Main container with responsive padding
    <div className="sm:p-8 p-2 flex flex-col">
      {/* Header with title and create GIF button */}
      <div className="flex justify-between items-center sm:pl-[50px] pl-[60px] sm:my-0 sm:mb-5 my-6">
        <h1 className="text-2xl font-bold">GIFs Analytics</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create GIF
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Create New GIF</SheetTitle>
            </SheetHeader>
            {/* GIF upload form */}
            <div className="mt-6 space-y-4">
              <input
                type="file"
                ref={setFileInputRef}
                className="hidden"
                accept="image/gif" // Restrict to GIF files
                onChange={handleFileUpload}
              />
              <Button
                className="w-full"
                onClick={() => fileInputRef?.click()}
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Upload GIF
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Masonry grid for displaying GIF posts */}
      <Masonry
        breakpointCols={{
          default: 4,
          1100: 3,
          768: 2,
          500: 2,
        }}
        className="flex justify-center items-start w-auto sm:gap-6 gap-2"
        columnClassName="bg-clip-padding"
      >
        {posts.map((post) => (
          <div className="w-full" key={post.id}>
            <Sheet>
              <Card className="overflow-hidden mb-6 w-full">
                <SheetTrigger>
                  {/* Post GIF image */}
                  <div className="relative w-full h-[auto]">
                    {post.mediaUrl && (
                      <img
                        src={post.mediaUrl}
                        alt={post.caption}
                        className="relative inset-0 w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* Post details and interactions */}
                  <div className="p-4">
                    <p className="text-sm mb-4">{post.caption}</p>
                    <div className="flex items-center gap-6">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`flex items-center gap-2 ${
                          post.isLiked ? "text-red-500" : "text-muted-foreground"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleLike(post.id);
                        }}
                      >
                        <Heart
                          className="w-4 h-4"
                          fill={post.isLiked ? "currentColor" : "none"}
                        />
                        <span>{post.likes.toLocaleString()}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground"
                      >
                        <MessageCircle className="w-4 h-4 mr-1" />
                        <span>{post.comments.toLocaleString()}</span>
                      </Button>
                      {/* Use dynamic origin for ShareMenu URL */}
                      {origin && (
                        <ShareMenu
                          url={`${origin}/gif/${post.id}`}
                          title={post.caption}
                          shares={post.shares}
                          onShare={() => handleShare(post.id)}
                        />
                      )}
                    </div>
                  </div>
                </SheetTrigger>

                {/* Detailed post view with GIF, comments, and insights */}
                <SheetContent className="w-[320px] sm:w-[540px] overflow-scroll">
                  <SheetHeader>
                    <SheetTitle>Post Analysis</SheetTitle>
                    <div className="relative w-full h-[300px] shadow-inner-2xl">
                      {post.mediaUrl && (
                        <img
                          src={post.mediaUrl}
                          alt={post.caption}
                          className="relative inset-0 w-full h-full object-cover rounded-lg"
                        />
                      )}
                    </div>
                    <p className="relative text-base">{post.caption}</p>
                  </SheetHeader>

                  {/* Comments section */}
                  <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-4">Comments</h2>
                    <CommentSection postId={post.id} />
                  </div>

                  {/* Insights section */}
                  <div className="card-container relative w-[100%] h-[100%] flex justify-start items-start flex-col">
                    <Separator className="my-4" />
                    <h1 className="mt-3 text-2xl">Insights</h1>
                    <CardDescription>You have 3 unread insights.</CardDescription>

                    <div className="grid gap-4 justify-start items-start mt-5 w-full">
                      <div className="relative w-full">
                        {notifications.map((notification, index) => (
                          <div
                            key={index}
                            className="relative mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0 w-[100%]"
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
  );
}