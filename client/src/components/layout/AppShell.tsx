import { useState, useEffect, PropsWithChildren } from "react";
import { useLocation } from "wouter";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { ChatWidget } from "../ai/ChatWidget";
import { Building2, ChevronDown, Star, Lock, Pin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export function AppShell({ children }: PropsWithChildren) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [location] = useLocation();
  const [secondaryMenuVisible, setSecondaryMenuVisible] = useState(false);
  const [mainMenuCollapsed, setMainMenuCollapsed] = useState(false);
  
  // Check if we're in a law firm specific page
  useEffect(() => {
    // Example check for firm-specific paths
    const isFirmPath = location.startsWith('/spaces/') && location.split('/').length > 2;
    setSecondaryMenuVisible(isFirmPath);
    
    // Collapse main menu when secondary menu appears
    if (isFirmPath) {
      setMainMenuCollapsed(true);
    }
  }, [location]);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen}
        isCollapsed={mainMenuCollapsed}
        setIsCollapsed={setMainMenuCollapsed}
      />
      
      {/* Secondary menu would be rendered here when a law firm is selected */}
      {secondaryMenuVisible && (
        <div className="fixed inset-y-0 left-12 z-20 w-56 bg-background border-r">
          <div className="flex h-10 items-center justify-between px-2 border-b">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold truncate">Smith Law Group</span>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-6 w-6 p-0" title="Team">
                <Star className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6 p-0" title="Private">
                <Lock className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6 p-0" title="Pin">
                <Pin className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6 p-0" title="Close">
                <ChevronDown className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
          
          <ScrollArea className="h-[calc(100vh-2.5rem)] p-2">
            {/* Law firm navigation would go here */}
            <div className="text-[10px] uppercase font-semibold text-muted-foreground mb-1 px-1">
              Law Firm Navigation
            </div>
            <div className="text-xs text-muted-foreground">
              This is where the secondary law firm navigation would be displayed.
            </div>
          </ScrollArea>
        </div>
      )}
      
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-10 bg-background/80 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <div className={`flex-1 transition-all duration-300 ${
        secondaryMenuVisible ? 'md:ml-[17rem]' : mainMenuCollapsed ? 'md:ml-12' : 'md:ml-56'
      }`}>
        <main className="flex-1 pb-8">
          <div className="px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
        <Footer />
      </div>
      
      <ChatWidget />
    </div>
  );
}
