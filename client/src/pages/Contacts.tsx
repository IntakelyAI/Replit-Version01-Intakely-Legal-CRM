import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  PlusCircle, 
  UserPlus,

  Mail, 
  Phone, 
  Building,
  Tag
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// Mock contacts data
const contacts = [
  { 
    id: 1, 
    name: 'John Smith', 
    role: 'Attorney', 
    email: 'john.smith@example.com', 
    phone: '+1 (555) 123-4567',
    company: 'Smith & Associates',
    tags: ['Client', 'VIP']
  },
  { 
    id: 2, 
    name: 'Sarah Johnson', 
    role: 'Paralegal', 
    email: 'sarah.j@example.com', 
    phone: '+1 (555) 234-5678',
    company: 'Johnson Legal Group',
    tags: ['Staff']
  },
  { 
    id: 3, 
    name: 'Michael Williams', 
    role: 'Client', 
    email: 'mwilliams@example.com', 
    phone: '+1 (555) 345-6789',
    company: 'Williams Construction',
    tags: ['Client', 'Contract']
  },
  { 
    id: 4, 
    name: 'Jessica Davis', 
    role: 'Attorney', 
    email: 'jdavis@example.com', 
    phone: '+1 (555) 456-7890',
    company: 'Davis & Miller LLP',
    tags: ['Partner']
  },
  { 
    id: 5, 
    name: 'Robert Miller', 
    role: 'Client', 
    email: 'rmiller@example.com', 
    phone: '+1 (555) 567-8901',
    company: 'Miller Technologies',
    tags: ['Client', 'Litigation']
  },
];

export default function Contacts() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Contacts</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your clients, partners, and team contacts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="h-[calc(100vh-11rem)]">
            <CardHeader className="pb-2 flex flex-row justify-between items-center">
              <h3 className="font-medium">Contact List</h3>
              <Button variant="ghost" size="sm" className="text-primary">
                <UserPlus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </CardHeader>
            
            <div className="px-4 py-2">
              <div className="relative">
                <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search contacts..." className="pl-8" />
              </div>
            </div>
            
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-17rem)]">
                <div className="divide-y divide-border">
                  {contacts.map((contact) => (
                    <div 
                      key={contact.id} 
                      className="p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {contact.name.split(' ').map(part => part[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium text-sm">{contact.name}</h4>
                          <p className="text-xs text-muted-foreground">{contact.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card className="h-[calc(100vh-11rem)]">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                      JS
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-bold">John Smith</h2>
                    <p className="text-sm text-muted-foreground">Attorney at Smith & Associates</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button className="bg-primary" size="sm">
                    Message
                  </Button>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  Client
                </Badge>
                <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                  VIP
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <ScrollArea className="h-[calc(100vh-22rem)]">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Contact Information</h3>
                    <Separator className="mb-3" />
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
                        <span className="text-sm">john.smith@example.com</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-3 text-muted-foreground" />
                        <span className="text-sm">+1 (555) 123-4567</span>
                      </div>
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-3 text-muted-foreground" />
                        <span className="text-sm">Smith & Associates</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Recent Activity</h3>
                    <Separator className="mb-3" />
                    <div className="space-y-3">
                      <div className="p-3 bg-muted/30 rounded-md">
                        <p className="text-sm">Phone call regarding Johnson case</p>
                        <p className="text-xs text-muted-foreground mt-1">Yesterday at 2:30 PM</p>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-md">
                        <p className="text-sm">Email sent: "Contract Review Documents"</p>
                        <p className="text-xs text-muted-foreground mt-1">May 15, 2023 at 11:42 AM</p>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-md">
                        <p className="text-sm">Meeting scheduled: "Case Strategy Discussion"</p>
                        <p className="text-xs text-muted-foreground mt-1">May 12, 2023 at 9:15 AM</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Associated Cases</h3>
                    <Separator className="mb-3" />
                    <div className="space-y-3">
                      <div className="p-3 border rounded-md hover:border-primary cursor-pointer transition-colors">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium">Johnson v. Smith</p>
                          <Badge className="bg-green-600">Active</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Case #LI-2023-42</p>
                      </div>
                      <div className="p-3 border rounded-md hover:border-primary cursor-pointer transition-colors">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium">Williams Copyright Claim</p>
                          <Badge className="bg-amber-600">Pending</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Case #CR-2023-89</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
