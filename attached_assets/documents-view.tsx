"use client"

import { useState } from "react"
import { Plus, Filter, Download, MoreHorizontal, Upload, FileLock, Search } from "lucide-react"
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

export function DocumentsView() {
  const [activeTab, setActiveTab] = useState("documents")

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-purple-300">Document Management</h1>
          <p className="text-muted-foreground">Manage and organize client documents</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Upload className="mr-2 h-4 w-4" /> Upload Document
          </Button>
        </div>
      </div>

      <Tabs defaultValue="documents" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList className="bg-background/60 border border-border">
          <TabsTrigger value="documents">All Documents</TabsTrigger>
          <TabsTrigger value="sensitive">Sensitive Information</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search documents..." className="pl-8" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Document Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="contract">Contracts</SelectItem>
                <SelectItem value="pleading">Pleadings</SelectItem>
                <SelectItem value="correspondence">Correspondence</SelectItem>
                <SelectItem value="evidence">Evidence</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Case" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cases</SelectItem>
                <SelectItem value="case-1001">CASE-1001</SelectItem>
                <SelectItem value="case-1002">CASE-1002</SelectItem>
                <SelectItem value="case-1003">CASE-1003</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card className="bg-background/60 backdrop-blur border-border">
            <CardHeader>
              <CardTitle>Document Library</CardTitle>
              <CardDescription>Manage all client and case documents</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={[
                  { header: "Document ID", accessorKey: "id" },
                  { header: "Document Name", accessorKey: "name" },
                  { header: "Type", accessorKey: "type" },
                  { header: "Client", accessorKey: "client" },
                  { header: "Case", accessorKey: "case" },
                  { header: "Uploaded", accessorKey: "uploaded" },
                  { header: "Size", accessorKey: "size" },
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
                          <DropdownMenuItem>View document</DropdownMenuItem>
                          <DropdownMenuItem>Download</DropdownMenuItem>
                          <DropdownMenuItem>Share</DropdownMenuItem>
                          <DropdownMenuItem>Rename</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Move to folder</DropdownMenuItem>
                          <DropdownMenuItem>Add to case</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete document</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ),
                  },
                ]}
                data={[
                  {
                    id: "DOC-1001",
                    name: "Smith_Contract_v1.pdf",
                    type: "Contract",
                    client: "John Smith",
                    case: "CASE-1001",
                    uploaded: "2023-04-15",
                    size: "1.2 MB",
                  },
                  {
                    id: "DOC-1002",
                    name: "Doe_Divorce_Petition.pdf",
                    type: "Pleading",
                    client: "Jane Doe",
                    case: "CASE-1002",
                    uploaded: "2023-04-16",
                    size: "2.5 MB",
                  },
                  {
                    id: "DOC-1003",
                    name: "Johnson_Vehicle_Inspection.pdf",
                    type: "Evidence",
                    client: "Robert Johnson",
                    case: "CASE-1003",
                    uploaded: "2023-04-17",
                    size: "3.7 MB",
                  },
                  {
                    id: "DOC-1004",
                    name: "Williams_Medical_Records.pdf",
                    type: "Evidence",
                    client: "Sarah Williams",
                    case: "CASE-1001",
                    uploaded: "2023-04-18",
                    size: "5.1 MB",
                  },
                  {
                    id: "DOC-1005",
                    name: "Brown_Settlement_Agreement.pdf",
                    type: "Contract",
                    client: "Michael Brown",
                    case: "CASE-1002",
                    uploaded: "2023-04-19",
                    size: "1.8 MB",
                  },
                ]}
              />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-background/60 backdrop-blur border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">128</div>
                <p className="text-xs text-muted-foreground">+14 from last month</p>
              </CardContent>
            </Card>

            <Card className="bg-background/60 backdrop-blur border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.2 GB</div>
                <p className="text-xs text-muted-foreground">of 10 GB (12%)</p>
              </CardContent>
            </Card>

            <Card className="bg-background/60 backdrop-blur border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Recent Uploads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">in the last 7 days</p>
              </CardContent>
            </Card>

            <Card className="bg-background/60 backdrop-blur border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Shared Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">36</div>
                <p className="text-xs text-muted-foreground">with clients and staff</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sensitive" className="space-y-6">
          <Card className="bg-background/60 backdrop-blur border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Sensitive Information</CardTitle>
                  <CardDescription>Securely manage sensitive client information</CardDescription>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <FileLock className="mr-2 h-4 w-4" /> Add Sensitive Information
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={[
                  { header: "ID", accessorKey: "id" },
                  { header: "Client", accessorKey: "client" },
                  { header: "Info Type", accessorKey: "infoType" },
                  { header: "Date Added", accessorKey: "dateAdded" },
                  {
                    header: "Access Level",
                    accessorKey: "accessLevel",
                    cell: ({ row }) => {
                      const level = row.getValue("accessLevel") as string
                      return (
                        <Badge
                          className={
                            level === "High"
                              ? "bg-red-500/20 text-red-500"
                              : level === "Medium"
                                ? "bg-yellow-500/20 text-yellow-500"
                                : "bg-green-500/20 text-green-500"
                          }
                        >
                          {level}
                        </Badge>
                      )
                    },
                  },
                  { header: "Last Accessed", accessorKey: "lastAccessed" },
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
                          <DropdownMenuItem>View information</DropdownMenuItem>
                          <DropdownMenuItem>Edit access level</DropdownMenuItem>
                          <DropdownMenuItem>View access log</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete information</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ),
                  },
                ]}
                data={[
                  {
                    id: "SI-1001",
                    client: "John Smith",
                    infoType: "Financial Records",
                    dateAdded: "2023-04-15",
                    accessLevel: "High",
                    lastAccessed: "2023-04-20",
                  },
                  {
                    id: "SI-1002",
                    client: "Jane Doe",
                    infoType: "Medical Records",
                    dateAdded: "2023-04-16",
                    accessLevel: "High",
                    lastAccessed: "2023-04-19",
                  },
                  {
                    id: "SI-1003",
                    client: "Robert Johnson",
                    infoType: "Employment Records",
                    dateAdded: "2023-04-17",
                    accessLevel: "Medium",
                    lastAccessed: "2023-04-18",
                  },
                  {
                    id: "SI-1004",
                    client: "Sarah Williams",
                    infoType: "Tax Documents",
                    dateAdded: "2023-04-18",
                    accessLevel: "High",
                    lastAccessed: "2023-04-20",
                  },
                  {
                    id: "SI-1005",
                    client: "Michael Brown",
                    infoType: "Personal Identification",
                    dateAdded: "2023-04-19",
                    accessLevel: "Low",
                    lastAccessed: "2023-04-20",
                  },
                ]}
              />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-background/60 backdrop-blur border-border">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure security for sensitive information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Two-factor authentication</span>
                    <Badge className="bg-green-500/20 text-green-500">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Encryption level</span>
                    <span className="font-medium">AES-256</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Access logging</span>
                    <Badge className="bg-green-500/20 text-green-500">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Auto-lock timeout</span>
                    <span className="font-medium">15 minutes</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Configure Security Settings
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-background/60 backdrop-blur border-border">
              <CardHeader>
                <CardTitle>Access Control</CardTitle>
                <CardDescription>Manage access to sensitive information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">High Level Access</span>
                      <p className="text-sm text-muted-foreground">Partners and designated attorneys only</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Medium Level Access</span>
                      <p className="text-sm text-muted-foreground">All attorneys and paralegals</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Low Level Access</span>
                      <p className="text-sm text-muted-foreground">All staff members</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Access Logs
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card className="bg-background/60 backdrop-blur border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Document Templates</CardTitle>
                  <CardDescription>Manage reusable document templates</CardDescription>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="mr-2 h-4 w-4" /> New Template
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={[
                  { header: "Template ID", accessorKey: "id" },
                  { header: "Template Name", accessorKey: "name" },
                  { header: "Category", accessorKey: "category" },
                  { header: "Practice Area", accessorKey: "practiceArea" },
                  { header: "Created By", accessorKey: "createdBy" },
                  { header: "Last Updated", accessorKey: "lastUpdated" },
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
                          <DropdownMenuItem>View template</DropdownMenuItem>
                          <DropdownMenuItem>Edit template</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate template</DropdownMenuItem>
                          <DropdownMenuItem>Generate document</DropdownMenuItem>
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
                    name: "Retainer Agreement",
                    category: "Contract",
                    practiceArea: "General",
                    createdBy: "Sarah Johnson",
                    lastUpdated: "2023-03-15",
                  },
                  {
                    id: "TPL-1002",
                    name: "Divorce Petition",
                    category: "Pleading",
                    practiceArea: "Family Law",
                    createdBy: "Michael Brown",
                    lastUpdated: "2023-03-10",
                  },
                  {
                    id: "TPL-1003",
                    name: "Settlement Demand",
                    category: "Correspondence",
                    practiceArea: "Personal Injury",
                    createdBy: "David Miller",
                    lastUpdated: "2023-03-05",
                  },
                  {
                    id: "TPL-1004",
                    name: "Client Intake Form",
                    category: "Form",
                    practiceArea: "General",
                    createdBy: "Jennifer Taylor",
                    lastUpdated: "2023-02-28",
                  },
                  {
                    id: "TPL-1005",
                    name: "Motion to Dismiss",
                    category: "Pleading",
                    practiceArea: "Litigation",
                    createdBy: "Sarah Johnson",
                    lastUpdated: "2023-02-20",
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
