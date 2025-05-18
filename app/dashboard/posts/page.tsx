"use client";

// Import necessary dependencies
import { useState, useEffect, useRef } from "react";
import { mockImagePosts, mockUsers } from "@/lib/mock-data"; // Mock data for posts and users
import { Heart, MessageCircle, Share2, Plus, Camera, Image as ImageIcon } from "lucide-react"; // Icons for UI
import { Button } from "@/components/ui/button"; // Shadcn/UI Button component
import Masonry from "react-masonry-css"; // Library for masonry grid layout
import { CommentSection } from "@/components/comments/CommentSection"; // Custom comment section component
import { Card, CardDescription } from "@/components/ui/card"; // Shadcn/UI Card components
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"; // Shadcn/UI Sheet components
import { Separator } from "@/components/ui/separator"; // Shadcn/UI Separator component
import { useIsMobile } from "@/hooks/use-mobile"; // Custom hook to detect mobile devices

export default function PostsPage() {
  // State to ensure client-side rendering to avoid hydration issues
  const [isClient, setIsClient] = useState(false);
  // State to store posts with additional properties (user, isLiked)
  const [posts, setPosts] = useState<any[]>([]);
  // Reference to file input for image uploads
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // Detect if the device is mobile
  const isMobile = useIsMobile();

  // Initialize posts on component mount
  useEffect(() => {
    setIsClient(true); // Mark as client-side
    setPosts(
      mockImagePosts
        .filter((post) => post.type === "image") // Filter for image posts
        .map((post) => ({
          ...post,
          user: mockUsers.find((u) => u.id === post.userId)!, // Attach user data
          isLiked: false, // Initialize like status
        }))
        .sort((a, b) => b.likes - a.likes) // Sort by likes (descending)
    );
  }, []);

  // Handle file selection for image uploads
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    console.log("File selected:", file); // TODO: Implement actual upload logic
  };

  // Handle camera access for mobile devices
  const handleCameraUpload = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log("Camera accessed:", stream); // TODO: Implement camera capture logic
    } catch (error) {
      console.error("Error accessing camera:", error); // TODO: Show user-friendly error
    }
  };

  // Toggle like status and update like count for a post
  const handleLike = (postId: string) => {
    setPosts(posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          }
        : post
    ));
  };

  // Static notifications for post insights
  const notifications = [
    {
      title: "Your posts featuring '#coding', '#art', and '#photography' gain the highest engagement.",
      description: "1 hour ago",
    },
    {
      title: "Image posts generally perform better than other formats.",
      description: "1 hour ago",
    },
    {
      title: "Being a 23-year-old from Korea using a tablet makes you relatable to tech-savvy and creative Gen Z audiences.",
      description: "1 hour ago",
    },
    {
      title: "Your posts tend to get maximum engagement on days close to holidays or year-end, indicating audience activity spikes during festive periods.",
      description: "1 hour ago",
    },
    {
      title: "Frequent interactions from users like 'katiewaters' and 'jjones' suggest a core group of followers contributing to your engagement.",
      description: "2 hours ago",
    },
  ];

  // Prevent rendering on server to avoid hydration mismatch
  if (!isClient) {
    return null;
  }

  return (
    // Main container with responsive padding
    <div className="sm:p-8 p-2 flex flex-col">
      {/* Header with title and create post button */}
      <div className="flex justify-between items-center sm:pl-[50px] pl-[60px] sm:my-0 sm:mb-5 my-6">
        <h1 className="text-2xl font-bold">Image Analytics</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Post
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Create New Post</SheetTitle>
            </SheetHeader>
            {/* Post creation options */}
            <div className="mt-6 space-y-4">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileUpload}
              />
              <Button
                className="w-full"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Upload Image
              </Button>
              {isMobile && (
                <Button
                  className="w-full"
                  onClick={handleCameraUpload}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Take Photo
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Masonry grid for displaying posts */}
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
          <div key={post.id} className="w-full">
            <Sheet>
              <Card className="overflow-hidden mb-6 w-full">
                <SheetTrigger className="w-full">
                  {/* Post image */}
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
                        className={`flex items-center gap-2 ${post.isLiked ? 'text-red-500' : 'text-muted-foreground'}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleLike(post.id);
                        }}
                      >
                        <Heart className="w-4 h-4" fill={post.isLiked ? "currentColor" : "none"} />
                        <span>{post.likes.toLocaleString()}</span>
                      </Button>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Share2 className="w-4 h-4" />
                        <span>{post.shares.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </SheetTrigger>

                {/* Detailed post view with comments and insights */}
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
                  <div className="card-container relative w-[100%] h-[100%] flex justify-start items-start flex-col">
                    <Separator className="my-4" />

                    {/* Comments section */}
                    <div className="w-full">
                      <h2 className="text-lg font-semibold mb-4">Comments</h2>
                      <CommentSection postId={post.id} />
                    </div>

                    <Separator className="my-4" />

                    {/* Insights section */}
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