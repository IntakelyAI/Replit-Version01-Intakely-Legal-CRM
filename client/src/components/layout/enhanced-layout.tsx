import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import MainNavigationEnhanced from "@/components/layout/main-navigation-enhanced";
import LawFirmNavigationEnhanced from "@/components/layout/law-firm-navigation-enhanced";
import { useFirm } from "@/components/providers/firm-provider";
import { AIAssistantProvider } from "@/components/providers/ai-assistant-provider";
import { FirmProvider } from "@/components/providers/firm-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

interface EnhancedLayoutProps {
  children: React.ReactNode;
}

function EnhancedLayoutContent({ children }: EnhancedLayoutProps) {
  const [location] = useLocation();
  const { selectedFirm, isFirmNavigationOpen } = useFirm();
  
  // Check if we're in a law firm specific route
  const isFirmRoute = location.startsWith('/firms/');
  
  // Determine main content left position based on navigation state
  const getMainContentStyle = () => {
    // Default left position with only main navigation
    let leftPosition = '280px';
    
    // If firm navigation is open, adjust accordingly
    if (selectedFirm && isFirmNavigationOpen) {
      leftPosition = '560px';
    }
    
    return { left: leftPosition };
  };
  
  return (
    <div className="flex min-h-screen bg-background">
      {/* Main Navigation */}
      <MainNavigationEnhanced />
      
      {/* Law Firm Navigation - Conditional */}
      {selectedFirm && isFirmNavigationOpen && <LawFirmNavigationEnhanced />}
      
      {/* Main Content */}
      <main 
        className={cn(
          "fixed top-0 bottom-0 right-0 overflow-auto transition-all duration-200",
          "bg-background"
        )}
        style={getMainContentStyle()}
      >
        <div className="container py-6 min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function EnhancedLayout({ children }: EnhancedLayoutProps) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="intakely-theme">
      <FirmProvider>
        <AIAssistantProvider>
          <EnhancedLayoutContent>
            {children}
          </EnhancedLayoutContent>
          <Toaster />
        </AIAssistantProvider>
      </FirmProvider>
    </ThemeProvider>
  );
}