import { useState, useEffect } from "react";
import { 
  Building, 
  Users, 
  FileText, 
  Clock, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  DollarSign,
  Briefcase,
  GanttChart,
  BarChart3,
  FileEdit
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useFirm } from "@/components/providers/firm-provider";
import { useAIAssistant } from "@/components/providers/ai-assistant-provider";

// Sample data for firm details - in a real app, this would come from an API
const firmMetrics = {
  activeMatters: 28,
  pendingIntakes: 12,
  weeklyRevenue: '$24,850',
  collectionRate: 87,
  upcomingDeadlines: 8,
  newLeads: 15,
  completedCalls: 34,
  teamMembers: 7
};

const recentMatters = [
  {
    id: 'matter-1',
    title: 'Johnson v. State Farm Insurance',
    type: 'Personal Injury',
    stage: 'Discovery',
    assignee: 'Sarah Chen',
    deadline: '2025-04-20'
  },
  {
    id: 'matter-2',
    title: 'Williams Estate Planning',
    type: 'Estate Planning',
    stage: 'Document Preparation',
    assignee: 'Michael Rodriguez',
    deadline: '2025-04-18'
  },
  {
    id: 'matter-3',
    title: 'Davis Family Trust',
    type: 'Trust Administration',
    stage: 'Review',
    assignee: 'Emily Johnson',
    deadline: '2025-04-25'
  }
];

const recentClientIntakes = [
  {
    id: 'intake-1',
    name: 'Robert Thompson',
    date: '2025-04-12',
    caseType: 'Contract Dispute',
    status: 'Qualified',
    assignedTo: 'James Wilson'
  },
  {
    id: 'intake-2',
    name: 'Maria Garcia',
    date: '2025-04-11',
    caseType: 'Personal Injury',
    status: 'Pending Review',
    assignedTo: 'Sarah Chen'
  },
  {
    id: 'intake-3',
    name: 'David Lee',
    date: '2025-04-10',
    caseType: 'Immigration',
    status: 'Qualified',
    assignedTo: 'Michael Rodriguez'
  }
];

const teamMembers = [
  {
    id: 'member-1',
    name: 'Sarah Chen',
    role: 'Senior Partner',
    activeCases: 8,
    efficiency: 92
  },
  {
    id: 'member-2',
    name: 'Michael Rodriguez',
    role: 'Associate Attorney',
    activeCases: 12,
    efficiency: 85
  },
  {
    id: 'member-3',
    name: 'Emily Johnson',
    role: 'Paralegal',
    activeCases: 15,
    efficiency: 89
  },
  {
    id: 'member-4',
    name: 'James Wilson',
    role: 'Associate Attorney',
    activeCases: 10,
    efficiency: 78
  }
];

