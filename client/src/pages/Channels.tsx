import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  PlusCircle, 
  Mail, 
  MessageSquare, 
  Phone, 
  Calendar, 
  FileText, 
  MessageCircle, 
  Send
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Channels() {
  // Mock channels data
  const channels = [
    { id: 1, name: 'General', type: 'chat', unread: 12 },
    { id: 2, name: 'Case Discussions', type: 'chat', unread: 5 },
    { id: 3, name: 'Document Reviews', type: 'chat', unread: 0 },
    { id: 4, name: 'Client Emails', type: 'email', unread: 8 },
    { id: 5, name: 'Call Recordings', type: 'call', unread: 2 },
    { id: 6, name: 'Calendar Events', type: 'calendar', unread: 0 },
  ];
  
  // Mock messages for the selected channel
  const messages = [
    { 
      id: 1, 
      sender: 'Sarah Johnson', 
      avatar: 'SJ', 
      content: 'Has anyone reviewed the latest brief for the Williams case?', 
      time: '10:42 AM' 
    },
    { 
      id: 2, 
      sender: 'Michael Davis', 
      avatar: 'MD', 
      content: 'I\'ve reviewed it. There are a few points that need clarification in section 3.', 
      time: '10:45 AM' 
    },
    { 
      id: 3, 
      sender: 'Jessica Miller', 
      avatar: 'JM', 
      content: 'I can clarify those points. Let\'s schedule a call later today.', 
      time: '10:52 AM' 
    },
    { 
      id: 4, 
      sender: 'Ahmad Hassan', 
      avatar: 'AH', 
      content: 'Sounds good. I\'ll set up a meeting for 3 PM. Does that work for everyone?', 
      time: '11:03 AM' 
    },
    { 
      id: 5, 
      sender: 'Sarah Johnson', 
      avatar: 'SJ', 
      content: 'Works for me. I\'ll prepare some notes beforehand.', 
      time: '11:08 AM' 
    },
  ];

  // Function to get the appropriate icon for the channel type
  const getChannelIcon = (type: string) => {
    switch(type) {
      case 'chat':
        return <MessageCircle className="h-4 w-4" />;
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'call':
        return <Phone className="h-4 w-4" />;
      case 'calendar':
        return <Calendar className="h-4 w-4" />;
      default:
        return <MessageCircle className="h-4 w-4" />;
    }
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Channels</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Collaborate with your team across different communication channels.
          </p>
        </div>
        <Button className="bg-primary">
          <PlusCircle className="h-4 w-4 mr-2" />
          New Channel
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card className="h-[calc(100vh-11rem)]">
            <CardHeader className="pb-2">
              <h3 className="font-medium">Your Channels</h3>
            </CardHeader>
            
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-15rem)]">
                <div className="divide-y divide-border">
                  {channels.map((channel) => (
                    <div 
                      key={channel.id} 
                      className="p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center mr-3 text-primary">
                            {getChannelIcon(channel.type)}
                          </div>
                          <span className="font-medium text-sm">{channel.name}</span>
                        </div>
                        {channel.unread > 0 && (
                          <Badge className="bg-primary">{channel.unread}</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-3">
          <Card className="h-[calc(100vh-11rem)]">
            <CardHeader className="p-4 border-b flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center mr-3 text-primary">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">General</h3>
                  <p className="text-xs text-muted-foreground">5 members</p>
                </div>
              </div>
              
              <Tabs defaultValue="chat">
                <TabsList>
                  <TabsTrigger value="chat">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Chat
                  </TabsTrigger>
                  <TabsTrigger value="files">
                    <FileText className="h-4 w-4 mr-1" />
                    Files
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            
            <CardContent className="p-0 flex flex-col h-[calc(100vh-17.5rem)]">
              <TabsContent value="chat" className="flex-1 overflow-hidden m-0">
                <ScrollArea className="h-full p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className="flex items-start">
                        <Avatar className="h-8 w-8 mr-3">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {message.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center">
                            <p className="font-medium text-sm">{message.sender}</p>
                            <span className="text-xs text-muted-foreground ml-2">{message.time}</span>
                          </div>
                          <p className="text-sm mt-1">{message.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="files" className="flex-1 overflow-hidden m-0">
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No files have been shared in this channel yet</p>
                  </div>
                </div>
              </TabsContent>
              
              <div className="p-4 border-t">
                <div className="flex items-center">
                  <Input
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button className="ml-2 bg-primary" size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
