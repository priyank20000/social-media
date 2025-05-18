"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, MessageCircle, Filter } from "lucide-react";

interface Question {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  tags: string[];
  votes: number;
  answers: number;
  userVote: "up" | "down" | null;
}

export function QABoard() {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      title: "How to track engagement across multiple platforms?",
      content: "I'm trying to consolidate analytics from different social media platforms. What's the best approach?",
      author: {
        name: "Sarah Smith",
        avatar: "/images/user/sara.jpeg"
      },
      tags: ["analytics", "multi-platform", "engagement"],
      votes: 15,
      answers: 3,
      userVote: null
    },
    {
      id: "2",
      title: "Best tools for social media scheduling?",
      content: "Looking for recommendations on tools that can help with content scheduling and analytics.",
      author: {
        name: "Mike Johnson",
        avatar: "/images/user/mike.jpg"
      },
      tags: ["tools", "scheduling", "content"],
      votes: 8,
      answers: 5,
      userVote: null
    }
  ]);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleVote = (questionId: string, voteType: "up" | "down") => {
    setQuestions(questions.map(question => {
      if (question.id !== questionId) return question;

      const currentVote = question.userVote;
      let voteDiff = 0;

      if (currentVote === voteType) {
        // Removing vote
        voteDiff = voteType === "up" ? -1 : 1;
        return { ...question, userVote: null, votes: question.votes + voteDiff };
      } else if (currentVote === null) {
        // Adding new vote
        voteDiff = voteType === "up" ? 1 : -1;
        return { ...question, userVote: voteType, votes: question.votes + voteDiff };
      } else {
        // Changing vote
        voteDiff = voteType === "up" ? 2 : -2;
        return { ...question, userVote: voteType, votes: question.votes + voteDiff };
      }
    }));
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredQuestions = selectedTags.length > 0
    ? questions.filter(question =>
        question.tags.some(tag => selectedTags.includes(tag))
      )
    : questions;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search questions..."
          className="max-w-sm"
        />
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {Array.from(new Set(questions.flatMap(q => q.tags))).map(tag => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>

      <div className="space-y-4">
        {filteredQuestions.map(question => (
          <Card key={question.id} className="p-6">
            <div className="flex gap-4">
              <div className="flex flex-col items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleVote(question.id, "up")}
                  className={question.userVote === "up" ? "text-primary" : ""}
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <span className="font-semibold">{question.votes}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleVote(question.id, "down")}
                  className={question.userVote === "down" ? "text-destructive" : ""}
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <Avatar>
                    <AvatarImage src={question.author.avatar} alt={question.author.name} />
                    <AvatarFallback>{question.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-semibold">{question.author.name}</span>
                </div>

                <h3 className="text-lg font-semibold mb-2">{question.title}</h3>
                <p className="text-muted-foreground mb-4">{question.content}</p>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex flex-wrap gap-2">
                    {question.tags.map(tag => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {question.answers} answers
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}