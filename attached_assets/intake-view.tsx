"use client"

import { useState } from "react"
import { FileText, Plus, Filter, Download, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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

export function IntakeView() {
  const [activeTab, setActiveTab] = useState("intake")

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-purple-300">Intake Management</h1>
          <p className="text-muted-foreground">Manage client intake forms and processes</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="mr-2 h-4 w-4" /> New Intake
          </Button>
        </div>
      </div>

      <Tabs defaultValue="intake" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList className="bg-background/60 border border-border">
          <TabsTrigger value="intake">Intake</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="intake" className="space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <Input placeholder="Search intakes..." className="max-w-sm" />
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Practice Area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Practice Areas</SelectItem>
                <SelectItem value="personal-injury">Personal Injury</SelectItem>
                <SelectItem value="family-law">Family Law</SelectItem>
                <SelectItem value="lemon-law">Lemon Law</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card className="bg-background/60 backdrop-blur border-border">
            <CardHeader>
              <CardTitle>Recent Intakes</CardTitle>
              <CardDescription>Manage and track client intake forms</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={[
                  { header: "Intake ID", accessorKey: "id" },
                  { header: "Client Name", accessorKey: "client" },
                  { header: "Practice Area", accessorKey: "practiceArea" },
                  { header: "Date", accessorKey: "date" },
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
                                : "bg-yellow-500/20 text-yellow-500"
                          }
                        >
                          {status}
                        </Badge>
                      )
                    },
                  },
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
                          <DropdownMenuItem>Edit intake</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Convert to case</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete intake</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ),
                  },
                ]}
                data={[
                  {
                    id: "INT-1001",
                    client: "John Smith",
                    practiceArea: "Personal Injury",
                    date: "2023-04-15",
                    status: "Completed",
                  },
                  {
                    id: "INT-1002",
                    client: "Jane Doe",
                    practiceArea: "Family Law",
                    date: "2023-04-16",
                    status: "In Progress",
                  },
                  {
                    id: "INT-1003",
                    client: "Robert Johnson",
                    practiceArea: "Lemon Law",
                    date: "2023-04-17",
                    status: "Pending",
                  },
                  {
                    id: "INT-1004",
                    client: "Sarah Williams",
                    practiceArea: "Personal Injury",
                    date: "2023-04-18",
                    status: "Completed",
                  },
                  {
                    id: "INT-1005",
                    client: "Michael Brown",
                    practiceArea: "Family Law",
                    date: "2023-04-19",
                    status: "In Progress",
                  },
                ]}
              />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-background/60 backdrop-blur border-border">
              <CardHeader>
                <CardTitle>Personal Injury</CardTitle>
                <CardDescription>Intake forms for personal injury cases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Total Intakes</span>
                    <span className="font-medium">24</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Completed</span>
                    <span className="font-medium text-green-500">18</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>In Progress</span>
                    <span className="font-medium text-blue-500">6</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <FileText className="mr-2 h-4 w-4" /> View Template
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-background/60 backdrop-blur border-border">
              <CardHeader>
                <CardTitle>Family Law</CardTitle>
                <CardDescription>Intake forms for family law cases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Total Intakes</span>
                    <span className="font-medium">16</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Completed</span>
                    <span className="font-medium text-green-500">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>In Progress</span>
                    <span className="font-medium text-blue-500">4</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <FileText className="mr-2 h-4 w-4" /> View Template
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-background/60 backdrop-blur border-border">
              <CardHeader>
                <CardTitle>Lemon Law</CardTitle>
                <CardDescription>Intake forms for lemon law cases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Total Intakes</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Completed</span>
                    <span className="font-medium text-green-500">5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>In Progress</span>
                    <span className="font-medium text-blue-500">3</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <FileText className="mr-2 h-4 w-4" /> View Template
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="questions" className="space-y-6">
          <Card className="bg-background/60 backdrop-blur border-border">
            <CardHeader>
              <CardTitle>Intake Questions</CardTitle>
              <CardDescription>Manage questions used in intake forms</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={[
                  { header: "Question ID", accessorKey: "id" },
                  { header: "Question Text", accessorKey: "text" },
                  { header: "Practice Area", accessorKey: "practiceArea" },
                  { header: "Specialty", accessorKey: "specialty" },
                  {
                    header: "Required",
                    accessorKey: "required",
                    cell: ({ row }) => {
                      const required = row.getValue("required") as boolean
                      return required ? "Yes" : "No"
                    },
                  },
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
                          <DropdownMenuItem>Edit question</DropdownMenuItem>
                          <DropdownMenuItem>View responses</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete question</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ),
                  },
                ]}
                data={[
                  {
                    id: "Q-1001",
                    text: "When did the accident occur?",
                    practiceArea: "Personal Injury",
                    specialty: "Auto Accident",
                    required: true,
                  },
                  {
                    id: "Q-1002",
                    text: "Were there any witnesses to the accident?",
                    practiceArea: "Personal Injury",
                    specialty: "Auto Accident",
                    required: true,
                  },
                  {
                    id: "Q-1003",
                    text: "What is the custody arrangement you're seeking?",
                    practiceArea: "Family Law",
                    specialty: "Child Custody",
                    required: true,
                  },
                  {
                    id: "Q-1004",
                    text: "When did you purchase the vehicle?",
                    practiceArea: "Lemon Law",
                    specialty: "Vehicle Defect",
                    required: true,
                  },
                  {
                    id: "Q-1005",
                    text: "Have you sought medical treatment for your injuries?",
                    practiceArea: "Personal Injury",
                    specialty: "Medical",
                    required: false,
                  },
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card className="bg-background/60 backdrop-blur border-border">
            <CardHeader>
              <CardTitle>Intake Templates</CardTitle>
              <CardDescription>Manage intake form templates by practice area</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={[
                  { header: "Template ID", accessorKey: "id" },
                  { header: "Template Name", accessorKey: "name" },
                  { header: "Practice Area", accessorKey: "practiceArea" },
                  { header: "Questions", accessorKey: "questions" },
                  { header: "Last Updated", accessorKey: "updated" },
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
                          <DropdownMenuItem>Edit template</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate template</DropdownMenuItem>
                          <DropdownMenuItem>Create intake</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete template</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ),
                  },
                ]}
                data={[
                  {
                    id: "TPL-1001",
                    name: "Personal Injury - Auto Accident",
                    practiceArea: "Personal Injury",
                    questions: 15,
                    updated: "2023-03-15",
                  },
                  {
                    id: "TPL-1002",
                    name: "Family Law - Divorce",
                    practiceArea: "Family Law",
                    questions: 20,
                    updated: "2023-03-10",
                  },
                  {
                    id: "TPL-1003",
                    name: "Lemon Law - Vehicle Defect",
                    practiceArea: "Lemon Law",
                    questions: 12,
                    updated: "2023-03-05",
                  },
                  {
                    id: "TPL-1004",
                    name: "Personal Injury - Slip and Fall",
                    practiceArea: "Personal Injury",
                    questions: 18,
                    updated: "2023-02-28",
                  },
                  {
                    id: "TPL-1005",
                    name: "Family Law - Child Custody",
                    practiceArea: "Family Law",
                    questions: 25,
                    updated: "2023-02-20",
                  },
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="bg-background/60 backdrop-blur border-border">
            <CardHeader>
              <CardTitle>Intake Settings</CardTitle>
              <CardDescription>Configure intake form settings and defaults</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Default Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Auto-assign to staff</span>
                        <div className="flex items-center">
                          <span className="mr-2">Enabled</span>
                          <Button variant="outline" size="sm">
                            Configure
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Send email notifications</span>
                        <div className="flex items-center">
                          <span className="mr-2">Enabled</span>
                          <Button variant="outline" size="sm">
                            Configure
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Auto-convert to case</span>
                        <div className="flex items-center">
                          <span className="mr-2">Disabled</span>
                          <Button variant="outline" size="sm">
                            Configure
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Integration Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Website integration</span>
                        <div className="flex items-center">
                          <span className="mr-2">Enabled</span>
                          <Button variant="outline" size="sm">
                            Configure
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Email integration</span>
                        <div className="flex items-center">
                          <span className="mr-2">Enabled</span>
                          <Button variant="outline" size="sm">
                            Configure
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Calendar integration</span>
                        <div className="flex items-center">
                          <span className="mr-2">Enabled</span>
                          <Button variant="outline" size="sm">
                            Configure
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="text-lg font-medium mb-2">Practice Area Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">Personal Injury</span>
                        <p className="text-sm text-muted-foreground">Configure settings for personal injury intakes</p>
                      </div>
                      <Button variant="outline">Manage</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">Family Law</span>
                        <p className="text-sm text-muted-foreground">Configure settings for family law intakes</p>
                      </div>
                      <Button variant="outline">Manage</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">Lemon Law</span>
                        <p className="text-sm text-muted-foreground">Configure settings for lemon law intakes</p>
                      </div>
                      <Button variant="outline">Manage</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
