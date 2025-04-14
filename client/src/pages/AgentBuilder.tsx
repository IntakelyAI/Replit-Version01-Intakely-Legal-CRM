import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  PlusCircle, 
  Settings, 
  List, 
  Database, 
  Code, 
  LayoutGrid
} from "lucide-react";

export default function AgentBuilder() {
  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Agent Builder</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Create, manage, and deploy AI agents for your legal practice.
          </p>
        </div>
        <Button className="bg-primary">
          <PlusCircle className="h-4 w-4 mr-2" />
          New Agent
        </Button>
      </div>

      <Tabs defaultValue="agents">
        <TabsList className="mb-4">
          <TabsTrigger value="agents">
            <LayoutGrid className="h-4 w-4 mr-2" />
            My Agents
          </TabsTrigger>
          <TabsTrigger value="templates">
            <List className="h-4 w-4 mr-2" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="datasources">
            <Database className="h-4 w-4 mr-2" />
            Data Sources
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="agents">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <Card key={i} className="hover:border-primary transition-colors cursor-pointer">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <Code className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-medium">{`Legal Assistant ${i}`}</h3>
                    </div>
                    <div className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      Active
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {`Specialized in ${i % 2 === 0 ? 'contract review' : 'case research'} and document preparation.`}
                  </p>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Created: May {i + 10}, 2023</span>
                    <span>v2.{i}</span>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="border-dashed border-muted-foreground/30 flex items-center justify-center h-[180px] cursor-pointer hover:border-primary/50 transition-colors">
              <div className="text-center">
                <PlusCircle className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground font-medium">Create New Agent</p>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium">Agent Templates</h3>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Choose from pre-configured templates to quickly deploy specialized legal agents.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {['Contract Reviewer', 'Case Researcher', 'Client Intake', 'Document Drafter', 'Law Summarizer'].map((template, i) => (
                  <div key={i} className="flex items-center p-3 border rounded-md hover:border-primary transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Code className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{template}</p>
                      <p className="text-xs text-muted-foreground">Specialized legal AI</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="datasources">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium">Data Sources</h3>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Connect your legal documents and databases to power your AI agents.
              </p>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="datasource-name">Name</Label>
                    <Input id="datasource-name" placeholder="e.g. Case Files 2023" />
                  </div>
                  <div>
                    <Label htmlFor="datasource-type">Type</Label>
                    <Input id="datasource-type" placeholder="e.g. Document Database" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="datasource-url">Connection URL</Label>
                  <Input id="datasource-url" placeholder="https://" />
                </div>
                
                <Button className="bg-primary">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Data Source
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium">Agent Builder Settings</h3>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Configure default settings for all your agents.
              </p>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="api-key">API Key</Label>
                  <Input id="api-key" type="password" value="••••••••••••••••" />
                </div>
                
                <div>
                  <Label htmlFor="deployment-env">Deployment Environment</Label>
                  <Input id="deployment-env" value="Production" />
                </div>
                
                <div>
                  <Label htmlFor="logging-level">Logging Level</Label>
                  <Input id="logging-level" value="Info" />
                </div>
                
                <Button className="bg-primary">
                  <Settings className="h-4 w-4 mr-2" />
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
