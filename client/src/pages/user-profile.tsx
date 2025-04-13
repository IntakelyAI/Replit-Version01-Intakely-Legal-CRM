import { useState } from "react";
import { User, Mail, Phone, Building, Shield, Key, Save, Camera, Trash } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import AIAssistantChat from "@/components/shared/ai-assistant-chat";

// User profile data (in a real app, this would come from an API)
const userProfile = {
  name: "Ahmad Hassan",
  email: "ahmad.hassan@example.com",
  phone: "+1 (555) 123-4567",
  role: "Legal Tech Admin",
  organization: "LexAI Solutions",
  createdAt: "June 2022",
  avatar: "",
  bio: "Experienced legal technology administrator with a focus on AI implementation in legal practices. Passionate about optimizing workflows and enhancing client experiences through technology.",
};

// Sample chat messages for the AI Assistant
const initialChatMessages = [
  {
    id: "1",
    content: "Hello! I'm your profile assistant. How can I help you update your information today?",
    role: "assistant" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
];

export default function UserProfile() {
  const [profile, setProfile] = useState({ ...userProfile });
  const [isEditing, setIsEditing] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSaveProfile = () => {
    // In a real app, this would make an API call to save the profile
    setIsEditing(false);
    // Show success message
  };

  return (
    <div className="grid gap-6">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Profile</h1>
        <p className="mt-1 text-muted-foreground">Manage your personal information and account settings.</p>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {/* Profile Card */}
            <Card className="md:col-span-1">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4 relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profile.avatar} alt={profile.name} />
                    <AvatarFallback className="text-2xl">
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="absolute bottom-0 right-0 rounded-full"
                    >
                      <Camera className="h-4 w-4" />
                      <span className="sr-only">Upload photo</span>
                    </Button>
                  )}
                </div>
                <CardTitle>{profile.name}</CardTitle>
                <CardDescription>{profile.role}</CardDescription>
                <div className="flex justify-center mt-2">
                  <Badge variant="outline">{profile.organization}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{profile.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span>{profile.organization}</span>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">About</h4>
                  <p className="text-sm text-muted-foreground">{profile.bio}</p>
                </div>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Account Info</h4>
                  <div className="text-sm text-muted-foreground">
                    <div>Member since: {profile.createdAt}</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  variant={isEditing ? "outline" : "default"}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
              </CardFooter>
            </Card>
            
            {/* Edit Profile Form */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={profile.name} 
                      onChange={handleInputChange} 
                      disabled={!isEditing} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Job Title</Label>
                    <Input 
                      id="role" 
                      name="role" 
                      value={profile.role} 
                      onChange={handleInputChange} 
                      disabled={!isEditing} 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={profile.email} 
                      onChange={handleInputChange} 
                      disabled={!isEditing} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={profile.phone} 
                      onChange={handleInputChange} 
                      disabled={!isEditing} 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organization">Organization</Label>
                  <Input 
                    id="organization" 
                    name="organization" 
                    value={profile.organization} 
                    onChange={handleInputChange} 
                    disabled={!isEditing} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    name="bio" 
                    value={profile.bio} 
                    onChange={handleInputChange} 
                    disabled={!isEditing} 
                    rows={4} 
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                {isEditing && (
                  <Button onClick={handleSaveProfile} className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
          
          {/* AI Assistant */}
          <div className="hidden lg:block">
            <AIAssistantChat 
              initialMessages={initialChatMessages} 
              title="Profile Assistant"
              heightClass="h-[300px]"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security and authentication options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Password</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div></div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button className="gap-2">
                    <Key className="h-4 w-4" />
                    Update Password
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Two-Factor Authentication</div>
                    <div className="text-sm text-muted-foreground">Add an extra layer of security to your account</div>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Login Sessions</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-0.5">
                      <div className="font-medium">Current Session</div>
                      <div className="text-sm text-muted-foreground">New York, USA • Chrome on Windows</div>
                      <div className="text-xs text-muted-foreground">Started 2 hours ago</div>
                    </div>
                    <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Active</Badge>
                  </div>
                  <div className="flex justify-between items-start">
                    <div className="space-y-0.5">
                      <div className="font-medium">Mobile Session</div>
                      <div className="text-sm text-muted-foreground">New York, USA • LexAI Mobile App</div>
                      <div className="text-xs text-muted-foreground">Started 1 day ago</div>
                    </div>
                    <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Active</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>Irreversible and destructive actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="space-y-0.5">
                  <div className="font-medium">Delete Account</div>
                  <div className="text-sm text-muted-foreground">Permanently delete your account and all data</div>
                </div>
                <Button variant="destructive" className="gap-2">
                  <Trash className="h-4 w-4" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-calls">Call Notifications</Label>
                      <div className="text-sm text-muted-foreground">Receive emails about incoming and missed calls</div>
                    </div>
                    <Switch id="email-calls" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-cases">Case Updates</Label>
                      <div className="text-sm text-muted-foreground">Get notified when your cases are updated</div>
                    </div>
                    <Switch id="email-cases" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-system">System Notifications</Label>
                      <div className="text-sm text-muted-foreground">Receive system alerts and announcements</div>
                    </div>
                    <Switch id="email-system" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-marketing">Marketing Emails</Label>
                      <div className="text-sm text-muted-foreground">Get updates about new features and promotions</div>
                    </div>
                    <Switch id="email-marketing" />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">In-App Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="inapp-calls">Call Notifications</Label>
                      <div className="text-sm text-muted-foreground">Show notifications for incoming calls</div>
                    </div>
                    <Switch id="inapp-calls" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="inapp-messages">Messages</Label>
                      <div className="text-sm text-muted-foreground">Show notifications for new messages</div>
                    </div>
                    <Switch id="inapp-messages" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="inapp-tasks">Task Reminders</Label>
                      <div className="text-sm text-muted-foreground">Get reminders about upcoming tasks</div>
                    </div>
                    <Switch id="inapp-tasks" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Activity</CardTitle>
              <CardDescription>Recent actions and changes to your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-2 border-primary pl-4 pb-4 pt-2 relative">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-[14px]"></div>
                  <div className="font-medium">Password Changed</div>
                  <div className="text-sm text-muted-foreground">You changed your password</div>
                  <div className="text-xs text-muted-foreground mt-1">2 days ago • New York, USA</div>
                </div>
                <div className="border-l-2 border-primary pl-4 pb-4 pt-2 relative">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-[14px]"></div>
                  <div className="font-medium">Account Login</div>
                  <div className="text-sm text-muted-foreground">Logged in from a new device</div>
                  <div className="text-xs text-muted-foreground mt-1">3 days ago • San Francisco, USA</div>
                </div>
                <div className="border-l-2 border-primary pl-4 pb-4 pt-2 relative">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-[14px]"></div>
                  <div className="font-medium">Profile Updated</div>
                  <div className="text-sm text-muted-foreground">You updated your profile information</div>
                  <div className="text-xs text-muted-foreground mt-1">1 week ago • New York, USA</div>
                </div>
                <div className="border-l-2 border-primary pl-4 pb-4 pt-2 relative">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-[14px]"></div>
                  <div className="font-medium">Account Created</div>
                  <div className="text-sm text-muted-foreground">You created your account</div>
                  <div className="text-xs text-muted-foreground mt-1">{profile.createdAt} • New York, USA</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline">Load More Activity</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
