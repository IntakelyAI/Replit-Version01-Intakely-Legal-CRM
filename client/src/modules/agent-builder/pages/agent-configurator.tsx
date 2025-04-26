import { useState } from "react";
import { useLocation } from 'wouter';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  ChevronLeft,
  CirclePlay,
  Settings,
  Database,
  Mic,
  Globe,
  Info,
  PhoneCall,
  FileText,
  Shield
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ModelSettingsDialog } from "../components/ModelSettingsDialog";
import { VoiceSettingsDialog } from "../components/VoiceSettingsDialog";


function ModelSettingsDialog({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Model Settings</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          {/* Add your model settings UI here */}
          <p>This is a placeholder for model settings.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}


export default function AgentConfigurator() {
  const [activeTab, setActiveTab] = useState("create");
  const [expandedSection, setExpandedSection] = useState("");
  const [, setLocation] = useLocation();
  const [isModelSettingsOpen, setIsModelSettingsOpen] = useState(false);
  const [isVoiceSettingsOpen, setIsVoiceSettingsOpen] = useState(false); // Added state for VoiceSettingsDialog

  return (
    <div className="flex flex-col h-full">
      {/* Top Bar/Pane */}
      <div className="border-b border-border/30 bg-background z-10">
        <div className="flex items-center justify-between px-4 h-12">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8" 
              onClick={() => setLocation('/agent-builder')}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Real-Estate-Outbound-Appointment</span>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Agent ID: ag_566_13</span>
                <span>•</span>
                <span>Retell LLM ID: 5_i.aZ6_13</span>
                <span>•</span>
                <span>$0.07/min</span>
                <span>•</span>
                <span>900-1000ms latency</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              variant={activeTab === "create" ? "secondary" : "ghost"}
              onClick={() => setActiveTab("create")}
              className="h-8"
            >
              Create
            </Button>
            <Button 
              variant={activeTab === "simulation" ? "secondary" : "ghost"}
              onClick={() => setActiveTab("simulation")}
              className="h-8"
            >
              Simulation
            </Button>
          </div>
        </div>
      </div>

      {/* Three Column Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Section - Conversation Design */}
        <div className="w-1/3 border-r border-border/30 flex flex-col">
          <div className="p-4 border-b border-border/30">
            <h3 className="text-sm font-medium">Conversation Design</h3>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4">
              <div className="mb-5">
                <div className="text-xs text-muted-foreground font-semibold mb-2">Model Selection</div>
                <div className="flex gap-2">
                  <Select defaultValue="gpt4mini" className="flex-1">
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt4realtime">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                            <Settings className="h-3 w-3 text-white" />
                          </div>
                          <span>GPT 4o Realtime</span>
                          <span className="text-xs text-muted-foreground">($0.5/min)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="gpt4minirt">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                            <Settings className="h-3 w-3 text-white" />
                          </div>
                          <span>GPT 4o mini Realtime</span>
                          <span className="text-xs text-muted-foreground">($0.125/min)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="gpt4">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                            <Settings className="h-3 w-3 text-white" />
                          </div>
                          <span>GPT 4o</span>
                          <span className="text-xs text-muted-foreground">($0.05/min)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="gpt4mini">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                            <Settings className="h-3 w-3 text-white" />
                          </div>
                          <span>GPT 4o mini</span>
                          <span className="text-xs text-muted-foreground">($0.006/min)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="claude37">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
                            <Globe className="h-3 w-3 text-white" />
                          </div>
                          <span>Claude 3.7 Sonnet</span>
                          <span className="text-xs text-muted-foreground">($0.06/min)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="claude35">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
                            <Globe className="h-3 w-3 text-white" />
                          </div>
                          <span>Claude 3.5 Haiku</span>
                          <span className="text-xs text-muted-foreground">($0.02/min)</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <ModelSettingsDialog open={isModelSettingsOpen} onOpenChange={setIsModelSettingsOpen} />
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => setIsModelSettingsOpen(true)}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground font-semibold mb-2">Voice Settings</div>
                <div className="flex items-center gap-2 mb-4">
                  <Select defaultValue="noah" className="flex-1">
                    <SelectTrigger className="h-8">
                      <SelectValue>
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs">
                            N
                          </div>
                          <span className="text-xs">Noah (en-AU)</span>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="noah">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs">
                            N
                          </div>
                          <span>Noah (en-AU)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="emma">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">
                            E
                          </div>
                          <span>Emma (en-GB)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="james">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                            J
                          </div>
                          <span>James (en-US)</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => setIsVoiceSettingsOpen(true)} // Added onClick handler
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                  <VoiceSettingsDialog open={isVoiceSettingsOpen} onOpenChange={setIsVoiceSettingsOpen} /> {/* Added VoiceSettingsDialog */}
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Button variant="outline" size="sm" className="flex-1 justify-between h-8">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs">English</span>
                    </div>
                    <ChevronLeft className="h-4 w-4 rotate-270" />
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground font-semibold mb-2">## Role and Task</div>
                <Textarea 
                  className="min-h-20 font-mono text-xs"
                  value={`*Your role is to be approachable, friendly, and professional—like a helpful neighbor rather than a pushy salesperson. Think of yourself as someone who enjoys a genuine chat, makes people smile, and helps them make informed decisions—without pressure.

##Key changes
*Use getDateTime for date and time.
*DO post_data after booking appointment, only send the data required by the post_data.
*book_appointment without email if the client doesn't have email
*don't give away transcript_object; only send transcript.
## dynamic variables

name : {{name}}
phone_number: {{phone_number}}`}
                />
              </div>
              <div className="mb-5">
                <div className="text-xs text-muted-foreground font-semibold mb-2">Welcome Message</div>
                <Textarea 
                  className="min-h-12 font-mono text-xs"
                  value="Use a warm, relaxed tone with occasional light humor when appropriate."
                />
              </div>
              <div className="p-2 border rounded-md">
                <div className="flex items-center">
                  <div className="text-xs font-semibold">AI Initiates:</div>
                  <div className="text-xs ml-2">AI begins with your defined begin message.</div>
                  <ChevronLeft className="h-4 w-4 rotate-270 ml-auto" />
                </div>
                <Textarea 
                  className="mt-2 min-h-12 font-mono text-xs"
                  value="Hello Sam. This is Chris. I've just got a minute?"
                />
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Middle Section - Settings & Integration */}
        <div className="w-1/3 border-r border-border/30 flex flex-col">
          <div className="p-4 border-b border-border/30">
            <h3 className="text-sm font-medium">Settings & Integration</h3>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4">
              <div className="border rounded-md mb-4">
                <div 
                  className="flex items-center justify-between p-3 border-b border-border/30 cursor-pointer hover:bg-accent/30"
                  onClick={() => setExpandedSection(expandedSection === 'functions' ? '' : 'functions')}
                >
                  <div className="flex items-center">
                    <Settings className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">Functions</span>
                  </div>
                  <ChevronLeft className={`h-4 w-4 transition-transform duration-200 ${expandedSection === 'functions' ? 'rotate-90' : 'rotate-270'}`} />
                </div>
                {expandedSection === 'functions' && (
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground mb-4">
                      Configure custom functions that your agent can call during a conversation.
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Function
                    </Button>
                  </div>
                )}
              </div>
              <div className="border rounded-md mb-4">
                <div className="flex items-center justify-between p-3 border-b border-border/30">
                  <div className="flex items-center">
                    <Database className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">Knowledge Base</span>
                  </div>
                  <ChevronLeft className="h-4 w-4 rotate-270" />
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground">
                    Link knowledge bases to provide additional context and information to your agent.
                  </p>
                </div>
              </div>
              <div className="border rounded-md mb-4">
                <div className="flex items-center justify-between p-3 border-b border-border/30">
                  <div className="flex items-center">
                    <Mic className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">Speech Settings</span>
                  </div>
                  <ChevronLeft className="h-4 w-4 rotate-270" />
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground">
                    Customize speech patterns, speed, and tone for a more natural conversation flow.
                  </p>
                </div>
              </div>
              <div className="border rounded-md mb-4">
                <div className="flex items-center justify-between p-3 border-b border-border/30">
                  <div className="flex items-center">
                    <PhoneCall className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">Call Settings</span>
                  </div>
                  <ChevronLeft className="h-4 w-4 rotate-270" />
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground">
                    Set up call handling preferences, routing rules, and response strategies.
                  </p>
                </div>
              </div>
              <div className="border rounded-md mb-4">
                <div className="flex items-center justify-between p-3 border-b border-border/30">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">Post-Call Analysis</span>
                  </div>
                  <ChevronLeft className="h-4 w-4 rotate-270" />
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground">
                    Configure how call data is processed and analyzed after completion.
                  </p>
                </div>
              </div>
              <div className="border rounded-md mb-4">
                <div className="flex items-center justify-between p-3 border-b border-border/30">
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">Security & Fallback Settings</span>
                  </div>
                  <ChevronLeft className="h-4 w-4 rotate-270" />
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground">
                    Configure security protocols and fallback options if the agent encounters problems.
                  </p>
                </div>
              </div>
              <div className="border rounded-md mb-4">
                <div className="flex items-center justify-between p-3 border-b border-border/30">
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">Webhook Settings</span>
                  </div>
                  <ChevronLeft className="h-4 w-4 rotate-270" />
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground">
                    Set up webhooks to integrate with external systems and applications.
                  </p>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Right Section - Test Your Agent */}
        <div className="w-1/3 flex flex-col">
          <div className="p-4 border-b border-border/30">
            <h3 className="text-sm font-medium">Test Your Agent</h3>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4 flex flex-col items-center justify-center h-full">
              <div className="w-32 h-32 rounded-full bg-background border-2 border-muted-foreground/20 flex items-center justify-center mb-4">
                <CirclePlay className="h-16 w-16 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground mb-4">Click to test your agent</span>
              <Button variant="secondary" size="sm" className="w-32">
                Start Test
              </Button>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}