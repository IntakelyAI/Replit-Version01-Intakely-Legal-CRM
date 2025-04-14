import { useState, PropsWithChildren } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ChatWidget } from "../ai/ChatWidget";

export function AppShell({ children }: PropsWithChildren) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-10 bg-background/80 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <div className="flex-1 md:ml-64">
        <Header setSidebarOpen={setSidebarOpen} />
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
