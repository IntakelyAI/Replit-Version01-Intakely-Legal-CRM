import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Shield, 
  Bell, 
  Globe, 
  LayoutDashboard, 
  Moon, 
  Sun, 
  Monitor
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Settings() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5 h-auto">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <LayoutDashboard className="h-4 w-4" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="language" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Language</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium">Profile Settings</h2>
              <p className="text-sm text-muted-foreground">Manage your personal information</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg">AH</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <h3 className="font-medium">Profile Picture</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Upload</Button>
                    <Button variant="outline" size="sm" className="text-muted-foreground">Remove</Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="Ahmad Hassan" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="job-title">Job Title</Label>
                  <Input id="job-title" defaultValue="Legal Tech Admin" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="ahmad.hassan@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+1 (555) 987-6543" />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea 
                  id="bio" 
                  className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="Legal technology specialist with experience in automation and AI integration for law firms."
                />
              </div>
              
              <div className="flex justify-end">
                <Button className="bg-primary">Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium">Security Settings</h2>
              <p className="text-sm text-muted-foreground">Manage your account security</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Change Password</h3>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
                <Button variant="outline">Update Password</Button>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Authenticator App</p>
                    <p className="text-sm text-muted-foreground">Use an authenticator app to generate one-time codes</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Authentication</p>
                    <p className="text-sm text-muted-foreground">Use your phone to receive authentication codes</p>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Active Sessions</h3>
                <div className="space-y-3">
                  <div className="flex justify-between p-3 border rounded-md">
                    <div>
                      <p className="font-medium">Current Session</p>
                      <p className="text-sm text-muted-foreground">Chrome on Windows • New York, US</p>
                    </div>
                    <Badge className="bg-green-600">Active</Badge>
                  </div>
                  <div className="flex justify-between p-3 border rounded-md">
                    <div>
                      <p className="font-medium">Mobile App</p>
                      <p className="text-sm text-muted-foreground">iOS • Last active 2 hours ago</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive/90">
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium">Notification Settings</h2>
              <p className="text-sm text-muted-foreground">Control how and when you receive notifications</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Email Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">New case assignments</p>
                      <p className="text-sm text-muted-foreground">Receive an email when you are assigned to a new case</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Document updates</p>
                      <p className="text-sm text-muted-foreground">Get notified when documents are added or updated</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Meeting reminders</p>
                      <p className="text-sm text-muted-foreground">Receive meeting reminders via email</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Marketing communications</p>
                      <p className="text-sm text-muted-foreground">Receive product updates and announcements</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">In-App Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Task reminders</p>
                      <p className="text-sm text-muted-foreground">Get reminded about upcoming due dates</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Chat messages</p>
                      <p className="text-sm text-muted-foreground">Get notified about new messages</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">System alerts</p>
                      <p className="text-sm text-muted-foreground">Receive important system notifications</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="bg-primary">Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium">Appearance Settings</h2>
              <p className="text-sm text-muted-foreground">Customize the look and feel of the application</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Theme</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="border rounded-md p-3 flex flex-col items-center gap-2 hover:border-primary cursor-pointer">
                    <Sun className="h-8 w-8 text-amber-500" />
                    <p className="font-medium">Light</p>
                  </div>
                  <div className="border rounded-md p-3 flex flex-col items-center gap-2 hover:border-primary cursor-pointer bg-muted border-primary">
                    <Moon className="h-8 w-8 text-blue-500" />
                    <p className="font-medium">Dark</p>
                  </div>
                  <div className="border rounded-md p-3 flex flex-col items-center gap-2 hover:border-primary cursor-pointer">
                    <Monitor className="h-8 w-8 text-gray-500" />
                    <p className="font-medium">System</p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Color Scheme</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div className="border rounded-md p-2 cursor-pointer border-primary">
                    <div className="h-12 rounded bg-primary mb-2"></div>
                    <p className="text-xs font-medium text-center">Purple</p>
                  </div>
                  <div className="border rounded-md p-2 cursor-pointer">
                    <div className="h-12 rounded bg-blue-600 mb-2"></div>
                    <p className="text-xs font-medium text-center">Blue</p>
                  </div>
                  <div className="border rounded-md p-2 cursor-pointer">
                    <div className="h-12 rounded bg-green-600 mb-2"></div>
                    <p className="text-xs font-medium text-center">Green</p>
                  </div>
                  <div className="border rounded-md p-2 cursor-pointer">
                    <div className="h-12 rounded bg-red-600 mb-2"></div>
                    <p className="text-xs font-medium text-center">Red</p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Layout</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Compact Mode</p>
                      <p className="text-sm text-muted-foreground">Show more content with reduced spacing</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Sidebar Expanded</p>
                      <p className="text-sm text-muted-foreground">Keep sidebar expanded by default</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="bg-primary">Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="language">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium">Language Settings</h2>
              <p className="text-sm text-muted-foreground">Configure language and region preferences</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Application Language</Label>
                  <Select defaultValue="en-US">
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="en-GB">English (UK)</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="ar">Arabic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select defaultValue="mdy">
                    <SelectTrigger id="date-format">
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="time-format">Time Format</Label>
                  <Select defaultValue="12h">
                    <SelectTrigger id="time-format">
                      <SelectValue placeholder="Select time format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                      <SelectItem value="24h">24-hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Time Zone</Label>
                  <Select defaultValue="america-new_york">
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select time zone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="america-new_york">America/New York (EDT)</SelectItem>
                      <SelectItem value="america-los_angeles">America/Los Angeles (PDT)</SelectItem>
                      <SelectItem value="europe-london">Europe/London (BST)</SelectItem>
                      <SelectItem value="asia-tokyo">Asia/Tokyo (JST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="bg-primary">Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
