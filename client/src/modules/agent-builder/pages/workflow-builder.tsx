import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Plus } from 'lucide-react';

interface Node {
  id: string;
  type: string;
  position: { x: number; y: number };
  config?: any;
}

interface Edge {
  id: string;
  from: string;
  to: string;
  label: string;
}

const defaultNode: Node = {
  id: 'start',
  type: 'Starting Point',
  position: { x: 400, y: 100 },
  config: {
    prompt: "Initial Node"
  }
};

export default function WorkflowBuilder() {
  const [, setLocation] = useLocation();
  const [nodes, setNodes] = useState<Node[]>([defaultNode]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const addNewNode = () => {
    const newNode: Node = {
      id: `node-${nodes.length + 1}`,
      type: 'Task Node',
      position: { 
        x: defaultNode.position.x,
        y: defaultNode.position.y + (nodes.length * 150)
      }
    };

    if (nodes.length > 0) {
      const lastNode = nodes[nodes.length - 1];
      setEdges([...edges, {
        id: `edge-${edges.length + 1}`,
        from: lastNode.id,
        to: newNode.id,
        label: 'Next'
      }]);
    }

    setNodes([...nodes, newNode]);
  };

  return (
    <div className="flex flex-col h-full bg-gray-950">
      <div className="border-b border-border/30 bg-background/50 backdrop-blur z-10">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setLocation('/agent-builder')}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <span className="text-sm font-medium">Workflow Builder</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={addNewNode}
            className="bg-gray-900"
          >
            <Plus className="h-4 w-4 mr-2" />
            New State
          </Button>
        </div>
      </div>
      <div className="flex-1 relative overflow-hidden">
        {nodes.map((node) => (
          <div
            key={node.id}
            className="absolute p-4 bg-gray-900 rounded-lg border border-border/30"
            style={{
              left: node.position.x,
              top: node.position.y,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="text-sm font-medium">{node.type}</div>
          </div>
        ))}
      </div>
    </div>
  );
}