
import * as React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface VoiceSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VoiceSettingsDialog({ open, onOpenChange }: VoiceSettingsDialogProps) {
  const [backgroundSound, setBackgroundSound] = React.useState("call-center");
  const [responsiveness, setResponsiveness] = React.useState(1);
  const [interruptionSensitivity, setInterruptionSensitivity] = React.useState(0.75);
  const [enableBackchanneling, setEnableBackchanneling] = React.useState(true);
  const [backchannelFrequency, setBackchannelFrequency] = React.useState(0.4);
  const [backchannelWords, setBackchannelWords] = React.useState("\"I see\" \"I understand\" \"Got it\" \"That's right\"");
  const [transcriptionMode, setTranscriptionMode] = React.useState("speed");
  const [boostKeywords, setBoostKeywords] = React.useState("");
  const [enableSpeechNormalization, setEnableSpeechNormalization] = React.useState(true);
  const [enableTranscriptFormatting, setEnableTranscriptFormatting] = React.useState(true);
  const [reminderFrequency, setReminderFrequency] = React.useState({ seconds: 30, times: 3 });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-background text-foreground max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Speech Settings</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Background Sound</Label>
              <Select value={backgroundSound} onValueChange={setBackgroundSound}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="call-center">Call Center</SelectItem>
                  <SelectItem value="office">Office</SelectItem>
                  <SelectItem value="none">None</SelectItem>
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
              <p className="text-sm text-muted-foreground">Controls how fast the agent responds after users finish speaking.</p>
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
              <p className="text-sm text-muted-foreground">Controls how easily AI can be interrupted by human speech.</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Enable Backchanneling</Label>
                <Switch checked={enableBackchanneling} onCheckedChange={setEnableBackchanneling} />
              </div>
              <p className="text-sm text-muted-foreground">Enables the agent to use active listening acknowledgments naturally.</p>
            </div>

            {enableBackchanneling && (
              <>
                <div className="space-y-2">
                  <Label>Backchannel Frequency</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[backchannelFrequency]}
                      onValueChange={([value]) => setBackchannelFrequency(value)}
                      max={1}
                      step={0.01}
                      className="flex-1"
                    />
                    <span className="w-12 text-right">{backchannelFrequency.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Backchannel Words</Label>
                  <Input
                    value={backchannelWords}
                    onChange={(e) => setBackchannelWords(e.target.value)}
                    placeholder="Enter words separated by quotes"
                  />
                </div>
              </>
            )}

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
              <Label>Boosted Keywords</Label>
              <Input
                value={boostKeywords}
                onChange={(e) => setBoostKeywords(e.target.value)}
                placeholder="Split by comma. Example: Retail,Walrus"
              />
              <p className="text-sm text-muted-foreground">Provide a custom list of keywords to expand our model's vocabulary.</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Enable Speech Normalization</Label>
                <Switch checked={enableSpeechNormalization} onCheckedChange={setEnableSpeechNormalization} />
              </div>
              <p className="text-sm text-muted-foreground">Normalizes text numbers, currency, and dates to standard formats from speech.</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Enable Transcript Formatting</Label>
                <Switch checked={enableTranscriptFormatting} onCheckedChange={setEnableTranscriptFormatting} />
              </div>
              <p className="text-sm text-muted-foreground">Enable automatic formatting of numbers being formatted as timestamps.</p>
            </div>

            <div className="space-y-2">
              <Label>Reminder Message Frequency</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={reminderFrequency.seconds}
                  onChange={(e) => setReminderFrequency(prev => ({ ...prev, seconds: parseInt(e.target.value) }))}
                  className="w-20"
                />
                <span>seconds,</span>
                <Input
                  type="number"
                  value={reminderFrequency.times}
                  onChange={(e) => setReminderFrequency(prev => ({ ...prev, times: parseInt(e.target.value) }))}
                  className="w-20"
                />
                <span>times</span>
              </div>
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
