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
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, Plus, Phone } from 'lucide-react';
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
  const initialNodes: WorkflowNode[] = [
    {
      id: '1',
      type: 'input',
      position: { x: 400, y: 50 },
      style: { 
        background: '#1a1b1e', 
        padding: '15px',
        borderRadius: '8px',
        border: '1px solid rgba(255,255,255,0.1)',
        width: 200,
        color: '#fff',
        fontSize: '14px',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        '&:hover': {
          borderColor: 'rgba(255,255,255,0.2)',
          transform: 'translateY(-1px)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
        }
      },
      data: { 
        label: 'Initial Contact',
        type: 'Starting Point',
        prompt: 'Begin conversation'
      }
    },
    {
      id: '2',
      type: 'default',
      position: { x: 200, y: 200 },
      style: { 
        background: '#1a1b1e', 
        padding: '15px',
        borderRadius: '8px',
        border: '1px solid rgba(255,255,255,0.1)',
        width: 200,
        color: '#fff',
        fontSize: '14px',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        '&:hover': {
          borderColor: 'rgba(255,255,255,0.2)',
          transform: 'translateY(-1px)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
        }
      },
      data: {
        label: 'Qualification',
        type: 'Agent',
        prompt: 'Qualify the lead'
      }
    },
    {
      id: '3',
      type: 'default',
      position: { x: 600, y: 200 },
      style: { 
        background: '#1a1b1e', 
        padding: '15px',
        borderRadius: '8px',
        border: '1px solid rgba(255,255,255,0.1)',
        width: 200,
        color: '#fff',
        fontSize: '14px',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        '&:hover': {
          borderColor: 'rgba(255,255,255,0.2)',
          transform: 'translateY(-1px)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
        }
      },
      data: {
        label: 'Schedule Meeting',
        type: 'Agent',
        prompt: 'Schedule meeting'
      }
    }
  ];

  const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#555' } },
    { id: 'e1-3', source: '1', target: '3', animated: true, style: { stroke: '#555' } }
  ];

  const [nodes, setNodes] = useState<WorkflowNode[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  const onNodesChange = useCallback((changes: any) => {
    setNodes((nds) => {
      return nds.map((node) => {
        const change = changes.find((c: any) => c.id === node.id);
        if (change && change.position) {
          return { ...node, position: change.position };
        }
        return node;
      });
    });
  }, []);

  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#555' } }, eds));
  }, []);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
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
              ...config
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
      position: { x: 400, y: 100 + (nodes.length * 100) },
      style: { 
        background: '#1a1b1e', 
        padding: '15px',
        borderRadius: '8px',
        border: '1px solid rgba(255,255,255,0.1)',
        width: 200,
        color: '#fff',
        fontSize: '14px',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        '&:hover': {
          borderColor: 'rgba(255,255,255,0.2)',
          transform: 'translateY(-1px)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
        }
      },
      data: {
        label: `New Node ${nodes.length + 1}`,
        type: 'Agent',
        prompt: ''
      }
    };
    setNodes([...nodes, newNode]);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="border-b border-border/30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setLocation('/agent-builder/detail/ag_566_13')}
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

      <div className="flex" style={{ height: 'calc(100vh - 56px)' }}>
        <div style={{ flex: 1 }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            connectionMode={ConnectionMode.Loose}
            defaultEdgeOptions={{
              style: { stroke: '#555' },
              animated: true
            }}
            fitView
          >
            <Background color="#333" gap={16} />
            <Controls />
            <MiniMap 
              style={{ 
                backgroundColor: '#1a1b1e',
                maskImage: 'none'
              }} 
              nodeColor="#666"
            />
          </ReactFlow>
        </div>
        
        <div className="w-80 border-l border-border/30 bg-background/95 p-4">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Test Voice Agent</h3>
            <div className="rounded-lg border border-border/30 p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Agent Status</span>
                <Badge variant="outline">Ready</Badge>
              </div>
              <Button className="w-full" onClick={() => console.log("Start test call")}>
                <Phone className="mr-2 h-4 w-4" />
                Start Test Call
              </Button>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Execution Path</h4>
              <div className="rounded-lg border border-border/30 p-2 min-h-[200px] text-sm">
                <div className="text-muted-foreground">No execution path yet</div>
              </div>
            </div>
          </div>
        </div>
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