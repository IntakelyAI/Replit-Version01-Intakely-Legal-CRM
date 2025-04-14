import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, 
  Settings, 
  FileText, 
  Calendar, 
  MessageSquare, 
  Users, 
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

type Notification = {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'document' | 'meeting' | 'message' | 'client' | 'alert';
  read: boolean;
};

export default function Notifications() {
  // Mock notifications data
  const notifications: Notification[] = [
    {
      id: '1',
      title: 'Document Updated',
      description: 'The contract for Johnson case has been updated',
      time: '5 minutes ago',
      type: 'document',
      read: false
    },
    {
      id: '2',
      title: 'Meeting Reminder',
      description: 'You have a meeting with Smith & Associates at 11:30 AM',
      time: '30 minutes ago',
      type: 'meeting',
      read: false
    },
    {
      id: '3',
      title: 'New Message',
      description: 'Sarah Johnson sent you a message about the Williams case',
      time: '1 hour ago',
      type: 'message',
      read: false
    },
    {
      id: '4',
      title: 'Client Request',
      description: 'New client intake form submitted by Michael Davis',
      time: '2 hours ago',
      type: 'client',
      read: true
    },
    {
      id: '5',
      title: 'System Alert',
      description: 'AI assistant training completed. New skills available',
      time: '1 day ago',
      type: 'alert',
      read: true
    },
    {
      id: '6',
      title: 'Document Shared',
      description: 'Jessica Miller shared "Evidence Summary" with you',
      time: '2 days ago',
      type: 'document',
      read: true
    },
  ];

  // Filter notifications by read status
  const unreadNotifications = notifications.filter(n => !n.read);
  const readNotifications = notifications.filter(n => n.read);

  // Function to get the appropriate icon for notification type
  const getNotificationIcon = (type: Notification['type']) => {
    switch(type) {
      case 'document':
        return <FileText className="h-5 w-5 text-primary" />;
      case 'meeting':
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case 'message':
        return <MessageSquare className="h-5 w-5 text-green-500" />;
      case 'client':
        return <Users className="h-5 w-5 text-amber-500" />;
      case 'alert':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
    }
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Stay updated with important events and messages.
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Notification Settings
        </Button>
      </div>

      <Tabs defaultValue="all">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">
              All
              <Badge className="ml-2 bg-muted text-muted-foreground">{notifications.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              <Badge className="ml-2 bg-primary">{unreadNotifications.length}</Badge>
            </TabsTrigger>
          </TabsList>
          
          <Button variant="link" size="sm" className="text-primary">
            <CheckCircle className="h-4 w-4 mr-1" />
            Mark all as read
          </Button>
        </div>
        
        <Card>
          <TabsContent value="all" className="m-0">
            <ScrollArea className="h-[calc(100vh-15rem)]">
              <CardContent className="p-0">
                <ul className="divide-y divide-border">
                  {notifications.map((notification) => (
                    <li 
                      key={notification.id}
                      className={`p-4 hover:bg-muted/50 transition-colors ${!notification.read ? 'bg-primary/5' : ''}`}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between">
                            <p className={`text-sm font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {notification.title}
                            </p>
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                        </div>
                        {!notification.read && (
                          <div className="flex-shrink-0 ml-3">
                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="unread" className="m-0">
            <ScrollArea className="h-[calc(100vh-15rem)]">
              <CardContent className="p-0">
                {unreadNotifications.length > 0 ? (
                  <ul className="divide-y divide-border">
                    {unreadNotifications.map((notification) => (
                      <li 
                        key={notification.id}
                        className="p-4 hover:bg-muted/50 transition-colors bg-primary/5"
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="ml-4 flex-1">
                            <div className="flex justify-between">
                              <p className="text-sm font-medium">
                                {notification.title}
                              </p>
                              <span className="text-xs text-muted-foreground">{notification.time}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                          </div>
                          <div className="flex-shrink-0 ml-3">
                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="py-12 flex items-center justify-center">
                    <div className="text-center">
                      <CheckCircle className="h-10 w-10 text-primary mx-auto mb-2" />
                      <p className="text-muted-foreground">No unread notifications</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </ScrollArea>
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  );
}
