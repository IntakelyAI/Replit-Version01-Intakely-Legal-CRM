import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, Mic, Plus, Minus } from "lucide-react";
import { NodeConfigDialog } from '../components/NodeConfigDialog';
import { useLocation } from 'wouter';

interface Node {
  id: string;
  type: string;
  position: { x: number, y: number };
  config?: {
    prompt?: string;
    tools?: string[];
    jsonSchema?: any;
  };
}

interface Edge {
  from: string;
  to: string;
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

  const [edges] = useState<Edge[]>([
    { from: '1', to: '2' },
    { from: '2', to: '3' },
    { from: '2', to: '4' },
    { from: '2', to: '5' },
    { from: '4', to: '6' },
  ]);

  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [zoom, setZoom] = useState(1);

  const handleNodeClick = (nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      setSelectedNode(node);
      setIsConfigOpen(true);
    }
  };

  const handleConfigSave = (config: any) => {
    setNodes(nodes.map(node => 
      node.id === selectedNode?.id 
        ? { ...node, config } 
        : node
    ));
    setIsConfigOpen(false);
  };

  const handleZoom = (delta: number) => {
    setZoom(Math.max(0.5, Math.min(2, zoom + delta)));
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
        <div className="absolute inset-0" style={{ transform: `scale(${zoom})`, transformOrigin: '50% 0%' }}>
          <svg className="w-full h-full">
            {/* Edges */}
            {edges.map((edge, index) => {
              const fromNode = nodes.find(n => n.id === edge.from);
              const toNode = nodes.find(n => n.id === edge.to);
              if (!fromNode || !toNode) return null;

              return (
                <path
                  key={index}
                  d={`M ${fromNode.position.x} ${fromNode.position.y + 30} L ${toNode.position.x} ${toNode.position.y - 30}`}
                  className="stroke-gray-600"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
              );
            })}

            {/* Arrow marker definition */}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3.5, 0 7"
                  fill="#4B5563"
                />
              </marker>
            </defs>
          </svg>

          {/* Nodes */}
          {nodes.map((node) => (
            <div
              key={node.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 w-48 h-24 
                       bg-gray-900 border border-gray-800 rounded-lg p-4 cursor-pointer
                       hover:border-green-500 transition-colors"
              style={{ 
                left: node.position.x, 
                top: node.position.y,
                borderColor: node.config ? '#22C55E' : undefined
              }}
              onClick={() => handleNodeClick(node.id)}
            >
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${node.config ? 'bg-green-500' : 'bg-gray-500'}`} />
                <span className="text-sm text-gray-300">{node.type}</span>
              </div>
              {node.config?.prompt && (
                <div className="mt-2 text-xs text-gray-400 truncate">
                  {node.config.prompt.substring(0, 50)}...
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Zoom Controls */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          <Button variant="outline" size="sm" className="bg-gray-900" onClick={() => handleZoom(-0.1)}>
            <Minus className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="bg-gray-900" onClick={() => handleZoom(0.1)}>
            <Plus className="h-4 w-4" />
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

      <NodeConfigDialog
        open={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        node={selectedNode}
        onSave={handleConfigSave}
      />
    </div>
  );
}