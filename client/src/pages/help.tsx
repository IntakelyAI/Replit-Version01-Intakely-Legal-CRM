import { useState } from "react";
import { HelpCircle, Search, Bookmark, Mail, Phone, MessageSquare, FileText, ArrowRight, ChevronDown, ExternalLink, ThumbsUp, ThumbsDown, Bot } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AIAssistantChat from "@/components/shared/ai-assistant-chat";

// Sample chat messages for the AI Assistant
const initialChatMessages = [
  {
    id: "1",
    content: "Hello! I'm your support assistant. How can I help you today?",
    role: "assistant" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
];

// Help categories and articles
const helpCategories = [
  {
    id: "getting-started",
    name: "Getting Started",
    icon: <FileText className="h-5 w-5 text-primary" />,
    articles: [
      { id: "gs-1", title: "Creating your account", views: 1245 },
      { id: "gs-2", title: "Navigating the dashboard", views: 982 },
      { id: "gs-3", title: "Understanding your first report", views: 764 },
      { id: "gs-4", title: "Setting up your law firm profile", views: 651 },
    ],
  },
  {
    id: "ai-agents",
    name: "AI Agents",
    icon: <Bot className="h-5 w-5 text-primary" />,
    articles: [
      { id: "ai-1", title: "Creating your first AI agent", views: 1562 },
      { id: "ai-2", title: "Training with custom data", views: 1324 },
      { id: "ai-3", title: "Setting up call forwarding", views: 893 },
      { id: "ai-4", title: "Monitoring agent performance", views: 742 },
    ],
  },
  {
    id: "law-firm-management",
    name: "Law Firm Management",
    icon: <FileText className="h-5 w-5 text-primary" />,
    articles: [
      { id: "lfm-1", title: "Adding attorneys and staff", views: 876 },
      { id: "lfm-2", title: "Managing client information", views: 754 },
      { id: "lfm-3", title: "Document management system", views: 683 },
      { id: "lfm-4", title: "Billing and invoicing", views: 598 },
    ],
  },
  {
    id: "knowledge-base",
    name: "Knowledge Base",
    icon: <FileText className="h-5 w-5 text-primary" />,
    articles: [
      { id: "kb-1", title: "Creating knowledge base articles", views: 943 },
      { id: "kb-2", title: "Importing existing documents", views: 812 },
      { id: "kb-3", title: "Organizing knowledge by categories", views: 731 },
      { id: "kb-4", title: "Using knowledge in AI agents", views: 689 },
    ],
  },
  {
    id: "account-billing",
    name: "Account & Billing",
    icon: <FileText className="h-5 w-5 text-primary" />,
    articles: [
      { id: "ab-1", title: "Managing your subscription", views: 1021 },
      { id: "ab-2", title: "Billing history and invoices", views: 843 },
      { id: "ab-3", title: "Payment methods", views: 765 },
      { id: "ab-4", title: "Upgrading your plan", views: 692 },
    ],
  },
];

// FAQs data
const faqs = [
  {
    question: "How do I create my first AI agent?",
    answer: "To create your first AI agent, navigate to the Agent Builder section from the sidebar. Click the 'Create New Agent' button and follow the step-by-step wizard. You'll need to provide a name, description, and select the type of agent you want to create. You can then customize the agent's knowledge base, voice, and behavior settings."
  },
  {
    question: "How can I integrate LexAI with my existing practice management software?",
    answer: "LexAI offers integrations with popular legal practice management software including Clio, Rocket Matter, and PracticePanther. Go to Settings > Integrations to connect your accounts. We also provide an API for custom integrations. For detailed instructions, check out our integration guides in the documentation section."
  },
  {
    question: "What happens if an AI agent can't answer a client's question?",
    answer: "When an AI agent encounters a question it can't answer confidently, it will follow your configured fallback protocol. By default, it will acknowledge the limitations, offer to take a message, and notify a human team member for follow-up. You can customize this behavior in the Agent Builder settings."
  },
  {
    question: "How secure is client data in LexAI?",
    answer: "LexAI takes data security seriously. All data is encrypted both in transit and at rest using industry-standard encryption. We comply with legal industry requirements including attorney-client privilege considerations. Client data is never used to train public AI models. For more details, please review our Security & Compliance documentation."
  },
  {
    question: "Can I customize the AI's voice and tone?",
    answer: "Yes, you can fully customize your AI agent's voice and tone. In the Agent Builder, go to the 'Voice & Personality' section where you can select from different voice options, adjust speaking rate and pitch, and define the agent's communication style, from formal to conversational."
  },
  {
    question: "How are AI calls billed?",
    answer: "AI calls are billed based on your subscription plan. Basic plans include a set number of minutes per month, with additional minutes billed at the standard rate. Enterprise plans offer custom pricing based on volume. You can view your usage and billing details in the Analytics section and adjust your plan in Account Settings."
  },
];

export default function Help() {
  const [searchTerm, setSearchTerm] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<Record<string, boolean>>({});
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleFeedback = (articleId: string, isHelpful: boolean) => {
    // In a real app, this would send feedback to the server
    console.log(`Article ${articleId} feedback: ${isHelpful ? 'helpful' : 'not helpful'}`);
    setFeedbackSubmitted(prev => ({ ...prev, [articleId]: true }));
  };

  return (
    <div className="grid gap-6">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
        <p className="mt-1 text-muted-foreground">Find answers to common questions and get assistance with LexAI.</p>
      </div>
      
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input 
          placeholder="Search for help articles, guides, and FAQs..." 
          className="pl-10 py-6 text-lg"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      
      <Tabs defaultValue="help-center" className="space-y-4">
        <TabsList>
          <TabsTrigger value="help-center">Help Center</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
        </TabsList>
        
        <TabsContent value="help-center" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {helpCategories.map((category) => (
              <Card key={category.id} className="transition-all hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    {category.icon}
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.articles
                      .filter(article => 
                        searchTerm === "" || 
                        article.title.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((article) => (
                        <li key={article.id}>
                          <a 
                            href={`#${article.id}`} 
                            className="flex items-center justify-between text-sm hover:underline"
                          >
                            <span className="flex items-center gap-1">
                              <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                              {article.title}
                            </span>
                            <span className="text-xs text-muted-foreground">{article.views} views</span>
                          </a>
                        </li>
                      ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full justify-between" size="sm">
                    View All Articles
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Popular Articles</CardTitle>
              <CardDescription>Our most read help articles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <h3 className="text-lg font-medium">Creating your first AI agent</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Learn how to set up and configure your first AI agent for client intake calls. This guide covers the basics of agent creation, training, and customization.
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">AI Agents</Badge>
                      <span className="text-xs text-muted-foreground">5 min read</span>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Bookmark className="h-4 w-4" />
                      <span>Save</span>
                    </Button>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">Was this article helpful?</div>
                    {!feedbackSubmitted['ai-1'] ? (
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-1"
                          onClick={() => handleFeedback('ai-1', true)}
                        >
                          <ThumbsUp className="h-3.5 w-3.5" />
                          <span>Yes</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-1"
                          onClick={() => handleFeedback('ai-1', false)}
                        >
                          <ThumbsDown className="h-3.5 w-3.5" />
                          <span>No</span>
                        </Button>
                      </div>
                    ) : (
                      <div className="text-sm text-primary">Thank you for your feedback!</div>
                    )}
                  </div>
                </div>
                
                <div className="rounded-md border p-4">
                  <h3 className="text-lg font-medium">Setting up call forwarding</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Configure your AI agents to handle initial client calls and forward qualified leads to your attorneys. This guide explains how to set up call routing rules.
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">AI Agents</Badge>
                      <span className="text-xs text-muted-foreground">4 min read</span>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Bookmark className="h-4 w-4" />
                      <span>Save</span>
                    </Button>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">Was this article helpful?</div>
                    {!feedbackSubmitted['ai-3'] ? (
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-1"
                          onClick={() => handleFeedback('ai-3', true)}
                        >
                          <ThumbsUp className="h-3.5 w-3.5" />
                          <span>Yes</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-1"
                          onClick={() => handleFeedback('ai-3', false)}
                        >
                          <ThumbsDown className="h-3.5 w-3.5" />
                          <span>No</span>
                        </Button>
                      </div>
                    ) : (
                      <div className="text-sm text-primary">Thank you for your feedback!</div>
                    )}
                  </div>
                </div>
                
                <div className="rounded-md border p-4">
                  <h3 className="text-lg font-medium">Managing your subscription</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Learn how to manage your LexAI subscription, including upgrading, downgrading, and adding additional features or users to your plan.
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Account & Billing</Badge>
                      <span className="text-xs text-muted-foreground">3 min read</span>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Bookmark className="h-4 w-4" />
                      <span>Save</span>
                    </Button>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">Was this article helpful?</div>
                    {!feedbackSubmitted['ab-1'] ? (
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-1"
                          onClick={() => handleFeedback('ab-1', true)}
                        >
                          <ThumbsUp className="h-3.5 w-3.5" />
                          <span>Yes</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-1"
                          onClick={() => handleFeedback('ab-1', false)}
                        >
                          <ThumbsDown className="h-3.5 w-3.5" />
                          <span>No</span>
                        </Button>
                      </div>
                    ) : (
                      <div className="text-sm text-primary">Thank you for your feedback!</div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="faqs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Quick answers to common questions</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.filter(faq => 
                  searchTerm === "" || 
                  faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
                ).map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              
              <div className="mt-6 rounded-md bg-accent/50 p-4">
                <div className="flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Can't find what you're looking for?</h4>
                    <p className="text-sm mt-1 text-muted-foreground">
                      Our support team is ready to help. Contact us through the form in the Contact Support tab.
                    </p>
                    <Button variant="outline" className="mt-3 gap-2">
                      <MessageSquare className="h-4 w-4" />
                      <span>Contact Support</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documentation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Documentation</CardTitle>
              <CardDescription>Technical guides and API documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-md border p-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-medium">API Reference</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Complete API documentation for integrating with LexAI services, including authentication, endpoints, and response formats.
                  </p>
                  <Button className="mt-4 gap-2" variant="outline">
                    <span>View Documentation</span>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="rounded-md border p-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-medium">Integration Guides</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Step-by-step guides for integrating LexAI with popular legal practice management software, CRMs, and communication tools.
                  </p>
                  <Button className="mt-4 gap-2" variant="outline">
                    <span>View Guides</span>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="rounded-md border p-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-medium">Security & Compliance</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Detailed information about LexAI's security practices, data privacy measures, and compliance with legal industry regulations.
                  </p>
                  <Button className="mt-4 gap-2" variant="outline">
                    <span>View Documentation</span>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="rounded-md border p-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-medium">Webhooks</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Learn how to use LexAI webhooks to receive real-time notifications for events like call completions, lead qualifications, and more.
                  </p>
                  <Button className="mt-4 gap-2" variant="outline">
                    <span>View Documentation</span>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Developer Resources</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>Getting Started with the API</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>Webhook Reference Guide</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>AI Agent Customization API</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>Authentication & Security</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between pb-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>Sample Code & SDKs</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contact" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-center">Chat Support</CardTitle>
                <CardDescription className="text-center">Chat with our support team</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Our chat support team is available 24/7 to assist you with any questions or issues.
                </p>
                <Button className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>Start Chat</span>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center justify-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-center">Email Support</CardTitle>
                <CardDescription className="text-center">Send us an email</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Email our support team for detailed assistance. We respond within 24 hours.
                </p>
                <Button variant="outline" className="gap-2">
                  <Mail className="h-4 w-4" />
                  <span>support@lexai.com</span>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center justify-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-center">Phone Support</CardTitle>
                <CardDescription className="text-center">Call our support line</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Available Monday to Friday, 9AM to 6PM EST for urgent inquiries.
                </p>
                <Button variant="outline" className="gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+1 (800) 555-0123</span>
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Submit a support request and we'll get back to you as soon as possible</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Full Name
                    </label>
                    <Input id="name" placeholder="John Smith" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Email Address
                    </label>
                    <Input id="email" type="email" placeholder="john.smith@example.com" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Subject
                  </label>
                  <Input id="subject" placeholder="Help with AI agent configuration" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Category
                  </label>
                  <select
                    id="category"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="technical">Technical Issue</option>
                    <option value="billing">Billing Question</option>
                    <option value="feature">Feature Request</option>
                    <option value="account">Account Management</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Please describe your issue in detail..."
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  ></textarea>
                </div>
                
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="attach-logs"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="attach-logs" className="text-sm text-muted-foreground">
                    Automatically attach system logs to help diagnose the issue
                  </label>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Submit Support Request</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Support Team */}
      <Card className="border-primary/30 mt-2">
        <CardHeader>
          <CardTitle>Support Team</CardTitle>
          <CardDescription>Our dedicated team is ready to help you</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-20 w-20 mb-2">
                <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" alt="Sarah" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <div className="font-medium">Sarah Johnson</div>
              <div className="text-sm text-muted-foreground">Support Lead</div>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-20 w-20 mb-2">
                <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" alt="Michael" />
                <AvatarFallback>MB</AvatarFallback>
              </Avatar>
              <div className="font-medium">Michael Brown</div>
              <div className="text-sm text-muted-foreground">Technical Support</div>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-20 w-20 mb-2">
                <AvatarImage src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" alt="Emily" />
                <AvatarFallback>EC</AvatarFallback>
              </Avatar>
              <div className="font-medium">Emily Chen</div>
              <div className="text-sm text-muted-foreground">Customer Success</div>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-20 w-20 mb-2">
                <AvatarImage src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" alt="David" />
                <AvatarFallback>DL</AvatarFallback>
              </Avatar>
              <div className="font-medium">David Lee</div>
              <div className="text-sm text-muted-foreground">Billing Support</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* AI Assistant */}
      <div className="hidden lg:block">
        <AIAssistantChat 
          initialMessages={initialChatMessages} 
          title="Support Assistant"
          heightClass="h-[300px]"
        />
      </div>
    </div>
  );
}
