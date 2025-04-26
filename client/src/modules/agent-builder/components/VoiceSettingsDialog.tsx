
import * as React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";

interface VoiceSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VoiceSettingsDialog({ open, onOpenChange }: VoiceSettingsDialogProps) {
  const [voiceModel, setVoiceModel] = React.useState("auto");
  const [voiceSpeed, setVoiceSpeed] = React.useState(1);
  const [voiceTemperature, setVoiceTemperature] = React.useState(1);
  const [voiceVolume, setVoiceVolume] = React.useState(1);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-background text-foreground">
        <DialogHeader>
          <DialogTitle>Voice Model</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <RadioGroup value={voiceModel} onValueChange={setVoiceModel}>
            <div className="space-y-2">
              <RadioGroupItem value="auto" id="auto">
                <div className="ml-2">
                  <Label htmlFor="auto">Auto(Elevenlabs Turbo V2)</Label>
                  <p className="text-sm text-muted-foreground">English only, fast, high quality</p>
                </div>
              </RadioGroupItem>
              <RadioGroupItem value="turbo" id="turbo">
                <div className="ml-2">
                  <Label htmlFor="turbo">Elevenlabs Turbo V2</Label>
                  <p className="text-sm text-muted-foreground">English only, fast, high quality</p>
                </div>
              </RadioGroupItem>
              <RadioGroupItem value="flash" id="flash">
                <div className="ml-2">
                  <Label htmlFor="flash">Elevenlabs Flash V2</Label>
                  <p className="text-sm text-muted-foreground">English only, fastest, medium quality</p>
                </div>
              </RadioGroupItem>
              <RadioGroupItem value="turbo25" id="turbo25">
                <div className="ml-2">
                  <Label htmlFor="turbo25">Elevenlabs Turbo V2.5</Label>
                  <p className="text-sm text-muted-foreground">Multilingual, fast, high quality</p>
                </div>
              </RadioGroupItem>
              <RadioGroupItem value="flash25" id="flash25">
                <div className="ml-2">
                  <Label htmlFor="flash25">Elevenlabs Flash V2.5</Label>
                  <p className="text-sm text-muted-foreground">Multilingual, fastest, medium quality</p>
                </div>
              </RadioGroupItem>
              <RadioGroupItem value="multilingual" id="multilingual">
                <div className="ml-2">
                  <Label htmlFor="multilingual">Elevenlabs Multilingual v2</Label>
                  <p className="text-sm text-muted-foreground">Multilingual, slow, highest quality</p>
                </div>
              </RadioGroupItem>
            </div>
          </RadioGroup>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Voice Speed</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[voiceSpeed]}
                  onValueChange={([value]) => setVoiceSpeed(value)}
                  max={2}
                  step={0.01}
                  className="flex-1"
                />
                <span className="w-12 text-right">{voiceSpeed.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Voice Temperature</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[voiceTemperature]}
                  onValueChange={([value]) => setVoiceTemperature(value)}
                  max={2}
                  step={0.01}
                  className="flex-1"
                />
                <span className="w-12 text-right">{voiceTemperature.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Voice Volume</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[voiceVolume]}
                  onValueChange={([value]) => setVoiceVolume(value)}
                  max={2}
                  step={0.01}
                  className="flex-1"
                />
                <span className="w-12 text-right">{voiceVolume.toFixed(2)}</span>
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
