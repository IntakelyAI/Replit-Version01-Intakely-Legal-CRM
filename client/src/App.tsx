import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import MainLayout from "@/components/layout/main-layout";
import Dashboard from "@/pages/dashboard";
import LawFirms from "@/pages/law-firms";
import Clients from "@/pages/clients";
import Cases from "@/pages/cases";
import Documents from "@/pages/documents";
import AgentBuilder from "@/pages/agent-builder";
import KnowledgeBase from "@/pages/knowledge-base";
import CallCenter from "@/pages/call-center";
import Analytics from "@/pages/analytics";
import UserProfile from "@/pages/user-profile";
import AppSettings from "@/pages/app-settings";
import Help from "@/pages/help";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/law-firms" component={LawFirms} />
      <Route path="/clients" component={Clients} />
      <Route path="/cases" component={Cases} />
      <Route path="/documents" component={Documents} />
      <Route path="/agent-builder" component={AgentBuilder} />
      <Route path="/knowledge-base" component={KnowledgeBase} />
      <Route path="/call-center" component={CallCenter} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/user-profile" component={UserProfile} />
      <Route path="/app-settings" component={AppSettings} />
      <Route path="/help" component={Help} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="lexai-theme">
        <MainLayout>
          <Router />
        </MainLayout>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
