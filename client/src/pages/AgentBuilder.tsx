import { useState } from "react";
import { useLocation } from 'wouter';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  PlusCircle, 
  Search, 
  FolderPlus,
  MoreVertical,
  Phone,
  Clock,
  BarChart,
  Sparkles
} from "lucide-react";

interface AgentData {
  id: string;
  name: string;
  type: string;
  voice: {
    name: string;
    avatar: string;
  } | null;
  phone: string | null;
  lastEdited: {
    date: string;
    time: string;
  };
}

export default function AgentBuilder() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [location, navigate] = useLocation();
  
  const agentData: AgentData[] = [
    {
      id: "1",
      name: "Real-Estate-Outbound-Appointment",
      type: "Multi Prompt",
      voice: {
        name: "Noah",
        avatar: "https://ui-avatars.com/api/?name=Noah&background=f97316&color=fff"
      },
      phone: "+1 (772) 777-1112",
      lastEdited: {
        date: "02/22/2025",
        time: "15:56"
      }
    },
    {
      id: "2",
      name: "Oakwood-Law-Intake-Specialist",
      type: "Multi Prompt",
      voice: {
        name: "Angelo",
        avatar: "https://ui-avatars.com/api/?name=A&background=6366f1&color=fff"
      },
      phone: null,
      lastEdited: {
        date: "02/10/2025",
        time: "21:49"
      }
    },
    {
      id: "3",
      name: "Healthcare-Compliance-Advisor",
      type: "Multi Prompt",
      voice: {
        name: "Max",
        avatar: "https://ui-avatars.com/api/?name=M&background=ec4899&color=fff"
      },
      phone: null,
      lastEdited: {
        date: "02/07/2025",
        time: "23:31"
      }
    },
    {
      id: "4",
      name: "Multi state-Personal-Injury-Intake",
      type: "Multi Prompt",
      voice: {
        name: "Adrian",
        avatar: "https://ui-avatars.com/api/?name=A&background=ca8a04&color=fff"
      },
      phone: null,
      lastEdited: {
        date: "01/25/2025",
        time: "03:13"
      }
    },
    {
      id: "5",
      name: "Custom LLM Family Law Assistant",
      type: "Custom LLM",
      voice: {
        name: "Myra",
        avatar: "https://ui-avatars.com/api/?name=M&background=a855f7&color=fff"
      },
      phone: null,
      lastEdited: {
        date: "12/17/2024",
        time: "08:38"
      }
    }
  ];
  
  const filteredAgents = agentData.filter(agent =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="flex h-full">
      {/* Left sidebar */}
      <div className="w-64 border-r border-border/30 hidden md:block">
        <div className="flex p-3 justify-between items-center border-b border-border/30">
          <div className="flex items-center">
            <FolderPlus size={18} className="mr-2 text-muted-foreground" />
            <span className="text-sm font-medium">FOLDERS</span>
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <PlusCircle size={16} />
          </Button>
        </div>
        
        <div className="p-4">
          <p className="text-sm text-muted-foreground mb-8">
            Create folders to organize your AI agents by practice area or function.
          </p>
          
          <div className="p-3 rounded-md bg-accent/30 text-sm">
            <p className="font-medium mb-1">Pro Tip</p>
            <p className="text-muted-foreground text-xs">
              Organize your agents into folders based on legal practice areas for easier management
            </p>
          </div>
        </div>
        
        <Separator className="my-3" />
        
        <div className="p-4">
          <div className="rounded-md border border-border/50 p-2 mb-4">
            <p className="text-xs mb-1 font-medium">Pay As You Go</p>
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground">Upcoming Invoice</p>
              <p className="text-xs font-medium">$0.00</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground">Concurrency Used</p>
              <p className="text-xs font-medium">0/20</p>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-white mr-2 text-xs">
              A
            </div>
            <span>ahmad.hassan@intakely.com</span>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border/30">
          <div className="flex items-center">
            <Button variant="outline" size="sm" className="mr-2 shadow-none">
              <span className="mr-1 opacity-70">All Agents</span>
            </Button>
            
            <Switch checked={true} />
          </div>
          
          <div className="flex items-center">
            <div className="relative mr-2">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search..." 
                className="pl-9 h-9 w-52 rounded-md bg-accent/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Button variant="outline" size="sm" className="mr-1 shadow-none bg-transparent">
              Import
            </Button>
            
            <Button size="sm" className="shadow-none">
              Create an Agent
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="ml-1">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Button>
          </div>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left text-xs text-muted-foreground">
                  <th className="pb-3 pl-10">Agent Name</th>
                  <th className="pb-3">Agent Type</th>
                  <th className="pb-3">Voice</th>
                  <th className="pb-3">Phone</th>
                  <th className="pb-3">Edited by</th>
                  <th className="pb-3"></th>
                </tr>
              </thead>
              <tbody>
                {filteredAgents.map((agent) => (
                  <tr 
                    key={agent.id} 
                    className="border-t border-border/20 hover:bg-accent/30 cursor-pointer"
                    onClick={() => navigate(`/agent-builder/${agent.id}`)}
                  >
                    <td className="py-3 flex items-center">
                      <div className="w-6 h-6 flex items-center justify-center mr-4">
                        <Sparkles size={16} className="text-muted-foreground" />
                      </div>
                      <span className="text-sm">{agent.name}</span>
                    </td>
                    <td className="py-3">
                      <Badge variant="outline" className="text-xs font-normal py-0.5 bg-card">
                        {agent.type}
                      </Badge>
                    </td>
                    <td className="py-3">
                      {agent.voice && (
                        <div className="flex items-center">
                          <div 
                            className="w-6 h-6 rounded-full mr-1 overflow-hidden bg-cover bg-center"
                            style={{ backgroundImage: `url(${agent.voice.avatar})` }}
                          />
                          <span className="text-sm">{agent.voice.name}</span>
                        </div>
                      )}
                      {!agent.voice && (
                        <span className="text-sm">-</span>
                      )}
                    </td>
                    <td className="py-3">
                      {agent.phone ? (
                        <div className="flex items-center text-sm">
                          <Phone size={14} className="mr-1 text-blue-400" />
                          <span>{agent.phone}</span>
                        </div>
                      ) : (
                        <span className="text-sm">-</span>
                      )}
                    </td>
                    <td className="py-3">
                      <div className="text-xs">
                        <div>{agent.lastEdited.date}</div>
                        <div className="text-muted-foreground">{agent.lastEdited.time}</div>
                      </div>
                    </td>
                    <td className="py-3" onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <MoreVertical size={14} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredAgents.length === 0 && (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No agents found matching your search.</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
