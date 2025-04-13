import { Building2, Plus, Users, Scale, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import AIAssistantChat from "@/components/shared/ai-assistant-chat";

// Law firms data (in a real app, this would come from an API)
const lawFirms = [
  {
    id: 1,
    name: "Johnson & Partners",
    location: "New York, NY",
    attorneys: 24,
    clients: 156,
    activeCases: 38,
    subscription: "Enterprise",
    joinedDate: "Jan 2022",
  },
  {
    id: 2,
    name: "Smith Legal Group",
    location: "Los Angeles, CA",
    attorneys: 12,
    clients: 87,
    activeCases: 22,
    subscription: "Professional",
    joinedDate: "Mar 2022",
  },
  {
    id: 3,
    name: "Williams Law Firm",
    location: "Chicago, IL",
    attorneys: 8,
    clients: 64,
    activeCases: 17,
    subscription: "Professional",
    joinedDate: "May 2022",
  },
  {
    id: 4,
    name: "Rahman & Associates",
    location: "Houston, TX",
    attorneys: 5,
    clients: 42,
    activeCases: 12,
    subscription: "Standard",
    joinedDate: "Jul 2022",
  },
  {
    id: 5,
    name: "Davis & Miller LLP",
    location: "Miami, FL",
    attorneys: 15,
    clients: 93,
    activeCases: 25,
    subscription: "Enterprise",
    joinedDate: "Feb 2022",
  },
  {
    id: 6,
    name: "Thompson Legal",
    location: "Seattle, WA",
    attorneys: 7,
    clients: 51,
    activeCases: 14,
    subscription: "Standard",
    joinedDate: "Apr 2022",
  },
];

// Sample chat messages for the AI Assistant
const initialChatMessages = [
  {
    id: "1",
    content: "Hello! How can I help you with law firm management today?",
    role: "assistant" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
];

export default function LawFirms() {
  return (
    <div className="grid gap-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Law Firms</h1>
          <p className="mt-1 text-muted-foreground">Manage all your law firm clients and their details.</p>
        </div>
        <Button className="sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add New Law Firm
        </Button>
      </div>
      
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search law firms..." className="pl-10" />
        </div>
        <Button variant="outline">
          Filter
        </Button>
        <Button variant="outline">
          Sort
        </Button>
      </div>
      
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Firms</TabsTrigger>
          <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
          <TabsTrigger value="professional">Professional</TabsTrigger>
          <TabsTrigger value="standard">Standard</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {lawFirms.map((firm) => (
              <Card key={firm.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-bold">{firm.name}</CardTitle>
                    <Badge variant={firm.subscription === "Enterprise" ? "default" : (firm.subscription === "Professional" ? "secondary" : "outline")}>{firm.subscription}</Badge>
                  </div>
                  <CardDescription>{firm.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="flex flex-col items-center">
                      <Building2 className="h-5 w-5 mb-1 text-primary" />
                      <span className="text-xl font-semibold">{firm.attorneys}</span>
                      <span className="text-xs text-muted-foreground">Attorneys</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Users className="h-5 w-5 mb-1 text-primary" />
                      <span className="text-xl font-semibold">{firm.clients}</span>
                      <span className="text-xs text-muted-foreground">Clients</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Scale className="h-5 w-5 mb-1 text-primary" />
                      <span className="text-xl font-semibold">{firm.activeCases}</span>
                      <span className="text-xs text-muted-foreground">Cases</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Joined: {firm.joinedDate}</span>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="enterprise" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {lawFirms
              .filter((firm) => firm.subscription === "Enterprise")
              .map((firm) => (
                <Card key={firm.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-bold">{firm.name}</CardTitle>
                      <Badge>{firm.subscription}</Badge>
                    </div>
                    <CardDescription>{firm.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="flex flex-col items-center">
                        <Building2 className="h-5 w-5 mb-1 text-primary" />
                        <span className="text-xl font-semibold">{firm.attorneys}</span>
                        <span className="text-xs text-muted-foreground">Attorneys</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Users className="h-5 w-5 mb-1 text-primary" />
                        <span className="text-xl font-semibold">{firm.clients}</span>
                        <span className="text-xs text-muted-foreground">Clients</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Scale className="h-5 w-5 mb-1 text-primary" />
                        <span className="text-xl font-semibold">{firm.activeCases}</span>
                        <span className="text-xs text-muted-foreground">Cases</span>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Joined: {firm.joinedDate}</span>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="professional" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {lawFirms
              .filter((firm) => firm.subscription === "Professional")
              .map((firm) => (
                <Card key={firm.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-bold">{firm.name}</CardTitle>
                      <Badge variant="secondary">{firm.subscription}</Badge>
                    </div>
                    <CardDescription>{firm.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="flex flex-col items-center">
                        <Building2 className="h-5 w-5 mb-1 text-primary" />
                        <span className="text-xl font-semibold">{firm.attorneys}</span>
                        <span className="text-xs text-muted-foreground">Attorneys</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Users className="h-5 w-5 mb-1 text-primary" />
                        <span className="text-xl font-semibold">{firm.clients}</span>
                        <span className="text-xs text-muted-foreground">Clients</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Scale className="h-5 w-5 mb-1 text-primary" />
                        <span className="text-xl font-semibold">{firm.activeCases}</span>
                        <span className="text-xs text-muted-foreground">Cases</span>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Joined: {firm.joinedDate}</span>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="standard" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {lawFirms
              .filter((firm) => firm.subscription === "Standard")
              .map((firm) => (
                <Card key={firm.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-bold">{firm.name}</CardTitle>
                      <Badge variant="outline">{firm.subscription}</Badge>
                    </div>
                    <CardDescription>{firm.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="flex flex-col items-center">
                        <Building2 className="h-5 w-5 mb-1 text-primary" />
                        <span className="text-xl font-semibold">{firm.attorneys}</span>
                        <span className="text-xs text-muted-foreground">Attorneys</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Users className="h-5 w-5 mb-1 text-primary" />
                        <span className="text-xl font-semibold">{firm.clients}</span>
                        <span className="text-xs text-muted-foreground">Clients</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Scale className="h-5 w-5 mb-1 text-primary" />
                        <span className="text-xl font-semibold">{firm.activeCases}</span>
                        <span className="text-xs text-muted-foreground">Cases</span>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Joined: {firm.joinedDate}</span>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
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
          title="Law Firm Management Assistant"
          heightClass="h-[300px]"
        />
      </div>
    </div>
  );
}
