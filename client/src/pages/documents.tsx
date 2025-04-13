import { useState } from "react";
import { FileText, Upload, FolderOpen, Search, Filter, Plus, Star, MoreHorizontal, Download, Trash2, FileIcon, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import AIAssistantChat from "@/components/shared/ai-assistant-chat";

// Document data
const documents = [
  {
    id: "DOC-1001",
    name: "Settlement Agreement - Johnson v. Smith.pdf",
    type: "PDF",
    size: "2.4 MB",
    case: "Johnson v. Smith",
    author: "Ahmad Hassan",
    uploadedAt: "Nov 28, 2023",
    lastModified: "Dec 1, 2023",
    starred: true,
  },
  {
    id: "DOC-1002",
    name: "Client Statement - Martinez Family Trust.docx",
    type: "DOCX",
    size: "1.8 MB",
    case: "Martinez Family Trust",
    author: "Maria Rodriguez",
    uploadedAt: "Nov 24, 2023",
    lastModified: "Nov 24, 2023",
    starred: false,
  },
  {
    id: "DOC-1003",
    name: "Evidence Summary - Chen v. Acme Corp.xlsx",
    type: "XLSX",
    size: "3.2 MB",
    case: "Chen v. Acme Corp",
    author: "David Chen",
    uploadedAt: "Nov 20, 2023",
    lastModified: "Nov 22, 2023",
    starred: false,
  },
  {
    id: "DOC-1004",
    name: "Court Filing - Johnson Divorce.pdf",
    type: "PDF",
    size: "5.1 MB",
    case: "Johnson Divorce",
    author: "Sarah Johnson",
    uploadedAt: "Nov 18, 2023",
    lastModified: "Nov 18, 2023",
    starred: true,
  },
  {
    id: "DOC-1005",
    name: "Property Survey - Brown Property Dispute.pdf",
    type: "PDF",
    size: "8.7 MB",
    case: "Brown Property Dispute",
    author: "Michael Brown",
    uploadedAt: "Nov 15, 2023",
    lastModified: "Nov 16, 2023",
    starred: false,
  },
  {
    id: "DOC-1006",
    name: "Police Report - Lee v. City of Metro.pdf",
    type: "PDF",
    size: "1.2 MB",
    case: "Lee v. City of Metro",
    author: "Jennifer Lee",
    uploadedAt: "Nov 10, 2023",
    lastModified: "Nov 10, 2023",
    starred: false,
  },
  {
    id: "DOC-1007",
    name: "Articles of Incorporation - Thompson Business.docx",
    type: "DOCX",
    size: "1.5 MB",
    case: "Thompson Business Formation",
    author: "Robert Thompson",
    uploadedAt: "Nov 5, 2023",
    lastModified: "Nov 8, 2023",
    starred: true,
  },
];

// Document folders
const folders = [
  {
    id: 1,
    name: "Case Documents",
    files: 45,
    updatedAt: "Dec 2, 2023",
  },
  {
    id: 2,
    name: "Client Intake Forms",
    files: 23,
    updatedAt: "Nov 30, 2023",
  },
  {
    id: 3,
    name: "Legal Research",
    files: 18,
    updatedAt: "Nov 25, 2023",
  },
  {
    id: 4,
    name: "Templates",
    files: 12,
    updatedAt: "Nov 20, 2023",
  },
];

// Recent activity
const recentActivity = [
  {
    id: 1,
    action: "Uploaded",
    document: "Settlement Agreement - Johnson v. Smith.pdf",
    user: "Ahmad Hassan",
    timestamp: "2 days ago",
  },
  {
    id: 2,
    action: "Modified",
    document: "Evidence Summary - Chen v. Acme Corp.xlsx",
    user: "Maria Rodriguez",
    timestamp: "4 days ago",
  },
  {
    id: 3,
    action: "Downloaded",
    document: "Court Filing - Johnson Divorce.pdf",
    user: "Sarah Johnson",
    timestamp: "1 week ago",
  },
];

// Sample chat messages for the AI Assistant
const initialChatMessages = [
  {
    id: "1",
    content: "Hello! How can I help you manage your documents today?",
    role: "assistant" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
];

export default function Documents() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredDocuments = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.case.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="grid gap-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
          <p className="mt-1 text-muted-foreground">Manage all your legal documents and files.</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Document
          </Button>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
        </div>
      </div>
      
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search documents..." 
            className="pl-10" 
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </Button>
      </div>
      
      {/* Document Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">All Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documents.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Folders</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{folders.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Recent Uploads</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45.3 GB</div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Files</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="starred">Starred</TabsTrigger>
          <TabsTrigger value="folders">Folders</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12"></TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Case</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Uploaded</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={() => {
                            // Toggle star status
                          }}
                        >
                          <Star 
                            className={`h-4 w-4 ${doc.starred ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} 
                          />
                          <span className="sr-only">Star</span>
                        </Button>
                      </TableCell>
                      <TableCell className="font-medium flex items-center gap-2">
                        <FileIcon className="h-4 w-4 text-primary" />
                        {doc.name}
                      </TableCell>
                      <TableCell>{doc.case}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{doc.type}</Badge>
                      </TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell>{doc.uploadedAt}</TableCell>
                      <TableCell>{doc.author}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              <span>Download</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share className="mr-2 h-4 w-4" />
                              <span>Share</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Case</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments
                    .sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime())
                    .slice(0, 5)
                    .map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium flex items-center gap-2">
                          <FileIcon className="h-4 w-4 text-primary" />
                          {doc.name}
                        </TableCell>
                        <TableCell>{doc.case}</TableCell>
                        <TableCell>{doc.lastModified}</TableCell>
                        <TableCell>{doc.author}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                <span>Download</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share className="mr-2 h-4 w-4" />
                                <span>Share</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="starred" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Starred Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Case</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Uploaded</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments
                    .filter(doc => doc.starred)
                    .map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium flex items-center gap-2">
                          <FileIcon className="h-4 w-4 text-primary" />
                          {doc.name}
                        </TableCell>
                        <TableCell>{doc.case}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{doc.type}</Badge>
                        </TableCell>
                        <TableCell>{doc.uploadedAt}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                <span>Download</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share className="mr-2 h-4 w-4" />
                                <span>Share</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="folders" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {folders.map((folder) => (
              <Card key={folder.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <FolderOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">{folder.name}</h3>
                        <p className="text-sm text-muted-foreground">{folder.files} files</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <FolderOpen className="mr-2 h-4 w-4" />
                          <span>Open</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share className="mr-2 h-4 w-4" />
                          <span>Share</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="mt-4 text-xs text-muted-foreground">
                    Updated {folder.updatedAt}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* AI Assistant */}
      <div className="hidden lg:block">
        <AIAssistantChat 
          initialMessages={initialChatMessages} 
          title="Document Management Assistant"
          heightClass="h-[300px]"
        />
      </div>
    </div>
  );
}
