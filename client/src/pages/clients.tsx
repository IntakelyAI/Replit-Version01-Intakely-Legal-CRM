import { useState } from "react";
import { User, Plus, Search, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import AIAssistantChat from "@/components/shared/ai-assistant-chat";

// Client data example - in a real app this would be fetched from an API
const clients = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    lawFirm: "Johnson & Partners",
    status: "Active",
    cases: 3,
    joinedDate: "Jan 15, 2023",
    avatar: "",
  },
  {
    id: 2,
    name: "Maria Rodriguez",
    email: "maria.rodriguez@example.com",
    phone: "+1 (555) 987-6543",
    lawFirm: "Smith Legal Group",
    status: "Active",
    cases: 1,
    joinedDate: "Feb 22, 2023",
    avatar: "",
  },
  {
    id: 3,
    name: "David Chen",
    email: "david.chen@example.com",
    phone: "+1 (555) 456-7890",
    lawFirm: "Williams Law Firm",
    status: "Inactive",
    cases: 0,
    joinedDate: "Mar 10, 2023",
    avatar: "",
  },
  {
    id: 4,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 789-0123",
    lawFirm: "Johnson & Partners",
    status: "Active",
    cases: 2,
    joinedDate: "Apr 5, 2023",
    avatar: "",
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "+1 (555) 234-5678",
    lawFirm: "Rahman & Associates",
    status: "Active",
    cases: 1,
    joinedDate: "May 18, 2023",
    avatar: "",
  },
  {
    id: 6,
    name: "Jennifer Lee",
    email: "jennifer.lee@example.com",
    phone: "+1 (555) 876-5432",
    lawFirm: "Davis & Miller LLP",
    status: "Pending",
    cases: 0,
    joinedDate: "Jun 30, 2023",
    avatar: "",
  },
];

// Sample chat messages for the AI Assistant
const initialChatMessages = [
  {
    id: "1",
    content: "Hello! How can I help you manage your clients today?",
    role: "assistant" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
];

export default function Clients() {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.lawFirm.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  return (
    <div className="grid gap-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
          <p className="mt-1 text-muted-foreground">Manage and monitor all your clients in one place.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Client
        </Button>
      </div>
      
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search clients..." 
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
      
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Clients</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {loading ? (
            <ClientsLoading />
          ) : filteredClients.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredClients.map((client) => (
                <ClientCard key={client.id} client={client} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <User className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="text-center text-lg font-medium">No clients found</p>
                <p className="text-center text-sm text-muted-foreground mt-1">
                  Try adjusting your search or filter criteria
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="active" className="space-y-4">
          {loading ? (
            <ClientsLoading />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredClients
                .filter((client) => client.status === "Active")
                .map((client) => (
                  <ClientCard key={client.id} client={client} />
                ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="pending" className="space-y-4">
          {loading ? (
            <ClientsLoading />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredClients
                .filter((client) => client.status === "Pending")
                .map((client) => (
                  <ClientCard key={client.id} client={client} />
                ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="inactive" className="space-y-4">
          {loading ? (
            <ClientsLoading />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredClients
                .filter((client) => client.status === "Inactive")
                .map((client) => (
                  <ClientCard key={client.id} client={client} />
                ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* AI Assistant */}
      <div className="hidden lg:block">
        <AIAssistantChat 
          initialMessages={initialChatMessages} 
          title="Client Management Assistant"
          heightClass="h-[300px]"
        />
      </div>
    </div>
  );
}

interface ClientCardProps {
  client: typeof clients[0];
}

function ClientCard({ client }: ClientCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      case "Pending":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20";
      case "Inactive":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
    }
  };
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={client.avatar} alt={client.name} />
              <AvatarFallback>{client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{client.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{client.email}</p>
            </div>
          </div>
          <Badge className={getStatusColor(client.status)}>
            {client.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="space-y-1">
            <p className="text-muted-foreground">Phone</p>
            <p>{client.phone}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Law Firm</p>
            <p>{client.lawFirm}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Cases</p>
            <p>{client.cases}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Joined</p>
            <p>{client.joinedDate}</p>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button variant="outline" size="sm">View Profile</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ClientsLoading() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div>
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-40 mt-1" />
                </div>
              </div>
              <Skeleton className="h-5 w-16" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="space-y-1">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="space-y-1">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-8" />
              </div>
              <div className="space-y-1">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Skeleton className="h-8 w-24" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
