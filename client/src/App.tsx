import { useState } from "react";
import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { AppShell } from "@/components/layout/AppShell";
import { Sidebar } from "@/components/layout/Sidebar";
import Dashboard from "@/pages/Dashboard";
import PersonalAssistant from "@/pages/PersonalAssistant";
import AgentBuilder from "@/modules/agent-builder/agent-builder";
import AgentConfigurator from "@/modules/agent-builder/pages/agent-configurator";
import Spaces from "@/pages/Spaces";
import Contacts from "@/pages/Contacts";
import Channels from "@/pages/Channels";
import Notifications from "@/pages/Notifications";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/not-found";
import WorkflowBuilder from "@/modules/agent-builder/pages/workflow-builder"; // Added import


function Router() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [location] = useLocation();
  
  // Auto-collapse sidebar on agent configurator route
  useEffect(() => {
    if (location.startsWith('/agent-builder/detail/')) {
      setSidebarCollapsed(true);
    }
  }, [location]);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={true} setIsOpen={() => {}} isCollapsed={sidebarCollapsed} setIsCollapsed={setSidebarCollapsed} />
      <div className={cn("flex-1 transition-all duration-300", sidebarCollapsed ? "ml-12" : "ml-56")}>
        <AppShell>
          <Switch>
        <Route path="/agent-builder/workflow" component={WorkflowBuilder} />
        <Route path="/agent-builder/detail/:id" component={AgentConfigurator} />
        <Route path="/agent-builder/agents">
          {() => <AgentBuilder setIsCollapsed={setSidebarCollapsed} />}
        </Route>
        <Route path="/agent-builder">
          {() => <AgentBuilder setIsCollapsed={setSidebarCollapsed} />}
        </Route>
        <Route path="/assistant" component={PersonalAssistant} />
        <Route path="/" component={PersonalAssistant} />
        <Route path="/spaces" component={Spaces} />
        <Route path="/contacts" component={Contacts} />
        <Route path="/channels" component={Channels} />
        <Route path="/notifications" component={Notifications} />
        <Route path="/settings" component={Settings} />
        <Route component={NotFound} />
      </Switch>
        </AppShell>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;