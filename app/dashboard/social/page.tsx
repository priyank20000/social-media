"use client";

// Importing necessary React hooks and components
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RSVPCard } from "@/components/social/RSVPCard";
import { PollCreator } from "@/components/social/PollCreator";
import { ForumThread } from "@/components/social/ForumThread";
import { GroupChat } from "@/components/social/GroupChat";
import { QABoard } from "@/components/social/QABoard";
import { ProfileEditor } from "@/components/social/ProfileEditor";
import { PostFeed } from "@/components/social/PostFeed";

export default function SocialPage() {
  // State to manage the active tab (optional, for controlling tab navigation)
  const [activeTab, setActiveTab] = useState("events");

  // Handler for closing the ProfileEditor (e.g., switch back to another tab)
  const handleProfileEditorClose = () => {
    setActiveTab("feed"); // Switch to another tab, e.g., "Feed"
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Social Features</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid grid-cols-4 sm:grid-cols-7 gap-2">
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="polls">Polls</TabsTrigger>
          <TabsTrigger value="forum">Forum</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="qa">Q&A</TabsTrigger>
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="space-y-8">
          <RSVPCard
            title="Analytics Workshop 2024"
            date="April 15, 2024"
            time="2:00 PM - 4:00 PM"
            location="Virtual Event"
            attendees={42}
          />
        </TabsContent>

        <TabsContent value="polls">
          <PollCreator />
        </TabsContent>

        <TabsContent value="forum">
          <ForumThread />
        </TabsContent>

        <TabsContent value="chat">
          <GroupChat />
        </TabsContent>

        <TabsContent value="qa">
          <QABoard />
        </TabsContent>

        <TabsContent value="feed">
          <PostFeed />
        </TabsContent>

        <TabsContent value="profile">
          <ProfileEditor onClose={handleProfileEditorClose} />
        </TabsContent>
      </Tabs>
    </div>
  );
}