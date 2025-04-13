import { BarChart, PieChart, LineChart, AreaChart, Activity, Users, Phone, Bot, Scale, Briefcase, Calendar, Download, FileText, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import AIAssistantChat from "@/components/shared/ai-assistant-chat";

// Sample chat messages for the AI Assistant
const initialChatMessages = [
  {
    id: "1",
    content: "Hello! I'm your Analytics assistant. How can I help you analyze your legal CRM data today?",
    role: "assistant" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
];

export default function Analytics() {
  return (
    <div className="grid gap-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="mt-1 text-muted-foreground">Comprehensive analytics for your legal CRM system.</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="30d">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="12m">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+20.1%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">New Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2,350</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+18.2%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">AI Call Volume</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+4.3%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+7.4%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="ai-performance">AI Performance</TabsTrigger>
          <TabsTrigger value="client-analysis">Client Analysis</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Revenue Over Time</CardTitle>
                <CardDescription>Monthly revenue for the past year</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <BarChart className="h-12 w-12 text-muted-foreground opacity-50" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Client Distribution</CardTitle>
                <CardDescription>By practice area</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <PieChart className="h-12 w-12 text-muted-foreground opacity-50" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Case Status</CardTitle>
                <CardDescription>Current status of all cases</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <PieChart className="h-12 w-12 text-muted-foreground opacity-50" />
              </CardContent>
            </Card>
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Client Acquisition</CardTitle>
                <CardDescription>New client sign-ups over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <LineChart className="h-12 w-12 text-muted-foreground opacity-50" />
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Law Firms</CardTitle>
              <CardDescription>Based on revenue and client satisfaction</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-primary" />
                    <span className="font-medium">Johnson & Partners</span>
                  </div>
                  <span className="font-medium">$245,832</span>
                </div>
                <Progress value={92} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>156 clients</span>
                  <span>92% satisfaction</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-primary" />
                    <span className="font-medium">Smith Legal Group</span>
                  </div>
                  <span className="font-medium">$183,456</span>
                </div>
                <Progress value={88} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>87 clients</span>
                  <span>88% satisfaction</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-primary" />
                    <span className="font-medium">Williams Law Firm</span>
                  </div>
                  <span className="font-medium">$152,673</span>
                </div>
                <Progress value={85} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>64 clients</span>
                  <span>85% satisfaction</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ai-performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>AI Agent Performance</CardTitle>
                <CardDescription>Success rates by agent type</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <BarChart className="h-12 w-12 text-muted-foreground opacity-50" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Call Volume by Agent</CardTitle>
                <CardDescription>Number of calls handled</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <BarChart className="h-12 w-12 text-muted-foreground opacity-50" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Call Duration Trends</CardTitle>
                <CardDescription>Average call duration over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <LineChart className="h-12 w-12 text-muted-foreground opacity-50" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Knowledge Base Usage</CardTitle>
                <CardDescription>Knowledge base access patterns</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <AreaChart className="h-12 w-12 text-muted-foreground opacity-50" />
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Top AI Agents</CardTitle>
              <CardDescription>Based on efficiency and success rate</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4 text-primary" />
                    <span className="font-medium">Client Intake Assistant</span>
                    <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Active</Badge>
                  </div>
                  <span className="font-medium">87% efficiency</span>
                </div>
                <Progress value={87} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>128 calls handled</span>
                  <span>Last trained: 2 days ago</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4 text-primary" />
                    <span className="font-medium">Legal Research Bot</span>
                    <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Active</Badge>
                  </div>
                  <span className="font-medium">92% efficiency</span>
                </div>
                <Progress value={92} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>210 queries processed</span>
                  <span>Last trained: 1 week ago</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4 text-primary" />
                    <span className="font-medium">Client Follow-up Agent</span>
                    <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Active</Badge>
                  </div>
                  <span className="font-medium">82% efficiency</span>
                </div>
                <Progress value={82} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>98 calls handled</span>
                  <span>Last trained: 5 days ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="client-analysis" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Client Acquisition Channels</CardTitle>
                <CardDescription>How clients are finding you</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <PieChart className="h-12 w-12 text-muted-foreground opacity-50" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Client Retention Rate</CardTitle>
                <CardDescription>Client retention over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <LineChart className="h-12 w-12 text-muted-foreground opacity-50" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Client Demographics</CardTitle>
                <CardDescription>Age and location distribution</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <BarChart className="h-12 w-12 text-muted-foreground opacity-50" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Client Satisfaction</CardTitle>
                <CardDescription>Survey results over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <LineChart className="h-12 w-12 text-muted-foreground opacity-50" />
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Client Growth</CardTitle>
                <CardDescription>New clients over the past 12 months</CardDescription>
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
                    <Download className="mr-2 h-4 w-4" />
                    <span>Download CSV</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FileText className="mr-2 h-4 w-4" />
                    <span>View Report</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <BarChart className="h-12 w-12 text-muted-foreground opacity-50" />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="revenue" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Practice Area</CardTitle>
                <CardDescription>Income distribution across legal practices</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <PieChart className="h-12 w-12 text-muted-foreground opacity-50" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue Trend</CardTitle>
                <CardDescription>Revenue over the past 12 months</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <LineChart className="h-12 w-12 text-muted-foreground opacity-50" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Law Firm</CardTitle>
                <CardDescription>Top revenue-generating firms</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <BarChart className="h-12 w-12 text-muted-foreground opacity-50" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Average Case Value</CardTitle>
                <CardDescription>Case value trends over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <LineChart className="h-12 w-12 text-muted-foreground opacity-50" />
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Revenue Forecast</CardTitle>
              <CardDescription>Projected revenue for the next 6 months</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <AreaChart className="h-12 w-12 text-muted-foreground opacity-50" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Month</CardTitle>
              <CardDescription>Current year vs previous year</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-12 items-center">
                <div className="col-span-4 font-medium">January</div>
                <div className="col-span-7">
                  <div className="flex items-center gap-2">
                    <Progress value={78} className="h-2" />
                    <span className="text-sm font-medium">$38,452</span>
                  </div>
                </div>
                <div className="col-span-1 text-right text-xs text-green-500">+18%</div>
              </div>
              
              <div className="grid grid-cols-12 items-center">
                <div className="col-span-4 font-medium">February</div>
                <div className="col-span-7">
                  <div className="flex items-center gap-2">
                    <Progress value={82} className="h-2" />
                    <span className="text-sm font-medium">$42,128</span>
                  </div>
                </div>
                <div className="col-span-1 text-right text-xs text-green-500">+22%</div>
              </div>
              
              <div className="grid grid-cols-12 items-center">
                <div className="col-span-4 font-medium">March</div>
                <div className="col-span-7">
                  <div className="flex items-center gap-2">
                    <Progress value={91} className="h-2" />
                    <span className="text-sm font-medium">$45,231</span>
                  </div>
                </div>
                <div className="col-span-1 text-right text-xs text-green-500">+31%</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* AI Assistant */}
      <div className="hidden lg:block">
        <AIAssistantChat 
          initialMessages={initialChatMessages} 
          title="Analytics Assistant"
          heightClass="h-[300px]"
        />
      </div>
    </div>
  );
}
