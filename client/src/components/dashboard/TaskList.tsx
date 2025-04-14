import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Users, Code } from "lucide-react";
import { cn } from "@/lib/utils";

type Task = {
  id: string;
  title: string;
  dueTime: string;
  type: 'document' | 'client' | 'technical';
};

type TaskListProps = {
  title: string;
  count: number;
  subtitle: string;
  tasks: Task[];
};

export function TaskList({ title, count, subtitle, tasks }: TaskListProps) {
  // Select icon based on task type
  const getTaskIcon = (type: Task['type']) => {
    switch(type) {
      case 'document':
        return <FileText className="h-5 w-5 text-primary" />;
      case 'client':
        return <Users className="h-5 w-5 text-primary" />;
      case 'technical':
        return <Code className="h-5 w-5 text-primary" />;
      default:
        return <FileText className="h-5 w-5 text-primary" />;
    }
  };
  
  return (
    <Card>
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium">{title}</h3>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
          {count}
        </span>
      </div>
      
      <div className="px-4 py-3 sm:px-6 text-sm text-muted-foreground border-t border-border">
        {subtitle}
      </div>
      
      <ScrollArea className="h-60">
        <ul className="divide-y divide-border">
          {tasks.map((task) => (
            <li 
              key={task.id} 
              className="px-4 py-4 sm:px-6 hover:bg-muted/50 cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 bg-primary/10 rounded-md flex items-center justify-center">
                    {getTaskIcon(task.type)}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium">{task.title}</div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">{task.dueTime}</div>
              </div>
            </li>
          ))}
        </ul>
      </ScrollArea>
      
      <div className="px-4 py-4 sm:px-6 text-right border-t border-border">
        <a href="#" className="text-sm font-medium text-primary hover:text-primary/80">
          View all tasks <span aria-hidden="true">→</span>
        </a>
      </div>
    </Card>
  );
}
