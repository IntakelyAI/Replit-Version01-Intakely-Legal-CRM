import { Scale, Filter, Search, Plus, ArrowUp, ArrowDown, Calendar, Clock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import AIAssistantChat from "@/components/shared/ai-assistant-chat";

// Case data
const cases = [
  {
    id: "CASE-1001",
    title: "Johnson v. Smith",
    client: "John Johnson",
    lawFirm: "Johnson & Partners",
    type: "Personal Injury",
    status: "Active",
    priority: "High",
    dueDate: "Dec 15, 2023",
    lastUpdated: "2 days ago",
    documents: 12,
  },
  {
    id: "CASE-1002",
    title: "Martinez Family Trust",
    client: "Maria Martinez",
    lawFirm: "Smith Legal Group",
    type: "Estate Planning",
    status: "Active",
    priority: "Medium",
    dueDate: "Jan 10, 2024",
    lastUpdated: "5 days ago",
    documents: 8,
  },
  {
    id: "CASE-1003",
    title: "Chen v. Acme Corp",
    client: "David Chen",
    lawFirm: "Williams Law Firm",
    type: "Employment",
    status: "Pending",
    priority: "Medium",
    dueDate: "Feb 5, 2024",
    lastUpdated: "1 week ago",
    documents: 5,
  },
  {
    id: "CASE-1004",
    title: "Johnson Divorce",
    client: "Sarah Johnson",
    lawFirm: "Johnson & Partners",
    type: "Family Law",
    status: "Active",
    priority: "Medium",
    dueDate: "Dec 20, 2023",
    lastUpdated: "3 days ago",
    documents: 15,
  },
  {
    id: "CASE-1005",
    title: "Brown Property Dispute",
    client: "Michael Brown",
    lawFirm: "Rahman & Associates",
    type: "Real Estate",
    status: "On Hold",
    priority: "Low",
    dueDate: "Mar 15, 2024",
    lastUpdated: "2 weeks ago",
    documents: 7,
  },
  {
    id: "CASE-1006",
    title: "Lee v. City of Metro",
    client: "Jennifer Lee",
    lawFirm: "Davis & Miller LLP",
    type: "Civil Rights",
    status: "Active",
    priority: "High",
    dueDate: "Jan 5, 2024",
    lastUpdated: "1 day ago",
    documents: 20,
  },
  {
    id: "CASE-1007",
    title: "Thompson Business Formation",
    client: "Robert Thompson",
    lawFirm: "Thompson Legal",
    type: "Business",
    status: "Completed",
    priority: "Medium",
    dueDate: "Completed",
    lastUpdated: "1 month ago",
    documents: 10,
  },
];

// Sample chat messages for the AI Assistant
const initialChatMessages = [
  {
    id: "1",
    content: "Hello! How can I help you with case management today?",
    role: "assistant" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
];

export default function Cases() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">{status}</Badge>;
      case "Pending":
        return <Badge className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">{status}</Badge>;
      case "On Hold":
        return <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">{status}</Badge>;
      case "Completed":
        return <Badge className="bg-gray-500/10 text-gray-500 hover:bg-gray-500/20">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return (
          <div className="flex items-center gap-1">
            <ArrowUp className="h-3 w-3 text-red-500" />
            <span className="text-red-500">{priority}</span>
          </div>
        );
      case "Medium":
        return (
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">{priority}</span>
          </div>
        );
      case "Low":
        return (
          <div className="flex items-center gap-1">
            <ArrowDown className="h-3 w-3 text-green-500" />
            <span className="text-green-500">{priority}</span>
          </div>
        );
      default:
        return <span>{priority}</span>;
    }
  };

  return (
    <div className="grid gap-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cases</h1>
          <p className="mt-1 text-muted-foreground">Manage and monitor all legal cases in one place.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Case
        </Button>
      </div>
      
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search cases..." className="pl-10" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <span>Filter by Status</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Filter by Type</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Filter by Priority</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Filter by Law Firm</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Sort</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <span>Sort by Due Date</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Sort by Last Updated</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Sort by Priority</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Sort by Case ID</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Case Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cases.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cases.filter(c => c.status === "Active").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cases.filter(c => c.priority === "High").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Due This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Cases Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Cases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Case ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cases.map((caseItem) => (
                  <TableRow key={caseItem.id}>
                    <TableCell className="font-medium">{caseItem.id}</TableCell>
                    <TableCell>{caseItem.title}</TableCell>
                    <TableCell>{caseItem.client}</TableCell>
                    <TableCell>{caseItem.type}</TableCell>
                    <TableCell>{getStatusBadge(caseItem.status)}</TableCell>
                    <TableCell>{getPriorityBadge(caseItem.priority)}</TableCell>
                    <TableCell className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      {caseItem.dueDate}
                    </TableCell>
                    <TableCell className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      {caseItem.lastUpdated}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                          <span className="sr-only">View Case</span>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Scale className="h-4 w-4" />
                          <span className="sr-only">Edit Case</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* AI Assistant */}
      <div className="hidden lg:block">
        <AIAssistantChat 
          initialMessages={initialChatMessages} 
          title="Case Management Assistant"
          heightClass="h-[300px]"
        />
      </div>
    </div>
  );
}
