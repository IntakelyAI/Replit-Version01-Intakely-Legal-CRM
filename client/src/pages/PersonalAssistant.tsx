import { useState } from "react";
import { Link } from "wouter";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardFooter, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, Users, Clock, Clock3, Briefcase, Phone, MessageSquare, BarChart, Calendar } from "lucide-react";
import { useChat } from "@/hooks/use-chat";

export default function PersonalAssistant() {
  const { messages, loading, sendMessage, inputValue, setInputValue } = useChat();
  const [activeTab, setActiveTab] = useState("tasks");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Ahmad's Personal Assistant</h1>
      </div>

      {/* Quote Card */}
      <Card className="bg-card/50 border-muted">
        <CardContent className="py-4">
          <blockquote className="italic text-sm">
            "Indeed, Allah will not change the condition of a people until they change what is in themselves."
          </blockquote>
          <p className="text-xs text-muted-foreground mt-1">— Quran 13:11</p>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/clients">
          <Card className="overflow-hidden border-l-2 border-transparent hover:border-primary transition-all hover:bg-accent/10 cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center mb-2">
                <Users className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm">Active Clients</span>
              </div>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">328</span>
                <span className="text-xs text-green-500 ml-2">+7.2% from last month</span>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/cases">
          <Card className="overflow-hidden border-l-2 border-transparent hover:border-primary transition-all hover:bg-accent/10 cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center mb-2">
                <Briefcase className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm">Ongoing Cases</span>
              </div>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">143</span>
                <span className="text-xs text-green-500 ml-2">+2.5% from last month</span>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/agent-builder/call-history">
          <Card className="overflow-hidden border-l-2 border-transparent hover:border-primary transition-all hover:bg-accent/10 cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center mb-2">
                <Phone className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm">AI Calls Made</span>
              </div>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">87</span>
                <span className="text-xs text-green-500 ml-2">+12.9% from last month</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="tasks" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="border-b w-full justify-start rounded-none bg-transparent border-border/30 gap-4 h-auto pb-0">
          <TabsTrigger 
            value="tasks" 
            className="rounded px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-foreground"
          >
            Tasks
          </TabsTrigger>
          <TabsTrigger 
            value="notifications" 
            className="rounded px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-foreground"
          >
            Notifications
          </TabsTrigger>
          <TabsTrigger 
            value="communications" 
            className="rounded px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-foreground"
          >
            Communications
          </TabsTrigger>
          <TabsTrigger 
            value="analytics" 
            className="rounded px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-foreground"
          >
            Analytics
          </TabsTrigger>
          <TabsTrigger 
            value="assistant" 
            className="rounded px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-foreground"
          >
            Personal Assistant
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="mt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tasks in Progress */}
            <Card>
              <CardHeader className="py-3 px-5">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-medium">Tasks in Progress</CardTitle>
                  <Button variant="ghost" size="icon" className="w-6 h-6">
                    <Clock className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription className="text-xs mt-0.5">
                  <span className="text-primary font-semibold">12</span> due today
                </CardDescription>
              </CardHeader>
              <CardContent className="px-5 pb-3 pt-0">
                <div className="space-y-3">
                  <div className="flex items-start justify-between group hover:bg-accent/30 rounded-md p-2 cursor-pointer border-l-2 border-transparent hover:border-primary transition-all">
                    <div className="flex items-start">
                      <div className="h-4 w-4 rounded-full bg-primary/20 flex-shrink-0 mt-0.5 mr-3 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Review agent call logs</h4>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">2:30 PM</span>
                  </div>
                  
                  <div className="flex items-start justify-between group hover:bg-accent/30 rounded-md p-2 cursor-pointer border-l-2 border-transparent hover:border-primary transition-all">
                    <div className="flex items-start">
                      <div className="h-4 w-4 rounded-full bg-primary/20 flex-shrink-0 mt-0.5 mr-3 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Onboard Johnson Legal Group</h4>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">4:00 PM</span>
                  </div>
                  
                  <div className="flex items-start justify-between group hover:bg-accent/30 rounded-md p-2 cursor-pointer border-l-2 border-transparent hover:border-primary transition-all">
                    <div className="flex items-start">
                      <div className="h-4 w-4 rounded-full bg-primary/20 flex-shrink-0 mt-0.5 mr-3 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Configure webhook settings</h4>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">Tomorrow</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Calls */}
            <Card>
              <CardHeader className="py-3 px-5">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-medium">Upcoming Calls</CardTitle>
                  <Button variant="ghost" size="icon" className="w-6 h-6">
                    <Clock3 className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription className="text-xs mt-0.5">
                  <span className="text-primary font-semibold">3</span> next call in 45 minutes
                </CardDescription>
              </CardHeader>
              <CardContent className="px-5 pb-3 pt-0">
                <div className="space-y-3">
                  <div className="flex items-start justify-between group hover:bg-accent/30 rounded-md p-2 cursor-pointer border-l-2 border-transparent hover:border-primary transition-all">
                    <div className="flex items-start">
                      <div className="h-4 w-4 rounded-full bg-primary/20 flex-shrink-0 mt-0.5 mr-3 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Smith & Associates</h4>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">11:30 AM</span>
                  </div>
                  
                  <div className="flex items-start justify-between group hover:bg-accent/30 rounded-md p-2 cursor-pointer border-l-2 border-transparent hover:border-primary transition-all">
                    <div className="flex items-start">
                      <div className="h-4 w-4 rounded-full bg-primary/20 flex-shrink-0 mt-0.5 mr-3 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Williams Law Partners</h4>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">2:00 PM</span>
                  </div>
                  
                  <div className="flex items-start justify-between group hover:bg-accent/30 rounded-md p-2 cursor-pointer border-l-2 border-transparent hover:border-primary transition-all">
                    <div className="flex items-start">
                      <div className="h-4 w-4 rounded-full bg-primary/20 flex-shrink-0 mt-0.5 mr-3 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Davis & Miller LLP</h4>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">Tomorrow</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Additional Tab Contents */}
        <TabsContent value="notifications" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Your notifications would appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communications" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Your communications history would appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Your analytics dashboard would appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assistant" className="mt-4">
          <Card className="flex flex-col h-[500px]">
            <CardHeader className="p-4 bg-primary/10 border-b">
              <div className="flex items-center">
                <Avatar className="h-9 w-9 mr-3 bg-primary text-primary-foreground">
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-base font-medium">LexAI Assistant</h3>
                  <p className="text-xs text-muted-foreground">Always available to help with your legal tasks</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 p-0 overflow-hidden">
              <ScrollArea className="h-full p-4">
                <div className="flex flex-col space-y-4">
                  {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                      <div className="mb-4 rounded-full bg-primary/10 p-4">
                        <Avatar className="h-10 w-10 bg-primary text-primary-foreground">
                          <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                      </div>
                      <h3 className="text-lg font-medium mb-2">Your Legal AI Assistant</h3>
                      <p className="text-muted-foreground text-sm max-w-md">
                        I can help you research case law, draft documents, analyze contracts, and more. 
                        Just start typing your question.
                      </p>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div 
                        key={message.id}
                        className={`flex items-start ${message.sender === 'assistant' ? 'justify-start' : 'justify-end'}`}
                      >
                        {message.sender === 'assistant' && (
                          <Avatar className="h-8 w-8 mr-3 bg-primary text-primary-foreground">
                            <AvatarFallback>AI</AvatarFallback>
                          </Avatar>
                        )}
                        
                        <div 
                          className={`py-3 px-4 rounded-lg shadow-sm max-w-[75%] ${
                            message.sender === 'assistant' 
                              ? 'bg-card text-card-foreground' 
                              : 'bg-primary text-primary-foreground'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-line">{message.content}</p>
                          <span className={`text-xs mt-1 block ${
                            message.sender === 'assistant'
                              ? 'text-muted-foreground'
                              : 'text-primary-foreground/75'
                          }`}>
                            {message.timestamp}
                          </span>
                        </div>
                        
                        {message.sender === 'user' && (
                          <Avatar className="h-8 w-8 ml-3 bg-muted text-muted-foreground">
                            <AvatarFallback>AH</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
            
            <CardFooter className="p-4 border-t">
              <form onSubmit={handleSubmit} className="flex items-center w-full">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={loading}
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  className="ml-2 bg-primary"
                  disabled={loading || !inputValue.trim()}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
