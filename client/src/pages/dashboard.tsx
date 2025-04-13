import { Clock, CheckCircle, Phone, Calendar, User, Activity, FileText, MessageSquare, Users, Bot } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuoteOfTheDay from "@/components/shared/quote-of-the-day";
import AIAssistantChat from "@/components/shared/ai-assistant-chat";
import StatsCard from "@/components/shared/stats-card";
import RecentActivityItem from "@/components/shared/recent-activity-item";
import QuickActionButton from "@/components/shared/quick-action-button";
import { useToast } from "@/hooks/use-toast";

// Recent activities data
const recentActivities = [
  {
    id: 1,
    action: "Client Intake Call Completed",
    target: "AI Agent completed intake for 'Johnson Family Trust' case",
    path: "/agent-builder/123",
    timestamp: "10min ago",
    icon: Clock,
    section: "Agent Builder",
  },
  {
    id: 2,
    action: "New Document Added",
    target: "Ahmad added 'Settlement Agreement' to Smith vs. Jones case",
    path: "/agent-builder/knowledge-base",
    timestamp: "32min ago",
    icon: FileText,
    section: "Agent Builder",
  },
  {
    id: 3,
    action: "Knowledge Base Updated",
    target: "New legal precedent data added to Tax Law knowledge base",
    path: "/knowledge-base",
    timestamp: "1hr ago",
    icon: MessageSquare,
    section: "Agent Builder",
  },
  {
    id: 4,
    action: "AI Agent Updated",
    target: "Client Intake Agent trained on updated ethical guidelines",
    path: "/agent-builder/456",
    timestamp: "2hrs ago",
    icon: Bot,
    section: "Agent Builder",
  },
  {
    id: 5,
    action: "New Law Firm Onboarded",
    target: "Rahman & Associates added with 5 attorneys and 12 staff members",
    path: "/law-firms/rahman-associates",
    timestamp: "4hrs ago",
    icon: Users,
    section: "Law Firm Management",
  },
];

// Sample chat history
const initialChatMessages = [
  {
    id: "1",
    content: "Hello! How can I assist you with the CRM today?",
    role: "assistant" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
  },
  {
    id: "2",
    content: "I need to find the latest documents for the Johnson case.",
    role: "user" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 4), // 4 minutes ago
  },
  {
    id: "3",
    content:
      "I found 3 recent documents for Johnson v. Smith (Case #JL-2023-42):\n\n1. Motion to Dismiss (uploaded yesterday)\n2. Client Statement (uploaded 3 days ago)\n3. Evidence Summary (uploaded last week)\n\nWould you like me to open any of these?",
    role: "assistant" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 3), // 3 minutes ago
  },
];

