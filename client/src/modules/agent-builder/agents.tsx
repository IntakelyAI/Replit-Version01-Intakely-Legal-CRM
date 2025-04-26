
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Settings, Play, Sparkles } from "lucide-react";

interface Agent {
  id: string;
  name: string;
  type: string;
  status: string;
  lastRun: string;
  successRate: string;
}

export default function Agents() {
  const agents: Agent[] = [
    {
      id: "1",
      name: "Client Intake Bot",
      type: "Intake",
      status: "active",
      lastRun: "2 hours ago",
      successRate: "92%"
    },
    {
      id: "2",
      name: "Document Summarizer",
      type: "Document",
      status: "active",
      lastRun: "1 day ago",
      successRate: "88%"
    }
  ];

  const agentTypes = [
    {
      id: "conversation-flow",
      name: "Conversation Flow Agent",
      description: "For tasks with complex transitions",
      icon: "🔄"
    },
    {
      id: "single-prompt",
      name: "Single Prompt Agent",
      description: "For short calls and straightforward tasks",
      icon: "📝"
    },
    {
      id: "multi-prompt",
      name: "Multi-Prompt Agent",
      description: "For lengthy calls and complex tasks",
      icon: "📑"
    },
    {
      id: "custom-llm",
      name: "Custom LLM",
      description: "Attach your custom llm link",
      icon: "🤖"
    }
  ];

  const [showAgentTypes, setShowAgentTypes] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">AI Agents</h1>
          <p className="text-muted-foreground">Create and manage your intelligent agents</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Import</Button>
          <Button onClick={() => setShowAgentTypes(!showAgentTypes)}>
            Create New Agent
          </Button>
        </div>
      </div>

      {showAgentTypes && (
        <Card className="mb-6">
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {agentTypes.map((type) => (
              <div key={type.id} className="flex items-start space-x-4 p-4 rounded-lg border cursor-pointer hover:bg-accent/50">
                <span className="text-2xl">{type.icon}</span>
                <div>
                  <h3 className="font-medium">{type.name}</h3>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((agent) => (
          <Card key={agent.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <CardTitle className="text-lg">{agent.name}</CardTitle>
                </div>
                <Badge variant={agent.status === 'active' ? 'success' : 'secondary'}>
                  {agent.status}
                </Badge>
              </div>
              <CardDescription>{agent.type}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last run:</span>
                  <span>{agent.lastRun}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Success rate:</span>
                  <span>{agent.successRate}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-1" /> Configure
              </Button>
              <Button size="sm">
                <Play className="h-4 w-4 mr-1" /> Run
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
