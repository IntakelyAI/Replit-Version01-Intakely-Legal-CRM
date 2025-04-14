import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  MessageSquare, 
  Settings, 
  Users, 
  BarChart, 
  Building, 
  Building2,
  MessageCircle, 
  Bell,
  ChevronDown,
  ChevronRight,
  LogOut,
  FileText,
  Phone,
  Clock,
  Wrench,
  UserCircle,
  UserCog,
  Target,
  Presentation,
  Bot,
  CreditCard,
  ClipboardList,
  Activity,
  ChevronLeft,
  Calendar,
  ListTodo,
  CreditCard as CreditCardIcon,
  Briefcase,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  isCollapsed?: boolean;
  setIsCollapsed?: (value: boolean) => void;
};

interface NavigationItemProps {
  icon: React.ReactNode;
  label: string;
  path?: string;
  isActive?: boolean;
  badge?: number;
  onClick?: () => void;
  isCollapsed?: boolean;
}

// Fix the nested <a> issue by using a different pattern for links in collapsed mode
const NavigationItem = ({ 
  icon, 
  label, 
  path, 
  isActive, 
  badge, 
  onClick,
  isCollapsed
}: NavigationItemProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  if (isCollapsed) {
    return (
      <div className="relative group">
        {path ? (
          <Link href={path}>
            <div 
              className={cn(
                "flex justify-center items-center h-8 w-8 rounded-md cursor-pointer mx-auto my-2",
                isActive ? "bg-primary/10 text-primary" : "hover:bg-accent/50 text-foreground hover:text-primary"
              )}
            >
              {icon}
            </div>
          </Link>
        ) : (
          <div 
            onClick={handleClick}
            className={cn(
              "flex justify-center items-center h-8 w-8 rounded-md cursor-pointer mx-auto my-2",
              isActive ? "bg-primary/10 text-primary" : "hover:bg-accent/50 text-foreground hover:text-primary"
            )}
          >
            {icon}
          </div>
        )}
        <div className="absolute left-full top-0 ml-2 hidden z-50 group-hover:block bg-popover border shadow-md rounded-md py-2 px-3 whitespace-nowrap">
          <span className="text-sm font-medium">{label}</span>
          {badge && (
            <span className="ml-2 bg-primary/90 text-primary-foreground text-xs font-semibold rounded-full h-4 w-4 flex items-center justify-center">
              {badge}
            </span>
          )}
        </div>
      </div>
    );
  }

  if (!path && onClick) {
    return (
      <button
        onClick={handleClick}
        className={cn(
          "flex w-full items-center h-8 px-2 text-sm rounded-md",
          isActive 
            ? "bg-primary/10 text-primary font-medium" 
            : "hover:bg-accent/60 hover:text-primary"
        )}
      >
        <span className="w-4 h-4 mr-2">{icon}</span>
        <span className="text-sm">{label}</span>
        {badge && (
          <span className="ml-auto bg-primary/90 text-primary-foreground text-xs font-semibold rounded-full h-4 w-4 flex items-center justify-center">
            {badge}
          </span>
        )}
      </button>
    );
  }

  return (
    <Link href={path || '#'}>
      <div
        className={cn(
          "flex items-center h-8 px-2 text-sm rounded-sm cursor-pointer border-l-2 transition-all",
          isActive 
            ? "border-primary bg-primary/5 font-medium" 
            : "border-transparent hover:bg-accent/30 hover:border-primary"
        )}
        onClick={handleClick}
      >
        <span className={cn("w-4 h-4 mr-2", isActive ? "text-primary" : "")}>{icon}</span>
        <span className="text-sm">{label}</span>
        {badge && (
          <span className="ml-auto bg-primary/90 text-primary-foreground text-xs font-semibold rounded-full h-4 w-4 flex items-center justify-center">
            {badge}
          </span>
        )}
      </div>
    </Link>
  );
};

interface ExpandableMenuItemProps {
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  isActive?: boolean;
  isCollapsed?: boolean;
  path?: string;
}

