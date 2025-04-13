import { Link, useLocation } from "wouter";
import { LayoutDashboard, Briefcase, Bot, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MobileNav() {
  const [location] = useLocation();
  
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t border-sidebar-border bg-sidebar md:hidden">
      <div className="flex h-16 items-center justify-around px-4">
        <MobileNavLink 
          href="/dashboard" 
          icon={<LayoutDashboard className="h-5 w-5" />} 
          label="Dashboard" 
          isActive={location === "/" || location === "/dashboard"} 
        />
        <MobileNavLink 
          href="/law-firms" 
          icon={<Briefcase className="h-5 w-5" />} 
          label="Firms" 
          isActive={location === "/law-firms" || location === "/clients" || location === "/cases" || location === "/documents"} 
        />
        <MobileNavLink 
          href="/agent-builder" 
          icon={<Bot className="h-5 w-5" />} 
          label="Agents" 
          isActive={location === "/agent-builder" || location === "/knowledge-base" || location === "/call-center" || location === "/analytics"} 
        />
        <MobileNavLink 
          href="#" 
          icon={<MessageSquare className="h-5 w-5" />} 
          label="AI Help" 
          isActive={false} 
          onClick={(e) => {
            e.preventDefault();
            // Open AI assistant dialog
            // This would use a context to toggle the AI assistant visibility
          }}
        />
      </div>
    </div>
  );
}

type MobileNavLinkProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

function MobileNavLink({ href, icon, label, isActive, onClick }: MobileNavLinkProps) {
  return (
    <Link href={href}>
      <a 
        className={cn(
          "flex flex-col items-center justify-center", 
          isActive ? "text-primary" : "text-sidebar-muted hover:text-primary"
        )}
        onClick={onClick}
      >
        {icon}
        <span className="mt-1 text-xs">{label}</span>
      </a>
    </Link>
  );
}