export default function FirmDetailView() {
  const { selectedFirm } = useFirm();
  const { setCurrentSection } = useAIAssistant();
  
  useEffect(() => {
    setCurrentSection('firm-detail');
  }, [setCurrentSection]);

  if (!selectedFirm) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Building className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-medium">No Law Firm Selected</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Please select a law firm from the navigation menu.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Firm Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Building className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">{selectedFirm.name}</h1>
          </div>
          <p className="mt-1 text-muted-foreground">
            {selectedFirm.type} • Clients: 125 • Matters: 48
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Phone className="h-4 w-4" />
            <span>Call</span>
          </Button>
          <Button variant="outline" className="gap-2">
            <Mail className="h-4 w-4" />
            <span>Email</span>
          </Button>
          <Button className="gap-2">
            <FileEdit className="h-4 w-4" />
            <span>Edit</span>
          </Button>
        </div>
      </div>

      {/* Firm Overview Stats */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Matters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{firmMetrics.activeMatters}</div>
              <Briefcase className="h-5 w-5 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">New Intakes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{firmMetrics.pendingIntakes}</div>
              <Users className="h-5 w-5 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Weekly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{firmMetrics.weeklyRevenue}</div>
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{firmMetrics.upcomingDeadlines}</div>
              <Calendar className="h-5 w-5 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="flex">
          <TabsTrigger value="overview" className="flex items-center gap-1">
            <GanttChart className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="matters" className="flex items-center gap-1">
            <Briefcase className="h-4 w-4" />
            <span>Matters</span>
          </TabsTrigger>
          <TabsTrigger value="clients" className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>Clients</span>
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>Team</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            <span>Billing</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-1">
            <BarChart3 className="h-4 w-4" />
            <span>Analytics</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3">
            {/* Recent Matters */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Recent Matters</CardTitle>
                <CardDescription>
                  Latest active legal matters for this firm
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentMatters.map((matter) => (
                  <div key={matter.id} className="flex items-start gap-4 rounded-md p-3 hover:bg-accent/50 transition-colors">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{matter.title}</p>
                        <Badge variant="outline">{matter.stage}</Badge>
                      </div>
                      <div className="mt-1 flex items-center text-xs text-muted-foreground">
                        <span>{matter.type}</span>
                        <span className="mx-2">•</span>
                        <span>Assigned to: {matter.assignee}</span>
                        <span className="mx-2">•</span>
                        <Clock className="mr-1 h-3 w-3" />
                        <span>Due: {new Date(matter.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Matters</Button>
              </CardFooter>
            </Card>

            {/* Recent Client Intakes */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Intakes</CardTitle>
                <CardDescription>
                  New client intakes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentClientIntakes.map((intake) => (
                  <div key={intake.id} className="flex items-start gap-4 rounded-md p-3 hover:bg-accent/50 transition-colors">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{intake.name}</p>
                      <div className="mt-1 flex items-center justify-between">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span>{intake.caseType}</span>
                        </div>
                        <Badge 
                          className={
                            intake.status === 'Qualified' 
                              ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20' 
                              : 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20'
                          }
                        >
                          {intake.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Intakes</Button>
              </CardFooter>
            </Card>
          </div>

          {/* Firm Key Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Firm Metrics</CardTitle>
              <CardDescription>
                Key performance indicators
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Collection Rate */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>Collection Rate</span>
                  </div>
                  <span className="font-medium">{firmMetrics.collectionRate}%</span>
                </div>
                <Progress value={firmMetrics.collectionRate} className="h-2" />
              </div>
              
              {/* Team Utilization */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>Team Utilization</span>
                  </div>
                  <span className="font-medium">76%</span>
                </div>
                <Progress value={76} className="h-2" />
              </div>
              
              {/* Client Satisfaction */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>Client Satisfaction</span>
                  </div>
                  <span className="font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>Phone:</span>
                    <span className="font-medium">(555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>Email:</span>
                    <span className="font-medium">contact@{selectedFirm.id}.law</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>Address:</span>
                    <span className="font-medium">123 Legal Ave, Suite 400, San Francisco, CA 94103</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span>Office Hours:</span>
                    <span className="font-medium">Mon-Fri: 9am-6pm</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            {teamMembers.map((member) => (
              <Card key={member.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col">
                      <CardTitle className="text-lg">{member.name}</CardTitle>
                      <CardDescription>{member.role}</CardDescription>
                    </div>
                    <Badge variant="outline">{member.activeCases} Active Cases</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Efficiency</span>
                      <span className="font-medium">{member.efficiency}%</span>
                    </div>
                    <Progress value={member.efficiency} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Matters Closed</p>
                      <p className="font-medium">24</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Client Rating</p>
                      <p className="font-medium">4.8/5.0</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Profile</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Other tabs would have similar structured content */}
        <TabsContent value="matters">
          <Card>
            <CardHeader>
              <CardTitle>Matters</CardTitle>
              <CardDescription>Manage all legal matters for this firm</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground p-6">
                This tab would contain a comprehensive listing and management interface for all matters associated with this firm.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="clients">
          <Card>
            <CardHeader>
              <CardTitle>Clients</CardTitle>
              <CardDescription>Manage all clients for this firm</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground p-6">
                This tab would contain a client management interface with detailed client records, history, and interactions.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing</CardTitle>
              <CardDescription>Manage financial records and invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground p-6">
                This tab would contain billing history, pending invoices, payment tracking, and financial reports.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>Performance metrics and data insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground p-6">
                This tab would contain charts, graphs, and analytical reports on firm performance, case outcomes, and financial metrics.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}