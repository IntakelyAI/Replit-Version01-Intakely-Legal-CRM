import React, { useState } from "react";
import { AIAssistantProvider } from "../providers/ai-assistant-provider";
import { FirmProvider, useFirm } from "../providers/firm-provider";
import { useAIAssistant } from "../providers/ai-assistant-provider";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "./sidebar";
import Header from "./header";
import MobileNav from "./mobile-nav";

type MainLayoutProps = {
  children: React.ReactNode;
};

function MainLayoutContent({ children }: MainLayoutProps) {
  const { selectedFirm, isFirmNavigationOpen } = useFirm();
  const { toggleAssistant } = useAIAssistant();
  const [showMainNav, setShowMainNav] = useState(true);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Main Navigation Panel */}
      {showMainNav && (
        <div className="fixed top-0 left-0 z-40 h-screen">
          <Sidebar />
        </div>
      )}
      
      {/* Law Firm Navigation Panel - Shown when a firm is selected */}
      {selectedFirm && isFirmNavigationOpen && (
        <div className="fixed top-0 left-16 md:left-64 z-30 h-screen">
          <LawFirmNavigation firmName={selectedFirm.name} />
        </div>
      )}
      
      {/* Content Area */}
      <div className={`flex-1 ${showMainNav ? 'md:ml-64' : ''} ${(selectedFirm && isFirmNavigationOpen) ? 'md:ml-[512px]' : ''}`}>
        <Header />
        
        <main className="container mx-auto px-4 py-6 sm:px-6 md:py-8 pb-20 md:pb-8">
          {children}
        </main>
      </div>
      
      {/* Mobile Navigation - Only shown on small screens */}
      <MobileNav />
      
      {/* AI Assistant Toggle Button */}
      <div className="fixed bottom-20 right-4 z-50 md:bottom-4">
        <Button 
          size="icon" 
          className="rounded-full h-12 w-12 bg-primary hover:bg-primary/90"
          onClick={toggleAssistant}
        >
          <MessageSquare className="h-6 w-6" />
          <span className="sr-only">Toggle AI Assistant</span>
        </Button>
      </div>
    </div>
  );
}

export default function MainLayout({ children }: MainLayoutProps) {
  // Wrap with providers
  return (
    <FirmProvider>
      <AIAssistantProvider>
        <MainLayoutContent>{children}</MainLayoutContent>
      </AIAssistantProvider>
    </FirmProvider>
  );
}
