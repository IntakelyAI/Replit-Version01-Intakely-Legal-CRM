import { useState } from "react";
import { Bot, Plus, BrainCircuit, Search, Filter, Zap, MessageSquare, Phone, Settings, Download, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import AIAssistantChat from "@/components/shared/ai-assistant-chat";

// Sample AI agents data (in a real app, this would come from an API)
const aiAgents = [
  {
    id: 1,
    name: "Client Intake Assistant",
    description: "Handles initial client intake calls and qualification",
    status: "Active",
    type: "Call Agent",
    callsHandled: 128,
    efficiency: 87,
    lastTraining: "2 days ago",
    created: "Oct 10, 2023",
  },
  {
    id: 2,
    name: "Legal Research Bot",
    description: "Helps with case law and precedent research",
    status: "Active",
    type: "Knowledge Agent",
    callsHandled: 0,
    efficiency: 92,
    lastTraining: "1 week ago",
    created: "Sep 15, 2023",
  },
  {
    id: 3,
    name: "Client Follow-up Agent",
    description: "Makes follow-up calls to existing clients",
    status: "Active",
    type: "Call Agent",
    callsHandled: 98,
    efficiency: 82,
    lastTraining: "5 days ago",
    created: "Nov 1, 2023",
  },
  {
    id: 4,
    name: "Document Review Assistant",
    description: "Pre-screens legal documents for attorneys",
    status: "Inactive",
    type: "Document Agent",
    callsHandled: 0,
    efficiency: 75,
    lastTraining: "3 weeks ago",
    created: "Aug 22, 2023",
  },
  {
    id: 5,
    name: "Appointment Scheduler",
    description: "Schedules calls and meetings with clients",
    status: "Development",
    type: "Call Agent",
    callsHandled: 12,
    efficiency: 65,
    lastTraining: "Yesterday",
    created: "Nov 15, 2023",
  },
  {
    id: 6,
    name: "Legal FAQ Bot",
    description: "Answers common client legal questions",
    status: "Active",
    type: "Knowledge Agent",
    callsHandled: 0,
    efficiency: 90,
    lastTraining: "1 day ago",
    created: "Oct 5, 2023",
  },
];

// Sample chat messages for the AI Assistant
const initialChatMessages = [
  {
    id: "1",
    content: "Hello! I'm your AI Agent Builder assistant. How can I help you today?",
    role: "assistant" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
];

export default function AgentBuilder() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredAgents = aiAgents.filter(agent => 
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">{status}</Badge>;
      case "Inactive":
        return <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">{status}</Badge>;
      case "Development":
        return <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getAgentTypeIcon = (type: string) => {
    switch (type) {
      case "Call Agent":
        return <Phone className="h-5 w-5 text-primary" />;
      case "Knowledge Agent":
        return <BrainCircuit className="h-5 w-5 text-primary" />;
      case "Document Agent":
        return <MessageSquare className="h-5 w-5 text-primary" />;
      default:
        return <Bot className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <div className="grid gap-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Agent Builder</h1>
          <p className="mt-1 text-muted-foreground">Create and manage your custom AI agents for legal tasks.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create New Agent
        </Button>
      </div>
      
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search agents..." 
            className="pl-10" 
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </Button>
      </div>
      
      {/* Agent Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{aiAgents.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{aiAgents.filter(a => a.status === "Active").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Call Agents</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{aiAgents.filter(a => a.type === "Call Agent").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Calls Handled</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{aiAgents.reduce((total, agent) => total + agent.callsHandled, 0)}</div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Agents</TabsTrigger>
          <TabsTrigger value="call">Call Agents</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Agents</TabsTrigger>
          <TabsTrigger value="document">Document Agents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredAgents.map((agent) => (
              <Card key={agent.id} className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {getAgentTypeIcon(agent.type)}
                        {agent.name}
                      </CardTitle>
                      <CardDescription className="mt-1">{agent.description}</CardDescription>
                    </div>
                    {getStatusBadge(agent.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Efficiency</span>
                        <span className="font-medium">{agent.efficiency}%</span>
                      </div>
                      <Progress value={agent.efficiency} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Type</p>
                        <p>{agent.type}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Calls Handled</p>
                        <p>{agent.callsHandled}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Last Training</p>
                        <p>{agent.lastTraining}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Created</p>
                        <p>{agent.created}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Switch id={`agent-${agent.id}-toggle`} checked={agent.status === "Active"} />
                        <label htmlFor={`agent-${agent.id}-toggle`} className="text-sm font-medium">
                          {agent.status === "Active" ? "Active" : "Inactive"}
                        </label>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Configure</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <BrainCircuit className="mr-2 h-4 w-4" />
                            <span>Train</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            <span>Export Data</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="call" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredAgents
              .filter((agent) => agent.type === "Call Agent")
              .map((agent) => (
                <Card key={agent.id} className="overflow-hidden transition-all hover:shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Phone className="h-5 w-5 text-primary" />
                          {agent.name}
                        </CardTitle>
                        <CardDescription className="mt-1">{agent.description}</CardDescription>
                      </div>
                      {getStatusBadge(agent.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Efficiency</span>
                          <span className="font-medium">{agent.efficiency}%</span>
                        </div>
                        <Progress value={agent.efficiency} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Type</p>
                          <p>{agent.type}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Calls Handled</p>
                          <p>{agent.callsHandled}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Last Training</p>
                          <p>{agent.lastTraining}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Created</p>
                          <p>{agent.created}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Switch id={`agent-${agent.id}-toggle-call`} checked={agent.status === "Active"} />
                          <label htmlFor={`agent-${agent.id}-toggle-call`} className="text-sm font-medium">
                            {agent.status === "Active" ? "Active" : "Inactive"}
                          </label>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="knowledge" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredAgents
              .filter((agent) => agent.type === "Knowledge Agent")
              .map((agent) => (
                <Card key={agent.id} className="overflow-hidden transition-all hover:shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <BrainCircuit className="h-5 w-5 text-primary" />
                          {agent.name}
                        </CardTitle>
                        <CardDescription className="mt-1">{agent.description}</CardDescription>
                      </div>
                      {getStatusBadge(agent.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Efficiency</span>
                          <span className="font-medium">{agent.efficiency}%</span>
                        </div>
                        <Progress value={agent.efficiency} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Type</p>
                          <p>{agent.type}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Calls Handled</p>
                          <p>{agent.callsHandled}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Last Training</p>
                          <p>{agent.lastTraining}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Created</p>
                          <p>{agent.created}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Switch id={`agent-${agent.id}-toggle-knowledge`} checked={agent.status === "Active"} />
                          <label htmlFor={`agent-${agent.id}-toggle-knowledge`} className="text-sm font-medium">
                            {agent.status === "Active" ? "Active" : "Inactive"}
                          </label>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="document" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredAgents
              .filter((agent) => agent.type === "Document Agent")
              .map((agent) => (
                <Card key={agent.id} className="overflow-hidden transition-all hover:shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <MessageSquare className="h-5 w-5 text-primary" />
                          {agent.name}
                        </CardTitle>
                        <CardDescription className="mt-1">{agent.description}</CardDescription>
                      </div>
                      {getStatusBadge(agent.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Efficiency</span>
                          <span className="font-medium">{agent.efficiency}%</span>
                        </div>
                        <Progress value={agent.efficiency} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Type</p>
                          <p>{agent.type}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Calls Handled</p>
                          <p>{agent.callsHandled}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Last Training</p>
                          <p>{agent.lastTraining}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Created</p>
                          <p>{agent.created}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Switch id={`agent-${agent.id}-toggle-document`} checked={agent.status === "Active"} />
                          <label htmlFor={`agent-${agent.id}-toggle-document`} className="text-sm font-medium">
                            {agent.status === "Active" ? "Active" : "Inactive"}
                          </label>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* AI Assistant */}
      <div className="hidden lg:block">
        <AIAssistantChat 
          initialMessages={initialChatMessages} 
          title="Agent Builder Assistant"
          heightClass="h-[300px]"
        />
      </div>
    </div>
  );
}
