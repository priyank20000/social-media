"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

interface RSVPCardProps {
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  image?: string;
}

export function RSVPCard({ title, date, time, location, attendees, image }: RSVPCardProps) {
  const [status, setStatus] = useState<'going' | 'maybe' | 'not-going' | null>(null);

  return (
    <Card className="overflow-hidden">
      {image && (
        <div className="relative w-full h-48">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-muted-foreground">
            <Calendar className="h-5 w-5 mr-2 flex-shrink-0" />
            <span>{date}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Clock className="h-5 w-5 mr-2 flex-shrink-0" />
            <span>{time}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-5 w-5 mr-2 flex-shrink-0" />
            <span>{location}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Users className="h-5 w-5 mr-2 flex-shrink-0" />
            <span>{attendees} attending</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            className="flex-1"
            variant={status === 'going' ? 'default' : 'outline'}
            onClick={() => setStatus('going')}
          >
            Going
          </Button>
          <Button
            className="flex-1"
            variant={status === 'maybe' ? 'default' : 'outline'}
            onClick={() => setStatus('maybe')}
          >
            Maybe
          </Button>
          <Button
            className="flex-1"
            variant={status === 'not-going' ? 'default' : 'outline'}
            onClick={() => setStatus('not-going')}
          >
            Can't Go
          </Button>
        </div>
      </div>
    </Card>
  );
}