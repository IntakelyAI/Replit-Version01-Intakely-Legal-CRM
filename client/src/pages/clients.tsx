import { useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import ClientsList from "@/components/clients/clients-list";
import ClientDetailView from "@/components/clients/client-detail-view";
import { useAIAssistant } from "@/components/providers/ai-assistant-provider";

export default function Clients() {
  const [location] = useLocation();
  const { setCurrentSection } = useAIAssistant();
  
  // Update AI context whenever this component mounts
  useEffect(() => {
    setCurrentSection('clients');
  }, [setCurrentSection]);
  
  // Check if we're viewing a specific client
  const isClientDetail = location.startsWith('/clients/');
  
  return (
    <Switch>
      <Route path="/clients" component={ClientsList} />
      <Route path="/clients/:id">
        {params => <ClientDetailView clientId={params.id} />}
      </Route>
    </Switch>
  );
}
