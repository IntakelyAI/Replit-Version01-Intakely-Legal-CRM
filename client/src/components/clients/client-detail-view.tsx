import { useEffect } from "react";
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  FileText, 
  MessageSquare, 
  Clock, 
  DollarSign,
  Tag,
  Building,
  BarChart,
  FileEdit
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAIAssistant } from "@/components/providers/ai-assistant-provider";

// In a real app this would come from an API or context
export interface ClientDetails {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: "active" | "inactive" | "potential";
  type: string;
  lawFirm: string;
  dateAdded: string;
  assignedAttorney: string;
  totalMatters: number;
  activeMatters: number;
  totalBilled: string;
  totalPaid: string;
  nextAppointment?: string;
  notes?: string;
}

// Mock data for a client
const clientData: ClientDetails = {
  id: "client-123",
  name: "Robert Thompson",
  email: "robert.thompson@example.com",
  phone: "(555) 123-4567",
  address: "123 Main St, Apt 4B, San Francisco, CA 94103",
  status: "active",
  type: "Individual",
  lawFirm: "Oakwood Law Firm",
  dateAdded: "2024-12-15",
  assignedAttorney: "Sarah Chen",
  totalMatters: 3,
  activeMatters: 2,
  totalBilled: "$12,450",
  totalPaid: "$8,750",
  nextAppointment: "2025-04-18T14:30:00",
  notes: "Client prefers email communication. Has concerns about case timeline."
};

// Mock data for client matters
const clientMatters = [
  {
    id: "matter-1",
    title: "Personal Injury Claim",
    type: "Personal Injury",
    status: "Active",
    stage: "Discovery",
    openDate: "2025-01-10",
    dueDate: "2025-07-20",
    attorney: "Sarah Chen"
  },
  {
    id: "matter-2",
    title: "Property Dispute",
    type: "Real Estate",
    status: "Active",
    stage: "Pre-Trial",
    openDate: "2025-03-05",
    dueDate: "2025-06-15",
    attorney: "Michael Rodriguez"
  },
  {
    id: "matter-3",
    title: "Will Preparation",
    type: "Estate Planning",
    status: "Completed",
    stage: "Closed",
    openDate: "2024-12-20",
    dueDate: "2025-01-30",
    attorney: "Sarah Chen"
  }
];

// Mock data for client activity
const clientActivity = [
  {
    id: "activity-1",
    type: "Call",
    date: "2025-04-10T10:15:00",
    description: "Discussed case progress and next steps",
    duration: "15 minutes",
    by: "Sarah Chen"
  },
  {
    id: "activity-2",
    type: "Email",
    date: "2025-04-08T14:30:00",
    description: "Sent document review request",
    by: "Michael Rodriguez"
  },
  {
    id: "activity-3",
    type: "Meeting",
    date: "2025-04-05T11:00:00",
    description: "Initial consultation for property dispute",
    duration: "45 minutes",
    by: "Sarah Chen"
  },
  {
    id: "activity-4",
    type: "Document",
    date: "2025-04-02T09:45:00",
    description: "Uploaded signed retainer agreement",
    by: "System"
  }
];

// Mock data for client documents
const clientDocuments = [
  {
    id: "doc-1",
    name: "Retainer Agreement.pdf",
    type: "Agreement",
    dateUploaded: "2025-01-05",
    size: "1.2 MB",
    status: "Signed"
  },
  {
    id: "doc-2",
    name: "Medical Records.pdf",
    type: "Evidence",
    dateUploaded: "2025-01-12",
    size: "3.5 MB",
    status: "Verified"
  },
  {
    id: "doc-3",
    name: "Property Deed.pdf",
    type: "Evidence",
    dateUploaded: "2025-03-05",
    size: "0.8 MB",
    status: "Verified"
  },
  {
    id: "doc-4",
    name: "Settlement Offer.docx",
    type: "Legal Document",
    dateUploaded: "2025-04-08",
    size: "0.6 MB",
    status: "Draft"
  }
];

