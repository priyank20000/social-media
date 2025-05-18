"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus } from "lucide-react";

interface PollOption {
  id: string;
  text: string;
}

export function PollCreator() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<PollOption[]>([
    { id: "1", text: "" },
    { id: "2", text: "" }
  ]);

  const addOption = () => {
    if (options.length < 4) {
      setOptions([...options, { id: Date.now().toString(), text: "" }]);
    }
  };

  const removeOption = (id: string) => {
    if (options.length > 2) {
      setOptions(options.filter(option => option.id !== id));
    }
  };

  const updateOption = (id: string, text: string) => {
    setOptions(options.map(option =>
      option.id === id ? { ...option, text } : option
    ));
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <Input
            placeholder="Ask a question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="text-lg font-semibold"
          />
        </div>

        <div className="space-y-4">
          {options.map((option, index) => (
            <div key={option.id} className="flex gap-2">
              <Input
                placeholder={`Option ${index + 1}`}
                value={option.text}
                onChange={(e) => updateOption(option.id, e.target.value)}
              />
              {options.length > 2 && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeOption(option.id)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}

          {options.length < 4 && (
            <Button
              variant="outline"
              onClick={addOption}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Option
            </Button>
          )}
        </div>

        <Button className="w-full" disabled={!question || options.some(opt => !opt.text)}>
          Create Poll
        </Button>
      </div>
    </Card>
  );
}