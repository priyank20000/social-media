"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, Share2, MessageCircle, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
        <Link
          href="/dashboard"
          className={cn(
            "inline-flex flex-col items-center justify-center px-5",
            pathname === "/dashboard" ? "text-primary" : "text-muted-foreground"
          )}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>

        <Link
          href="/dashboard/chat"
          className={cn(
            "inline-flex flex-col items-center justify-center px-5",
            pathname === "/dashboard/chat" ? "text-primary" : "text-muted-foreground"
          )}
        >
          <MessageCircle className="w-6 h-6" />
          <span className="text-xs mt-1">Chat</span>
        </Link>

        <Link
          href="/dashboard/feed"
          className={cn(
            "inline-flex flex-col items-center justify-center px-5",
            pathname === "/dashboard/feed" ? "text-primary" : "text-muted-foreground"
          )}
        >
          <Share2 className="w-6 h-6" />
          <span className="text-xs mt-1">Feed</span>
        </Link>

        <Link
          href="/dashboard/forum"
          className={cn(
            "inline-flex flex-col items-center justify-center px-5",
            pathname === "/dashboard/forum" ? "text-primary" : "text-muted-foreground"
          )}
        >
          <FileText className="w-6 h-6" />
          <span className="text-xs mt-1">Forum</span>
        </Link>

        <Link
          href="/dashboard/profile"
          className={cn(
            "inline-flex flex-col items-center justify-center px-5",
            pathname === "/dashboard/profile" ? "text-primary" : "text-muted-foreground"
          )}
        >
          <User className="w-6 h-6" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </div>
  );
}