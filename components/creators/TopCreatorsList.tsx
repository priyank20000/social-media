import { Card } from "@/components/ui/card";
import type { User } from "@/lib/types";

interface TopCreatorsListProps {
  creators: Array<User & { engagement: number; postCount: number }>;
}

export function TopCreatorsList({ creators }: TopCreatorsListProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-6">Top Creators</h2>
      <div className="space-y-7">
        {creators.map((creator, index) => (
          <div key={creator.id} className="relative flex items-center gap-6">
            <div className="absolute flex justify-center items-center left-[-10px] bottom-[-5px] text-sm w-[30px] h-[30px] font-bold text-[#000000c4] border-2 border-[#000] bg-[#fff] rounded-full">
              #{index + 1}
            </div>
            <div className="flex items-center gap-3 flex-1">
              <div className="flex items-center gap-3">
                <div className="w-[60px] h-[60px] rounded-full overflow-hidden border-2 border-[#000]">
                  <img src={creator.avatarUrl} alt={creator.username} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-semibold">{creator.username}</p>
                  <p className="text-sm text-muted-foreground">
                    {creator.postCount} posts
                  </p>
                </div>
              </div>
            </div>
            <div className="text-right w-[100px] flex justify-center items-center flex-wrap">
              <p className="font-bold text-2xl">{creator.engagement.toLocaleString()}</p>
              <p className="text-xs p-1 px-3 text-muted-foreground">Engagements</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}