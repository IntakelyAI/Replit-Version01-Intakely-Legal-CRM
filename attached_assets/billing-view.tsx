"use client"

import { useState } from "react"
import {
  CreditCard,
  Plus,
  Filter,
  Download,
  MoreHorizontal,
  FileText,
  DollarSign,
  Calendar,
  Clock,
  AlertCircle,
  Receipt,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
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

export function BillingView() {
  const [activeTab, setActiveTab] = useState("rate-cards")

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-purple-300">Billing Management</h1>
          <p className="text-muted-foreground">Manage client billing, invoices, and payments</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="mr-2 h-4 w-4" /> New Invoice
          </Button>
        </div>
      </div>

      <Tabs defaultValue="rate-cards" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList className="bg-background/60 border border-border">
          <TabsTrigger value="rate-cards">Rate Cards</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="rate-cards" className="space-y-6">
          <Card className="bg-background/60 backdrop-blur border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Client Rate Cards</CardTitle>
                  <CardDescription>Manage billing rates for clients</CardDescription>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="mr-2 h-4 w-4" /> New Rate Card
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={[
                  { header: "Rate Card ID", accessorKey: "id" },
                  { header: "Rate Card Name", accessorKey: "name" },
                  { header: "Client", accessorKey: "client" },
                  { header: "Contact", accessorKey: "contact" },
                  { header: "Description", accessorKey: "description" },
                  { header: "Hourly Rate", accessorKey: "hourlyRate" },
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
                          <DropdownMenuItem>Edit rate card</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate rate card</DropdownMenuItem>
                          <DropdownMenuItem>View client</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete rate card</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ),
                  },
                ]}
                data={[
                  {
                    id: "RC-1001",
                    name: "Standard Personal Injury",
                    client: "John Smith",
                    contact: "John Smith",
                    description: "Standard rate for personal injury cases",
                    hourlyRate: "$250.00",
                  },
                  {
                    id: "RC-1002",
                    name: "Corporate Client",
                    client: "ABC Corporation",
                    contact: "Jane Doe",
                    description: "Corporate client rate",
                    hourlyRate: "$350.00",
                  },
                  {
                    id: "RC-1003",
                    name: "Family Law Standard",
                    client: "Robert Johnson",
                    contact: "Robert Johnson",
                    description: "Standard rate for family law cases",
                    hourlyRate: "$275.00",
                  },
                  {
                    id: "RC-1004",
                    name: "Lemon Law Standard",
                    client: "Sarah Williams",
                    contact: "Sarah Williams",
                    description: "Standard rate for lemon law cases",
                    hourlyRate: "$225.00",
                  },
                  {
                    id: "RC-1005",
                    name: "Pro Bono",
                    client: "Michael Brown",
                    contact: "Michael Brown",
                    description: "Pro bono case",
                    hourlyRate: "$0.00",
                  },
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-background/60 backdrop-blur border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">For current month</p>
              </CardContent>
            </Card>

            <Card className="bg-background/60 backdrop-blur border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Paid Invoices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28</div>
                <p className="text-xs text-muted-foreground">$42,500.00</p>
              </CardContent>
            </Card>

            <Card className="bg-background/60 backdrop-blur border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">10</div>
                <p className="text-xs text-muted-foreground">$15,750.00</p>
              </CardContent>
            </Card>

            <Card className="bg-background/60 backdrop-blur border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Overdue Invoices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-500">4</div>
                <p className="text-xs text-muted-foreground">$6,200.00</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-background/60 backdrop-blur border-border">
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>Manage client invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={[
                  { header: "Invoice #", accessorKey: "id" },
                  { header: "Client", accessorKey: "client" },
                  { header: "Issue Date", accessorKey: "issueDate" },
                  { header: "Due Date", accessorKey: "dueDate" },
                  { header: "Amount", accessorKey: "amount" },
                  {
                    header: "Status",
                    accessorKey: "status",
                    cell: ({ row }) => {
                      const status = row.getValue("status") as string
                      return (
                        <Badge
                          className={
                            status === "Paid"
                              ? "bg-green-500/20 text-green-500"
                              : status === "Pending"
                                ? "bg-yellow-500/20 text-yellow-500"
                                : "bg-red-500/20 text-red-500"
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
                          <DropdownMenuItem>View invoice</DropdownMenuItem>
                          <DropdownMenuItem>Edit invoice</DropdownMenuItem>
                          <DropdownMenuItem>Download PDF</DropdownMenuItem>
                          <DropdownMenuItem>Send to client</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Mark as paid</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Void invoice</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ),
                  },
                ]}
                data={[
                  {
                    id: "INV-1001",
                    client: "John Smith",
                    issueDate: "2023-04-01",
                    dueDate: "2023-04-15",
                    amount: "$2,500.00",
                    status: "Paid",
                  },
                  {
                    id: "INV-1002",
                    client: "ABC Corporation",
                    issueDate: "2023-04-05",
                    dueDate: "2023-04-20",
                    amount: "$5,750.00",
                    status: "Pending",
                  },
                  {
                    id: "INV-1003",
                    client: "Robert Johnson",
                    issueDate: "2023-03-15",
                    dueDate: "2023-03-30",
                    amount: "$1,800.00",
                    status: "Overdue",
                  },
                  {
                    id: "INV-1004",
                    client: "Sarah Williams",
                    issueDate: "2023-04-10",
                    dueDate: "2023-04-25",
                    amount: "$3,200.00",
                    status: "Paid",
                  },
                  {
                    id: "INV-1005",
                    client: "Michael Brown",
                    issueDate: "2023-04-12",
                    dueDate: "2023-04-27",
                    amount: "$4,100.00",
                    status: "Pending",
                  },
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card className="bg-background/60 backdrop-blur border-border">
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Track client payments</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={[
                  { header: "Payment ID", accessorKey: "id" },
                  { header: "Invoice #", accessorKey: "invoiceId" },
                  { header: "Client", accessorKey: "client" },
                  { header: "Payment Date", accessorKey: "paymentDate" },
                  { header: "Amount", accessorKey: "amount" },
                  { header: "Payment Method", accessorKey: "paymentMethod" },
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
                              : status === "Processing"
                                ? "bg-blue-500/20 text-blue-500"
                                : "bg-red-500/20 text-red-500"
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
                          <DropdownMenuItem>View payment</DropdownMenuItem>
                          <DropdownMenuItem>View invoice</DropdownMenuItem>
                          <DropdownMenuItem>Send receipt</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Refund payment</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ),
                  },
                ]}
                data={[
                  {
                    id: "PMT-1001",
                    invoiceId: "INV-1001",
                    client: "John Smith",
                    paymentDate: "2023-04-12",
                    amount: "$2,500.00",
                    paymentMethod: "Credit Card",
                    status: "Completed",
                  },
                  {
                    id: "PMT-1002",
                    invoiceId: "INV-1004",
                    client: "Sarah Williams",
                    paymentDate: "2023-04-15",
                    amount: "$3,200.00",
                    paymentMethod: "Bank Transfer",
                    status: "Completed",
                  },
                  {
                    id: "PMT-1003",
                    invoiceId: "INV-1002",
                    client: "ABC Corporation",
                    paymentDate: "2023-04-18",
                    amount: "$2,000.00",
                    paymentMethod: "Check",
                    status: "Processing",
                  },
                  {
                    id: "PMT-1004",
                    invoiceId: "INV-1005",
                    client: "Michael Brown",
                    paymentDate: "2023-04-20",
                    amount: "$1,500.00",
                    paymentMethod: "Credit Card",
                    status: "Completed",
                  },
                  {
                    id: "PMT-1005",
                    invoiceId: "INV-1003",
                    client: "Robert Johnson",
                    paymentDate: "2023-04-05",
                    amount: "$500.00",
                    paymentMethod: "Cash",
                    status: "Completed",
                  },
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-background/60 backdrop-blur border-border">
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Configure accepted payment methods</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-purple-500" />
                      <span>Credit Card</span>
                    </div>
                    <Badge className="bg-green-500/20 text-green-500">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-purple-500" />
                      <span>Bank Transfer</span>
                    </div>
                    <Badge className="bg-green-500/20 text-green-500">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-purple-500" />
                      <span>Check</span>
                    </div>
                    <Badge className="bg-green-500/20 text-green-500">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-purple-500" />
                      <span>Cash</span>
                    </div>
                    <Badge className="bg-green-500/20 text-green-500">Enabled</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Configure Payment Methods
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-background/60 backdrop-blur border-border">
              <CardHeader>
                <CardTitle>Payment Terms</CardTitle>
                <CardDescription>Configure payment terms and conditions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-purple-500" />
                      <span>Net 15</span>
                    </div>
                    <Badge className="bg-purple-600">Default</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-purple-500" />
                      <span>Net 30</span>
                    </div>
                    <Badge className="bg-green-500/20 text-green-500">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-purple-500" />
                      <span>Due on Receipt</span>
                    </div>
                    <Badge className="bg-green-500/20 text-green-500">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-purple-500" />
                      <span>Custom Terms</span>
                    </div>
                    <Badge className="bg-green-500/20 text-green-500">Enabled</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Configure Payment Terms
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-background/60 backdrop-blur border-border">
              <CardHeader>
                <CardTitle>Invoice Settings</CardTitle>
                <CardDescription>Configure invoice templates and settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Default Template</span>
                    <span className="font-medium">Standard Legal</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Invoice Numbering</span>
                    <span className="font-medium">INV-{new Date().getFullYear()}-####</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Auto-send Invoices</span>
                    <span className="font-medium">Enabled</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Late Payment Reminders</span>
                    <span className="font-medium">Enabled</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Configure Invoice Settings
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-background/60 backdrop-blur border-border">
              <CardHeader>
                <CardTitle>Billing Methods</CardTitle>
                <CardDescription>Configure billing methods and schedules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-purple-500" />
                      <span>Hourly Billing</span>
                    </div>
                    <Badge className="bg-purple-600">Default</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Receipt className="h-5 w-5 text-purple-500" />
                      <span>Flat Fee</span>
                    </div>
                    <Badge className="bg-green-500/20 text-green-500">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-purple-500" />
                      <span>Retainer</span>
                    </div>
                    <Badge className="bg-green-500/20 text-green-500">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-purple-500" />
                      <span>Contingency</span>
                    </div>
                    <Badge className="bg-green-500/20 text-green-500">Enabled</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Configure Billing Methods
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
