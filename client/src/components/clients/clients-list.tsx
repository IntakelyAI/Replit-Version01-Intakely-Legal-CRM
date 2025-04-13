import { useState, useEffect } from "react";
import { 
  User, 
  Search, 
  Filter, 
  Plus, 
  Building, 
  ArrowUp, 
  ArrowDown,
  Phone,
  Mail,
  FileText,
  DollarSign,
  MoreHorizontal,
  Calendar
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAIAssistant } from "@/components/providers/ai-assistant-provider";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

// Interface for client data
export interface ClientData {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | "potential";
  type: string;
  lawFirm: string;
  matters: number;
  totalBilled: string;
  lastContact: string;
  assignedAttorney: string;
}

// Mock clients data
const clientsData: ClientData[] = [
  {
    id: "client-1",
    name: "Robert Thompson",
    email: "robert.thompson@example.com",
    phone: "(555) 123-4567",
    status: "active",
    type: "Individual",
    lawFirm: "Oakwood Law Firm",
    matters: 3,
    totalBilled: "$12,450",
    lastContact: "2025-04-10",
    assignedAttorney: "Sarah Chen"
  },
  {
    id: "client-2",
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    phone: "(555) 987-6543",
    status: "active",
    type: "Individual",
    lawFirm: "Johnson & Partners",
    matters: 1,
    totalBilled: "$3,200",
    lastContact: "2025-04-08",
    assignedAttorney: "Michael Rodriguez"
  },
  {
    id: "client-3",
    name: "Tech Innovations Inc.",
    email: "contact@techinnovations.example",
    phone: "(555) 555-5555",
    status: "active",
    type: "Corporate",
    lawFirm: "Smith & Associates",
    matters: 5,
    totalBilled: "$28,750",
    lastContact: "2025-04-12",
    assignedAttorney: "Emily Johnson"
  },
  {
    id: "client-4",
    name: "David Lee",
    email: "david.lee@example.com",
    phone: "(555) 444-3333",
    status: "inactive",
    type: "Individual",
    lawFirm: "Legal Eagles LLC",
    matters: 0,
    totalBilled: "$1,800",
    lastContact: "2025-03-15",
    assignedAttorney: "James Wilson"
  },
  {
    id: "client-5",
    name: "Fresh Start Bakery",
    email: "info@freshstartbakery.example",
    phone: "(555) 222-1111",
    status: "active",
    type: "Corporate",
    lawFirm: "Oakwood Law Firm",
    matters: 2,
    totalBilled: "$8,350",
    lastContact: "2025-04-05",
    assignedAttorney: "Sarah Chen"
  },
  {
    id: "client-6",
    name: "Jennifer Williams",
    email: "jennifer.williams@example.com",
    phone: "(555) 777-8888",
    status: "potential",
    type: "Individual",
    lawFirm: "Metro Legal Group",
    matters: 0,
    totalBilled: "$0",
    lastContact: "2025-04-11",
    assignedAttorney: "Michael Rodriguez"
  },
  {
    id: "client-7",
    name: "Sunset Properties LLC",
    email: "contact@sunsetproperties.example",
    phone: "(555) 333-2222",
    status: "active",
    type: "Corporate",
    lawFirm: "Smith & Associates",
    matters: 4,
    totalBilled: "$15,250",
    lastContact: "2025-04-07",
    assignedAttorney: "Emily Johnson"
  },
  {
    id: "client-8",
    name: "John Anderson",
    email: "john.anderson@example.com",
    phone: "(555) 111-0000",
    status: "inactive",
    type: "Individual",
    lawFirm: "Johnson & Partners",
    matters: 1,
    totalBilled: "$4,200",
    lastContact: "2025-02-20",
    assignedAttorney: "James Wilson"
  }
];

// Types for sorting
type SortField = "name" | "status" | "lawFirm" | "matters" | "totalBilled" | "lastContact";
type SortDirection = "asc" | "desc";

