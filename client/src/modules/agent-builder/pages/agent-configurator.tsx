import { useState } from "react";
import { useLocation, Link } from 'wouter';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, 
  CirclePlay, 
  Settings, 
  Database, 
  Mic, 
  PhoneCall, 
  FileText, 
  Shield, 
  Globe, 
  CheckCircle2,
  Info
} from "lucide-react";

export default function AgentDetail() {
  const [selectedTab, setSelectedTab] = useState("prompt");
  const [location, setLocation] = useLocation();
  
  return (
    <div className="flex flex-col h-full">
      {/* Top Header */}
      <div className="border-b border-border/30 bg-background z-10">
        <div className="flex items-center px-4 h-10">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 mr-2" 
            onClick={() => setLocation('/agent-builder')}
          >
            <ChevronLeft size={16} />
          </Button>
          
          <span className="text-sm font-medium">Real-Estate-Outbound-Appointment</span>
          <span className="text-xs text-muted-foreground ml-2">Agent ID: ag_566_13</span>
          <span className="text-xs text-muted-foreground ml-2">• Retell LLM ID: 5_i.aZ6_13</span>
          <span className="text-xs text-muted-foreground ml-2">• $0.07/min</span>
          <span className="text-xs text-muted-foreground ml-2">• 900-1000ms latency</span>
        </div>
        
        <div className="flex border-t border-border/30">
          <Button 
            variant={selectedTab === "create" ? "secondary" : "ghost"} 
            className="text-sm rounded-none h-8 px-4"
            onClick={() => setSelectedTab("create")}
          >
            Create
          </Button>
          <Button 
            variant={selectedTab === "simulation" ? "secondary" : "ghost"}
            className="text-sm rounded-none h-8 px-4"
            onClick={() => setSelectedTab("simulation")}
          >
            Simulation
          </Button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Column */}
        <div className="w-1/2 flex flex-col h-full border-r border-border/30">
          {/* Model Selector */}
          <div className="flex p-3 border-b border-border/30">
            <div className="relative flex-1 mr-2">
              <Button variant="outline" size="sm" className="w-full justify-between h-8">
                <div className="flex items-center">
                  <span className="text-xs text-muted-foreground mr-1">GPT 4o mini</span>
                </div>
                <ChevronLeft className="h-4 w-4 rotate-270" />
              </Button>
            </div>
            
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Settings className="h-4 w-4" />
            </Button>
            
            <div className="relative flex items-center ml-2">
              <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs">
                N
              </div>
              <span className="text-xs ml-1">Noah (en-AU)</span>
              <ChevronLeft className="h-4 w-4 rotate-270 ml-1" />
            </div>
            
            <div className="relative flex items-center ml-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs ml-1">English</span>
              <ChevronLeft className="h-4 w-4 rotate-270 ml-1" />
            </div>
          </div>
          
          {/* Prompt Editor */}
          <ScrollArea className="flex-1">
            <div className="p-4">
              <div className="mb-5">
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
        
        {/* Right Column */}
        <div className="w-1/2 flex flex-col h-full">
          {/* Configuration Sections */}
          <ScrollArea className="flex-1">
            <div className="p-4">
              <div className="border rounded-md mb-4">
                <div className="flex items-center justify-between p-3 border-b border-border/30">
                  <div className="flex items-center">
                    <Settings className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">Functions</span>
                  </div>
                  <ChevronLeft className="h-4 w-4 rotate-270" />
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground">
                    Configure custom functions that your agent can call during a conversation.
                  </p>
                </div>
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
          
          {/* Bottom Test Area */}
          <div className="border-t border-border/30 p-4">
            <div className="flex items-center mb-3">
              <Mic className="h-4 w-4 mr-2 text-primary" />
              <span className="text-sm font-medium">Test your agent</span>
              <Info className="h-4 w-4 ml-1 text-muted-foreground" />
            </div>
            
            <div className="flex items-center">
              <div className="relative flex-1 mr-2">
                <div className="w-20 h-20 rounded-full bg-background mx-auto flex items-center justify-center border-2 border-muted-foreground/20">
                  <CirclePlay className="h-10 w-10 text-primary" />
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-3">
              <Button variant="secondary" size="sm" className="w-32">
                Test
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}