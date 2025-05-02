import { useState } from "react";
import { BookOpen, Plus, Search, Filter, Upload, FileText, FolderOpen, Tags, Clock, MoreHorizontal, Download, Trash2, Edit, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import AIAssistantChat from "@/components/shared/ai-assistant-chat";

// Knowledge base data
const knowledgeBases = [
  {
    id: 1,
    name: "Legal Precedents",
    description: "Case law and legal precedents organized by practice area",
    articles: 156,
    lastUpdated: "2 days ago",
    tags: ["Case Law", "Precedents", "Legal Research"],
    type: "Reference",
  },
  {
    id: 2,
    name: "Client Intake Procedures",
    description: "Standard operating procedures for client intake and onboarding",
    articles: 45,
    lastUpdated: "1 week ago",
    tags: ["Intake", "Procedures", "Onboarding"],
    type: "Procedure",
  },
  {
    id: 3,
    name: "Tax Law Updates",
    description: "Recent changes to tax laws and regulations",
    articles: 67,
    lastUpdated: "3 days ago",
    tags: ["Tax Law", "Updates", "Regulations"],
    type: "Reference",
  },
  {
    id: 4,
    name: "Document Templates",
    description: "Standard legal document templates by case type",
    articles: 92,
    lastUpdated: "5 days ago",
    tags: ["Templates", "Documents", "Forms"],
    type: "Template",
  },
  {
    id: 5,
    name: "Call Scripts",
    description: "Scripts for AI agents handling different call scenarios",
    articles: 38,
    lastUpdated: "Yesterday",
    tags: ["Scripts", "Call Center", "AI Training"],
    type: "Script",
  },
  {
    id: 6,
    name: "FAQ Database",
    description: "Frequently asked questions from clients by practice area",
    articles: 215,
    lastUpdated: "4 days ago",
    tags: ["FAQ", "Client Questions", "Knowledge"],
    type: "Reference",
  },
];

// Recent articles data
const recentArticles = [
  {
    id: "ART-1001",
    title: "Recent Changes to Family Law Statutes",
    knowledgeBase: "Legal Precedents",
    author: "Ahmad Hassan",
    updatedAt: "Nov 28, 2023",
    status: "Published",
  },
  {
    id: "ART-1002",
    title: "Tax Implications for Trust Accounts",
    knowledgeBase: "Tax Law Updates",
    author: "Maria Rodriguez",
    updatedAt: "Nov 26, 2023",
    status: "Published",
  },
  {
    id: "ART-1003",
    title: "Client Qualification Script for Personal Injury",
    knowledgeBase: "Call Scripts",
    author: "David Chen",
    updatedAt: "Nov 25, 2023",
    status: "Draft",
  },
  {
    id: "ART-1004",
    title: "Standard Settlement Agreement Template",
    knowledgeBase: "Document Templates",
    author: "Sarah Johnson",
    updatedAt: "Nov 24, 2023",
    status: "Published",
  },
  {
    id: "ART-1005",
    title: "Initial Client Meeting Procedure",
    knowledgeBase: "Client Intake Procedures",
    author: "Michael Brown",
    updatedAt: "Nov 23, 2023",
    status: "Review",
  },
];

// Sample chat messages for the AI Assistant
const initialChatMessages = [
  {
    id: "1",
    content: "Hello! I'm your Knowledge Base assistant. How can I help you manage your legal knowledge today?",
    role: "assistant" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
];

export default function KnowledgeBase() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredKnowledgeBases = knowledgeBases.filter(kb => 
    kb.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    kb.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    kb.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredArticles = recentArticles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.knowledgeBase.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Published":
        return <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">{status}</Badge>;
      case "Draft":
        return <Badge className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">{status}</Badge>;
      case "Review":
        return <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Reference":
        return <BookOpen className="h-5 w-5 text-primary" />;
      case "Procedure":
        return <FileText className="h-5 w-5 text-primary" />;
      case "Template":
        return <FileText className="h-5 w-5 text-primary" />;
      case "Script":
        return <FileText className="h-5 w-5 text-primary" />;
      default:
        return <BookOpen className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <div className="grid gap-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Knowledge Base</h1>
          <p className="mt-1 text-muted-foreground">Manage and organize your legal knowledge for AI agents.</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Knowledge Base
          </Button>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
        </div>
      </div>
      
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search knowledge bases..." 
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
      
      {/* Knowledge Base Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Knowledge Bases</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{knowledgeBases.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{knowledgeBases.reduce((total, kb) => total + kb.articles, 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Tags className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Today</div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Knowledge Bases</TabsTrigger>
          <TabsTrigger value="recent">Recent Articles</TabsTrigger>
          <TabsTrigger value="references">References</TabsTrigger>
          <TabsTrigger value="procedures">Procedures</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredKnowledgeBases.map((kb) => (
              <Card key={kb.id} className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {getTypeIcon(kb.type)}
                        {kb.name}
                      </CardTitle>
                      <CardDescription className="mt-1">{kb.description}</CardDescription>
                    </div>
                    <Badge variant="outline">{kb.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Articles</p>
                        <p>{kb.articles}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Last Updated</p>
                        <p>{kb.lastUpdated}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {kb.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">View</Button>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Articles</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Knowledge Base</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredArticles.map((article) => (
                    <TableRow key={article.id}>
                      <TableCell className="font-medium">{article.id}</TableCell>
                      <TableCell>{article.title}</TableCell>
                      <TableCell>{article.knowledgeBase}</TableCell>
                      <TableCell>{article.author}</TableCell>
                      <TableCell>{article.updatedAt}</TableCell>
                      <TableCell>{getStatusBadge(article.status)}</TableCell>
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
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ExternalLink className="mr-2 h-4 w-4" />
                              <span>View</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              <span>Download</span>
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
        
        <TabsContent value="references" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredKnowledgeBases
              .filter((kb) => kb.type === "Reference")
              .map((kb) => (
                <Card key={kb.id} className="overflow-hidden transition-all hover:shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-primary" />
                          {kb.name}
                        </CardTitle>
                        <CardDescription className="mt-1">{kb.description}</CardDescription>
                      </div>
                      <Badge variant="outline">{kb.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Articles</p>
                          <p>{kb.articles}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Last Updated</p>
                          <p>{kb.lastUpdated}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {kb.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="outline" size="sm">Manage</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="procedures" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredKnowledgeBases
              .filter((kb) => kb.type === "Procedure")
              .map((kb) => (
                <Card key={kb.id} className="overflow-hidden transition-all hover:shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <FileText className="h-5 w-5 text-primary" />
                          {kb.name}
                        </CardTitle>
                        <CardDescription className="mt-1">{kb.description}</CardDescription>
                      </div>
                      <Badge variant="outline">{kb.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Articles</p>
                          <p>{kb.articles}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Last Updated</p>
                          <p>{kb.lastUpdated}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {kb.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="outline" size="sm">Manage</Button>
                      </div>
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
          title="Knowledge Base Assistant"
          heightClass="h-[300px]"
        />
      </div>
    </div>
  );
}
