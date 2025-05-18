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

// Main component for the Social Features page
export default function SocialPage() {
  return (
    // Main container with padding
    <div className="p-8">
      {/* Page title */}
      <h1 className="text-2xl font-bold mb-8">Social Features</h1>
      
      {/* Tabs component to switch between different social features */}
      <Tabs defaultValue="events" className="space-y-8">
        {/* Tabs navigation list */}
        <TabsList className="grid grid-cols-4 sm:grid-cols-7 gap-2">
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="polls">Polls</TabsTrigger>
          <TabsTrigger value="forum">Forum</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="qa">Q&A</TabsTrigger>
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        {/* Content for Events tab */}
        <TabsContent value="events" className="space-y-8">
          {/* RSVP Card component for event details */}
          <RSVPCard
            title="Analytics Workshop 2024"
            date="April 15, 2024"
            time="2:00 PM - 4:00 PM"
            location="Virtual Event"
            attendees={42}
          />
        </TabsContent>

        {/* Content for Polls tab */}
        <TabsContent value="polls">
          {/* Component for creating and managing polls */}
          <PollCreator />
        </TabsContent>

        {/* Content for Forum tab */}
        <TabsContent value="forum">
          {/* Component for forum discussions */}
          <ForumThread />
        </TabsContent>

        {/* Content for Chat tab */}
        <TabsContent value="chat">
          {/* Component for group chat functionality */}
          <GroupChat />
        </TabsContent>

        {/* Content for Q&A tab */}
        <TabsContent value="qa">
          {/* Component for question and answer board */}
          <QABoard />
        </TabsContent>

        {/* Content for Feed tab */}
        <TabsContent value="feed">
          {/* Component for social media style post feed */}
          <PostFeed />
        </TabsContent>

        {/* Content for Profile tab */}
        <TabsContent value="profile">
          {/* Component for editing user profile */}
          <ProfileEditor />
        </TabsContent>
      </Tabs>
    </div>
  );
}