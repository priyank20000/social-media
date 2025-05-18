"use client";

// Import necessary dependencies
import { useState } from "react";
import { mockPollsPosts, mockUsers } from "@/lib/mock-data"; // Mock data for polls and users
import { Card } from "@/components/ui/card";
import Masonry from "react-masonry-css";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CardDescription } from "@/components/ui/card";
import { PollCreator } from "@/components/social/PollCreator";

// Define TypeScript interfaces for type safety
interface User {
  id: string;
  name: string;
  // Add other user properties as needed
}

interface Poll {
  id: string;
  type: "reel" | "carousel" | "image" | "GIFs" | "polls";
  userId: string;
  user: User;
  question: string;
  option1: string;
  option2: string;
  option3?: string;
  option4?: string;
  likes: number;
  selectedOption: number | null; // Allow null or number for voting state
  // Add other properties from mockPollsPosts if needed
}

// Ensure mock data is typed correctly
interface MockPollPost {
  id: string;
  type: "reel" | "carousel" | "image" | "GIFs" | "polls";
  userId: string;
  question: string;
  option1: string;
  option2: string;
  option3?: string;
  option4?: string;
  likes: number;
  // Add other properties as needed
}

const typedMockPollsPosts: MockPollPost[] = mockPollsPosts as MockPollPost[];
const typedMockUsers: User[] = mockUsers as User[];

export default function PollsPage() {
  // Initialize state with filtered and enriched poll data, typed as Poll[]
  const [polls, setPosts] = useState<Poll[]>(
    typedMockPollsPosts
      .filter((post) => post.type === "polls") // Filter for poll-type posts
      .map((post) => {
        const user = typedMockUsers.find((u) => u.id === post.userId) || {
          id: "",
          name: "Unknown",
        }; // Fallback for missing users
        return {
          ...post,
          user, // Attach user data safely
          selectedOption: null, // Track selected option for voting
        };
      })
      .sort((a, b) => b.likes - a.likes) // Sort by likes (descending)
  );

  // Handle voting by updating the selected option for a poll
  const handleVote = (pollId: string, optionIndex: number) => {
    setPosts(
      polls.map((poll) =>
        poll.id === pollId
          ? { ...poll, selectedOption: optionIndex } // Update selected option
          : poll
      )
    );
  };

  // Define responsive breakpoints for masonry grid
  const breakpointColumns = {
    default: 4,
    1100: 3,
    768: 2,
    500: 1,
  };

  // Static notifications for poll insights
  const notifications = [
    {
      title: "Polls with 2-3 options get 40% more votes than those with 4 options",
      description: "1 hour ago",
    },
    {
      title: "Entertainment-themed polls receive highest engagement",
      description: "1 hour ago",
    },
    {
      title: "Peak voting times are during lunch hours (12-2 PM)",
      description: "1 hour ago",
    },
    {
      title: "Adding images to poll options increases participation by 25%",
      description: "1 hour ago",
    },
    {
      title: "Weekly polls perform better than daily polls",
      description: "2 hours ago",
    },
  ];

  return (
    // Main container with responsive padding
    <div className="p-2 sm:p-8">
      {/* Header with title and create poll button */}
      <div className="flex justify-between items-center sm:pl-[50px] pl-[60px] sm:my-0 sm:mb-5 my-6">
        <h1 className="text-2xl font-bold">Polls Analytics</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Poll
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Create New Poll</SheetTitle>
            </SheetHeader>
            {/* Poll creation form */}
            <div className="mt-4">
              <PollCreator />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Masonry grid for displaying polls */}
      <div>
        <Masonry
          breakpointCols={breakpointColumns}
          className="flex w-auto gap-6"
          columnClassName="bg-clip-padding"
        >
          {polls.map((poll) => (
            <Sheet key={poll.id}>
              <Card className="overflow-hidden mb-6">
                <SheetTrigger>
                  {/* Poll question and options */}
                  <div className="p-4">
                    <p className="text-sm text-left mb-4">{poll.question}</p>
                    <div className="space-y-2">
                      {/* Render poll options as buttons */}
                      {[poll.option1, poll.option2, poll.option3, poll.option4]
                        .filter((option): option is string => !!option) // Filter out undefined/empty options with type guard
                        .map((option, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className={`w-full justify-start text-left ${
                              poll.selectedOption === index
                                ? "bg-primary text-primary-foreground"
                                : ""
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleVote(poll.id, index);
                            }}
                          >
                            {option}
                          </Button>
                        ))}
                    </div>
                  </div>
                </SheetTrigger>

                {/* Detailed poll view with options and insights */}
                <SheetContent className="w-[320px] sm:w-[540px] overflow-scroll">
                  <SheetHeader>
                    <SheetTitle className="text-left">Poll Analysis</SheetTitle>
                    <p className="relative text-base">{poll.question}</p>
                  </SheetHeader>

                  <div className="card-container relative w-[100%] h-[100%] flex justify-start items-start flex-col">
                    {/* Poll options in detailed view */}
                    <div className="space-y-2 mt-4">
                      {[poll.option1, poll.option2, poll.option3, poll.option4]
                        .filter((option): option is string => !!option) // Filter out undefined/empty options with type guard
                        .map((option, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className={`w-full justify-start text-left ${
                              poll.selectedOption === index
                                ? "bg-primary text-primary-foreground"
                                : ""
                            }`}
                            onClick={() => handleVote(poll.id, index)}
                          >
                            {option}
                          </Button>
                        ))}
                    </div>

                    {/* Insights section */}
                    <div className="mt-8">
                      <h1 className="text-2xl mb-2">Insights</h1>
                      <CardDescription>
                        You have 3 unread insights.
                      </CardDescription>

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
                  </div>
                </SheetContent>
              </Card>
            </Sheet>
          ))}
        </Masonry>
      </div>
    </div>
  );
}