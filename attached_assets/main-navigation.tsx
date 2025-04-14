import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Building2,
  Bot,
  BarChart3,
  MessagesSquare,
  Users,
  Bell,
  Settings,
  Plus,
  Search,
  FileText,
  Phone,
  Clock,
  Wrench,
  BarChart2,
  UserCog,
  HelpCircle,
  FileCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useFirm } from "../providers/firm-provider";
import { useAIAssistant } from "../providers/ai-assistant-provider";

type MainMenuItem = {
  name: string;
  icon: React.ElementType;
  path?: string;
  children?: { name: string; icon?: React.ElementType; path: string }[];
  badge?: string;
  recentFirms?: { name: string; id: string; type: string }[];
};

export default function MainNavigation() {
  const [expanded, setExpanded] = useState(true);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [location] = useLocation();
  const { selectFirm, firms } = useFirm();
  const { toggleAssistant, setCurrentSection } = useAIAssistant();

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const toggleSection = (name: string) => {
    if (expandedSection === name) {
      setExpandedSection(null);
    } else {
      setExpandedSection(name);
    }
  };

  const handleLawFirmSelect = (firmId: string) => {
    selectFirm(firmId);
    setExpanded(false);
  };

  const handleNavigate = (path: string) => {
    // Update the AI Assistant's context based on the current navigation section
    if (path.includes('dashboard')) {
      setCurrentSection('dashboard');
    } else if (path.includes('client')) {
      setCurrentSection('clients');
    } else if (path.includes('case')) {
      setCurrentSection('cases');
    } else if (path.includes('agent-builder')) {
      setCurrentSection('agent-builder');
    }
  };

  const topMenuItems: MainMenuItem[] = [
    {
      name: "Personal Assistant",
      icon: MessageSquare,
      path: "#",
      badge: "AI",
    },
    {
      name: "Spaces : Law Firms",
      icon: Building2,
      recentFirms: firms.map(firm => ({
        id: firm.id,
        name: firm.name,
        type: firm.type
      })),
    },
    {
      name: "Agent Builder",
      icon: Bot,
      children: [
        { name: "Agents", icon: Users, path: "/agent-builder" },
        { name: "Knowledge Base", icon: FileText, path: "/knowledge-base" },
        { name: "Phone Numbers", icon: Phone, path: "/call-center" },
        { name: "Call History", icon: Clock, path: "/call-center/history" },
        { name: "Analytics", icon: BarChart2, path: "/analytics" },
        { name: "Tools", icon: Wrench, path: "/agent-builder/tools" },
      ],
    },
  ];

  const bottomMenuItems: MainMenuItem[] = [
    {
      name: "Dashboard",
      icon: BarChart3,
      path: "/dashboard",
    },
    {
      name: "Law Firms",
      icon: Building2,
      path: "/law-firms",
    },
    {
      name: "Clients",
      icon: Users,
      path: "/clients",
    },
    {
      name: "Cases",
      icon: FileCheck,
      path: "/cases",
    },
    {
      name: "Documents",
      icon: FileText,
      path: "/documents",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/app-settings",
    },
    {
      name: "Help & Support",
      icon: HelpCircle,
      path: "/help",
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-black border-r border-border transition-all duration-200",
        expanded ? "w-64" : "w-16",
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          {expanded && (
            <span className="text-xl font-bold tracking-tight text-white">LexAI</span>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          onClick={toggleExpand}
        >
          {expanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex-1 overflow-auto">
        <TooltipProvider delayDuration={300}>
          <div className="space-y-2 p-2">
            {topMenuItems.map((item) => (
              <div key={item.name} className="relative">
                {item.recentFirms ? (
                  <>
                    <button
                      onClick={() => toggleSection(item.name)}
                      className={cn(
                        "flex items-center w-full rounded-md p-2 text-xs font-medium transition-colors",
                        "hover:bg-purple-900/30 hover:text-purple-300",
                        expandedSection === item.name && "bg-purple-900/50 text-purple-300",
                      )}
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="relative">
                            <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                            {item.badge && (
                              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center">
                                {item.badge}
                              </span>
                            )}
                          </div>
                        </TooltipTrigger>
                        {!expanded && <TooltipContent side="right">{item.name}</TooltipContent>}
                      </Tooltip>
                      {expanded && <span className="truncate text-left">{item.name}</span>}
                      {expanded && expandedSection === item.name && <ChevronLeft className="h-4 w-4 ml-auto" />}
                      {expanded && expandedSection !== item.name && <ChevronRight className="h-4 w-4 ml-auto" />}
                    </button>
                    {expanded && expandedSection === item.name && (
                      <div className="mt-1 ml-2 space-y-2 p-2 bg-gray-900/50 rounded-md">
                        <div className="relative">
                          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <input
                            type="text"
                            placeholder="Search spaces..."
                            className="w-full h-8 pl-8 pr-2 rounded-md bg-gray-800 text-sm border border-gray-700 focus:outline-none focus:ring-1 focus:ring-purple-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                        <div className="space-y-1 mt-2">
                          <p className="text-xs text-muted-foreground px-1">Recent</p>
                          {item.recentFirms
                            .filter(firm => 
                              searchQuery === "" || 
                              firm.name.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .map((firm) => (
                            <button
                              key={firm.id}
                              className="flex items-center w-full rounded-md p-2 text-xs font-medium transition-colors hover:bg-purple-900/30 hover:text-purple-300"
                              onClick={() => handleLawFirmSelect(firm.id)}
                            >
                              <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span className="truncate text-left">{firm.name}</span>
                            </button>
                          ))}
                        </div>
                        <Button
                          className="w-full mt-2 bg-purple-600 hover:bg-purple-700 text-white"
                          onClick={() => {
                            /* Handle create new firm */
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" /> Create New Space
                        </Button>
                      </div>
                    )}
                  </>
                ) : item.path === "#" ? (
                  <button
                    onClick={toggleAssistant}
                    className="flex items-center w-full rounded-md p-2 text-xs font-medium transition-colors hover:bg-purple-900/30 hover:text-purple-300"
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="relative">
                          <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                          {item.badge && (
                            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      </TooltipTrigger>
                      {!expanded && <TooltipContent side="right">{item.name}</TooltipContent>}
                    </Tooltip>
                    {expanded && <span className="truncate text-left">{item.name}</span>}
                  </button>
                ) : item.children ? (
                  <>
                    <button
                      onClick={() => toggleSection(item.name)}
                      className={cn(
                        "flex items-center w-full rounded-md p-2 text-xs font-medium transition-colors",
                        "hover:bg-purple-900/30 hover:text-purple-300",
                        expandedSection === item.name && "bg-purple-900/50 text-purple-300",
                      )}
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="relative">
                            <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                            {item.badge && (
                              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center">
                                {item.badge}
                              </span>
                            )}
                          </div>
                        </TooltipTrigger>
                        {!expanded && <TooltipContent side="right">{item.name}</TooltipContent>}
                      </Tooltip>
                      {expanded && <span className="truncate text-left">{item.name}</span>}
                      {expanded && expandedSection === item.name && <ChevronLeft className="h-4 w-4 ml-auto" />}
                      {expanded && expandedSection !== item.name && <ChevronRight className="h-4 w-4 ml-auto" />}
                    </button>
                    {expanded && expandedSection === item.name && (
                      <div className="mt-1 ml-8 space-y-1">
                        {item.children.map((child) => (
                          <Link 
                            key={child.name}
                            href={child.path}
                            onClick={() => handleNavigate(child.path)}
                          >
                            <a className="flex items-center justify-start w-full rounded-md p-2 text-xs font-medium transition-colors hover:bg-purple-900/30 hover:text-purple-300">
                              {child.icon && <child.icon className="h-4 w-4 mr-2 text-muted-foreground" />}
                              <span className="truncate text-left">{child.name}</span>
                            </a>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.path || "#"}
                    onClick={() => handleNavigate(item.path || "")}
                  >
                    <a className="flex items-center w-full rounded-md p-2 text-xs font-medium transition-colors hover:bg-purple-900/30 hover:text-purple-300">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="relative">
                            <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                            {item.badge && (
                              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center">
                                {item.badge}
                              </span>
                            )}
                          </div>
                        </TooltipTrigger>
                        {!expanded && <TooltipContent side="right">{item.name}</TooltipContent>}
                      </Tooltip>
                      {expanded && <span className="truncate text-left">{item.name}</span>}
                    </a>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </TooltipProvider>
      </div>

      <div className="p-2 space-y-2">
        <TooltipProvider delayDuration={300}>
          {bottomMenuItems.map((item) => (
            <Link
              key={item.name}
              href={item.path || "#"}
              onClick={() => handleNavigate(item.path || "")}
            >
              <a className={cn(
                "flex items-center justify-start w-full rounded-md p-2 text-xs font-medium transition-colors hover:bg-purple-900/30 hover:text-purple-300",
                location === item.path && "bg-purple-900/50 text-purple-300"
              )}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                      {item.badge && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </TooltipTrigger>
                  {!expanded && <TooltipContent side="right">{item.name}</TooltipContent>}
                </Tooltip>
                {expanded && <span className="truncate text-left">{item.name}</span>}
              </a>
            </Link>
          ))}
        </TooltipProvider>
      </div>
    </div>
  );
}