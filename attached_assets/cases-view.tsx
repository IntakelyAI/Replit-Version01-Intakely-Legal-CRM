"use client"

import { useState } from "react"
import { Plus, Filter, Download, MoreHorizontal, CheckCircle2 } from "lucide-react"
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

export function CasesView() {
  const [activeTab, setActiveTab] = useState("cases")

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-purple-300">Case Management</h1>
          <p className="text-muted-foreground">Manage and track all your legal cases</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="mr-2 h-4 w-4" /> New Case
          </Button>
        </div>
      </div>

      <Tabs defaultValue="cases" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList className="bg-background/60 border border-border">
          <TabsTrigger value="cases">All Cases</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="closed">Closed</TabsTrigger>
          <TabsTrigger value="stages">Case Stages</TabsTrigger>
        </TabsList>

        <TabsContent value="cases" className="space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <Input placeholder="Search cases..." className="max-w-sm" />
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Matter Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="personal-injury">Personal Injury</SelectItem>
                <SelectItem value="family-law">Family Law</SelectItem>
                <SelectItem value="lemon-law">Lemon Law</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card className="bg-background/60 backdrop-blur border-border">
            <CardHeader>
              <CardTitle>Case List</CardTitle>
              <CardDescription>Manage all your legal cases</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={[
                  { header: "Case ID", accessorKey: "id" },
                  { header: "Case Number", accessorKey: "caseNumber" },
                  { header: "Client", accessorKey: "client" },
                  { header: "Matter Type", accessorKey: "matterType" },
                  { header: "Filed Date", accessorKey: "filedDate" },
                  {
                    header: "Status",
                    accessorKey: "status",
                    cell: ({ row }) => {
                      const status = row.getValue("status") as string
                      return (
                        <Badge
                          className={
                            status === "Active"
                              ? "bg-green-500/20 text-green-500"
                              : status === "Pending"
                                ? "bg-yellow-500/20 text-yellow-500"
                                : "bg-blue-500/20 text-blue-500"
                          }
                        >
                          {status}
                        </Badge>
                      )
                    },
                  },
                  { header: "Assigned To", accessorKey: "assignedTo" },
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
                          <DropdownMenuItem>View case</DropdownMenuItem>
                          <DropdownMenuItem>Edit case</DropdownMenuItem>
                          <DropdownMenuItem>Add document</DropdownMenuItem>
                          <DropdownMenuItem>Schedule appointment</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Change status</DropdownMenuItem>
                          <DropdownMenuItem>Reassign case</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Close case</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ),
                  },
                ]}
                data={[
                  {
                    id: "CASE-1001",
                    caseNumber: "PI-2023-001",
                    client: "John Smith",
                    matterType: "Personal Injury",
                    filedDate: "2023-04-15",
                    status: "Active",
                    assignedTo: "Sarah Johnson",
                  },
                  {
                    id: "CASE-1002",
                    caseNumber: "FL-2023-042",
                    client: "Jane Doe",
                    matterType: "Family Law",
                    filedDate: "2023-04-16",
                    status: "Pending",
                    assignedTo: "Michael Brown",
                  },
                  {
                    id: "CASE-1003",
                    caseNumber: "LL-2023-007",
                    client: "Robert Johnson",
                    matterType: "Lemon Law",
                    filedDate: "2023-04-17",
                    status: "Active",
                    assignedTo: "David Miller",
                  },
                  {
                    id: "CASE-1004",
                    caseNumber: "PI-2023-002",
                    client: "Sarah Williams",
                    matterType: "Personal Injury",
                    filedDate: "2023-04-18",
                    status: "Closed",
                    assignedTo: "Sarah Johnson",
                  },
                  {
                    id: "CASE-1005",
                    caseNumber: "FL-2023-043",
                    client: "Michael Brown",
                    matterType: "Family Law",
                    filedDate: "2023-04-19",
                    status: "Active",
                    assignedTo: "Jennifer Taylor",
                  },
                ]}
              />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-background/60 backdrop-blur border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">128</div>
                <p className="text-xs text-muted-foreground">+14% from last month</p>
              </CardContent>
            </Card>

            <Card className="bg-background/60 backdrop-blur border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">86</div>
                <p className="text-xs text-muted-foreground">67% of total cases</p>
              </CardContent>
            </Card>

            <Card className="bg-background/60 backdrop-blur border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pending Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32</div>
                <p className="text-xs text-muted-foreground">25% of total cases</p>
              </CardContent>
            </Card>

            <Card className="bg-background/60 backdrop-blur border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Closed Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">10</div>
                <p className="text-xs text-muted-foreground">8% of total cases</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-6">
          <Card className="bg-background/60 backdrop-blur border-border">
            <CardHeader>
              <CardTitle>Active Cases</CardTitle>
              <CardDescription>Currently active legal cases</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={[
                  { header: "Case ID", accessorKey: "id" },
                  { header: "Case Number", accessorKey: "caseNumber" },
                  { header: "Client", accessorKey: "client" },
                  { header: "Matter Type", accessorKey: "matterType" },
                  { header: "Filed Date", accessorKey: "filedDate" },
                  { header: "Stage", accessorKey: "stage" },
                  { header: "Assigned To", accessorKey: "assignedTo" },
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
                          <DropdownMenuItem>View case</DropdownMenuItem>
                          <DropdownMenuItem>Edit case</DropdownMenuItem>
                          <DropdownMenuItem>Add document</DropdownMenuItem>
                          <DropdownMenuItem>Schedule appointment</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Change status</DropdownMenuItem>
                          <DropdownMenuItem>Reassign case</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Close case</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ),
                  },
                ]}
                data={[
                  {
                    id: "CASE-1001",
                    caseNumber: "PI-2023-001",
                    client: "John Smith",
                    matterType: "Personal Injury",
                    filedDate: "2023-04-15",
                    stage: "Discovery",
                    assignedTo: "Sarah Johnson",
                  },
                  {
                    id: "CASE-1003",
                    caseNumber: "LL-2023-007",
                    client: "Robert Johnson",
                    matterType: "Lemon Law",
                    filedDate: "2023-04-17",
                    stage: "Initial Filing",
                    assignedTo: "David Miller",
                  },
                  {
                    id: "CASE-1005",
                    caseNumber: "FL-2023-043",
                    client: "Michael Brown",
                    matterType: "Family Law",
                    filedDate: "2023-04-19",
                    stage: "Negotiation",
                    assignedTo: "Jennifer Taylor",
                  },
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stages" className="space-y-6">
          <Card className="bg-background/60 backdrop-blur border-border">
            <CardHeader>
              <CardTitle>Case Stages</CardTitle>
              <CardDescription>Manage and track case progression through stages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Personal Injury Case Flow</h3>
                    <Badge className="bg-purple-600">Default</Badge>
                  </div>
                  <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    {[
                      "Initial Consultation",
                      "Case Evaluation",
                      "Filing",
                      "Discovery",
                      "Negotiation",
                      "Settlement/Trial",
                      "Closure",
                    ].map((stage, i) => (
                      <div key={i} className="flex flex-col items-center min-w-[120px]">
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center ${i < 3 ? "bg-green-500/20 text-green-500" : "bg-muted text-muted-foreground"}`}
                        >
                          {i < 3 ? <CheckCircle2 className="h-5 w-5" /> : i + 1}
                        </div>
                        <div className="h-[2px] w-8 bg-muted mt-2 mb-1" />
                        <span className="text-xs text-center">{stage}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      Edit Flow
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Family Law Case Flow</h3>
                    <Badge className="bg-purple-600">Default</Badge>
                  </div>
                  <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    {[
                      "Initial Consultation",
                      "Filing Petition",
                      "Temporary Orders",
                      "Discovery",
                      "Mediation",
                      "Trial",
                      "Final Decree",
                    ].map((stage, i) => (
                      <div key={i} className="flex flex-col items-center min-w-[120px]">
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center ${i < 2 ? "bg-green-500/20 text-green-500" : "bg-muted text-muted-foreground"}`}
                        >
                          {i < 2 ? <CheckCircle2 className="h-5 w-5" /> : i + 1}
                        </div>
                        <div className="h-[2px] w-8 bg-muted mt-2 mb-1" />
                        <span className="text-xs text-center">{stage}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      Edit Flow
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Lemon Law Case Flow</h3>
                    <Badge className="bg-purple-600">Default</Badge>
                  </div>
                  <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    {[
                      "Initial Consultation",
                      "Demand Letter",
                      "Filing",
                      "Discovery",
                      "Arbitration",
                      "Settlement/Trial",
                      "Closure",
                    ].map((stage, i) => (
                      <div key={i} className="flex flex-col items-center min-w-[120px]">
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center ${i < 4 ? "bg-green-500/20 text-green-500" : "bg-muted text-muted-foreground"}`}
                        >
                          {i < 4 ? <CheckCircle2 className="h-5 w-5" /> : i + 1}
                        </div>
                        <div className="h-[2px] w-8 bg-muted mt-2 mb-1" />
                        <span className="text-xs text-center">{stage}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      Edit Flow
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="mr-2 h-4 w-4" /> Create New Case Flow
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
