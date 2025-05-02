import { useState } from "react";
import { Settings, Moon, Sun, Globe, Palette, Save, RotateCcw, AlertTriangle, Shield, Database, Code, Cloud, Server } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import AIAssistantChat from "@/components/shared/ai-assistant-chat";

// Sample chat messages for the AI Assistant
const initialChatMessages = [
  {
    id: "1",
    content: "Hello! I'm your settings assistant. How can I help you configure your application today?",
    role: "assistant" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
];

export default function AppSettings() {
  const [isDark, setIsDark] = useState(true);
  const [saveIndicator, setSaveIndicator] = useState(false);
  
  const handleSave = () => {
    setSaveIndicator(true);
    setTimeout(() => {
      setSaveIndicator(false);
    }, 2000);
  };

  return (
    <div className="grid gap-6">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Application Settings</h1>
        <p className="mt-1 text-muted-foreground">Configure your LexAI application preferences.</p>
      </div>
      
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="ai">AI Settings</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage basic application preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Application</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="app-notifications">Desktop Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications for important events</p>
                    </div>
                    <Switch id="app-notifications" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-save">Auto-save</Label>
                      <p className="text-sm text-muted-foreground">Automatically save changes</p>
                    </div>
                    <Switch id="auto-save" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sounds">Sound Effects</Label>
                      <p className="text-sm text-muted-foreground">Play sounds for notifications and actions</p>
                    </div>
                    <Switch id="sounds" />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Regional</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
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
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="America/New_York">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                        <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                        <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="date-format">Date Format</Label>
                    <Select defaultValue="MM/DD/YYYY">
                      <SelectTrigger id="date-format">
                        <SelectValue placeholder="Select date format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
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
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" className="mr-2 gap-2">
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
              <Button className="gap-2" onClick={handleSave}>
                <Save className="h-4 w-4" />
                {saveIndicator ? "Saved!" : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of your application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Theme</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Theme Mode</Label>
                      <p className="text-sm text-muted-foreground">Choose between light and dark theme</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant={!isDark ? "default" : "outline"} 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => setIsDark(false)}
                      >
                        <Sun className="h-4 w-4" />
                        <span className="sr-only">Light</span>
                      </Button>
                      <Button 
                        variant={isDark ? "default" : "outline"} 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => setIsDark(true)}
                      >
                        <Moon className="h-4 w-4" />
                        <span className="sr-only">Dark</span>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Accent Color</Label>
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-purple-600 ring-2 ring-offset-2 ring-offset-background ring-purple-600"></div>
                      <div className="h-6 w-6 rounded-full bg-blue-600"></div>
                      <div className="h-6 w-6 rounded-full bg-green-600"></div>
                      <div className="h-6 w-6 rounded-full bg-orange-600"></div>
                      <div className="h-6 w-6 rounded-full bg-red-600"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="radius">Border Radius</Label>
                      <span className="text-sm">0.5rem</span>
                    </div>
                    <Slider
                      id="radius"
                      defaultValue={[50]}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Layout</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Sidebar Position</Label>
                    <RadioGroup defaultValue="left" className="flex space-x-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="left" id="left" />
                        <Label htmlFor="left">Left</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="right" id="right" />
                        <Label htmlFor="right">Right</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="collapsed-sidebar">Collapsed Sidebar</Label>
                      <p className="text-sm text-muted-foreground">Start with collapsed sidebar</p>
                    </div>
                    <Switch id="collapsed-sidebar" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dense-mode">Dense Mode</Label>
                      <p className="text-sm text-muted-foreground">Compact UI with less padding</p>
                    </div>
                    <Switch id="dense-mode" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" className="mr-2 gap-2">
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
              <Button className="gap-2" onClick={handleSave}>
                <Save className="h-4 w-4" />
                {saveIndicator ? "Saved!" : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="ai" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Settings</CardTitle>
              <CardDescription>Configure AI assistant behavior and permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">AI Assistant</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="ai-assistant">AI Assistant</Label>
                      <p className="text-sm text-muted-foreground">Enable AI assistant across the application</p>
                    </div>
                    <Switch id="ai-assistant" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="context-awareness">Context Awareness</Label>
                      <p className="text-sm text-muted-foreground">Allow AI to use context from your activities</p>
                    </div>
                    <Switch id="context-awareness" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="proactive-suggestions">Proactive Suggestions</Label>
                      <p className="text-sm text-muted-foreground">Allow AI to provide proactive suggestions</p>
                    </div>
                    <Switch id="proactive-suggestions" defaultChecked />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Language Model</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="model">AI Model</Label>
                    <Select defaultValue="gpt-4">
                      <SelectTrigger id="model">
                        <SelectValue placeholder="Select AI model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4">GPT-4 (Most Capable)</SelectItem>
                        <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo (Fast)</SelectItem>
                        <SelectItem value="claude">Claude</SelectItem>
                        <SelectItem value="llama-2">Llama 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="temperature">Temperature</Label>
                      <span className="text-sm">0.7</span>
                    </div>
                    <Slider
                      id="temperature"
                      defaultValue={[70]}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">Controls creativity (0 = deterministic, 1 = creative)</p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Data & Privacy</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="save-conversations">Save Conversations</Label>
                      <p className="text-sm text-muted-foreground">Store conversation history with AI</p>
                    </div>
                    <Switch id="save-conversations" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="improve-ai">Improve AI</Label>
                      <p className="text-sm text-muted-foreground">Share anonymized data to improve AI models</p>
                    </div>
                    <Switch id="improve-ai" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" className="mr-2 gap-2">
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
              <Button className="gap-2" onClick={handleSave}>
                <Save className="h-4 w-4" />
                {saveIndicator ? "Saved!" : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>Connect with third-party services and tools</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Connected Services</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" rx="4" fill="#0D9DDA" />
                        <path d="M12.5 7L7 10.7V16.5H12.5L18 12.8V7H12.5Z" fill="white" />
                      </svg>
                      <div>
                        <div className="font-medium">Microsoft 365</div>
                        <div className="text-sm text-muted-foreground">Calendar and email integration</div>
                      </div>
                    </div>
                    <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Connected</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" rx="4" fill="#4285F4" />
                        <path d="M12 11V8L9 12L12 16V13H15V11H12Z" fill="white" />
                      </svg>
                      <div>
                        <div className="font-medium">Google Workspace</div>
                        <div className="text-sm text-muted-foreground">Calendar, Drive, and Gmail</div>
                      </div>
                    </div>
                    <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Connected</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" rx="4" fill="#2D9CDB" />
                        <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div>
                        <div className="font-medium">Clio</div>
                        <div className="text-sm text-muted-foreground">Legal practice management</div>
                      </div>
                    </div>
                    <Badge variant="outline">Not Connected</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" rx="4" fill="#E01E5A" />
                        <path d="M9 15C10.1046 15 11 14.1046 11 13V9C11 7.89543 10.1046 7 9 7C7.89543 7 7 7.89543 7 9V13C7 14.1046 7.89543 15 9 15Z" fill="white" />
                        <path d="M15 17C16.1046 17 17 16.1046 17 15V11C17 9.89543 16.1046 9 15 9C13.8954 9 13 9.89543 13 11V15C13 16.1046 13.8954 17 15 17Z" fill="white" />
                      </svg>
                      <div>
                        <div className="font-medium">Slack</div>
                        <div className="text-sm text-muted-foreground">Team communication</div>
                      </div>
                    </div>
                    <Badge variant="outline">Not Connected</Badge>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">API Keys</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="twilio-api">Twilio API Key</Label>
                    <div className="flex gap-2">
                      <Input id="twilio-api" type="password" value="•••••••••••••••••••••••••" readOnly />
                      <Button variant="outline" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">Last updated: 2 months ago</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="openai-api">OpenAI API Key</Label>
                    <div className="flex gap-2">
                      <Input id="openai-api" type="password" value="•••••••••••••••••••••••••" readOnly />
                      <Button variant="outline" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">Last updated: 1 month ago</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <Button variant="outline" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add New Integration
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="gap-2" onClick={handleSave}>
                <Save className="h-4 w-4" />
                {saveIndicator ? "Saved!" : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>System configuration and technical settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">System</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="debug-mode">Debug Mode</Label>
                      <p className="text-sm text-muted-foreground">Show detailed error messages and logs</p>
                    </div>
                    <Switch id="debug-mode" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-update">Automatic Updates</Label>
                      <p className="text-sm text-muted-foreground">Automatically install updates when available</p>
                    </div>
                    <Switch id="auto-update" defaultChecked />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Data Management</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="caching">Caching</Label>
                    <Select defaultValue="standard">
                      <SelectTrigger id="caching">
                        <SelectValue placeholder="Select caching option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aggressive">Aggressive</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                        <SelectItem value="disabled">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Local Storage</Label>
                      <p className="text-sm text-muted-foreground">Currently using 256MB of local storage</p>
                    </div>
                    <Button variant="outline" className="gap-2">
                      <Trash className="h-4 w-4" />
                      Clear
                    </Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Developer Options</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dev-tools">Developer Tools</Label>
                      <p className="text-sm text-muted-foreground">Enable developer tools and features</p>
                    </div>
                    <Switch id="dev-tools" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="api-logging">API Request Logging</Label>
                      <p className="text-sm text-muted-foreground">Log all API requests for debugging</p>
                    </div>
                    <Switch id="api-logging" />
                  </div>
                </div>
              </div>
              
              <div className="rounded-md bg-amber-50 dark:bg-amber-950/50 p-4 text-amber-800 dark:text-amber-300">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Caution</h4>
                    <p className="text-sm mt-1">
                      Changes to advanced settings may affect system performance and stability. 
                      Only modify these settings if you understand their impact.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" className="mr-2 gap-2">
                <RotateCcw className="h-4 w-4" />
                Reset to Defaults
              </Button>
              <Button className="gap-2" onClick={handleSave}>
                <Save className="h-4 w-4" />
                {saveIndicator ? "Saved!" : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
              <CardDescription>Technical details about your LexAI installation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Version</Label>
                  <p className="font-medium">LexAI v3.2.4</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Last Updated</Label>
                  <p className="font-medium">Oct 25, 2023</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Environment</Label>
                  <p className="font-medium">Production</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">License</Label>
                  <p className="font-medium flex items-center gap-1">
                    Enterprise 
                    <Badge className="ml-1 bg-green-500/10 text-green-500 hover:bg-green-500/20">Active</Badge>
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">System Diagnostics</h4>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Server className="h-3.5 w-3.5" />
                    <span>Run Diagnostics</span>
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Database className="h-3.5 w-3.5" />
                    <span>Check Database</span>
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Cloud className="h-3.5 w-3.5" />
                    <span>Test API</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* AI Assistant */}
      <div className="hidden lg:block">
        <AIAssistantChat 
          initialMessages={initialChatMessages} 
          title="Settings Assistant"
          heightClass="h-[300px]"
        />
      </div>
    </div>
  );
}

// Helper component for the eye icon
function Eye({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
