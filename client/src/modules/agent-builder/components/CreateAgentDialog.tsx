
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link2, Network, MessageSquare, Brain } from "lucide-react";

interface AgentType {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const agentTypes: AgentType[] = [
  {
    icon: <Network className="h-6 w-6" />,
    title: "Conversation Flow Agent",
    description: "For tasks with complex transitions"
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Single Prompt Agent",
    description: "For short calls and straightforward tasks"
  },
  {
    icon: <Brain className="h-6 w-6" />,
    title: "Multi-Prompt Agent",
    description: "For lengthy calls and complex tasks"
  },
  {
    icon: <Link2 className="h-6 w-6" />,
    title: "Custom LLM",
    description: "Attach your custom llm link"
  }
];

export function CreateAgentDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="shadow-none">
          Create an Agent
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="ml-1">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-background">
        <DialogHeader>
          <DialogTitle>Select Agent Type</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {agentTypes.map((type, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 rounded-lg transition-all cursor-pointer hover:bg-accent/30 border border-transparent hover:border-primary"
              onClick={() => {
                setOpen(false);
                navigate('/agent-builder/detail/new');
              }}
            >
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                {type.icon}
              </div>
              <div>
                <h3 className="font-medium">{type.title}</h3>
                <p className="text-sm text-muted-foreground">{type.description}</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