export default function Dashboard() {
  const { toast } = useToast();
  
  const handleQuickAction = (action: string) => {
    toast({
      title: "Quick Action",
      description: `${action} action initiated`,
    });
  };

  return (
    <div className="grid gap-6">
      {/* Page Title & Quote */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Welcome back! Here's an overview of your legal operations.</p>
        
        <QuoteOfTheDay />
      </div>
      
      {/* Stats Overview */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Active Clients" 
          value="328" 
          icon={User} 
          changeText="from last month" 
          changePercentage="+7.2%" 
          changeDirection="up" 
        />
        
        <StatsCard 
          title="Ongoing Cases" 
          value="143" 
          icon={Activity} 
          changeText="from last month" 
          changePercentage="+2.5%" 
          changeDirection="up" 
        />
        
        <StatsCard 
          title="AI Calls Today" 
          value="87" 
          icon={Phone} 
          changeText="from yesterday" 
          changePercentage="+12.9%" 
          changeDirection="up" 
        />
        
        <StatsCard 
          title="Revenue (MTD)" 
          value="$42.5k" 
          icon={FileText} 
          changeText="from last month" 
          changePercentage="+18.2%" 
          changeDirection="up" 
        />
      </div>
      
      <Tabs defaultValue="tasks" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="personalAssistant">Personal Assistant</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tasks" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tasks in Progress</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">4 due today</p>
                <div className="mt-4 space-y-3">
                  <Link href="/internal-operations/tasks/review-logs">
                    <div className="flex items-center justify-between rounded-md bg-accent p-3 hover:bg-accent/50 transition-colors cursor-pointer border-l-4 border-l-transparent hover:border-l-primary shadow-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span className="text-sm">Review agent call logs</span>
                      </div>
                      <span className="text-xs text-muted-foreground">2:30 PM</span>
                    </div>
                  </Link>
                  <Link href="/law-firm/johnson-legal/onboarding">
                    <div className="flex items-center justify-between rounded-md bg-accent p-3 hover:bg-accent/50 transition-colors cursor-pointer border-l-4 border-l-transparent hover:border-l-primary shadow-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span className="text-sm">Onboard Johnson Legal Group</span>
                      </div>
                      <span className="text-xs text-muted-foreground">4:00 PM</span>
                    </div>
                  </Link>
                  <Link href="/agent-builder/settings/webhooks">
                    <div className="flex items-center justify-between rounded-md bg-accent p-3 hover:bg-accent/50 transition-colors cursor-pointer border-l-4 border-l-transparent hover:border-l-primary shadow-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span className="text-sm">Configure webhook settings</span>
                      </div>
                      <span className="text-xs text-muted-foreground">Tomorrow</span>
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Calls</CardTitle>
                <Phone className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Next call in 45 minutes</p>
                <div className="mt-4 space-y-3">
                  <Link href="/law-firm/smith-associates/calls/123">
                    <div className="flex items-center justify-between rounded-md bg-accent p-3 hover:bg-accent/50 transition-colors cursor-pointer border-l-4 border-l-transparent hover:border-l-primary shadow-sm">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-primary" />
                        <span className="text-sm">Smith & Associates</span>
                      </div>
                      <span className="text-xs text-muted-foreground">11:30 AM</span>
                    </div>
                  </Link>
                  <Link href="/law-firm/williams-law/calls/456">
                    <div className="flex items-center justify-between rounded-md bg-accent p-3 hover:bg-accent/50 transition-colors cursor-pointer border-l-4 border-l-transparent hover:border-l-primary shadow-sm">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-primary" />
                        <span className="text-sm">Williams Law Partners</span>
                      </div>
                      <span className="text-xs text-muted-foreground">2:00 PM</span>
                    </div>
                  </Link>
                  <Link href="/law-firm/davis-miller/calls/789">
                    <div className="flex items-center justify-between rounded-md bg-accent p-3 hover:bg-accent/50 transition-colors cursor-pointer border-l-4 border-l-transparent hover:border-l-primary shadow-sm">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-primary" />
                        <span className="text-sm">Davis & Miller LLP</span>
                      </div>
                      <span className="text-xs text-muted-foreground">Tomorrow</span>
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Calendar Events</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">2 meetings today</p>
                <div className="mt-4 space-y-3">
                  <Link href="/calendar/events/123">
                    <div className="flex items-center justify-between rounded-md bg-accent p-3 hover:bg-accent/50 transition-colors cursor-pointer border-l-4 border-l-transparent hover:border-l-primary shadow-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="text-sm">Team Strategy Meeting</span>
                      </div>
                      <span className="text-xs text-muted-foreground">1:00 PM</span>
                    </div>
                  </Link>
                  <Link href="/calendar/events/456">
                    <div className="flex items-center justify-between rounded-md bg-accent p-3 hover:bg-accent/50 transition-colors cursor-pointer border-l-4 border-l-transparent hover:border-l-primary shadow-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="text-sm">Client Onboarding</span>
                      </div>
                      <span className="text-xs text-muted-foreground">3:30 PM</span>
                    </div>
                  </Link>
                  <Link href="/calendar/events/789">
                    <div className="flex items-center justify-between rounded-md bg-accent p-3 hover:bg-accent/50 transition-colors cursor-pointer border-l-4 border-l-transparent hover:border-l-primary shadow-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="text-sm">AI Training Session</span>
                      </div>
                      <span className="text-xs text-muted-foreground">Tomorrow</span>
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Your recent notifications will appear here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="communications">
          <Card>
            <CardHeader>
              <CardTitle>Communications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Your recent communications will appear here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Your analytics data will appear here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="personalAssistant">
          <Card>
            <CardHeader>
              <CardTitle>Personal Assistant</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Your personal assistant features will appear here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex items-center justify-between p-6">
              <CardTitle className="text-lg font-medium">Recent Activities</CardTitle>
              <Link href="/activities">
                <a className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                  View All
                </a>
              </Link>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <RecentActivityItem
                    key={activity.id}
                    icon={activity.icon}
                    title={activity.action}
                    description={activity.target}
                    timestamp={activity.timestamp}
                    href={activity.path}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* AI Assistant & Quick Actions */}
        <div className="space-y-6">
          <AIAssistantChat initialMessages={initialChatMessages} />
          
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <QuickActionButton
                  icon={FileText}
                  label="Create New Document"
                  onClick={() => handleQuickAction("Create Document")}
                />
                <QuickActionButton
                  icon={Users}
                  label="Add New Client"
                  onClick={() => handleQuickAction("Add Client")}
                />
                <QuickActionButton
                  icon={Calendar}
                  label="Schedule AI Call"
                  onClick={() => handleQuickAction("Schedule Call")}
                />
                <QuickActionButton
                  icon={Bot}
                  label="Train AI Agent"
                  onClick={() => handleQuickAction("Train Agent")}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
