"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Camera, X } from "lucide-react";

interface Interest {
  id: string;
  name: string;
}

export function ProfileEditor() {
  const [avatar, setAvatar] = useState("/images/user/sara.jpeg");
  const [name, setName] = useState("Sarah Smith");
  const [bio, setBio] = useState("Social media analytics enthusiast | Data-driven marketer");
  const [newInterest, setNewInterest] = useState("");
  const [interests, setInterests] = useState<Interest[]>([
    { id: "1", name: "Analytics" },
    { id: "2", name: "Social Media" },
    { id: "3", name: "Marketing" },
    { id: "4", name: "Data Science" }
  ]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddInterest = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newInterest.trim()) {
      setInterests([
        ...interests,
        { id: Date.now().toString(), name: newInterest.trim() }
      ]);
      setNewInterest("");
    }
  };

  const handleRemoveInterest = (id: string) => {
    setInterests(interests.filter(interest => interest.id !== id));
  };

  return (
    <Card className="max-w-2xl mx-auto p-6">
      <div className="space-y-8">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <Avatar className="h-32 w-32">
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback>{name[0]}</AvatarFallback>
            </Avatar>
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full cursor-pointer hover:bg-primary/90 transition-colors"
            >
              <Camera className="h-4 w-4" />
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-muted-foreground">{bio}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Bio</label>
            <Input
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Interests</label>
            <div className="mt-2 space-y-4">
              <div className="flex flex-wrap gap-2">
                {interests.map(interest => (
                  <Badge
                    key={interest.id}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {interest.name}
                    <button
                      onClick={() => handleRemoveInterest(interest.id)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <Input
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                onKeyPress={handleAddInterest}
                placeholder="Add an interest (press Enter)"
                className="mt-2"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </Card>
  );
}