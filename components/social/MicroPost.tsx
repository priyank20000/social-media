"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

const MAX_CHARS = 280;

export function MicroPost() {
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(false);

  const charsLeft = MAX_CHARS - content.length;
  const isOverLimit = charsLeft < 0;

  return (
    <Card className="p-4">
      <div className="space-y-4">
        {!preview ? (
          <>
            <Textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[100px] resize-none"
            />
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isOverLimit ? 'text-red-500' : 'text-muted-foreground'}`}>
                {charsLeft} characters remaining
              </span>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setPreview(true)}
                  disabled={content.length === 0 || isOverLimit}
                >
                  Preview
                </Button>
                <Button
                  disabled={content.length === 0 || isOverLimit}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Post
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div className="prose dark:prose-invert">
              <p className="whitespace-pre-wrap">{content}</p>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setPreview(false)}
              >
                Edit
              </Button>
              <Button>
                <Send className="h-4 w-4 mr-2" />
                Post
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}