import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  gradient: string;
  iconColor: string;
}

export function StatsCard({ title, value, icon: Icon, gradient, iconColor }: StatsCardProps) {
  return (
    <Card className={`p-6 bg-gradient-to-br ${gradient} overflow-hidden`}>
      <div className="relative flex items-center gap-4">
        <div>
          <p className="text-sm text-white">{title}</p>
          <h3 className="text-3xl font-bold text-white">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </h3>
        </div>
        <div className={`absolute right-[-55px] bottom-[-50px] p-4`}>
          <Icon className={`w-24 h-24 ${iconColor}`} />
        </div>
      </div>
    </Card>
  );
}