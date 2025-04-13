import { useState } from "react";
import { Menu, BarChart3, Bell, MessageSquare } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Header() {
  const isMobile = useIsMobile();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-sidebar-border bg-background px-4 sm:px-6">
      {isMobile && (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar />
          </SheetContent>
        </Sheet>
      )}
      
      <div className={`relative flex-1 ${isMobile && isSearchFocused ? 'max-w-full' : 'max-w-md'}`}>
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-muted-foreground">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
        <Input 
          type="search" 
          placeholder="Search everything..." 
          className="pl-10"
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
        />
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="hidden sm:flex">
          <BarChart3 className="h-5 w-5" />
          <span className="sr-only">Analytics</span>
        </Button>
        <Button variant="ghost" size="icon" className="hidden sm:flex">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Link href="#ai-assistant">
          <Button variant="outline" className="hidden md:flex items-center gap-2">
            <span>AI Assistant</span>
            <MessageSquare className="h-4 w-4 text-primary" />
          </Button>
        </Link>
      </div>
    </header>
  );
}