export default function ClientsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [clients, setClients] = useState<ClientData[]>(clientsData);
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive" | "potential">("all");
  const [typeFilter, setTypeFilter] = useState<"all" | "Individual" | "Corporate">("all");
  
  const { setCurrentSection } = useAIAssistant();
  
  // Set AI assistant context when component mounts
  useEffect(() => {
    setCurrentSection('clients');
  }, [setCurrentSection]);

  // Apply filters and sorting to clients
  useEffect(() => {
    let filteredClients = [...clientsData];
    
    // Apply search term filter
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filteredClients = filteredClients.filter(client => 
        client.name.toLowerCase().includes(lowerSearchTerm) ||
        client.email.toLowerCase().includes(lowerSearchTerm) ||
        client.phone.includes(searchTerm) ||
        client.lawFirm.toLowerCase().includes(lowerSearchTerm) ||
        client.assignedAttorney.toLowerCase().includes(lowerSearchTerm)
      );
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      filteredClients = filteredClients.filter(client => client.status === statusFilter);
    }
    
    // Apply type filter
    if (typeFilter !== "all") {
      filteredClients = filteredClients.filter(client => client.type === typeFilter);
    }
    
    // Apply sorting
    filteredClients.sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "status":
          comparison = a.status.localeCompare(b.status);
          break;
        case "lawFirm":
          comparison = a.lawFirm.localeCompare(b.lawFirm);
          break;
        case "matters":
          comparison = a.matters - b.matters;
          break;
        case "totalBilled":
          const aValue = parseFloat(a.totalBilled.replace('$', '').replace(',', ''));
          const bValue = parseFloat(b.totalBilled.replace('$', '').replace(',', ''));
          comparison = aValue - bValue;
          break;
        case "lastContact":
          comparison = new Date(a.lastContact).getTime() - new Date(b.lastContact).getTime();
          break;
        default:
          comparison = 0;
      }
      
      return sortDirection === "asc" ? comparison : -comparison;
    });
    
    setClients(filteredClients);
  }, [searchTerm, sortField, sortDirection, statusFilter, typeFilter]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Handle sorting
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction if already sorting by this field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set new field and default to ascending
      setSortField(field);
      setSortDirection("asc");
    }
  };
  
  // Get status badge
  const getStatusBadge = (status: "active" | "inactive" | "potential") => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Active</Badge>;
      case "inactive":
        return <Badge className="bg-gray-500/10 text-gray-500 hover:bg-gray-500/20">Inactive</Badge>;
      case "potential":
        return <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">Potential</Badge>;
    }
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
          <p className="mt-1 text-muted-foreground">Manage all your law firm clients</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          <span>Add Client</span>
        </Button>
      </div>
      
      {/* Client Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientsData.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientsData.filter(client => client.status === "active").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Matters</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {clientsData.reduce((total, client) => total + client.matters, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Billed</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(() => {
                const total = clientsData.reduce((sum, client) => {
                  const amount = parseFloat(client.totalBilled.replace('$', '').replace(',', ''));
                  return sum + amount;
                }, 0);
                return `$${total.toLocaleString()}`;
              })()}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search clients..." 
            className="pl-10" 
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              <span>Status</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setStatusFilter("all")}>
              All Statuses
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("active")}>
              Active Only
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("inactive")}>
              Inactive Only
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("potential")}>
              Potential Only
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              <span>Type</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTypeFilter("all")}>
              All Types
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTypeFilter("Individual")}>
              Individual Only
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTypeFilter("Corporate")}>
              Corporate Only
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Clients List */}
      <div className="space-y-4">
        {/* Table Header */}
        <div className="hidden md:grid md:grid-cols-6 text-xs font-medium text-muted-foreground border-b pb-2">
          <div 
            className="flex items-center gap-1 cursor-pointer" 
            onClick={() => handleSort("name")}
          >
            <span>Name</span>
            {sortField === "name" && (
              sortDirection === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
            )}
          </div>
          <div 
            className="flex items-center gap-1 cursor-pointer" 
            onClick={() => handleSort("status")}
          >
            <span>Status</span>
            {sortField === "status" && (
              sortDirection === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
            )}
          </div>
          <div 
            className="flex items-center gap-1 cursor-pointer" 
            onClick={() => handleSort("lawFirm")}
          >
            <span>Law Firm</span>
            {sortField === "lawFirm" && (
              sortDirection === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
            )}
          </div>
          <div 
            className="flex items-center gap-1 cursor-pointer text-right" 
            onClick={() => handleSort("matters")}
          >
            <span>Matters</span>
            {sortField === "matters" && (
              sortDirection === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
            )}
          </div>
          <div 
            className="flex items-center gap-1 cursor-pointer text-right" 
            onClick={() => handleSort("totalBilled")}
          >
            <span>Total Billed</span>
            {sortField === "totalBilled" && (
              sortDirection === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
            )}
          </div>
          <div 
            className="flex items-center gap-1 cursor-pointer justify-end" 
            onClick={() => handleSort("lastContact")}
          >
            <span>Last Contact</span>
            {sortField === "lastContact" && (
              sortDirection === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
            )}
          </div>
        </div>
        
        {/* Client Rows */}
        {clients.length === 0 ? (
          <div className="py-12 text-center">
            <User className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium">No clients found</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        ) : (
          clients.map((client) => (
            <div 
              key={client.id} 
              className="flex flex-col md:grid md:grid-cols-6 items-start md:items-center py-4 border-b hover:bg-accent/50 rounded-lg px-3 transition-colors"
            >
              {/* Mobile view - stacked layout */}
              <div className="md:hidden w-full space-y-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      {client.type === "Individual" ? (
                        <User className="h-4 w-4 text-primary" />
                      ) : (
                        <Building className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{client.name}</p>
                      <div className="flex text-xs text-muted-foreground gap-2">
                        <div className="flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          <span>{client.email}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          <span>{client.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {getStatusBadge(client.status)}
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <p className="text-muted-foreground">Law Firm</p>
                    <p className="font-medium">{client.lawFirm}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Matters</p>
                    <p className="font-medium">{client.matters}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Billed</p>
                    <p className="font-medium">{client.totalBilled}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-xs">
                    <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                    <span>Last contact: {formatDate(client.lastContact)}</span>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </div>
              
              {/* Desktop view - table layout */}
              <div className="hidden md:flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  {client.type === "Individual" ? (
                    <User className="h-4 w-4 text-primary" />
                  ) : (
                    <Building className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{client.name}</p>
                  <p className="text-xs text-muted-foreground">{client.email}</p>
                </div>
              </div>
              <div className="hidden md:block">
                {getStatusBadge(client.status)}
              </div>
              <div className="hidden md:block">{client.lawFirm}</div>
              <div className="hidden md:block text-right">{client.matters}</div>
              <div className="hidden md:block text-right">{client.totalBilled}</div>
              <div className="hidden md:flex items-center justify-end gap-4">
                <span>{formatDate(client.lastContact)}</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit Client</DropdownMenuItem>
                    <DropdownMenuItem>Call Client</DropdownMenuItem>
                    <DropdownMenuItem>Email Client</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-500">
                      {client.status === "active" ? "Deactivate Client" : "Activate Client"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}