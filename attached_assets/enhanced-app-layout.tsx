import { ThemeProvider } from "@/components/theme-provider";
import { AIAssistantProvider } from "@/components/providers/ai-assistant-provider";
import { FirmProvider } from "@/components/providers/firm-provider";
import { Toaster } from "@/components/ui/toaster";
import FixedNavigation from "./fixed-navigation";
import LawFirmNavigationEnhanced from "./law-firm-navigation-enhanced";
import { cn } from "@/lib/utils";
import { useLocation } from "wouter";
import { useFirm } from "@/components/providers/firm-provider";

interface EnhancedAppLayoutProps {
  children: React.ReactNode;
}

export default function EnhancedAppLayout({ children }: EnhancedAppLayoutProps) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="intakely-theme">
      <FirmProvider>
        <AIAssistantProvider>
          <AppLayoutContent>
            {children}
          </AppLayoutContent>
          <Toaster />
        </AIAssistantProvider>
      </FirmProvider>
    </ThemeProvider>
  );
}

function AppLayoutContent({ children }: EnhancedAppLayoutProps) {
  const [location] = useLocation();
  const { selectedFirm, isFirmNavigationOpen } = useFirm();
  
  return (
    <div className="flex min-h-screen bg-background">
      {/* Main Navigation */}
      <div className="fixed inset-y-0 left-0 z-30">
        <FixedNavigation />
      </div>
      
      {/* Law Firm Navigation */}
      {selectedFirm && isFirmNavigationOpen && (
        <div className="fixed inset-y-0 left-[280px] z-20">
          <LawFirmNavigationEnhanced />
        </div>
      )}
      
      {/* Main Content */}
      <main 
        className={cn(
          "flex-1 ml-[280px] transition-all duration-200",
          selectedFirm && isFirmNavigationOpen && "ml-[560px]"
        )}
      >
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}