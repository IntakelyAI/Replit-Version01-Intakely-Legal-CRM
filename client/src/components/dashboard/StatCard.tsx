import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: {
    value: number;
    timeframe: string;
  };
  iconBgClassName?: string;
  iconClassName?: string;
};

export function StatCard({ 
  title, 
  value, 
  icon, 
  change, 
  iconBgClassName = "bg-primary/10 text-primary",
  iconClassName = "text-primary" 
}: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center">
          <div className={cn("flex-shrink-0 rounded-md p-3", iconBgClassName)}>
            {icon}
          </div>
          <div className="ml-5 w-0 flex-1">
            <div className="text-sm font-medium text-muted-foreground truncate">
              {title}
            </div>
            <div className="text-3xl font-bold">
              {value}
            </div>
          </div>
        </div>
        
        {change && (
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 dark:text-green-400 font-medium flex items-center">
              <ArrowUp className="w-5 h-5 mr-1" />
              {change.value}%
            </span>
            <span className="text-muted-foreground ml-2">
              from {change.timeframe}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
