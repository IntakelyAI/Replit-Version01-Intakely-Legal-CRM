import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type StatsCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  changeText?: string;
  changePercentage?: string;
  changeDirection?: "up" | "down" | "neutral";
};

export default function StatsCard({
  title,
  value,
  icon: Icon,
  changeText,
  changePercentage,
  changeDirection = "neutral",
}: StatsCardProps) {
  return (
    <div className="rounded-lg border border-sidebar-border bg-card p-6">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-primary" />
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      <p className="mt-4 text-3xl font-bold">{value}</p>
      {changeText && (
        <p className="mt-1 text-xs text-muted-foreground flex items-center">
          {changeDirection === "up" && (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-3 w-3 mr-1 text-green-400" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M12 7a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L12 12.586V7z" clipRule="evenodd" />
            </svg>
          )}
          {changeDirection === "down" && (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-3 w-3 mr-1 text-red-400" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M12 13a1 1 0 10-2 0v-5.586l-1.293 1.293a1 1 0 01-1.414-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L12 7.414V13z" clipRule="evenodd" />
            </svg>
          )}
          {changePercentage && <span className={`font-medium ${changeDirection === 'up' ? 'text-green-400' : changeDirection === 'down' ? 'text-red-400' : ''}`}>{changePercentage} </span>}
          {changeText}
        </p>
      )}
    </div>
  );
}
