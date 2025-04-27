
import * as React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

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
  const [boostWords, setBoostWords] = React.useState("");
  const [enableSpeechNormalization, setEnableSpeechNormalization] = React.useState(true);
  const [enableTranscriptFormatting, setEnableTranscriptFormatting] = React.useState(true);
  const [reminderFrequency, setReminderFrequency] = React.useState({ seconds: 30, times: 3 });
  const [pronunciation, setPronunciation] = React.useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-background text-foreground">
        <DialogHeader>
          <DialogTitle>Speech Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-4">
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

            <div className="flex items-center justify-between">
              <Label>Enable Backchanneling</Label>
              <Switch checked={enableBackchannel} onCheckedChange={setEnableBackchannel} />
            </div>

            <div className="space-y-2">
              <Label>Backchannel Frequency</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[backchannelFrequency]}
                  onValueChange={([value]) => setBackchannelFrequency(value)}
                  max={1}
                  step={0.01}
                  className="flex-1"
                  disabled={!enableBackchannel}
                />
                <span className="w-12 text-right">{backchannelFrequency.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Backchannel Words</Label>
              <Textarea
                value={backchannelWords}
                onChange={(e) => setBackchannelWords(e.target.value)}
                placeholder="Enter comma-separated words..."
                disabled={!enableBackchannel}
              />
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
              <Label>Boosted Keywords</Label>
              <Textarea
                value={boostWords}
                onChange={(e) => setBoostWords(e.target.value)}
                placeholder="Split by comma. Example: Retail Walrus"
                className="h-20"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Speech Normalization</Label>
                <p className="text-sm text-muted-foreground">Standardize numbers, currencies, dates, etc.</p>
              </div>
              <Switch checked={enableSpeechNormalization} onCheckedChange={setEnableSpeechNormalization} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Transcript Formatting</Label>
                <p className="text-sm text-muted-foreground">Format transcripts with punctuation</p>
              </div>
              <Switch checked={enableTranscriptFormatting} onCheckedChange={setEnableTranscriptFormatting} />
            </div>

            <div className="space-y-2">
              <Label>Reminder Message Frequency</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={reminderFrequency.seconds}
                  onChange={(e) => setReminderFrequency({ ...reminderFrequency, seconds: parseInt(e.target.value) })}
                  className="w-20"
                />
                <span>seconds,</span>
                <Input
                  type="number"
                  value={reminderFrequency.times}
                  onChange={(e) => setReminderFrequency({ ...reminderFrequency, times: parseInt(e.target.value) })}
                  className="w-20"
                />
                <span>times</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Pronunciation</Label>
              <Select value="IPA" onValueChange={() => {}}>
                <SelectTrigger>
                  <SelectValue placeholder="IPA" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IPA">IPA</SelectItem>
                </SelectContent>
              </Select>
              <Textarea
                value={pronunciation}
                onChange={(e) => setPronunciation(e.target.value)}
                placeholder="Guide the model to pronounce a word, name, or phrase in a specific way."
                className="h-20"
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
