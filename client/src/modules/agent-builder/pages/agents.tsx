import { Button } from "@/components/ui/button";
import { 
  Bot,
  Settings,
  Play
} from "lucide-react";

export default function Agents() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">AI Agents</h1>
          <p className="text-muted-foreground">Create and manage your intelligent agents</p>
        </div>
        <Button className="bg-violet-600 hover:bg-violet-700">
          <Bot className="h-4 w-4 mr-2" />
          Create New Agent
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4 bg-card">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">Client Intake Bot</h3>
              <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">
                active
              </span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Intake</p>
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between">
              <span>Last Run:</span>
              <span>2 hours ago</span>
            </div>
            <div className="flex justify-between">
              <span>Success Rate:</span>
              <span>92%</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-28 hover:bg-violet-100 transition-colors"
              onClick={() => window.location.href = '/agent-builder/configure'}
            >
              <Settings className="h-4 w-4 mr-2" />
              Configure
            </Button>
            <Button 
              variant="secondary" 
              size="sm" 
              className="w-28 hover:bg-violet-600 transition-colors"
            >
              <Play className="h-4 w-4 mr-2" />
              Run
            </Button>
          </div>
        </div>

        <div className="border rounded-lg p-4 bg-card">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">Document Summarizer</h3>
              <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">
                active
              </span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Document</p>
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between">
              <span>Last Run:</span>
              <span>1 day ago</span>
            </div>
            <div className="flex justify-between">
              <span>Success Rate:</span>
              <span>88%</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-28 hover:bg-violet-100 transition-colors"
              onClick={() => window.location.href = '/agent-builder/configure'}
            >
              <Settings className="h-4 w-4 mr-2" />
              Configure
            </Button>
            <Button 
              variant="secondary" 
              size="sm" 
              className="w-28 hover:bg-violet-600 transition-colors"
            >
              <Play className="h-4 w-4 mr-2" />
              Run
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}