
import * as React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface VoiceSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VoiceSettingsDialog({ open, onOpenChange }: VoiceSettingsDialogProps) {
  const [responsiveness, setResponsiveness] = React.useState(1);
  const [interruptionSensitivity, setInterruptionSensitivity] = React.useState(0.75);
  const [enableBackchannel, setEnableBackchannel] = React.useState(true);
  const [backchannelFrequency, setBackchannelFrequency] = React.useState(0.4);
  const [backchannelWords, setBackchannelWords] = React.useState("I see, I understand, Got it, That's right");
  const [transcriptionMode, setTranscriptionMode] = React.useState("speed");
  const [enableSpeechNormalization, setEnableSpeechNormalization] = React.useState(true);
  const [enableTranscriptFormatting, setEnableTranscriptFormatting] = React.useState(true);
  const [reminderFrequency, setReminderFrequency] = React.useState({ seconds: 30, times: 3 });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-background text-foreground">
        <DialogHeader>
          <DialogTitle>Voice & Speech Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-4">
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

            <div className="flex items-center justify-between">
              <Label>Enable Backchannel</Label>
              <Switch checked={enableBackchannel} onCheckedChange={setEnableBackchannel} />
            </div>

            {enableBackchannel && (
              <>
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

                <div className="space-y-2">
                  <Label>Backchannel Words</Label>
                  <Textarea
                    value={backchannelWords}
                    onChange={(e) => setBackchannelWords(e.target.value)}
                    placeholder="Enter comma-separated words..."
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

            <div className="flex items-center justify-between">
              <Label>Enable Speech Normalization</Label>
              <Switch checked={enableSpeechNormalization} onCheckedChange={setEnableSpeechNormalization} />
            </div>

            <div className="flex items-center justify-between">
              <Label>Enable Transcript Formatting</Label>
              <Switch checked={enableTranscriptFormatting} onCheckedChange={setEnableTranscriptFormatting} />
            </div>

            <div className="space-y-2">
              <Label>Reminder Frequency</Label>
              <div className="flex gap-4">
                <Input
                  type="number"
                  value={reminderFrequency.seconds}
                  onChange={(e) => setReminderFrequency(prev => ({ ...prev, seconds: parseInt(e.target.value) }))}
                  className="w-20"
                />
                <span className="self-center">seconds,</span>
                <Input
                  type="number"
                  value={reminderFrequency.times}
                  onChange={(e) => setReminderFrequency(prev => ({ ...prev, times: parseInt(e.target.value) }))}
                  className="w-20"
                />
                <span className="self-center">times</span>
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
