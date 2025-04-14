"use client"

import { useState } from "react"
import {
  MessageSquare,
  Calendar,
  FileText,
  CreditCard,
  Briefcase,
  Users,
  Crown,
  BarChart,
  ArrowRight,
  Plus,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"

export function DashboardView() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-purple-300">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to Oakwood Law Firm CRM</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="mr-2 h-4 w-4" /> New Case
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList className="bg-background/60 border border-border">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="cases">Cases</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-background/60 backdrop-blur border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
                <Briefcase className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">128</div>
                <p className="text-xs text-muted-foreground">+14% from last month</p>
              </CardContent>
            </Card>

            <Card className="bg-background/60 backdrop-blur border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
                <Users className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
              </CardContent>
            </Card>

            <Card className="bg-background/60 backdrop-blur border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Leads</CardTitle>
                <Crown className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">+9% from last month</p>
              </CardContent>
            </Card>

            <Card className="bg-background/60 backdrop-blur border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <CreditCard className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$48,352</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2 bg-background/60 backdrop-blur border-border">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest interactions and updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    icon: MessageSquare,
                    title: "New message from John Smith",
                    description: "Regarding case #1234 - Contract Review",
                    time: "5 minutes ago",
                    color: "text-blue-500",
                  },
                  {
                    icon: Calendar,
                    title: "Appointment scheduled",
                    description: "Meeting with Jane Doe at 2:00 PM tomorrow",
                    time: "1 hour ago",
                    color: "text-green-500",
                  },
                  {
                    icon: FileText,
                    title: "Document uploaded",
                    description: "Contract for case #5678 uploaded by Sarah Johnson",
                    time: "3 hours ago",
                    color: "text-amber-500",
                  },
                  {
                    icon: Crown,
                    title: "New lead created",
                    description: "Michael Brown - Corporate Law inquiry",
                    time: "Yesterday",
                    color: "text-purple-500",
                  },
                  {
                    icon: CreditCard,
                    title: "Payment received",
                    description: "$2,500 from ABC Corporation for case #9012",
                    time: "Yesterday",
                    color: "text-emerald-500",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 rounded-lg border border-border p-3">
                    <div className={`mt-0.5 rounded-full p-1.5 ${item.color} bg-background`}>
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">{item.time}</div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" size="sm">
                  View all activity <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-background/60 backdrop-blur border-border">
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Your schedule for the next few days</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    title: "Initial Consultation",
                    client: "Robert Williams",
                    time: "Today, 11:00 AM",
                    status: "Confirmed",
                    statusColor: "bg-green-100/10 text-green-500",
                  },
                  {
                    title: "Case Review",
                    client: "Jennifer Taylor",
                    time: "Today, 2:30 PM",
                    status: "Confirmed",
                    statusColor: "bg-green-100/10 text-green-500",
                  },
                  {
                    title: "Contract Signing",
                    client: "David Miller",
                    time: "Tomorrow, 10:00 AM",
                    status: "Pending",
                    statusColor: "bg-yellow-100/10 text-yellow-500",
                  },
                  {
                    title: "Settlement Discussion",
                    client: "Lisa Anderson",
                    time: "Tomorrow, 3:00 PM",
                    status: "Rescheduled",
                    statusColor: "bg-blue-100/10 text-blue-500",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-2 rounded-lg border border-border p-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{item.title}</p>
                      <Badge variant="outline" className={item.statusColor}>
                        {item.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{item.client}</span>
                      <span className="font-medium">{item.time}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" size="sm">
                  View calendar <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-background/60 backdrop-blur border-border">
              <CardHeader>
                <CardTitle>Lead Conversion</CardTitle>
                <CardDescription>Conversion rates for the last 30 days</CardDescription>
              </CardHeader>
              <CardContent className="h-[200px] flex items-center justify-center">
                <div className="text-center">
                  <BarChart className="h-16 w-16 text-purple-500 mx-auto mb-2 opacity-50" />
                  <p className="text-sm text-muted-foreground">Chart visualization would appear here</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background/60 backdrop-blur border-border">
              <CardHeader>
                <CardTitle>Case Distribution</CardTitle>
                <CardDescription>Active cases by practice area</CardDescription>
              </CardHeader>
              <CardContent className="h-[200px] flex items-center justify-center">
                <div className="text-center">
                  <BarChart className="h-16 w-16 text-purple-500 mx-auto mb-2 opacity-50" />
                  <p className="text-sm text-muted-foreground">Chart visualization would appear here</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background/60 backdrop-blur border-border">
              <CardHeader>
                <CardTitle>Staff Performance</CardTitle>
                <CardDescription>Case resolution metrics</CardDescription>
              </CardHeader>
              <CardContent className="h-[200px] flex items-center justify-center">
                <div className="text-center">
                  <BarChart className="h-16 w-16 text-purple-500 mx-auto mb-2 opacity-50" />
                  <p className="text-sm text-muted-foreground">Chart visualization would appear here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cases">
          <Card className="bg-background/60 backdrop-blur border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Case Management</CardTitle>
                  <CardDescription>Manage all your active and archived cases</CardDescription>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="mr-2 h-4 w-4" /> Add Case
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={[
                  { header: "Case ID", accessorKey: "id" },
                  { header: "Client", accessorKey: "client" },
                  { header: "Type", accessorKey: "type" },
                  { header: "Status", accessorKey: "status" },
                  { header: "Filed Date", accessorKey: "filedDate" },
                  { header: "Assigned To", accessorKey: "assignedTo" },
                  { header: "Actions", accessorKey: "actions" },
                ]}
                data={[
                  {
                    id: "CASE-1001",
                    client: "John Smith",
                    type: "Corporate",
                    status: "Active",
                    filedDate: "2023-04-12",
                    assignedTo: "Sarah Johnson",
                    actions: "View",
                  },
                  {
                    id: "CASE-1002",
                    client: "ABC Corporation",
                    type: "Contract",
                    status: "Active",
                    filedDate: "2023-04-10",
                    assignedTo: "Michael Brown",
                    actions: "View",
                  },
                  {
                    id: "CASE-1003",
                    client: "Jane Doe",
                    type: "Family",
                    status: "Pending",
                    filedDate: "2023-04-05",
                    assignedTo: "David Miller",
                    actions: "View",
                  },
                  {
                    id: "CASE-1004",
                    client: "XYZ LLC",
                    type: "Intellectual Property",
                    status: "Active",
                    filedDate: "2023-04-01",
                    assignedTo: "Jennifer Taylor",
                    actions: "View",
                  },
                  {
                    id: "CASE-1005",
                    client: "Robert Williams",
                    type: "Real Estate",
                    status: "Closed",
                    filedDate: "2023-03-25",
                    assignedTo: "Sarah Johnson",
                    actions: "View",
                  },
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
