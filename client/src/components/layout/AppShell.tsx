import { useState, useEffect, PropsWithChildren } from "react";
import { useLocation } from "wouter";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { ChatWidget } from "../ai/ChatWidget";

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
        <div className="fixed inset-y-0 left-16 z-20 w-64 bg-background border-r">
          {/* This would be replaced with the actual LawFirmNavigation component */}
          <div className="p-4 border-b">
            <h2 className="font-semibold">Smith Law Group</h2>
          </div>
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
        secondaryMenuVisible ? 'md:ml-80' : mainMenuCollapsed ? 'md:ml-16' : 'md:ml-64'
      }`}>
        <main className="flex-1">
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
