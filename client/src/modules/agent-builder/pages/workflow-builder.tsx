
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, Mic, Plus, Minus } from "lucide-react";
import { useLocation } from 'wouter';

interface Node {
  id: string;
  type: string;
  position: { x: number, y: number };
}

export default function WorkflowBuilder() {
  const [, setLocation] = useLocation();
  const [nodes, setNodes] = useState<Node[]>([
    { id: '1', type: 'Starting State', position: { x: 400, y: 50 } },
    { id: '2', type: 'Warm Lead Qualification', position: { x: 400, y: 150 } },
    { id: '3', type: 'Booking Calendar Agent', position: { x: 200, y: 250 } },
    { id: '4', type: 'Follow-Up Agent', position: { x: 400, y: 250 } },
    { id: '5', type: 'Call Transfer Agent', position: { x: 600, y: 250 } },
    { id: '6', type: 'End Call', position: { x: 400, y: 350 } },
  ]);

  const handleNodeClick = (nodeId: string) => {
    console.log(`Node ${nodeId} clicked`);
    // Handle node click - can be expanded to show node details/configuration
  };

  return (
    <div className="flex flex-col h-full bg-gray-950">
      {/* Header */}
      <div className="border-b border-border/30 bg-background/50 backdrop-blur z-10">
        <div className="flex items-center px-4 h-10">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 mr-2" 
            onClick={() => setLocation('/agent-builder')}
          >
            <ChevronLeft size={16} />
          </Button>
          <span className="text-sm font-medium">Workflow Builder</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative overflow-hidden">
        {/* Canvas */}
        <div className="absolute inset-0">
          <svg className="w-full h-full">
            {/* Edges */}
            <path d="M 400 100 L 400 150" className="stroke-gray-600" strokeWidth="2" />
            <path d="M 400 200 L 200 250" className="stroke-gray-600" strokeWidth="2" />
            <path d="M 400 200 L 400 250" className="stroke-gray-600" strokeWidth="2" />
            <path d="M 400 200 L 600 250" className="stroke-gray-600" strokeWidth="2" />
            <path d="M 400 300 L 400 350" className="stroke-gray-600" strokeWidth="2" />
          </svg>
          
          {/* Nodes */}
          {nodes.map((node) => (
            <div
              key={node.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 w-48 h-24 
                         bg-gray-900 border border-gray-800 rounded-lg p-4 cursor-pointer
                         hover:border-green-500 transition-colors"
              style={{ left: node.position.x, top: node.position.y }}
              onClick={() => handleNodeClick(node.id)}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-sm text-gray-300">{node.type}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          <Button variant="outline" size="sm" className="bg-gray-900">
            <Plus className="h-4 w-4 mr-2" />
            New State
          </Button>
          <Button variant="outline" size="sm" className="bg-gray-900">
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="bg-gray-900">
            <Minus className="h-4 w-4" />
          </Button>
        </div>

        {/* Right Panel */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center">
            <Mic className="h-8 w-8 text-gray-400" />
          </div>
          <span className="text-sm text-gray-400">Test your agent</span>
          <Button variant="outline" size="sm" className="bg-gray-900">
            Test
          </Button>
        </div>
      </div>
    </div>
  );
}
