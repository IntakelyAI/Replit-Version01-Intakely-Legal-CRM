import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import EnhancedAppLayout from "@/components/layout/enhanced-app-layout";
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
      <Route path="/agent-builder/agents" component={AgentBuilder} />
      <Route path="/agent-builder/knowledge-base" component={KnowledgeBase} />
      <Route path="/agent-builder/phone-numbers" component={CallCenter} />
      <Route path="/agent-builder/call-history" component={CallCenter} />
      <Route path="/agent-builder/analytics" component={Analytics} />
      <Route path="/knowledge-base" component={KnowledgeBase} />
      <Route path="/call-center" component={CallCenter} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/assistant" component={Dashboard} />
      <Route path="/user-profile" component={UserProfile} />
      <Route path="/app-settings" component={AppSettings} />
      <Route path="/settings" component={AppSettings} />
      <Route path="/help" component={Help} />
      
      {/* Law firm specific routes */}
      <Route path="/firms/:firmId/*">
        {(params) => {
          const path = window.location.pathname;
          const section = path.split('/').pop() || '';
          
          // Route to the appropriate component based on section
          switch (section) {
            case 'clients':
              return <Clients />;
            case 'cases':
              return <Cases />;
            case 'documents':
              return <Documents />;
            default:
              return <Dashboard />;
          }
        }}
      </Route>
      
      {/* 404 Not Found route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Use our enhanced app layout with the proper navigation structure
  return (
    <QueryClientProvider client={queryClient}>
      <EnhancedAppLayout>
        <Router />
      </EnhancedAppLayout>
    </QueryClientProvider>
  );
}

export default App;
