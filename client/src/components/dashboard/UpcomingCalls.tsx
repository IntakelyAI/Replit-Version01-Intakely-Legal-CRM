import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Building } from "lucide-react";

type Call = {
  id: string;
  company: string;
  time: string;
};

type UpcomingCallsProps = {
  calls: Call[];
  count: number;
  nextCallMessage: string;
};

export function UpcomingCalls({ calls, count, nextCallMessage }: UpcomingCallsProps) {
  return (
    <Card>
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium">Upcoming Calls</h3>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
          {count}
        </span>
      </div>
      
      <div className="px-4 py-3 sm:px-6 text-sm text-muted-foreground border-t border-border">
        {nextCallMessage}
      </div>
      
      <ScrollArea className="h-60">
        <ul className="divide-y divide-border">
          {calls.map((call) => (
            <li
              key={call.id}
              className="px-4 py-4 sm:px-6 hover:bg-muted/50 cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 bg-blue-100 dark:bg-blue-900/30 rounded-md flex items-center justify-center">
                    <Building className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium">{call.company}</div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">{call.time}</div>
              </div>
            </li>
          ))}
        </ul>
      </ScrollArea>
      
      <div className="px-4 py-4 sm:px-6 text-right border-t border-border">
        <a href="#" className="text-sm font-medium text-primary hover:text-primary/80">
          View all calls <span aria-hidden="true">→</span>
        </a>
      </div>
    </Card>
  );
}
