
import * as React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface VoiceSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VoiceSettingsDialog({ open, onOpenChange }: VoiceSettingsDialogProps) {
  const [responsiveness, setResponsiveness] = React.useState(1);
  const [interruptionSensitivity, setInterruptionSensitivity] = React.useState(0.75);
  const [backchanneling, setBackchanneling] = React.useState(false);
  const [backchannelFrequency, setBackchannelFrequency] = React.useState(0.4);
  const [backchannelWords, setBackchannelWords] = React.useState("");
  const [transcriptionMode, setTranscriptionMode] = React.useState("speed");
  const [boostedKeywords, setBoostedKeywords] = React.useState("");
  const [speechNormalization, setSpeechNormalization] = React.useState(false);
  const [transcriptFormatting, setTranscriptFormatting] = React.useState(false);
  const [reminderSeconds, setReminderSeconds] = React.useState(30);
  const [reminderTimes, setReminderTimes] = React.useState(3);
  const [selectedIPA, setSelectedIPA] = React.useState("");

  const handleSave = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Voice & Speech Settings</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Responsiveness</Label>
              <p className="text-sm text-muted-foreground">Controls how fast the agent responds after users finish talking.</p>
              <Slider 
                value={[responsiveness]}
                onValueChange={([value]) => setResponsiveness(value)}
                max={1}
                step={0.01}
              />
            </div>

            <div className="space-y-2">
              <Label>Interruption Sensitivity</Label>
              <p className="text-sm text-muted-foreground">Controls how easily the agent can be interrupted by human speech.</p>
              <Slider 
                value={[interruptionSensitivity]}
                onValueChange={([value]) => setInterruptionSensitivity(value)}
                max={1}
                step={0.01}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable Backchanneling</Label>
                  <p className="text-sm text-muted-foreground">Allows the agent to use affirmations like "yeah", "ok", "naturally".</p>
                </div>
                <Switch checked={backchanneling} onCheckedChange={setBackchanneling} />
              </div>

              {backchanneling && (
                <>
                  <div className="space-y-2 mt-2">
                    <Label>Backchannel Frequency</Label>
                    <Slider 
                      value={[backchannelFrequency]}
                      onValueChange={([value]) => setBackchannelFrequency(value)}
                      max={1}
                      step={0.01}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Backchannel Words</Label>
                    <Textarea 
                      value={backchannelWords}
                      onChange={(e) => setBackchannelWords(e.target.value)}
                      placeholder="Enter words separated by commas"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="space-y-2">
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
              <p className="text-sm text-muted-foreground">Split by comma. Example: Retail Walrus</p>
              <Textarea 
                value={boostedKeywords}
                onChange={(e) => setBoostedKeywords(e.target.value)}
                placeholder="Enter keywords to boost"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Enable Speech Normalization</Label>
                <p className="text-sm text-muted-foreground">Automatically normalize numbers, currency, and dates.</p>
              </div>
              <Switch checked={speechNormalization} onCheckedChange={setSpeechNormalization} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Enable Transcript Formatting</Label>
                <p className="text-sm text-muted-foreground">Format phone numbers and timestamps.</p>
              </div>
              <Switch checked={transcriptFormatting} onCheckedChange={setTranscriptFormatting} />
            </div>

            <div className="space-y-2">
              <Label>Reminder Message Frequency</Label>
              <div className="flex items-center gap-2">
                <Input 
                  type="number"
                  value={reminderSeconds}
                  onChange={(e) => setReminderSeconds(parseInt(e.target.value))}
                  className="w-20"
                />
                <span>seconds,</span>
                <Input 
                  type="number"
                  value={reminderTimes}
                  onChange={(e) => setReminderTimes(parseInt(e.target.value))}
                  className="w-20"
                />
                <span>times</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Pronunciation</Label>
              <Select value={selectedIPA} onValueChange={setSelectedIPA}>
                <SelectTrigger>
                  <SelectValue placeholder="Select IPA" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ipa1">IPA Symbol 1</SelectItem>
                  <SelectItem value="ipa2">IPA Symbol 2</SelectItem>
                  <SelectItem value="ipa3">IPA Symbol 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
