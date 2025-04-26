import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface NodeConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  node: any;
  onSave: (config: any) => void;
}

export function NodeConfigDialog({ open, onOpenChange, node, onSave }: NodeConfigDialogProps) {
  const [prompt, setPrompt] = React.useState('');
  const [selectedTools, setSelectedTools] = React.useState<string[]>([]);
  const [jsonSchema, setJsonSchema] = React.useState('');

  const handleSave = () => {
    onSave({
      id: node?.id,
      prompt,
      tools: selectedTools,
      jsonSchema: jsonSchema ? JSON.parse(jsonSchema) : null,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Configure Node: {node?.type}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="prompt" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="prompt">Prompt</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
            <TabsTrigger value="schema">Schema</TabsTrigger>
          </TabsList>

          <TabsContent value="prompt">
            <Textarea
              placeholder="Enter your prompt here..."
              className="min-h-[200px]"
              defaultValue={node?.data?.prompt || ''}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </TabsContent>

          <TabsContent value="tools">
            <div className="grid grid-cols-2 gap-4">
              {tools.map((tool) => (
                <div key={tool.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={tool.id}
                    checked={selectedTools.includes(tool.id)}
                    onCheckedChange={(checked) => {
                      setSelectedTools(checked
                        ? [...selectedTools, tool.id]
                        : selectedTools.filter(id => id !== tool.id)
                      );
                    }}
                  />
                  <Label htmlFor={tool.id}>
                    {tool.icon} {tool.name}
                  </Label>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="schema">
            <Textarea
              placeholder="Enter JSON schema..."
              className="min-h-[200px] font-mono"
              value={jsonSchema}
              onChange={(e) => setJsonSchema(e.target.value)}
            />
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const tools = [
  { id: 'end-call', name: 'End Call', icon: '📞' },
  { id: 'call-transfer', name: 'Call Transfer', icon: '↗️' },
  { id: 'calendar', name: 'Calendar Booking', icon: '📅' },
  { id: 'ivr', name: 'Press Digit (IVR Navigation)', icon: '🔢' },
  { id: 'calendar-check', name: 'Check Calendar Availability', icon: '✓' },
  { id: 'custom', name: 'Custom Function', icon: '⚙️' },
];