import { useState } from "react";
import { Phone, Plus, Search, Filter, PhoneCall, PhoneIncoming, PhoneOutgoing, Pause, Play, Users, Calendar, Bot, MoreHorizontal, DownloadCloud, FileText, Headphones } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import AIAssistantChat from "@/components/shared/ai-assistant-chat";

// Call center data
const callStats = {
  totalCalls: 1278,
  activeCalls: 12,
  completedToday: 78,
  callsPerHour: 32,
  avgDuration: "4:32",
  successRate: 83,
};

// Recent calls data
const recentCalls = [
  {
    id: "CALL-10045",
    client: "John Smith",
    phone: "(555) 123-4567",
    agent: "Client Intake Assistant",
    type: "Inbound",
    duration: "4:32",
    status: "Completed",
    outcome: "Qualified",
    date: "Today, 10:25 AM",
  },
  {
    id: "CALL-10044",
    client: "Maria Rodriguez",
    phone: "(555) 987-6543",
    agent: "Client Follow-up Agent",
    type: "Outbound",
    duration: "3:15",
    status: "Completed",
    outcome: "Scheduled Meeting",
    date: "Today, 9:48 AM",
  },
  {
    id: "CALL-10043",
    client: "David Chen",
    phone: "(555) 456-7890",
    agent: "Client Intake Assistant",
    type: "Inbound",
    duration: "1:45",
    status: "Completed",
    outcome: "Not Qualified",
    date: "Today, 9:22 AM",
  },
  {
    id: "CALL-10042",
    client: "Sarah Johnson",
    phone: "(555) 789-0123",
    agent: "Client Intake Assistant",
    type: "Inbound",
    duration: "5:12",
    status: "Completed",
    outcome: "Qualified",
    date: "Today, 9:05 AM",
  },
  {
    id: "CALL-10041",
    client: "Michael Brown",
    phone: "(555) 234-5678",
    agent: "Client Follow-up Agent",
    type: "Outbound",
    duration: "2:50",
    status: "Completed",
    outcome: "Scheduled Meeting",
    date: "Yesterday, 4:18 PM",
  },
  {
    id: "CALL-10040",
    client: "Jennifer Lee",
    phone: "(555) 876-5432",
    agent: "Client Intake Assistant",
    type: "Inbound",
    duration: "3:22",
    status: "Completed",
    outcome: "Qualified",
    date: "Yesterday, 3:45 PM",
  },
];

// Active campaigns
const activeCampaigns = [
  {
    id: 1,
    name: "New Client Intake",
    agent: "Client Intake Assistant",
    status: "Active",
    totalCalls: 250,
    completedCalls: 183,
    successRate: 76,
    startDate: "Nov 15, 2023",
    endDate: "Dec 15, 2023",
  },
  {
    id: 2,
    name: "Client Follow-up Campaign",
    agent: "Client Follow-up Agent",
    status: "Active",
    totalCalls: 150,
    completedCalls: 98,
    successRate: 82,
    startDate: "Nov 20, 2023",
    endDate: "Dec 5, 2023",
  },
  {
    id: 3,
    name: "Customer Satisfaction Survey",
    agent: "Client Follow-up Agent",
    status: "Paused",
    totalCalls: 100,
    completedCalls: 45,
    successRate: 91,
    startDate: "Nov 10, 2023",
    endDate: "Dec 10, 2023",
  },
];

// Active calls data
const activeCalls = [
  {
    id: "CALL-10053",
    client: "Robert Anderson",
    phone: "(555) 111-2222",
    agent: "Client Intake Assistant",
    type: "Inbound",
    duration: "2:45",
    status: "In Progress",
    startTime: "11:22 AM",
  },
  {
    id: "CALL-10052",
    client: "Lisa Wilson",
    phone: "(555) 333-4444",
    agent: "Client Follow-up Agent",
    type: "Outbound",
    duration: "1:30",
    status: "In Progress",
    startTime: "11:18 AM",
  },
  {
    id: "CALL-10051",
    client: "James Miller",
    phone: "(555) 555-6666",
    agent: "Client Intake Assistant",
    type: "Inbound",
    duration: "0:56",
    status: "In Progress",
    startTime: "11:10 AM",
  },
];

