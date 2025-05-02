import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { 
  MessageSquare, 
  Building2, 
  Bot, 
  BarChart3, 
  Users, 
  Bell,
  Settings,
  FileText,
  Phone,
  Clock,
  Wrench,
  UserCog,
  Target,
  CreditCard,
  HeartHandshake,
  ClipboardList,
  Workflow,
  Activity,
  ChevronRight,
  ChevronLeft,
  PlusCircle,
  Search,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { useFirm } from "@/components/providers/firm-provider";

interface MainNavigationItemProps {
  icon: React.ReactNode;
  label: string;
  path?: string;
  isCollapsed: boolean;
  isActive?: boolean;
  badge?: number;
  onClick?: () => void;
}

const MainNavigationItem = ({ 
  icon, 
  label, 
  path, 
  isCollapsed, 
  isActive, 
  badge, 
  onClick 
}: MainNavigationItemProps) => {
  const handleClick = () => {
    if (path) {
      window.location.href = path;
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "flex items-center rounded-md px-2 py-2 cursor-pointer transition-colors",
        isActive 
          ? "bg-primary/10 text-primary hover:bg-primary/20" 
          : "hover:bg-accent hover:text-accent-foreground",
        isCollapsed ? "justify-center" : "justify-between"
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-md">
          {icon}
        </div>
        {!isCollapsed && <span className="text-sm font-medium">{label}</span>}
      </div>
      {!isCollapsed && badge !== undefined && (
        <Badge variant="secondary" className="ml-auto">
          {badge}
        </Badge>
      )}
    </div>
  );
};

interface ExpandableMenuItemProps {
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const ExpandableMenuItem = ({ 
  icon, 
  label, 
  isCollapsed, 
  isOpen, 
  onToggle, 
  children 
}: ExpandableMenuItemProps) => {
  if (isCollapsed) {
    return (
      <div className="relative group">
        <div
          onClick={onToggle}
          className={cn(
            "flex items-center justify-center rounded-md px-2 py-2 cursor-pointer transition-colors",
            isOpen
              ? "bg-primary/10 text-primary hover:bg-primary/20"
              : "hover:bg-accent hover:text-accent-foreground"
          )}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-md">
            {icon}
          </div>
        </div>
        <div className="absolute left-full top-0 ml-2 hidden bg-background border rounded-md shadow-md z-10 w-56 p-2 group-hover:block">
          <div className="text-sm font-medium px-3 py-2 border-b mb-2">{label}</div>
          {children}
        </div>
      </div>
    );
  }

  return (
    <Collapsible open={isOpen} onOpenChange={onToggle} className="w-full">
      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-2 py-2 hover:bg-accent hover:text-accent-foreground transition-colors">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md">
            {icon}
          </div>
          <span className="text-sm font-medium">{label}</span>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isOpen ? "rotate-180" : "rotate-0"
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-1 pt-1">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

interface SubMenuItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  isActive?: boolean;
}

const SubMenuItem = ({ icon, label, path, isActive }: SubMenuItemProps) => {
  return (
    <div
      onClick={() => window.location.href = path}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors cursor-pointer",
        isActive 
          ? "bg-primary/10 text-primary hover:bg-primary/20" 
          : "hover:bg-accent hover:text-accent-foreground"
      )}
    >
      {icon}
      <span className="truncate">{label}</span>
    </div>
  );
};

interface RecentFirmItemProps {
  name: string;
  path: string;
  isActive?: boolean;
  onSelect: (name: string) => void;
}

const RecentFirmItem = ({ name, path, isActive, onSelect }: RecentFirmItemProps) => {
  return (
    <div
      onClick={() => onSelect(name)}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors cursor-pointer",
        isActive 
          ? "bg-primary/10 text-primary hover:bg-primary/20" 
          : "hover:bg-accent hover:text-accent-foreground"
      )}
    >
      <Building2 className="h-4 w-4" />
      <span className="truncate">{name}</span>
    </div>
  );
};

