import { BellRing, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

const notifications = [
  {
    title: "Your posts featuring '#coding', '#art', and '#photography' gain the highest engagement, highlighting your audience's strong interest in these topics.",
    description: "1 hour ago",
  },
  {
    title: "Image posts generally perform better, with the highest impressions and engagement compared to other formats.",
    description: "1 hour ago",
  },
  {
    title: "Being a 23-year-old from Korea using a tablet makes you relatable to tech-savvy and creative Gen Z audiences.",
    description: "1 hour ago",
  },
  {
    title: "Your posts tend to get maximum engagement on days close to holidays or year-end, indicating audience activity spikes during festive periods.",
    description: "1 hour ago",
  },
  {
    title: "Frequent interactions from users like 'katiewaters' and 'jjones' suggest a core group of followers contributing to your engagement.",
    description: "2 hours ago",
  },
]

type CardProps = React.ComponentProps<typeof Card>

export function Insights({ className, ...props }: CardProps) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Insights</CardTitle>
        <CardDescription>You have 3 unread insights.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 h-[250px] overflow-scroll">
        <div>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-normal leading-1">
                  {notification.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
