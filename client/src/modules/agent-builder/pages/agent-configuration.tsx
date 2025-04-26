
import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  PlusCircle, 
  Search, 
  Bot,
  Settings,
  Play
} from "lucide-react";

export default function AgentConfiguration() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">AI Agents</h1>
          <p className="text-muted-foreground">Create and manage your intelligent agents</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Import</Button>
          <Button>
            Create New Agent
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center">
          <div className="relative mr-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search agents..."
              className="pl-9 h-9 w-52"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <CardContent className="p-0">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-medium">Client Intake Bot</h3>
                  <p className="text-sm text-muted-foreground">Intake</p>
                </div>
              </div>
              <div className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs">
                active
              </div>
            </div>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Run:</span>
                <span>2 hours ago</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Success Rate:</span>
                <span>92%</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Settings className="h-4 w-4 mr-1" />
                Configure
              </Button>
              <Button size="sm" className="flex-1">
                <Play className="h-4 w-4 mr-1" />
                Run
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