export default function MainNavigationEnhanced() {
  const [location] = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [firmSearchTerm, setFirmSearchTerm] = useState("");
  
  const { selectFirm } = useFirm();
  
  const toggleExpandedItem = (item: string) => {
    if (expandedItem === item) {
      setExpandedItem(null);
    } else {
      setExpandedItem(item);
    }
  };
  
  // Mock data for recent firms
  const recentFirms = [
    { name: "Oakwood Law Firm", path: "/law-firms/oakwood" },
    { name: "Johnson & Partners", path: "/law-firms/johnson" },
    { name: "Legal Eagles LLC", path: "/law-firms/legal-eagles" },
    { name: "Smith & Associates", path: "/law-firms/smith" },
    { name: "Metro Legal Group", path: "/law-firms/metro" },
  ];
  
  const filteredFirms = firmSearchTerm 
    ? recentFirms.filter(firm => 
        firm.name.toLowerCase().includes(firmSearchTerm.toLowerCase())
      )
    : recentFirms;
  
  // Helper function to check if a path is active
  const isActivePath = (path: string) => {
    return location === path || location.startsWith(path + '/');
  };
  
  const handleSelectFirm = (firmName: string) => {
    selectFirm(recentFirms.find(f => f.name === firmName)?.path.split('/').pop() || '');
  };
  
  // Function to handle the Agent Builder click
  const handleAgentBuilderClick = () => {
    if (expandedItem === "agentBuilder") {
      setExpandedItem(null);
    } else {
      setExpandedItem("agentBuilder");
    }
  };

  // Function to navigate to Agent Builder page
  const navigateToAgentBuilder = () => {
    window.location.href = "/agent-builder";
  };
  
  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-30 flex flex-col bg-background border-r transition-all duration-200",
        isCollapsed ? "w-[68px]" : "w-[280px]"
      )}
    >
      {/* Logo and collapse button */}
      <div className="flex h-16 items-center justify-between border-b px-3">
        <div className="flex items-center gap-2">
          <svg className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {!isCollapsed && <span className="text-lg font-semibold">Intakely</span>}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      {/* Navigation items */}
      <div className="flex-1 overflow-auto p-3 space-y-4">
        {/* Top Section */}
        <div className="space-y-1">
          <MainNavigationItem
            icon={<MessageSquare className="h-5 w-5" />}
            label="Personal Assistant"
            path="/assistant"
            isCollapsed={isCollapsed}
            isActive={isActivePath("/assistant")}
          />
          
          {/* Direct Agent Builder Navigation Item */}
          <MainNavigationItem
            icon={<Bot className="h-5 w-5" />}
            label="Agent Builder"
            isCollapsed={isCollapsed}
            isActive={isActivePath("/agent-builder")}
            onClick={navigateToAgentBuilder}
          />
          
          {/* Show the Agent Builder submenu when expandedItem is "agentBuilder" */}
          {expandedItem === "agentBuilder" && !isCollapsed && (
            <div className="pl-10 space-y-1 mt-1">
              <SubMenuItem
                icon={<Users className="h-4 w-4" />}
                label="Agents"
                path="/agent-builder/agents"
                isActive={isActivePath("/agent-builder/agents")}
              />
              <SubMenuItem
                icon={<FileText className="h-4 w-4" />}
                label="Knowledge Base"
                path="/agent-builder/knowledge-base"
                isActive={isActivePath("/agent-builder/knowledge-base")}
              />
              <SubMenuItem
                icon={<Phone className="h-4 w-4" />}
                label="Phone Numbers"
                path="/agent-builder/phone-numbers"
                isActive={isActivePath("/agent-builder/phone-numbers")}
              />
              <SubMenuItem
                icon={<Clock className="h-4 w-4" />}
                label="Call History"
                path="/agent-builder/call-history"
                isActive={isActivePath("/agent-builder/call-history")}
              />
              <SubMenuItem
                icon={<BarChart3 className="h-4 w-4" />}
                label="Analytics"
                path="/agent-builder/analytics"
                isActive={isActivePath("/agent-builder/analytics")}
              />
            </div>
          }
          
          {/* Law Firms (Expandable) */}
          <ExpandableMenuItem
            icon={<Building2 className="h-5 w-5" />}
            label="Spaces : Law Firms"
            isCollapsed={isCollapsed}
            isOpen={expandedItem === "lawFirms"}
            onToggle={() => toggleExpandedItem("lawFirms")}
          >
            {!isCollapsed && (
              <div className="px-3 py-2">
                <Input
                  placeholder="Search spaces..."
                  value={firmSearchTerm}
                  onChange={(e) => setFirmSearchTerm(e.target.value)}
                  className="mb-2 h-8"
                />
              </div>
            )}
            <div className="space-y-1">
              {filteredFirms.map((firm) => (
                <RecentFirmItem
                  key={firm.path}
                  name={firm.name}
                  path={firm.path}
                  isActive={isActivePath(firm.path)}
                  onSelect={handleSelectFirm}
                />
              ))}
            </div>
            {!isCollapsed && (
              <Button variant="outline" className="w-full mt-2 text-xs">
                <PlusCircle className="mr-2 h-3.5 w-3.5" />
                <span>Create New Space</span>
              </Button>
            )}
          </ExpandableMenuItem>
          
          {/* For debugging only - Hide this second AgentBuilder item */}
            <div className="space-y-1">
              <SubMenuItem
                icon={<Users className="h-4 w-4" />}
                label="Agents"
                path="/agent-builder/agents"
                isActive={isActivePath("/agent-builder/agents")}
              />
              <SubMenuItem
                icon={<FileText className="h-4 w-4" />}
                label="Knowledge Base"
                path="/agent-builder/knowledge-base"
                isActive={isActivePath("/agent-builder/knowledge-base")}
              />
              <SubMenuItem
                icon={<Phone className="h-4 w-4" />}
                label="Phone Numbers"
                path="/agent-builder/phone-numbers"
                isActive={isActivePath("/agent-builder/phone-numbers")}
              />
              <SubMenuItem
                icon={<FileText className="h-4 w-4" />}
                label="Batch Call"
                path="/agent-builder/batch-call"
                isActive={isActivePath("/agent-builder/batch-call")}
              />
              <SubMenuItem
                icon={<Clock className="h-4 w-4" />}
                label="Call History"
                path="/agent-builder/call-history"
                isActive={isActivePath("/agent-builder/call-history")}
              />
              <SubMenuItem
                icon={<BarChart3 className="h-4 w-4" />}
                label="Analytics"
                path="/agent-builder/analytics"
                isActive={isActivePath("/agent-builder/analytics")}
              />
              <SubMenuItem
                icon={<Wrench className="h-4 w-4" />}
                label="Tools"
                path="/agent-builder/tools"
                isActive={isActivePath("/agent-builder/tools")}
              />
            </div>
          </ExpandableMenuItem>
          
          {/* Intakely Operations (Expandable) */}
          <ExpandableMenuItem
            icon={<BarChart3 className="h-5 w-5" />}
            label="Intakely Operations"
            isCollapsed={isCollapsed}
            isOpen={expandedItem === "operations"}
            onToggle={() => toggleExpandedItem("operations")}
          >
            <div className="space-y-1">
              <SubMenuItem
                icon={<UserCog className="h-4 w-4" />}
                label="User Management"
                path="/operations/user-management"
                isActive={isActivePath("/operations/user-management")}
              />
              <SubMenuItem
                icon={<Target className="h-4 w-4" />}
                label="Market Targeting"
                path="/operations/market-targeting"
                isActive={isActivePath("/operations/market-targeting")}
              />
              <SubMenuItem
                icon={<BarChart3 className="h-4 w-4" />}
                label="Sales Demos"
                path="/operations/sales-demos"
                isActive={isActivePath("/operations/sales-demos")}
              />
              <SubMenuItem
                icon={<Bot className="h-4 w-4" />}
                label="AI Onboarding"
                path="/operations/ai-onboarding"
                isActive={isActivePath("/operations/ai-onboarding")}
              />
              <SubMenuItem
                icon={<CreditCard className="h-4 w-4" />}
                label="Subscription"
                path="/operations/subscription"
                isActive={isActivePath("/operations/subscription")}
              />
              <SubMenuItem
                icon={<HeartHandshake className="h-4 w-4" />}
                label="Customer Success"
                path="/operations/customer-success"
                isActive={isActivePath("/operations/customer-success")}
              />
              <SubMenuItem
                icon={<ClipboardList className="h-4 w-4" />}
                label="Internal Operations"
                path="/operations/internal-operations"
                isActive={isActivePath("/operations/internal-operations")}
              />
              <SubMenuItem
                icon={<Workflow className="h-4 w-4" />}
                label="Internal Automation"
                path="/operations/internal-automation"
                isActive={isActivePath("/operations/internal-automation")}
              />
              <SubMenuItem
                icon={<Activity className="h-4 w-4" />}
                label="Activity Logging"
                path="/operations/activity-logging"
                isActive={isActivePath("/operations/activity-logging")}
              />
              <SubMenuItem
                icon={<BarChart3 className="h-4 w-4" />}
                label="Performance Metrics"
                path="/operations/performance-metrics"
                isActive={isActivePath("/operations/performance-metrics")}
              />
            </div>
          </ExpandableMenuItem>
        </div>
        
        {/* Bottom Section - always visible */}
        <div className="space-y-1 mt-auto">
          <MainNavigationItem
            icon={<Users className="h-5 w-5" />}
            label="Contacts"
            path="/contacts"
            isCollapsed={isCollapsed}
            isActive={isActivePath("/contacts")}
          />
          <MainNavigationItem
            icon={<MessageSquare className="h-5 w-5" />}
            label="Channels"
            path="/channels"
            isCollapsed={isCollapsed}
            isActive={isActivePath("/channels")}
          />
          <MainNavigationItem
            icon={<Bell className="h-5 w-5" />}
            label="Notifications"
            path="/notifications"
            isCollapsed={isCollapsed}
            isActive={isActivePath("/notifications")}
            badge={3}
          />
          <MainNavigationItem
            icon={<Settings className="h-5 w-5" />}
            label="Settings"
            path="/settings"
            isCollapsed={isCollapsed}
            isActive={isActivePath("/settings")}
          />
        </div>
      </div>
      
      {/* User profile */}
      <div className="border-t p-3">
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
            alt="User avatar"
            className="h-9 w-9 rounded-full"
          />
          {!isCollapsed && (
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">Ahmad Hassan</p>
              <p className="text-xs text-muted-foreground truncate">Legal Tech Admin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}