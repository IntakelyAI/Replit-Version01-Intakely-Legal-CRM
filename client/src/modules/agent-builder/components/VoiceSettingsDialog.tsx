
import * as React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface VoiceSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VoiceSettingsDialog({ open, onOpenChange }: VoiceSettingsDialogProps) {
  const [responsiveness, setResponsiveness] = React.useState(1);
  const [interruptionSensitivity, setInterruptionSensitivity] = React.useState(0.75);
  const [voiceModel, setVoiceModel] = React.useState("noah");
  const [transcriptionMode, setTranscriptionMode] = React.useState("speed");
  const [customPrompt, setCustomPrompt] = React.useState("");
  const [enableTranscriptFormatting, setEnableTranscriptFormatting] = React.useState(true);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-background text-foreground">
        <DialogHeader>
          <DialogTitle>Voice & Speech Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Voice Model</Label>
              <Select value={voiceModel} onValueChange={setVoiceModel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="noah">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs">N</div>
                      <span>Noah (en-AU)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="emma">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">E</div>
                      <span>Emma (en-GB)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="james">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">J</div>
                      <span>James (en-US)</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Responsiveness</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[responsiveness]}
                  onValueChange={([value]) => setResponsiveness(value)}
                  max={1}
                  step={0.01}
                  className="flex-1"
                />
                <span className="w-12 text-right">{responsiveness.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Interruption Sensitivity</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[interruptionSensitivity]}
                  onValueChange={([value]) => setInterruptionSensitivity(value)}
                  max={1}
                  step={0.01}
                  className="flex-1"
                />
                <span className="w-12 text-right">{interruptionSensitivity.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Transcription Mode</Label>
              <RadioGroup value={transcriptionMode} onValueChange={setTranscriptionMode}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="speed" id="speed" />
                  <Label htmlFor="speed">Optimize for speed</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="accuracy" id="accuracy" />
                  <Label htmlFor="accuracy">Optimize for accuracy</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Custom Voice Prompt</Label>
              <Textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Enter custom voice prompt..."
                className="h-20"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>Enable Transcript Formatting</Label>
              <Switch
                checked={enableTranscriptFormatting}
                onCheckedChange={setEnableTranscriptFormatting}
              />
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
