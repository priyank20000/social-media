"use client";

import { Users, BarChart3, Video, Image, Layout, ImagePlay, Share2, MessageCircle, PieChart, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";

const mainNav = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "Reels/Short Videos",
    href: "/dashboard/reels",
    icon: Video,
  },
  {
    title: "Static Image",
    href: "/dashboard/posts",
    icon: Image,
  },
  {
    title: "Polls",
    href: "/dashboard/polls",
    icon: PieChart,
  },
  {
    title: "GIFs",
    href: "/dashboard/gifs",
    icon: ImagePlay,
  },
  {
    title: "Events",
    href: "/dashboard/events",
    icon: Layout,
  },
  {
    title: "Forum",
    href: "/dashboard/forum",
    icon: FileText,
  },
  {
    title: "Chat",
    href: "/dashboard/chat",
    icon: MessageCircle,
  },
  {
    title: "Feed",
    href: "/dashboard/feed",
    icon: Share2,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex w-[70px] lg:w-[280px] fixed top-0 left-0 z-30 h-screen border-r bg-background flex-col">
      {/* Logo/Brand */}
      <div className="p-6 hidden lg:block">
        <h1 className="fat-albert text-5xl pr-2 m-[-10px]">DataLans</h1>
      </div>
      <div className="p-4 lg:hidden flex justify-center">
        <h1 className="fat-albert text-2xl">DL</h1>
      </div>

      {/* Navigation menu */}
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-4">
          <div className="py-2">
            <h3 className="mb-2 px-4 text-sm font-semibold hidden lg:block">Analytics</h3>
            <nav className="space-y-1">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                    pathname === item.href ? "bg-accent" : "transparent"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="hidden lg:inline">{item.title}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* User profile link */}
        <div className="absolute bottom-[70px] left-[0px] w-[100%] flex justify-center items-center px-2">
          <Link
            href={`/dashboard/profile`}
            className={cn(
              "flex items-center gap-3 rounded-lg w-full px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
              pathname === `/dashboard/profile` ? "bg-accent" : "transparent"
            )}
          >
            <Avatar className="h-6 w-6">
              <AvatarImage src="/images/user/sara.jpeg" alt="Sara" />
              <AvatarFallback>{"Sara".toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="hidden lg:inline">Sara Smith</span>
          </Link>
        </div>

        {/* Theme toggle */}
        <div className="absolute bottom-[0px] left-[0px] w-[100%] flex justify-center items-center p-2">
          <ModeToggle />
        </div>
      </ScrollArea>
    </div>
  );
}