// Sample chat messages for the AI Assistant
const initialChatMessages = [
  {
    id: "1",
    content: "Hello! I'm your Call Center Management assistant. How can I help you today?",
    role: "assistant" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
];

export default function CallCenter() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredCalls = recentCalls.filter(call => 
    call.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    call.agent.toLowerCase().includes(searchTerm.toLowerCase()) ||
    call.outcome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    call.phone.includes(searchTerm)
  );

  const filteredCampaigns = activeCampaigns.filter(campaign => 
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.agent.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">{status}</Badge>;
      case "In Progress":
        return <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">{status}</Badge>;
      case "Failed":
        return <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">{status}</Badge>;
      case "Active":
        return <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">{status}</Badge>;
      case "Paused":
        return <Badge className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getOutcomeBadge = (outcome: string) => {
    switch (outcome) {
      case "Qualified":
        return <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">{outcome}</Badge>;
      case "Not Qualified":
        return <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">{outcome}</Badge>;
      case "Scheduled Meeting":
        return <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">{outcome}</Badge>;
      default:
        return <Badge variant="outline">{outcome}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Inbound":
        return <PhoneIncoming className="h-4 w-4 mr-1 text-green-500" />;
      case "Outbound":
        return <PhoneOutgoing className="h-4 w-4 mr-1 text-blue-500" />;
      default:
        return <Phone className="h-4 w-4 mr-1" />;
    }
  };

  return (
    <div className="grid gap-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Call Center</h1>
          <p className="mt-1 text-muted-foreground">Manage AI-powered call center operations and campaigns.</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <PhoneCall className="mr-2 h-4 w-4" />
            Start New Call
          </Button>
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            New Campaign
          </Button>
        </div>
      </div>
      
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search calls or campaigns..." 
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
      
      {/* Call Center Stats */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{callStats.totalCalls}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Calls</CardTitle>
            <PhoneCall className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{callStats.activeCalls}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{callStats.completedToday}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Calls/Hour</CardTitle>
            <PhoneCall className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{callStats.callsPerHour}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg. Duration</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{callStats.avgDuration}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{callStats.successRate}%</div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Calls</TabsTrigger>
          <TabsTrigger value="recent">Recent Calls</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="analytics">Call Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Active Calls</CardTitle>
              <CardDescription>Real-time overview of ongoing calls</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Call ID</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Agent</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Started</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeCalls.map((call) => (
                    <TableRow key={call.id}>
                      <TableCell className="font-medium">{call.id}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{call.client}</span>
                          <span className="text-xs text-muted-foreground">{call.phone}</span>
                        </div>
                      </TableCell>
                      <TableCell>{call.agent}</TableCell>
                      <TableCell className="flex items-center">
                        {getTypeIcon(call.type)}
                        {call.type}
                      </TableCell>
                      <TableCell className="font-medium text-primary">{call.duration}</TableCell>
                      <TableCell>{getStatusBadge(call.status)}</TableCell>
                      <TableCell>{call.startTime}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Headphones className="h-4 w-4" />
                            <span className="sr-only">Listen</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-yellow-500">
                            <Pause className="h-4 w-4" />
                            <span className="sr-only">Pause</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Call Queue</CardTitle>
              <CardDescription>Upcoming scheduled and queued calls</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <PhoneCall className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <h3 className="text-lg font-medium">No calls in queue</h3>
                <p className="text-sm text-muted-foreground mt-1">All current calls are being handled</p>
                <Button className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Manual Call
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Calls</CardTitle>
              <CardDescription>Calls completed in the last 24 hours</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Call ID</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Agent</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Outcome</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCalls.map((call) => (
                    <TableRow key={call.id}>
                      <TableCell className="font-medium">{call.id}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{call.client}</span>
                          <span className="text-xs text-muted-foreground">{call.phone}</span>
                        </div>
                      </TableCell>
                      <TableCell>{call.agent}</TableCell>
                      <TableCell className="flex items-center">
                        {getTypeIcon(call.type)}
                        {call.type}
                      </TableCell>
                      <TableCell>{call.duration}</TableCell>
                      <TableCell>{getOutcomeBadge(call.outcome)}</TableCell>
                      <TableCell>{call.date}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Headphones className="mr-2 h-4 w-4" />
                              <span>Listen to Recording</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              <span>View Transcript</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <DownloadCloud className="mr-2 h-4 w-4" />
                              <span>Download</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="campaigns" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCampaigns.map((campaign) => (
              <Card key={campaign.id} className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{campaign.name}</CardTitle>
                    {getStatusBadge(campaign.status)}
                  </div>
                  <CardDescription className="mt-1">Agent: {campaign.agent}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{Math.round((campaign.completedCalls / campaign.totalCalls) * 100)}%</span>
                      </div>
                      <Progress value={(campaign.completedCalls / campaign.totalCalls) * 100} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Start Date</p>
                        <p>{campaign.startDate}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">End Date</p>
                        <p>{campaign.endDate}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Total Calls</p>
                        <p>{campaign.totalCalls}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Completed</p>
                        <p>{campaign.completedCalls}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1 text-sm">
                        <span className="text-muted-foreground">Success Rate:</span>
                        <span className="font-medium">{campaign.successRate}%</span>
                      </div>
                      <div className="flex gap-2">
                        {campaign.status === "Active" ? (
                          <Button variant="outline" size="sm" className="gap-1">
                            <Pause className="h-3 w-3" />
                            Pause
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" className="gap-1">
                            <Play className="h-3 w-3" />
                            Resume
                          </Button>
                        )}
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Card className="flex flex-col items-center justify-center p-6 border-dashed">
              <Plus className="h-8 w-8 text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium">Create New Campaign</h3>
              <p className="text-sm text-muted-foreground text-center mt-1 mb-4">Set up a new outbound call campaign</p>
              <Button>Create Campaign</Button>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Call Volume</CardTitle>
                <CardDescription>Calls per day over the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <Phone className="h-16 w-16 text-muted-foreground opacity-50" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Call Outcomes</CardTitle>
                <CardDescription>Distribution of call results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <Phone className="h-16 w-16 text-muted-foreground opacity-50" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Call Duration</CardTitle>
                <CardDescription>Average call duration by time of day</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <Phone className="h-16 w-16 text-muted-foreground opacity-50" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Agent Performance</CardTitle>
                <CardDescription>Success rate by AI agent</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <Bot className="h-16 w-16 text-muted-foreground opacity-50" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* AI Assistant */}
      <div className="hidden lg:block">
        <AIAssistantChat 
          initialMessages={initialChatMessages} 
          title="Call Center Assistant"
          heightClass="h-[300px]"
        />
      </div>
    </div>
  );
}
