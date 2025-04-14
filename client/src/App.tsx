import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { AppShell } from "@/components/layout/AppShell";
import Dashboard from "@/pages/Dashboard";
import PersonalAssistant from "@/pages/PersonalAssistant";
import AgentBuilder from "@/pages/AgentBuilder";
import AgentDetail from "@/pages/AgentDetail";
import Spaces from "@/pages/Spaces";
import Contacts from "@/pages/Contacts";
import Channels from "@/pages/Channels";
import Notifications from "@/pages/Notifications";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <AppShell>
      <Switch>
        <Route path="/" component={PersonalAssistant} />
        <Route path="/assistant" component={PersonalAssistant} />
        <Route path="/agent-builder" component={AgentBuilder} />
        <Route path="/agent-builder/:id" component={AgentDetail} />
        <Route path="/spaces" component={Spaces} />
        <Route path="/contacts" component={Contacts} />
        <Route path="/channels" component={Channels} />
        <Route path="/notifications" component={Notifications} />
        <Route path="/settings" component={Settings} />
        <Route component={NotFound} />
      </Switch>
    </AppShell>
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
