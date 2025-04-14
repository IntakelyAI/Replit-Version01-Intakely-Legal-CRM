import { useState, useEffect } from "react";
import { useAIAssistant } from "@/components/providers/ai-assistant-provider";
import { useFirm } from "@/components/providers/firm-provider";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bot, 
  FileText, 
  Phone, 
  Clock, 
  BarChart3, 
  PlusCircle, 
  Users, 
  Wrench,
  Settings, 
  Play, 
  Edit3 
} from "lucide-react";

export default function AgentBuilder() {
  const { setCurrentSection } = useAIAssistant();
  const { isFirmNavigationOpen } = useFirm();
  const [activeTab, setActiveTab] = useState("all-agents");
  
  useEffect(() => {
    setCurrentSection("agent-builder");
  }, [setCurrentSection]);
  
  // Mock data for agents
  const agents = [
    { id: "1", name: "Client Intake Bot", status: "active", type: "Intake", lastRun: "2 hours ago", successRate: "92%" },
    { id: "2", name: "Document Summarizer", status: "active", type: "Document", lastRun: "1 day ago", successRate: "88%" },
    { id: "3", name: "Case Followup Assistant", status: "inactive", type: "Followup", lastRun: "5 days ago", successRate: "79%" },
    { id: "4", name: "Client Satisfaction Survey", status: "draft", type: "Survey", lastRun: "Never", successRate: "N/A" },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agent Builder</h1>
          <p className="text-muted-foreground mt-1">
            Create, manage and monitor your AI agents
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Create Agent
        </Button>
      </div>
      
      <Tabs defaultValue="all-agents" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all-agents">All Agents</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all-agents" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map((agent) => (
              <Card key={agent.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-semibold">{agent.name}</CardTitle>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      agent.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      agent.status === 'inactive' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200' :
                      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                    </div>
                  </div>
                  <CardDescription>Type: {agent.type}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last run:</span>
                      <span>{agent.lastRun}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Success rate:</span>
                      <span>{agent.successRate}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Button variant="outline" size="sm">
                    <Edit3 className="h-4 w-4 mr-1" /> Edit
                  </Button>
                  {agent.status === 'active' && (
                    <Button variant="default" size="sm">
                      <Play className="h-4 w-4 mr-1" /> Run
                    </Button>
                  )}
                  {agent.status !== 'active' && (
                    <Button variant="default" size="sm">
                      <Settings className="h-4 w-4 mr-1" /> Configure
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
            
            {/* Create new agent card */}
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-10">
                <div className="rounded-full bg-primary/10 p-3 mb-3">
                  <PlusCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-1">Create New Agent</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Build a custom AI agent for your specific needs
                </p>
                <Button>Get Started</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="active">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.filter(a => a.status === 'active').map((agent) => (
              <Card key={agent.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-semibold">{agent.name}</CardTitle>
                    <div className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded-full text-xs font-medium">
                      Active
                    </div>
                  </div>
                  <CardDescription>Type: {agent.type}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last run:</span>
                      <span>{agent.lastRun}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Success rate:</span>
                      <span>{agent.successRate}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Button variant="outline" size="sm">
                    <Edit3 className="h-4 w-4 mr-1" /> Edit
                  </Button>
                  <Button variant="default" size="sm">
                    <Play className="h-4 w-4 mr-1" /> Run
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="drafts">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.filter(a => a.status === 'draft').map((agent) => (
              <Card key={agent.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-semibold">{agent.name}</CardTitle>
                    <div className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full text-xs font-medium">
                      Draft
                    </div>
                  </div>
                  <CardDescription>Type: {agent.type}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last run:</span>
                      <span>{agent.lastRun}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Success rate:</span>
                      <span>{agent.successRate}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Button variant="outline" size="sm">
                    <Edit3 className="h-4 w-4 mr-1" /> Edit
                  </Button>
                  <Button variant="default" size="sm">
                    <Settings className="h-4 w-4 mr-1" /> Configure
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="templates">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Client Intake Template</CardTitle>
                <CardDescription>Pre-configured intake workflow</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Collects client information, case details, and schedules initial consultation.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <PlusCircle className="h-4 w-4 mr-2" /> Use Template
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Document Review Template</CardTitle>
                <CardDescription>Legal document analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Reviews and summarizes legal documents, extracts key clauses and risk factors.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <PlusCircle className="h-4 w-4 mr-2" /> Use Template
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Case Follow-up Template</CardTitle>
                <CardDescription>Client communication</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Automatically follows up with clients about case updates and required information.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <PlusCircle className="h-4 w-4 mr-2" /> Use Template
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}