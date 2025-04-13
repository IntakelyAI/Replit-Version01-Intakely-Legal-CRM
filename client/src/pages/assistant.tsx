import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAIAssistant } from "@/components/providers/ai-assistant-provider";
import AIAssistantChat from "@/components/shared/ai-assistant-chat";

export default function AssistantPage() {
  const { setCurrentSection } = useAIAssistant();
  
  useEffect(() => {
    setCurrentSection('assistant');
  }, [setCurrentSection]);
  
  // Sample initial messages for AI assistant
  const initialMessages = [
    {
      id: "1",
      content: "Hello! I'm your Intakely AI Assistant. I can help you with a wide range of tasks across your legal practice. How can I assist you today?",
      role: "assistant" as const,
      timestamp: new Date(),
    },
  ];
  
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Assistant</h1>
        <p className="text-muted-foreground mt-1">
          Your personal AI assistant that can help you with various tasks across the platform.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Chat with AI Assistant</CardTitle>
            <CardDescription>
              Ask questions, get insights, or request help with your tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[600px] p-0">
            <AIAssistantChat 
              initialMessages={initialMessages} 
            />
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Commands</CardTitle>
              <CardDescription>Try these sample queries to get started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md bg-accent/50 p-3">
                <p className="font-medium">⚡ "Generate a client intake form for personal injury cases"</p>
              </div>
              <div className="rounded-md bg-accent/50 p-3">
                <p className="font-medium">⚡ "Summarize the key metrics from my dashboard"</p>
              </div>
              <div className="rounded-md bg-accent/50 p-3">
                <p className="font-medium">⚡ "What's the status of [client] case?"</p>
              </div>
              <div className="rounded-md bg-accent/50 p-3">
                <p className="font-medium">⚡ "Help me set up a new AI agent for client follow-ups"</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Assistant Capabilities</CardTitle>
              <CardDescription>What your AI assistant can do for you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="font-medium">Client Management</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    <li>Search client records</li>
                    <li>Summarize client history</li>
                    <li>Draft client communications</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="font-medium">Document Assistance</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    <li>Generate document templates</li>
                    <li>Review document drafts</li>
                    <li>Extract key information</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="font-medium">Case Management</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    <li>Track case progress</li>
                    <li>Set up case reminders</li>
                    <li>Summarize case notes</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="font-medium">Agent Builder</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    <li>Help configure AI agents</li>
                    <li>Suggest agent improvements</li>
                    <li>Analyze agent performance</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}