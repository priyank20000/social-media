"use client";

import { ForumThread } from "@/components/social/ForumThread";

export default function ForumPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Community Forum</h1>
      <ForumThread />
    </div>
  );
}