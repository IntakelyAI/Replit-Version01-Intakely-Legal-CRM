import { useState } from "react";
import { useLocation } from 'wouter';
import { Plus, Settings, ChevronLeft, CirclePlay, Database, Mic, Globe, Info, PhoneCall, FileText, Shield, Phone, MessageSquare, BracesIcon, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ModelSettingsDialog } from "../components/ModelSettingsDialog";
import { VoiceSettingsDialog } from "../components/VoiceSettingsDialog";



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
              <div className="mb-8 p-4 rounded-lg shadow-sm bg-background border border-border/30">
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
                  <div className="flex gap-2">
                    <Select defaultValue="en-us" className="sm:max-w-[425px]">
                      <SelectTrigger className="h-8">
                        <SelectValue>
                          <div className="flex items-center gap-2">
                            <span className="text-[18px]">🇺🇸</span>
                            <span className="text-xs">English (US)</span>
                          </div>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className="sm:w-[425px]">
                        <SelectItem value="en-us">
                          <div className="flex items-center gap-2">
                            <span className="text-[18px]">🇺🇸</span>
                            <span>English (US)</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="multilingual">
                          <div className="flex items-center gap-2">
                            <span className="text-[18px]">🌐</span>
                            <span>Multilingual</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="es-es">
                          <div className="flex items-center gap-2">
                            <span className="text-[18px]">🇪🇸</span>
                            <span>Spanish (Spain)</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="es-la">
                          <div className="flex items-center gap-2">
                            <span className="text-[18px]">🇲🇽</span>
                            <span>Spanish (Latin America)</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="en-in">
                          <div className="flex items-center gap-2">
                            <span className="text-[18px]">🇮🇳</span>
                            <span>English (India)</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="en-gb">
                          <div className="flex items-center gap-2">
                            <span className="text-[18px]">🇬🇧</span>
                            <span>English (UK)</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="en-au">
                          <div className="flex items-center gap-2">
                            <span className="text-[18px]">🇦🇺</span>
                            <span>English (Australia)</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="en-nz">
                          <div className="flex items-center gap-2">
                            <span className="text-[18px]">🇳🇿</span>
                            <span>English (New Zealand)</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="fr">
                          <div className="flex items-center gap-2">
                            <span className="text-[18px]">🇫🇷</span>
                            <span>French</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mb-8 p-4 rounded-lg shadow-sm bg-background border border-border/30">
                  <div className="text-xs text-muted-foreground font-semibold mb-2">Role and Task</div>
                  <Textarea 
                    className="min-h-20 font-mono text-xs"
                    defaultValue={`*Your role is to be approachable, friendly, and professional—like a helpful neighbor rather than a pushy salesperson. Think of yourself as someone who enjoys a genuine chat, makes people smile, and helps them make informed decisions—without pressure.

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
                <div className="mb-8 p-4 rounded-lg shadow-sm bg-background border border-border/30">
                  <div className="text-xs text-muted-foreground font-semibold mb-2">Welcome Message</div>
                  <Textarea 
                    className="min-h-12 font-mono text-xs mb-5"
                    value="Hello! I'm your AI assistant ready to help schedule appointments."
                  />
                </div>
              </div>
              <div className="mb-8 p-4 rounded-lg shadow-sm bg-background border border-border/30">
                <div className="text-xs text-muted-foreground font-semibold mb-2">Conversation Initiation</div>
                <Select defaultValue="ai_initiates" className="flex-1 mb-2">
                  <SelectTrigger>
                    <SelectValue>
                      <div className="flex items-center gap-2">
                        <span className="text-xs">AI Initiates: AI begins with your defined begin message</span>
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ai_initiates">
                      <div className="flex items-center gap-2">
                        <span>AI Initiates: AI begins with your defined begin message</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="caller_initiates">
                      <div className="flex items-center gap-2">
                        <span>Caller Initiates: Wait for caller to speak first</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="outbound_wait">
                      <div className="flex items-center gap-2">
                        <span>Outbound Call: Wait for response before speaking</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Textarea 
                  className="min-h-12 font-mono text-xs"
                  placeholder="Enter your initial message here..."
                  defaultValue="Hello Sam. This is Chris. I've just got a minute?"
                />
              </div>
              <div className="mb-8 p-4 rounded-lg shadow-sm bg-background border border-border/30">
                <div className="text-xs text-muted-foreground font-semibold mb-2">Workflow Builder</div>
                <div className="relative h-48 rounded-md border border-border/30 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-10"
                    style={{ 
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='nodes' x='0' y='0' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='20' cy='20' r='2' fill='%23666'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23nodes)'/%3E%3Cpath d='M10 20 L30 20 M20 10 L20 30' stroke='%23666' stroke-width='1' stroke-dasharray='2,2'/%3E%3C/svg%3E")` 
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="bg-background/80 backdrop-blur"
                      onClick={() => setLocation('/agent-builder/workflow')}
                    >
                      Open Workflow Builder
                    </Button>
                  </div>
                </div>
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
              <div className="mb-8 p-4 rounded-lg shadow-sm bg-background border border-border/30">
                <div className="text-xs text-muted-foreground font-semibold mb-2">Knowledge Base</div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground">
                    Link knowledge bases to provide additional context and information to your agent.
                  </p>
                </div>
              </div>
              <div className="mb-8 p-4 rounded-lg shadow-sm bg-background border border-border/30">
                <div className="text-xs text-muted-foreground font-semibold mb-2">Speech Settings</div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground">
                    Customize speech patterns, speed, and tone for a more natural conversation flow.
                  </p>
                </div>
              </div>
              <div className="mb-8 p-4 rounded-lg shadow-sm bg-background border border-border/30">
                <div className="text-xs text-muted-foreground font-semibold mb-2">Call Settings</div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground">
                    Set up call handling preferences, routing rules, and response strategies.
                  </p>
                </div>
              </div>
              <div className="mb-8 p-4 rounded-lg shadow-sm bg-background border border-border/30">
                <div className="text-xs text-muted-foreground font-semibold mb-2">Post-Call Analysis</div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground">
                    Configure how call data is processed and analyzed after completion.
                  </p>
                </div>
              </div>
              <div className="mb-8 p-4 rounded-lg shadow-sm bg-background border border-border/30">
                <div className="text-xs text-muted-foreground font-semibold mb-2">Security & Fallback Settings</div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground">
                    Configure security protocols and fallback options if the agent encounters problems.
                  </p>
                </div>
              </div>
              <div className="mb-8 p-4 rounded-lg shadow-sm bg-background border border-border/30">
                <div className="text-xs text-muted-foreground font-semibold mb-2">Webhook Settings</div>
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
            <div className="flex flex-col h-full">
            <div className="p-4 border-b border-border/30">
              <div className="flex gap-2 mb-4">
                <Button variant="outline" size="sm" className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Test LLM
                </Button>
              </div>
            </div>
            
            {/* Chat Interface */}
            <div className="flex-1 p-4">
              <ScrollArea className="h-[calc(100%-160px)]">
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <div className="bg-primary/10 rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">How are you doing?</p>
                      <span className="text-xs text-muted-foreground mt-1">User</span>
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <div className="bg-primary rounded-lg p-3 max-w-[80%] text-primary-foreground">
                      <p className="text-sm">I am doing well</p>
                      <span className="text-xs text-primary-foreground/70 mt-1">Agent</span>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </div>

            {/* User Prompt Section */}
            <div className="p-4 border-t border-border/30">
              <Textarea
                placeholder="Enter your test scenario here..."
                className="mb-3 min-h-[80px]"
                defaultValue="You are a customer who wants to return a package..."
              />
              <Button variant="secondary" className="w-full mb-2">
                <Play className="h-4 w-4 mr-2" />
                Simulate Conversation
              </Button>
              <Button variant="secondary" className="w-full">
                <Phone className="h-4 w-4 mr-2" />
                Start Voice Call
              </Button>
            </div>
          </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

// Remove duplicate ModelSettingsDialog definition