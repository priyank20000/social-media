"use client";

import { RSVPCard } from "@/components/social/RSVPCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function EventsPage() {
  const events = [
    {
      title: "Analytics Workshop 2024",
      date: "April 15, 2024",
      time: "2:00 PM - 4:00 PM",
      location: "Virtual Event",
      attendees: 42,
      image: "/images/image95.jpg"
    },
    {
      title: "Social Media Marketing Summit",
      date: "April 20, 2024",
      time: "10:00 AM - 5:00 PM",
      location: "Virtual Event",
      attendees: 156,
      image: "/images/image96.jpg"
    },
    {
      title: "Content Creation Masterclass",
      date: "April 25, 2024",
      time: "1:00 PM - 3:00 PM",
      location: "Virtual Event",
      attendees: 89,
      image: "/images/image94.jpg"
    },
  ];

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Upcoming Events</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Create New Event</SheetTitle>
            </SheetHeader>
            {/* Add event creation form here */}
          </SheetContent>
        </Sheet>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event, index) => (
          <RSVPCard key={index} {...event} />
        ))}
      </div>
    </div>
  );
}