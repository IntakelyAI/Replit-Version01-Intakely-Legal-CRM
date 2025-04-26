
import * as React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

interface ModelSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ModelSettingsDialog({ open, onOpenChange }: ModelSettingsDialogProps) {
  const [temperature, setTemperature] = React.useState(0);
  const [structuredOutput, setStructuredOutput] = React.useState(false);
  const [highPriority, setHighPriority] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-background">
        <DialogHeader>
          <DialogTitle>Model Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>LLM Temperature</Label>
            <p className="text-sm text-muted-foreground">Lower value yields better function call results.</p>
            <div className="flex items-center gap-4">
              <Slider
                value={[temperature]}
                onValueChange={([value]) => setTemperature(value)}
                max={1}
                step={0.01}
                className="flex-1"
              />
              <span className="w-12 text-right">{temperature.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <Label>Structured Output</Label>
                <p className="text-sm text-muted-foreground">Always generate responses that adhere to your supplied JSON Schema. This will make functions longer to save or update.</p>
              </div>
              <Switch
                checked={structuredOutput}
                onCheckedChange={setStructuredOutput}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <Label>High Priority</Label>
                <p className="text-sm text-muted-foreground">Use more dedicated resource pool to ensure lower and more consistent latency. This feature incurs a higher cost.</p>
              </div>
              <Switch
                checked={highPriority}
                onCheckedChange={setHighPriority}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
