import React, { useState, useCallback } from 'react';
import { useLocation } from 'wouter';
import ReactFlow, { 
  Node, 
  Edge,
  Connection, 
  Background,
  Controls,
  MiniMap,
  addEdge,
  ConnectionMode
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { ChevronLeft, Plus } from 'lucide-react';
import { NodeConfigDialog } from '../components/NodeConfigDialog';

interface WorkflowNode extends Node {
  data: {
    label: string;
    type: string;
    prompt?: string;
    tools?: string[];
    schema?: string;
  }
}

export default function WorkflowBuilder() {
  const [, setLocation] = useLocation();
  const [nodes, setNodes] = useState<WorkflowNode[]>([
    {
      id: 'warm-lead',
      type: 'input',
      position: { x: 400, y: 50 },
      data: { 
        label: 'Warm Lead Qualification',
        type: 'Starting Point',
        prompt: 'Initial qualification process'
      }
    },
    {
      id: 'booking',
      type: 'default',
      position: { x: 200, y: 200 },
      data: {
        label: 'Booking Calendar Agent',
        type: 'Processing Node',
        prompt: 'Schedule appointment'
      }
    },
    {
      id: 'follow-up',
      type: 'default',
      position: { x: 400, y: 200 },
      data: {
        label: 'Follow Up Agent',
        type: 'Processing Node',
        prompt: 'Follow up with client'
      }
    },
    {
      id: 'transfer',
      type: 'default',
      position: { x: 600, y: 200 },
      data: {
        label: 'Call Transfer Agent',
        type: 'Processing Node',
        prompt: 'Transfer call to representative'
      }
    },
    {
      id: 'end',
      type: 'output',
      position: { x: 400, y: 350 },
      data: {
        label: 'End Call',
        type: 'End Point',
        prompt: 'End conversation'
      }
    }
  ]);

  const [edges, setEdges] = useState<Edge[]>([
    { id: 'e1', source: 'warm-lead', target: 'booking', type: 'smoothstep', animated: true },
    { id: 'e2', source: 'warm-lead', target: 'follow-up', type: 'smoothstep', animated: true },
    { id: 'e3', source: 'warm-lead', target: 'transfer', type: 'smoothstep', animated: true },
    { id: 'e4', source: 'booking', target: 'end', type: 'smoothstep', animated: true },
    { id: 'e5', source: 'follow-up', target: 'end', type: 'smoothstep', animated: true },
    { id: 'e6', source: 'transfer', target: 'end', type: 'smoothstep', animated: true }
  ]);
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  const onNodesChange = useCallback((changes: any) => {
    setNodes((nds) => {
      const updatedNodes = nds.map((node) => {
        const change = changes.find((c: any) => c.id === node.id);
        if (change && change.position) {
          return { ...node, position: change.position };
        }
        return node;
      });
      return updatedNodes;
    });
  }, []);

  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) => addEdge({ ...params, type: 'smoothstep', animated: true }, eds));
  }, []);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    event.preventDefault();
    setSelectedNode(node as WorkflowNode);
    setIsConfigOpen(true);
  }, []);

  const onConfigSave = useCallback((config: any) => {
    if (!selectedNode) return;

    setNodes(nodes.map(node => 
      node.id === selectedNode.id 
        ? {
            ...node,
            data: {
              ...node.data,
              ...config,
              label: config.type || node.data.label
            }
          }
        : node
    ));
    setIsConfigOpen(false);
  }, [nodes, selectedNode]);

  const addNewNode = () => {
    const newNode: WorkflowNode = {
      id: `node-${nodes.length + 1}`,
      type: 'default',
      position: { 
        x: 400,
        y: 100 + (nodes.length * 150)
      },
      data: {
        label: `Task ${nodes.length + 1}`,
        type: 'Processing Node',
        prompt: '',
        tools: [],
        schema: '{}'
      }
    };

    setNodes([...nodes, newNode]);
  };

  const defaultEdgeOptions = {
    style: { stroke: '#888' },
    animated: true,
    type: 'smoothstep',
  };




  return (
    <div className="flex flex-col h-full bg-background">
      <div className="border-b border-border/30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
            className="bg-background"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Node
          </Button>
        </div>
      </div>

      <div className="flex-1 w-full h-[calc(100vh-3.5rem)]"> {/* Modified this div */}
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          connectionMode={ConnectionMode.Loose}
          defaultEdgeOptions={defaultEdgeOptions}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>

      {selectedNode && (
        <NodeConfigDialog
          open={isConfigOpen}
          onOpenChange={setIsConfigOpen}
          node={selectedNode}
          onSave={onConfigSave}
        />
      )}
    </div>
  );
}