// Mock data for client billing
const clientBilling = [
  {
    id: "invoice-1",
    number: "INV-001234",
    date: "2025-02-10",
    amount: "$3,500",
    status: "Paid",
    dueDate: "2025-03-10",
    paymentDate: "2025-03-05"
  },
  {
    id: "invoice-2",
    number: "INV-001356",
    date: "2025-03-15",
    amount: "$5,250",
    status: "Paid",
    dueDate: "2025-04-15",
    paymentDate: "2025-04-10"
  },
  {
    id: "invoice-3",
    number: "INV-001489",
    date: "2025-04-12",
    amount: "$3,700",
    status: "Outstanding",
    dueDate: "2025-05-12"
  }
];

interface ClientDetailViewProps {
  clientId?: string; // In a real app, this would be used to fetch the client data
}

export default function ClientDetailView({ clientId }: ClientDetailViewProps) {
  const { setCurrentSection } = useAIAssistant();
  
  // Update AI assistant context when component mounts
  useEffect(() => {
    setCurrentSection('clients');
  }, [setCurrentSection]);

  // In a real app, we would fetch the client data based on clientId
  const client = clientData;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };
  
  const formatDateTime = (dateTimeString: string) => {
    return new Date(dateTimeString).toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* Client Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <User className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">{client.name}</h1>
            <Badge 
              className={
                client.status === 'active' 
                  ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20' 
                  : client.status === 'inactive'
                    ? 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20'
                    : 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20'
              }
            >
              {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
            </Badge>
          </div>
          <p className="mt-1 text-muted-foreground">
            Client since {formatDate(client.dateAdded)} • {client.type} • {client.lawFirm}
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

      {/* Client Overview Stats */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Matters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{client.activeMatters}</div>
              <FileText className="h-5 w-5 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Billed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{client.totalBilled}</div>
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                {(() => {
                  // Calculate outstanding amount
                  const billed = parseFloat(client.totalBilled.replace('$', '').replace(',', ''));
                  const paid = parseFloat(client.totalPaid.replace('$', '').replace(',', ''));
                  const outstanding = billed - paid;
                  return `$${outstanding.toLocaleString()}`;
                })()}
              </div>
              <Tag className="h-5 w-5 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-md font-bold">
                {client.nextAppointment 
                  ? new Date(client.nextAppointment).toLocaleDateString()
                  : "None Scheduled"}
              </div>
              <Calendar className="h-5 w-5 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="flex">
          <TabsTrigger value="overview" className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="matters" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span>Matters</span>
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>Activity</span>
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span>Documents</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            <span>Billing</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-1">
            <BarChart className="h-4 w-4" />
            <span>Analytics</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Email:</span>
                  <span className="text-sm font-medium">{client.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Phone:</span>
                  <span className="text-sm font-medium">{client.phone}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span className="text-sm">Address:</span>
                  <span className="text-sm font-medium">{client.address}</span>
                </div>
              </CardContent>
            </Card>

            {/* Case Information */}
            <Card>
              <CardHeader>
                <CardTitle>Case Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Law Firm:</span>
                  <span className="text-sm font-medium">{client.lawFirm}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Assigned Attorney:</span>
                  <span className="text-sm font-medium">{client.assignedAttorney}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Total Matters:</span>
                  <span className="text-sm font-medium">{client.totalMatters}</span>
                </div>
              </CardContent>
            </Card>
            
            {/* Notes */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{client.notes || "No notes available."}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Add Note</Button>
              </CardFooter>
            </Card>
            
            {/* Recent Activity */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest interactions with this client</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {clientActivity.slice(0, 3).map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 rounded-md p-3 hover:bg-accent/50 transition-colors">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                      {activity.type === 'Call' && <Phone className="h-5 w-5 text-primary" />}
                      {activity.type === 'Email' && <Mail className="h-5 w-5 text-primary" />}
                      {activity.type === 'Meeting' && <Calendar className="h-5 w-5 text-primary" />}
                      {activity.type === 'Document' && <FileText className="h-5 w-5 text-primary" />}
                      {activity.type === 'Message' && <MessageSquare className="h-5 w-5 text-primary" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{activity.type}</p>
                        <p className="text-xs text-muted-foreground">{formatDateTime(activity.date)}</p>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{activity.description}</p>
                      <div className="mt-1 flex items-center text-xs text-muted-foreground">
                        {activity.duration && (
                          <>
                            <Clock className="mr-1 h-3 w-3" />
                            <span>{activity.duration}</span>
                            <span className="mx-2">•</span>
                          </>
                        )}
                        <span>By: {activity.by}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Activity</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Matters Tab */}
        <TabsContent value="matters" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Client Matters</h2>
            <Button>Create Matter</Button>
          </div>
          
          <div className="space-y-4">
            {clientMatters.map((matter) => (
              <Card key={matter.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{matter.title}</CardTitle>
                      <CardDescription>{matter.type}</CardDescription>
                    </div>
                    <Badge 
                      className={
                        matter.status === 'Active' 
                          ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20' 
                          : 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20'
                      }
                    >
                      {matter.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Stage</p>
                      <p className="font-medium">{matter.stage}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Attorney</p>
                      <p className="font-medium">{matter.attorney}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Open Date</p>
                      <p className="font-medium">{formatDate(matter.openDate)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Due Date</p>
                      <p className="font-medium">{formatDate(matter.dueDate)}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button variant="outline" className="w-full">View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Client Activity History</CardTitle>
                <Button>Log Activity</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {clientActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 rounded-md p-3 hover:bg-accent/50 transition-colors">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    {activity.type === 'Call' && <Phone className="h-5 w-5 text-primary" />}
                    {activity.type === 'Email' && <Mail className="h-5 w-5 text-primary" />}
                    {activity.type === 'Meeting' && <Calendar className="h-5 w-5 text-primary" />}
                    {activity.type === 'Document' && <FileText className="h-5 w-5 text-primary" />}
                    {activity.type === 'Message' && <MessageSquare className="h-5 w-5 text-primary" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{activity.type}</p>
                      <p className="text-xs text-muted-foreground">{formatDateTime(activity.date)}</p>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{activity.description}</p>
                    <div className="mt-1 flex items-center text-xs text-muted-foreground">
                      {activity.duration && (
                        <>
                          <Clock className="mr-1 h-3 w-3" />
                          <span>{activity.duration}</span>
                          <span className="mx-2">•</span>
                        </>
                      )}
                      <span>By: {activity.by}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Client Documents</CardTitle>
                <Button>Upload Document</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clientDocuments.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 rounded-md hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{doc.name}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span>{doc.type}</span>
                          <span className="mx-2">•</span>
                          <span>Uploaded: {formatDate(doc.dateUploaded)}</span>
                          <span className="mx-2">•</span>
                          <span>{doc.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{doc.status}</Badge>
                      <Button variant="outline" size="sm">View</Button>
                      <Button variant="outline" size="sm">Download</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Billing History</CardTitle>
                <Button>Create Invoice</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clientBilling.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-3 rounded-md hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        <DollarSign className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Invoice #{invoice.number}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span>Date: {formatDate(invoice.date)}</span>
                          <span className="mx-2">•</span>
                          <span>Due: {formatDate(invoice.dueDate)}</span>
                          {invoice.paymentDate && (
                            <>
                              <span className="mx-2">•</span>
                              <span>Paid: {formatDate(invoice.paymentDate)}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{invoice.amount}</p>
                      <Badge 
                        className={
                          invoice.status === 'Paid' 
                            ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20' 
                            : 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20'
                        }
                      >
                        {invoice.status}
                      </Badge>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Client Analytics</CardTitle>
              <CardDescription>Performance metrics and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-80">
                <div className="text-center">
                  <BarChart className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium">Analytics Coming Soon</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Detailed client analytics dashboard is currently under development.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}