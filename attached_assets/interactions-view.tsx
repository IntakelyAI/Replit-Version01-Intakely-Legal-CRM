"use client"

import { useState } from "react"
import {
  MessageSquare,
  Plus,
  Filter,
  Download,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  AlertCircle,
  Calendar,
  Phone,
  Mail,
  List,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTable } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function InteractionsView() {
  const [activeTab, setActiveTab] = useState("interactions")

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-purple-300">Interactions & Tasks</h1>
          <p className="text-muted-foreground">Manage client interactions and tasks</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="mr-2 h-4 w-4" /> New Interaction
          </Button>
        </div>
      </div>

      <Tabs defaultValue="interactions" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList className="bg-background/60 border border-border">
          <TabsTrigger value="interactions">Interactions</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="tags">Tags</TabsTrigger>
          <TabsTrigger value="custom-fields">Custom Fields</TabsTrigger>
        </TabsList>

        <TabsContent value="interactions" className="space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <Input placeholder="Search interactions..." className="max-w-sm" />
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Interaction Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="phone">Phone Call</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="meeting">Meeting</SelectItem>
                <SelectItem value="note">Note</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Client" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Clients</SelectItem>
                <SelectItem value="john-smith">John Smith</SelectItem>
                <SelectItem value="jane-doe">Jane Doe</SelectItem>
                <SelectItem value="robert-johnson">Robert Johnson</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card className="bg-background/60 backdrop-blur border-border">
            <CardHeader>
              <CardTitle>Recent Interactions</CardTitle>
              <CardDescription>Track all client communications and interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={[
                  { header: "Interaction ID", accessorKey: "id" },
                  { header: "Client", accessorKey: "client" },
                  { header: "Contact", accessorKey: "contact" },
                  {
                    header: "Type",
                    accessorKey: "type",
                    cell: ({ row }) => {
                      const type = row.getValue("type") as string
                      return (
                        <div className="flex items-center gap-2">
                          {type === "Phone Call" ? (
                            <Phone className="h-4 w-4 text-blue-500" />
                          ) : type === "Email" ? (
                            <Mail className="h-4 w-4 text-green-500" />
                          ) : type === "Meeting" ? (
                            <Calendar className="h-4 w-4 text-purple-500" />
                          ) : (
                            <MessageSquare className="h-4 w-4 text-yellow-500" />
                          )}
                          <span>{type}</span>
                        </div>
                      )
                    },
                  },
                  { header: "Date & Time", accessorKey: "dateTime" },
                  { header: "Duration", accessorKey: "duration" },
                  { header: "Case", accessorKey: "case" },
                  {
                    header: "Actions",
                    accessorKey: "actions",
                    cell: () => (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Edit interaction</DropdownMenuItem>
                          <DropdownMenuItem>Create task</DropdownMenuItem>
                          <DropdownMenuItem>Add to case</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete interaction</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ),
                  },
                ]}
                data={[
                  {
                    id: "INT-1001",
                    client: "John Smith",
                    contact: "John Smith",
                    type: "Phone Call",
                    dateTime: "2023-04-15 10:30 AM",
                    duration: "15 min",
                    case: "CASE-1001",
                  },
                  {
                    id: "INT-1002",
                    client: "Jane Doe",
                    contact: "Jane Doe",
                    type: "Email",
                    dateTime: "2023-04-16 02:45 PM",
                    duration: "N/A",
                    case: "CASE-1002",
                  },
                  {
                    id: "INT-1003",
                    client: "Robert Johnson",
                    contact: "Robert Johnson",
                    type: "Meeting",
                    dateTime: "2023-04-17 09:00 AM",
                    duration: "45 min",
                    case: "CASE-1003",
                  },
                  {
                    id: "INT-1004",
                    client: "Sarah Williams",
                    contact: "Sarah Williams",
                    type: "Note",
                    dateTime: "2023-04-18 11:15 AM",
                    duration: "N/A",
                    case: "CASE-1001",
                  },
                  {
                    id: "INT-1005",
                    client: "Michael Brown",
                    contact: "Michael Brown",
                    type: "Phone Call",
                    dateTime: "2023-04-19 03:30 PM",
                    duration: "10 min",
                    case: "CASE-1002",
                  },
                ]}
              />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-background/60 backdrop-blur border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Interactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">248</div>
                <p className="text-xs text-muted-foreground">+32 from last month</p>
              </CardContent>
            </Card>

            <Card className="bg-background/60 backdrop-blur border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Phone Calls</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">86</div>
                <p className="text-xs text-muted-foreground">35% of interactions</p>
              </CardContent>
            </Card>

            <Card className="bg-background/60 backdrop-blur border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Emails</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">124</div>
                <p className="text-xs text-muted-foreground">50% of interactions</p>
              </CardContent>
            </Card>

            <Card className="bg-background/60 backdrop-blur border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Meetings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">38</div>
                <p className="text-xs text-muted-foreground">15% of interactions</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <Input placeholder="Search tasks..." className="max-w-sm" />
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="mr-2 h-4 w-4" /> New Task
            </Button>
          </div>

          <Card className="bg-background/60 backdrop-blur border-border">
            <CardHeader>
              <CardTitle>Task Management</CardTitle>
              <CardDescription>Manage and track all tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={[
                  { header: "Task ID", accessorKey: "id" },
                  { header: "Task Name", accessorKey: "name" },
                  { header: "Assigned To", accessorKey: "assignedTo" },
                  { header: "Due Date", accessorKey: "dueDate" },
                  {
                    header: "Priority",
                    accessorKey: "priority",
                    cell: ({ row }) => {
                      const priority = row.getValue("priority") as string
                      return (
                        <Badge
                          className={
                            priority === "High"
                              ? "bg-red-500/20 text-red-500"
                              : priority === "Medium"
                                ? "bg-yellow-500/20 text-yellow-500"
                                : "bg-green-500/20 text-green-500"
                          }
                        >
                          {priority}
                        </Badge>
                      )
                    },
                  },
                  {
                    header: "Status",
                    accessorKey: "status",
                    cell: ({ row }) => {
                      const status = row.getValue("status") as string
                      return (
                        <Badge
                          className={
                            status === "Completed"
                              ? "bg-green-500/20 text-green-500"
                              : status === "In Progress"
                                ? "bg-blue-500/20 text-blue-500"
                                : status === "Overdue"
                                  ? "bg-red-500/20 text-red-500"
                                  : "bg-yellow-500/20 text-yellow-500"
                          }
                        >
                          {status}
                        </Badge>
                      )
                    },
                  },
                  { header: "Case", accessorKey: "case" },
                  {
                    header: "Actions",
                    accessorKey: "actions",
                    cell: () => (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Edit task</DropdownMenuItem>
                          <DropdownMenuItem>Mark as completed</DropdownMenuItem>
                          <DropdownMenuItem>Reassign task</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete task</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ),
                  },
                ]}
                data={[
                  {
                    id: "TASK-1001",
                    name: "Draft settlement agreement",
                    assignedTo: "Sarah Johnson",
                    dueDate: "2023-04-20",
                    priority: "High",
                    status: "In Progress",
                    case: "CASE-1001",
                  },
                  {
                    id: "TASK-1002",
                    name: "Review medical records",
                    assignedTo: "Michael Brown",
                    dueDate: "2023-04-18",
                    priority: "Medium",
                    status: "Completed",
                    case: "CASE-1002",
                  },
                  {
                    id: "TASK-1003",
                    name: "Schedule client meeting",
                    assignedTo: "David Miller",
                    dueDate: "2023-04-15",
                    priority: "Low",
                    status: "Overdue",
                    case: "CASE-1003",
                  },
                  {
                    id: "TASK-1004",
                    name: "File motion to dismiss",
                    assignedTo: "Jennifer Taylor",
                    dueDate: "2023-04-25",
                    priority: "High",
                    status: "Pending",
                    case: "CASE-1001",
                  },
                  {
                    id: "TASK-1005",
                    name: "Prepare for deposition",
                    assignedTo: "Sarah Johnson",
                    dueDate: "2023-04-30",
                    priority: "Medium",
                    status: "In Progress",
                    case: "CASE-1002",
                  },
                ]}
              />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-background/60 backdrop-blur border-border">
              <CardHeader>
                <CardTitle>Task Dependencies</CardTitle>
                <CardDescription>Manage task dependencies and workflows</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <List className="h-5 w-5 text-purple-500" />
                      <span>Draft settlement agreement</span>
                    </div>
                    <Badge className="bg-blue-500/20 text-blue-500">2 Dependencies</Badge>
                  </div>
                  <div className="ml-7 space-y-2 border-l border-border pl-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Review client documents</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">Consult with partner</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <List className="h-5 w-5 text-purple-500" />
                      <span>File motion to dismiss</span>
                    </div>
                    <Badge className="bg-blue-500/20 text-blue-500">3 Dependencies</Badge>
                  </div>
                  <div className="ml-7 space-y-2 border-l border-border pl-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Research case law</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Draft motion</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">Partner review</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Manage Dependencies
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-background/60 backdrop-blur border-border">
              <CardHeader>
                <CardTitle>Priority Levels</CardTitle>
                <CardDescription>Configure task priority levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                      <span>High Priority</span>
                    </div>
                    <span className="text-sm">12 active tasks</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                      <span>Medium Priority</span>
                    </div>
                    <span className="text-sm">24 active tasks</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-green-500" />
                      <span>Low Priority</span>
                    </div>
                    <span className="text-sm">18 active tasks</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Configure Priority Levels
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tags" className="space-y-6">
          <Card className="bg-background/60 backdrop-blur border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Tags Management</CardTitle>
                  <CardDescription>Organize interactions and tasks with tags</CardDescription>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="mr-2 h-4 w-4" /> New Tag
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={[
                  { header: "Tag ID", accessorKey: "id" },
                  {
                    header: "Tag Name",
                    accessorKey: "name",
                    cell: ({ row }) => {
                      const name = row.getValue("name") as string
                      const color = row.getValue("color") as string
                      return (
                        <div className="flex items-center gap-2">
                          <div className={`h-3 w-3 rounded-full ${color}`} />
                          <span>{name}</span>
                        </div>
                      )
                    },
                  },
                  {
                    header: "Color",
                    accessorKey: "color",
                    cell: ({ row }) => {
                      const color = row.getValue("color") as string
                      return <div className={`h-5 w-5 rounded-full ${color}`} />
                    },
                  },
                  { header: "Category", accessorKey: "category" },
                  { header: "Usage Count", accessorKey: "usageCount" },
                  { header: "Created By", accessorKey: "createdBy" },
                  {
                    header: "Actions",
                    accessorKey: "actions",
                    cell: () => (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit tag</DropdownMenuItem>
                          <DropdownMenuItem>View tagged items</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete tag</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ),
                  },
                ]}
                data={[
                  {
                    id: "TAG-1001",
                    name: "Urgent",
                    color: "bg-red-500",
                    category: "Priority",
                    usageCount: 24,
                    createdBy: "Sarah Johnson",
                  },
                  {
                    id: "TAG-1002",
                    name: "Follow-up",
                    color: "bg-blue-500",
                    category: "Action",
                    usageCount: 36,
                    createdBy: "Michael Brown",
                  },
                  {
                    id: "TAG-1003",
                    name: "Client Communication",
                    color: "bg-green-500",
                    category: "Type",
                    usageCount: 42,
                    createdBy: "David Miller",
                  },
                  {
                    id: "TAG-1004",
                    name: "Billing Related",
                    color: "bg-yellow-500",
                    category: "Financial",
                    usageCount: 18,
                    createdBy: "Jennifer Taylor",
                  },
                  {
                    id: "TAG-1005",
                    name: "Document Review",
                    color: "bg-purple-500",
                    category: "Task",
                    usageCount: 29,
                    createdBy: "Sarah Johnson",
                  },
                ]}
              />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-background/60 backdrop-blur border-border">
              <CardHeader>
                <CardTitle>Client Tags</CardTitle>
                <CardDescription>Tags associated with clients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-red-500/20 text-red-500 px-3 py-1">VIP Client</Badge>
                  <Badge className="bg-blue-500/20 text-blue-500 px-3 py-1">Corporate</Badge>
                  <Badge className="bg-green-500/20 text-green-500 px-3 py-1">Retainer</Badge>
                  <Badge className="bg-yellow-500/20 text-yellow-500 px-3 py-1">New Client</Badge>
                  <Badge className="bg-purple-500/20 text-purple-500 px-3 py-1">Referral</Badge>
                  <Badge className="bg-orange-500/20 text-orange-500 px-3 py-1">Repeat Client</Badge>
                  <Badge className="bg-pink-500/20 text-pink-500 px-3 py-1">Pro Bono</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Manage Client Tags
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-background/60 backdrop-blur border-border">
              <CardHeader>
                <CardTitle>Case Tags</CardTitle>
                <CardDescription>Tags associated with cases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-red-500/20 text-red-500 px-3 py-1">High Value</Badge>
                  <Badge className="bg-blue-500/20 text-blue-500 px-3 py-1">Litigation</Badge>
                  <Badge className="bg-green-500/20 text-green-500 px-3 py-1">Settlement</Badge>
                  <Badge className="bg-yellow-500/20 text-yellow-500 px-3 py-1">Trial Scheduled</Badge>
                  <Badge className="bg-purple-500/20 text-purple-500 px-3 py-1">Discovery</Badge>
                  <Badge className="bg-orange-500/20 text-orange-500 px-3 py-1">Appeal</Badge>
                  <Badge className="bg-pink-500/20 text-pink-500 px-3 py-1">Mediation</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Manage Case Tags
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-background/60 backdrop-blur border-border">
              <CardHeader>
                <CardTitle>Task Tags</CardTitle>
                <CardDescription>Tags associated with tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-red-500/20 text-red-500 px-3 py-1">Urgent</Badge>
                  <Badge className="bg-blue-500/20 text-blue-500 px-3 py-1">Research</Badge>
                  <Badge className="bg-green-500/20 text-green-500 px-3 py-1">Client Meeting</Badge>
                  <Badge className="bg-yellow-500/20 text-yellow-500 px-3 py-1">Court Filing</Badge>
                  <Badge className="bg-purple-500/20 text-purple-500 px-3 py-1">Document Prep</Badge>
                  <Badge className="bg-orange-500/20 text-orange-500 px-3 py-1">Follow-up</Badge>
                  <Badge className="bg-pink-500/20 text-pink-500 px-3 py-1">Billing</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Manage Task Tags
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
