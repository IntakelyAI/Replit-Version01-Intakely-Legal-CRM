import * as React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

interface VoiceSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VoiceSettingsDialog({ open, onOpenChange }: VoiceSettingsDialogProps) {
  const [voiceModel, setVoiceModel] = React.useState("enhanced");
  const [speechStyle, setSpeechStyle] = React.useState("casual");
  const [silenceDetection, setSilenceDetection] = React.useState(false);
  const [voiceActivity, setVoiceActivity] = React.useState(false);
  const [languageDetection, setLanguageDetection] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Voice & Speech Settings</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Silence Detection</Label>
                <p className="text-sm text-muted-foreground">Detect periods of silence during speech</p>
              </div>
              <Switch checked={silenceDetection} onCheckedChange={setSilenceDetection} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Voice Activity</Label>
                <p className="text-sm text-muted-foreground">Monitor and detect voice activity</p>
              </div>
              <Switch checked={voiceActivity} onCheckedChange={setVoiceActivity} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Language Detection</Label>
                <p className="text-sm text-muted-foreground">Automatically detect spoken language</p>
              </div>
              <Switch checked={languageDetection} onCheckedChange={setLanguageDetection} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Speech Style</Label>
            <Select value={speechStyle} onValueChange={setSpeechStyle}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="formal">Formal</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Voice Speed</Label>
            <Slider 
              value={[voiceSpeed]}
              onValueChange={([value]) => setVoiceSpeed(value)}
              min={0.5}
              max={2}
              step={0.1}
            />
          </div>

          <div className="space-y-2">
            <Label>Voice Pitch</Label>
            <Slider 
              value={[voicePitch]}
              onValueChange={([value]) => setVoicePitch(value)}
              min={0.5}
              max={2}
              step={0.1}
            />
          </div>

          <div className="space-y-2">
            <Label>Voice Emotion</Label>
            <Select value={voiceEmotion} onValueChange={setVoiceEmotion}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="neutral">Neutral</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="empathetic">Empathetic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Enable Background Noise</Label>
              <Switch checked={enableBackgroundNoise} onCheckedChange={setEnableBackgroundNoise} />
            </div>
          </div>

          {enableBackgroundNoise && (
            <>
              <div className="space-y-2">
                <Label>Background Type</Label>
                <Select value={backgroundNoiseType} onValueChange={setBackgroundNoiseType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="office">Office</SelectItem>
                    <SelectItem value="callcenter">Call Center</SelectItem>
                    <SelectItem value="ambient">Ambient</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Noise Level</Label>
                <Slider 
                  value={[noiseLevel]}
                  onValueChange={([value]) => setNoiseLevel(value)}
                  min={0}
                  max={1}
                  step={0.1}
                />
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}