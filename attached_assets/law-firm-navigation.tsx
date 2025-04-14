import React, { useState } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  Calendar,
  ListTodo,
  FileText,
  CreditCard,
  Briefcase,
  Users,
  Settings,
  ChevronDown,
  ChevronRight,
  Crown,
  UserCircle,
  Building,
  ClipboardList,
  Clock,
  Layers,
  LinkIcon,
  FileCheck,
  BarChart,
  Building2,
  List,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFirm } from "../providers/firm-provider";

type SidebarItemType = {
  name: string;
  icon: React.ElementType;
  path?: string;
  children?: SidebarItemType[];
};

interface LawFirmNavigationProps {
  firmName: string;
}

export default function LawFirmNavigation({ firmName }: LawFirmNavigationProps) {
  const [expanded, setExpanded] = useState<string[]>([]);
  const { clearSelectedFirm } = useFirm();

  const toggleExpand = (name: string) => {
    if (expanded.includes(name)) {
      setExpanded(expanded.filter((item) => item !== name));
    } else {
      setExpanded([...expanded, name]);
    }
  };

  const sidebarItems: SidebarItemType[] = [
    {
      name: "Communications",
      icon: MessageSquare,
      path: "/communications",
    },
    {
      name: "Appointments",
      icon: Calendar,
      path: "/appointments",
    },
    {
      name: "Interactions",
      icon: ListTodo,
      path: "/interactions",
    },
    {
      name: "Agenda",
      icon: List,
      path: "/agenda",
    },
    {
      name: "Documents",
      icon: FileText,
      path: "/documents",
    },
    {
      name: "Billing",
      icon: CreditCard,
      path: "/billing",
    },
    {
      name: "Cases",
      icon: Briefcase,
      path: "/cases",
    },
    {
      name: "Contacts",
      icon: Users,
      children: [
        {
          name: "Leads",
          icon: Crown,
          children: [
            { name: "All Leads", icon: Crown, path: "/leads" },
            { name: "Lead Types", icon: Layers, path: "/leads/types" },
            { name: "Lead Sources", icon: Layers, path: "/leads/sources" },
          ],
        },
        {
          name: "Clients",
          icon: Users,
          children: [
            { name: "All Clients", icon: Users, path: "/clients" },
            { name: "Client Types", icon: Layers, path: "/clients/types" },
            { name: "Client Statuses", icon: Layers, path: "/clients/statuses" },
          ],
        },
        {
          name: "Companies",
          icon: Building,
          path: "/companies",
        },
        {
          name: "Individual Contacts",
          icon: UserCircle,
          path: "/contacts",
        },
      ],
    },
    {
      name: "Settings",
      icon: Settings,
      children: [
        {
          name: "Law Firm",
          icon: Building,
          children: [
            { name: "Details", icon: FileText, path: "/settings/firm/details" },
            { name: "Office Hours", icon: Clock, path: "/settings/firm/hours" },
            { name: "Practice Areas", icon: Briefcase, path: "/settings/firm/practice-areas" },
            { name: "Locations", icon: Building2, path: "/settings/firm/locations" },
          ],
        },
        {
          name: "Staff",
          icon: UserCircle,
          children: [
            { name: "Team Members", icon: Users, path: "/settings/staff/members" },
            { name: "Roles", icon: Layers, path: "/settings/staff/roles" },
            { name: "Departments", icon: Building, path: "/settings/staff/departments" },
          ],
        },
      ],
    },
  ];

  const renderSidebarItems = (items: SidebarItemType[], depth = 0) => {
    return items.map((item) => (
      <div key={item.name} className={cn("flex flex-col", depth > 0 && "ml-4")}>
        {item.children ? (
          <button
            onClick={() => toggleExpand(item.name)}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              expanded.includes(item.name)
                ? "bg-purple-900/50 text-purple-300"
                : "hover:bg-purple-900/30 hover:text-purple-300",
            )}
          >
            <item.icon className="h-4 w-4 text-purple-500" />
            <span className="flex-1 truncate">{item.name}</span>
            {expanded.includes(item.name) ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        ) : (
          <Link
            href={item.path ? `/firm/${firmName.toLowerCase().replace(/\s+/g, "-")}${item.path}` : "#"}
          >
            <a className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-purple-900/30 hover:text-purple-300">
              <item.icon className="h-4 w-4 text-purple-500" />
              <span className="flex-1 truncate">{item.name}</span>
            </a>
          </Link>
        )}
        {item.children && expanded.includes(item.name) && (
          <div className="mt-1">{renderSidebarItems(item.children, depth + 1)}</div>
        )}
      </div>
    ));
  };

  return (
    <div className="w-64 h-screen border-r border-border bg-black flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-purple-600 flex items-center justify-center">
            <Building2 className="h-4 w-4 text-white" />
          </div>
          <span className="font-semibold text-lg text-purple-300">{firmName}</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={clearSelectedFirm}
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex gap-1 px-3 py-1">
        <button className="flex-1 h-8 rounded-md text-sm font-medium hover:bg-purple-900/30 hover:text-purple-300">
          Team
        </button>
        <button className="flex-1 h-8 rounded-md text-sm font-medium hover:bg-purple-900/30 hover:text-purple-300">
          Private
        </button>
        <button className="flex-1 h-8 rounded-md text-sm font-medium hover:bg-purple-900/30 hover:text-purple-300">
          Pin
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="p-3 space-y-1">{renderSidebarItems(sidebarItems)}</div>
      </div>
    </div>
  );
}