import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Scale, 
  FileText, 
  Bot, 
  BookOpen, 
  Phone, 
  BarChart, 
  User, 
  Settings, 
  HelpCircle, 
  ChevronLeft, 
  ChevronRight, 
  LogOut 
} from "lucide-react";
import { cn } from "@/lib/utils";

type SidebarItemProps = {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  active?: boolean;
};

const SidebarItem = ({ href, icon, children, active }: SidebarItemProps) => {
  return (
    <Link href={href}>
      <a 
        className={cn(
          "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          active 
            ? "bg-primary/10 text-primary hover:bg-primary/20" 
            : "hover:bg-accent/50"
        )}
      >
        {icon}
        <span>{children}</span>
      </a>
    </Link>
  );
};

export default function Sidebar() {
  const [location] = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div 
      className={cn(
        "group/sidebar-wrapper peer fixed inset-y-0 z-10 flex-col bg-sidebar border-r border-sidebar-border transition-all duration-200 hidden md:flex",
        collapsed ? "w-16" : "w-64"
      )}
      data-state={collapsed ? "collapsed" : "expanded"}
    >
      <div className="flex h-16 items-center border-b border-sidebar-border px-4 py-2">
        <div className="flex items-center gap-2">
          <svg className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {!collapsed && <span className="text-lg font-semibold tracking-tight">LexAI</span>}
        </div>
        <button 
          className="ml-auto h-6 w-6 rounded-md hover:bg-accent"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
      
      <div className="flex-1 overflow-auto px-3 py-2">
        {/* Dashboard Section */}
        <div className="mb-4">
          <SidebarItem 
            href="/dashboard" 
            icon={<LayoutDashboard className="h-4 w-4" />} 
            active={location === "/" || location === "/dashboard"}
          >
            {!collapsed && "Dashboard"}
          </SidebarItem>
        </div>
        
        {/* Law Firm Management Section */}
        {!collapsed && (
          <div className="mb-2 px-3 text-xs font-medium text-sidebar-muted">
            LAW FIRM MANAGEMENT
          </div>
        )}
        <div className="space-y-1">
          <SidebarItem 
            href="/law-firms" 
            icon={<Briefcase className="h-4 w-4" />} 
            active={location === "/law-firms"}
          >
            {!collapsed && "Law Firms"}
          </SidebarItem>
          <SidebarItem 
            href="/clients" 
            icon={<Users className="h-4 w-4" />} 
            active={location === "/clients"}
          >
            {!collapsed && "Clients"}
          </SidebarItem>
          <SidebarItem 
            href="/cases" 
            icon={<Scale className="h-4 w-4" />} 
            active={location === "/cases"}
          >
            {!collapsed && "Cases"}
          </SidebarItem>
          <SidebarItem 
            href="/documents" 
            icon={<FileText className="h-4 w-4" />} 
            active={location === "/documents"}
          >
            {!collapsed && "Documents"}
          </SidebarItem>
        </div>
        
        {/* Agent Builder Section */}
        {!collapsed && (
          <div className="mt-6 mb-2 px-3 text-xs font-medium text-sidebar-muted">
            AGENT BUILDER
          </div>
        )}
        <div className="space-y-1 mt-6">
          <SidebarItem 
            href="/agent-builder" 
            icon={<Bot className="h-4 w-4" />} 
            active={location === "/agent-builder"}
          >
            {!collapsed && "AI Agents"}
          </SidebarItem>
          <SidebarItem 
            href="/knowledge-base" 
            icon={<BookOpen className="h-4 w-4" />} 
            active={location === "/knowledge-base"}
          >
            {!collapsed && "Knowledge Base"}
          </SidebarItem>
          <SidebarItem 
            href="/call-center" 
            icon={<Phone className="h-4 w-4" />} 
            active={location === "/call-center"}
          >
            {!collapsed && "Call Center"}
          </SidebarItem>
          <SidebarItem 
            href="/analytics" 
            icon={<BarChart className="h-4 w-4" />} 
            active={location === "/analytics"}
          >
            {!collapsed && "Analytics"}
          </SidebarItem>
        </div>
        
        {/* Settings Section */}
        {!collapsed && (
          <div className="mt-6 mb-2 px-3 text-xs font-medium text-sidebar-muted">
            SETTINGS
          </div>
        )}
        <div className="space-y-1 mt-6">
          <SidebarItem 
            href="/user-profile" 
            icon={<User className="h-4 w-4" />} 
            active={location === "/user-profile"}
          >
            {!collapsed && "User Profile"}
          </SidebarItem>
          <SidebarItem 
            href="/app-settings" 
            icon={<Settings className="h-4 w-4" />} 
            active={location === "/app-settings"}
          >
            {!collapsed && "Settings"}
          </SidebarItem>
          <SidebarItem 
            href="/help" 
            icon={<HelpCircle className="h-4 w-4" />} 
            active={location === "/help"}
          >
            {!collapsed && "Help & Support"}
          </SidebarItem>
        </div>
      </div>
      
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80" 
            alt="User avatar" 
            className="h-8 w-8 rounded-full" 
          />
          {!collapsed && (
            <div>
              <div className="text-sm font-medium">Ahmad Hassan</div>
              <div className="text-xs text-sidebar-muted">Legal Tech Admin</div>
            </div>
          )}
          {!collapsed && (
            <button className="ml-auto rounded-md p-1 hover:bg-accent/50 transition-colors">
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