const ExpandableMenuItem = ({ 
  icon, 
  label, 
  isOpen, 
  onToggle, 
  children,
  isActive,
  isCollapsed,
  path
}: ExpandableMenuItemProps) => {
  if (isCollapsed) {
    return (
      <div className="relative group">
        {path ? (
          <Link href={path}>
            <div 
              className={cn(
                "flex justify-center items-center h-8 w-8 rounded-md cursor-pointer mx-auto my-2",
                isActive || isOpen ? "bg-primary/10 text-primary" : "hover:bg-accent/50 text-foreground hover:text-primary"
              )}
            >
              {icon}
            </div>
          </Link>
        ) : (
          <div 
            onClick={onToggle}
            className={cn(
              "flex justify-center items-center h-8 w-8 rounded-md cursor-pointer mx-auto my-2",
              isActive || isOpen ? "bg-primary/10 text-primary" : "hover:bg-accent/50 text-foreground hover:text-primary"
            )}
          >
            {icon}
          </div>
        )}
        <div className="absolute left-full top-0 ml-2 hidden z-50 group-hover:block bg-popover border shadow-md rounded-md py-2 w-48">
          <div className="px-3 py-1 border-b mb-1 text-sm font-medium">{label}</div>
          <div className="max-h-[60vh] overflow-y-auto px-1">
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-1">
      <div 
        className={cn(
          "flex items-center h-7 px-2 text-sm rounded-sm cursor-pointer border-l-2 transition-all",
          isActive || isOpen
            ? "border-primary bg-primary/5 font-medium" 
            : "border-transparent hover:bg-accent/30 hover:border-primary"
        )}
        onClick={onToggle}
      >
        <span className={cn("w-4 h-4 mr-2", (isActive || isOpen) ? "text-primary" : "")}>{icon}</span>
        <span className="text-sm flex-1">{label}</span>
        <span className={cn("transition-transform", isOpen ? "rotate-180" : "rotate-0")}>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </span>
      </div>
      
      {isOpen && (
        <div className="ml-5 pl-2 border-l border-border/50 mt-1 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
};

const SubMenuItem = ({ 
  icon, 
  label, 
  path, 
  isActive 
}: NavigationItemProps) => {
  return (
    <Link href={path || '#'}>
      <div
        className={cn(
          "flex items-center h-7 px-2 text-sm rounded-sm cursor-pointer border-l-2 transition-all",
          isActive 
            ? "border-primary bg-primary/5 font-medium" 
            : "border-transparent hover:bg-accent/30 hover:border-primary"
        )}
      >
        <span className={cn("w-4 h-4 mr-2", isActive ? "text-primary" : "")}>{icon}</span>
        <span className="text-sm">{label}</span>
      </div>
    </Link>
  );
};

export function Sidebar({ isOpen, setIsOpen, isCollapsed, setIsCollapsed }: SidebarProps) {
  const [location] = useLocation();
  const [expandedItems, setExpandedItems] = useState<{[key: string]: boolean}>({
    // Set expanded state for menu sections
    agentBuilder: false,
    spaces: false,
    operations: false,
    leads: false,
    clients: false,
    company: false,
    contacts: false,
    linkedInfo: false,
    referrals: false,
    lawFirm: false,
    staff: false,
    onboarding: false
  });
  
  // Local collapsed state if not provided from props
  const [localCollapsed, setLocalCollapsed] = useState(false);
  const collapsed = isCollapsed !== undefined ? isCollapsed : localCollapsed;
  
  const toggleCollapsed = () => {
    if (setIsCollapsed) {
      setIsCollapsed(!collapsed);
    } else {
      setLocalCollapsed(!localCollapsed);
    }
  };
  
  // Helper function to check if a path is active
  const isActivePath = (path: string) => {
    return location === path || location.startsWith(path + '/');
  };
  
  const toggleExpanded = (item: string) => {
    if (!collapsed) {
      setExpandedItems(prev => ({
        ...prev,
        [item]: !prev[item]
      }));
    }
  };

  // Generate law firm secondary navigation if in a space
  const renderFirmNavigation = () => {
    if (location.startsWith('/spaces/') && location.split('/').length > 2) {
      // Add code to render secondary navigation
    }
  };
  
  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 z-20 overflow-hidden bg-background border-r flex-shrink-0 transition-all duration-300 ease-in-out",
      collapsed ? "w-12" : "w-56",
      isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
    )}>
      <div className="flex h-10 items-center justify-between px-2 border-b">
        {!collapsed && (
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-5 h-5 bg-primary rounded flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">I</span>
              </div>
              <span className="text-base font-semibold">Intakely</span>
            </div>
          </Link>
        )}
        
        <Button 
          variant="ghost" 
          size="sm"
          className={cn("h-6 w-6 p-0", collapsed && "ml-auto mr-auto")}
          onClick={toggleCollapsed}
        >
          {collapsed ? (
            <div className="flex items-center justify-center bg-muted/40 rounded w-5 h-5">
              <svg 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="text-foreground"
              >
                <path 
                  d="M15 6l-6 6 6 6" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                <path 
                  d="M9 6l-6 6 6 6" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="opacity-20" 
                />
              </svg>
            </div>
          ) : (
            <div className="flex items-center justify-center bg-muted/40 rounded w-5 h-5">
              <svg 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="text-foreground"
              >
                <path 
                  d="M9 18l6-6-6-6" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                <path 
                  d="M15 18l6-6-6-6" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="opacity-20" 
                />
              </svg>
            </div>
          )}
        </Button>
      </div>

      <ScrollArea className="flex-1 py-2 px-1 h-[calc(100vh-6rem)]">
        <nav className="space-y-1 flex flex-col h-full">
          {/* Top Section - The 4 main layers */}
          <div>
            <NavigationItem 
              icon={<MessageSquare size={14} />} 
              label="Personal Assistant" 
              path="/"
              isActive={location === '/' || location === '/assistant'} 
              isCollapsed={collapsed}
            />
            
            {/* Agent Builder section */}
            <ExpandableMenuItem
              icon={<Bot size={14} />}
              label="Agent Builder"
              isOpen={expandedItems.agentBuilder}
              onToggle={() => toggleExpanded('agentBuilder')}
              isActive={isActivePath('/agent-builder')}
              isCollapsed={collapsed}
              path="/agent-builder"
            >
              <SubMenuItem
                icon={<Users size={14} />}
                label="Agents"
                path="/agent-builder/agents"
                isActive={isActivePath('/agent-builder/agents')}
              />
              <SubMenuItem
                icon={<FileText size={14} />}
                label="Knowledge Base"
                path="/agent-builder/knowledge-base"
                isActive={isActivePath('/agent-builder/knowledge-base')}
              />
              <SubMenuItem
                icon={<Phone size={14} />}
                label="Phone Numbers"
                path="/agent-builder/phone-numbers"
                isActive={isActivePath('/agent-builder/phone-numbers')}
              />
              <SubMenuItem
                icon={<FileText size={14} />}
                label="Batch Call"
                path="/agent-builder/batch-call"
                isActive={isActivePath('/agent-builder/batch-call')}
              />
              <SubMenuItem
                icon={<Clock size={14} />}
                label="Call History"
                path="/agent-builder/call-history"
                isActive={isActivePath('/agent-builder/call-history')}
              />
              <SubMenuItem
                icon={<BarChart size={14} />}
                label="Analytics"
                path="/agent-builder/analytics"
                isActive={isActivePath('/agent-builder/analytics')}
              />
              <SubMenuItem
                icon={<Wrench size={14} />}
                label="Tools"
                path="/agent-builder/tools"
                isActive={isActivePath('/agent-builder/tools')}
              />
            </ExpandableMenuItem>
            
            {/* Spaces: Law Firms section */}
            <ExpandableMenuItem
              icon={<Building size={14} />}
              label="Spaces : Law Firms"
              isOpen={expandedItems.spaces}
              onToggle={() => toggleExpanded('spaces')}
              isActive={isActivePath('/spaces')}
              isCollapsed={collapsed}
              path="/spaces"
            >
              {!collapsed && (
                <div className="mb-2">
                  <input
                    className="w-full px-2 py-1 text-xs rounded bg-accent/40 placeholder-muted-foreground outline-none"
                    placeholder="Search spaces..."
                  />
                </div>
              )}
              
              <div className="text-[10px] uppercase font-semibold text-muted-foreground mb-1 px-1">
                Recent Spaces
              </div>
              
              <SubMenuItem
                icon={<Building2 size={14} />}
                label="Smith Law Group"
                path="/spaces/smith-law"
                isActive={isActivePath('/spaces/smith-law')}
              />
              <SubMenuItem
                icon={<Building2 size={14} />}
                label="Johnson Legal"
                path="/spaces/johnson-legal"
                isActive={isActivePath('/spaces/johnson-legal')}
              />
              
              {!collapsed && (
                <Button variant="ghost" size="sm" className="w-full mt-1 text-xs h-6">
                  <span className="mr-1 text-xs">+</span> New Space
                </Button>
              )}
            </ExpandableMenuItem>
            
            {/* Intakely Operations section */}
            <ExpandableMenuItem
              icon={<BarChart size={14} />}
              label="Intakely Operations"
              isOpen={expandedItems.operations}
              onToggle={() => toggleExpanded('operations')}
              isActive={isActivePath('/operations')}
              isCollapsed={collapsed}
              path="/operations"
            >
              <SubMenuItem
                icon={<UserCog size={14} />}
                label="User Management"
                path="/operations/user-management"
                isActive={isActivePath('/operations/user-management')}
              />
              <SubMenuItem
                icon={<Target size={14} />}
                label="Market Targeting"
                path="/operations/market-targeting"
                isActive={isActivePath('/operations/market-targeting')}
              />
              <SubMenuItem
                icon={<Presentation size={14} />}
                label="Sales Demos"
                path="/operations/sales-demos"
                isActive={isActivePath('/operations/sales-demos')}
              />
              <SubMenuItem
                icon={<Bot size={14} />}
                label="AI-Led Onboarding"
                path="/operations/ai-onboarding"
                isActive={isActivePath('/operations/ai-onboarding')}
              />
              <SubMenuItem
                icon={<CreditCard size={14} />}
                label="Subscription"
                path="/operations/subscription"
                isActive={isActivePath('/operations/subscription')}
              />
              <SubMenuItem
                icon={<Users size={14} />}
                label="Customer Success"
                path="/operations/customer-success"
                isActive={isActivePath('/operations/customer-success')}
              />
              <SubMenuItem
                icon={<ClipboardList size={14} />}
                label="Internal Operations"
                path="/operations/internal-operations"
                isActive={isActivePath('/operations/internal-operations')}
              />
              <SubMenuItem
                icon={<Settings size={14} />}
                label="Internal Automation"
                path="/operations/internal-automation"
                isActive={isActivePath('/operations/internal-automation')}
              />
              <SubMenuItem
                icon={<Activity size={14} />}
                label="Activity Logging"
                path="/operations/activity-logging"
                isActive={isActivePath('/operations/activity-logging')}
              />
              <SubMenuItem
                icon={<BarChart size={14} />}
                label="Performance Metrics"
                path="/operations/performance-metrics"
                isActive={isActivePath('/operations/performance-metrics')}
              />
            </ExpandableMenuItem>
          </div>
          
          {/* Secondary Law Firm navigation items (only shown when a firm is selected) */}
          {location.startsWith('/spaces/') && location.split('/').length > 2 && !collapsed && (
            <div className="pt-2 mt-2 border-t border-border/40 space-y-1">
              <div className="text-[10px] uppercase font-semibold text-muted-foreground mb-1 px-2">
                Firm Navigation
              </div>
              <NavigationItem 
                icon={<MessageSquare size={14} />} 
                label="Communications" 
                path={`${location}/communications`}
                isActive={isActivePath(`${location}/communications`)} 
                isCollapsed={collapsed}
              />
              <NavigationItem 
                icon={<Calendar size={14} />} 
                label="Appointments" 
                path={`${location}/appointments`}
                isActive={isActivePath(`${location}/appointments`)} 
                isCollapsed={collapsed}
                badge={5}
              />
              <NavigationItem 
                icon={<ListTodo size={14} />} 
                label="Interactions/Tasks" 
                path={`${location}/interactions`}
                isActive={isActivePath(`${location}/interactions`)} 
                isCollapsed={collapsed}
              />
              <NavigationItem 
                icon={<FileText size={14} />} 
                label="Documents" 
                path={`${location}/documents`}
                isActive={isActivePath(`${location}/documents`)} 
                isCollapsed={collapsed}
              />
              <NavigationItem 
                icon={<CreditCardIcon size={14} />} 
                label="Billing" 
                path={`${location}/billing`}
                isActive={isActivePath(`${location}/billing`)} 
                isCollapsed={collapsed}
              />
              <NavigationItem 
                icon={<Briefcase size={14} />} 
                label="Cases/Matters" 
                path={`${location}/cases`}
                isActive={isActivePath(`${location}/cases`)} 
                isCollapsed={collapsed}
              />
            </div>
          )}
          
          {/* Bottom section for system controls */}
          <div className="mt-auto space-y-1">
            {!collapsed && (
              <div className="pt-6 pb-2">
                <Separator className="my-1 bg-border/40" />
                {!collapsed && (
                  <div className="text-[10px] uppercase font-semibold text-muted-foreground mx-2 my-2">
                    Account & System
                  </div>
                )}
              </div>
            )}
            
            <NavigationItem 
              icon={<Users size={14} />} 
              label="Contacts" 
              path="/contacts"
              isActive={isActivePath('/contacts')} 
              isCollapsed={collapsed}
            />
            
            <NavigationItem 
              icon={<MessageCircle size={14} />} 
              label="Channels" 
              path="/channels"
              isActive={isActivePath('/channels')} 
              isCollapsed={collapsed}
            />
            
            <NavigationItem 
              icon={<Bell size={14} />} 
              label="Notifications" 
              path="/notifications"
              isActive={isActivePath('/notifications')} 
              badge={3}
              isCollapsed={collapsed}
            />
            
            <NavigationItem 
              icon={<Settings size={14} />} 
              label="Settings" 
              path="/settings"
              isActive={isActivePath('/settings')} 
              isCollapsed={collapsed}
            />
          </div>
        </nav>
      </ScrollArea>

      {!collapsed && (
        <div className="p-2 border-t flex items-center h-12">
          <div className="flex-shrink-0">
            <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium text-xs">
              AH
            </div>
          </div>
          <div className="ml-2 overflow-hidden">
            <p className="text-xs font-medium truncate">Ahmad Hassan</p>
            <p className="text-[10px] text-muted-foreground truncate">Legal Tech Admin</p>
          </div>
          <Button
            variant="ghost" 
            size="icon" 
            className="ml-auto h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
          >
            <LogOut size={12} />
          </Button>
        </div>
      )}
    </aside>
  );
}
