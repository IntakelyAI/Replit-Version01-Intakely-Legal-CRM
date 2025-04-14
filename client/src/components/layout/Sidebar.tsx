import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Home, 
  MessageSquare, 
  Settings, 
  Users, 
  BarChart, 
  Building, 
  MessageCircle, 
  Bell,
  ChevronDown,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

type NavItemProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
  isActive?: boolean;
  hasSubmenu?: boolean;
  onClick?: () => void;
};

const NavItem = ({ 
  href, 
  icon, 
  label, 
  badge, 
  isActive, 
  hasSubmenu, 
  onClick 
}: NavItemProps) => {
  return (
    <Link href={href}>
      <a
        className={cn(
          "flex items-center px-4 py-2.5 text-base font-medium rounded-md group",
          isActive 
            ? "bg-sidebar-accent text-white" 
            : "text-sidebar-foreground hover:bg-sidebar-accent/50"
        )}
        onClick={onClick}
      >
        <span className="mr-3 text-primary">{icon}</span>
        <span>{label}</span>
        {hasSubmenu && (
          <ChevronDown className="ml-auto h-5 w-5" />
        )}
        {badge && (
          <span className="ml-auto bg-primary text-primary-foreground text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
            {badge}
          </span>
        )}
      </a>
    </Link>
  );
};

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const [location] = useLocation();
  
  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 z-20 w-64 overflow-hidden bg-sidebar-bg border-r border-sidebar-border flex-shrink-0 transition-transform duration-300 ease-in-out",
      isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
    )}>
      <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
        <Link href="/">
          <a className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-white font-bold">I</span>
            </div>
            <span className="text-xl font-bold text-white">Intakely</span>
          </a>
        </Link>
        <button 
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setIsOpen(false)}
        >
          <span className="sr-only">Close sidebar</span>
          <svg 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>
      </div>

      <ScrollArea className="flex-1 py-2 px-2">
        <nav className="space-y-1">
          <NavItem 
            href="/" 
            icon={<Home size={20} />} 
            label="Dashboard" 
            isActive={location === '/'} 
          />
          
          <NavItem 
            href="/assistant" 
            icon={<MessageSquare size={20} />} 
            label="Personal Assistant" 
            isActive={location === '/assistant'} 
          />
          
          <NavItem 
            href="/agent-builder" 
            icon={<Settings size={20} />} 
            label="Agent Builder" 
            isActive={location === '/agent-builder'} 
            hasSubmenu
          />
          
          <NavItem 
            href="/spaces" 
            icon={<Building size={20} />} 
            label="Spaces : Law Firms" 
            isActive={location === '/spaces'} 
            hasSubmenu
          />
          
          <NavItem 
            href="/operations" 
            icon={<BarChart size={20} />} 
            label="Operations" 
            isActive={location === '/operations'} 
            hasSubmenu
          />
          
          <NavItem 
            href="/contacts" 
            icon={<Users size={20} />} 
            label="Contacts" 
            isActive={location === '/contacts'} 
          />
          
          <NavItem 
            href="/channels" 
            icon={<MessageCircle size={20} />} 
            label="Channels" 
            isActive={location === '/channels'} 
          />
          
          <NavItem 
            href="/notifications" 
            icon={<Bell size={20} />} 
            label="Notifications" 
            isActive={location === '/notifications'} 
            badge={3}
          />
          
          <NavItem 
            href="/settings" 
            icon={<Settings size={20} />} 
            label="Settings" 
            isActive={location === '/settings'} 
          />
        </nav>
      </ScrollArea>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-medium">
              AH
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">Ahmad Hassan</p>
            <p className="text-xs text-gray-400">Legal Tech Admin</p>
          </div>
          <button className="ml-auto text-gray-400 hover:text-white">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}
