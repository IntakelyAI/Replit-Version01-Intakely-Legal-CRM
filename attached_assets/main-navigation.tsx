"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
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
  Target,
  PresentationIcon as PresentationChart,
  BotIcon,
  CreditCard,
  HeartHandshake,
  ClipboardList,
  Workflow,
  Activity,
  BarChart2,
  UserCog,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type MainMenuItem = {
  name: string
  icon: React.ElementType
  path?: string
  children?: { name: string; icon?: React.ElementType; path: string }[]
  badge?: string
  recentFirms?: { name: string; path: string }[]
}

type MainNavigationProps = {
  onSelectLawFirm: (firmName: string) => void
}

export function MainNavigation({ onSelectLawFirm }: MainNavigationProps) {
  const [expanded, setExpanded] = useState(true)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const toggleExpand = () => {
    setExpanded(!expanded)
  }

  const toggleSection = (name: string) => {
    if (expandedSection === name) {
      setExpandedSection(null)
    } else {
      setExpandedSection(name)
    }
  }

  const handleLawFirmSelect = (firmName: string) => {
    onSelectLawFirm(firmName)
    setExpanded(false)
  }

  const topMenuItems: MainMenuItem[] = [
    {
      name: "Personal Assistant",
      icon: MessageSquare,
      path: "/assistant",
    },
    {
      name: "Spaces : Law Firms",
      icon: Building2,
      recentFirms: [
        { name: "Oakwood Law Firm", path: "/firms/oakwood" },
        { name: "Johnson & Partners", path: "/firms/johnson" },
        { name: "Legal Eagles LLC", path: "/firms/legal-eagles" },
        { name: "Smith & Associates", path: "/firms/smith" },
        { name: "Metro Legal Group", path: "/firms/metro" },
      ],
    },
    {
      name: "Agent Builder",
      icon: Bot,
      children: [
        { name: "Agents", icon: Users, path: "/agent-builder/agents" },
        { name: "Knowledge Base", icon: FileText, path: "/agent-builder/knowledge-base" },
        { name: "Phone Numbers", icon: Phone, path: "/agent-builder/phone-numbers" },
        { name: "Batch Call", icon: FileText, path: "/agent-builder/batch-call" },
        { name: "Call History", icon: Clock, path: "/agent-builder/call-history" },
        { name: "Analytics", icon: BarChart2, path: "/agent-builder/analytics" },
        { name: "Tools", icon: Wrench, path: "/agent-builder/tools" },
      ],
    },
    {
      name: "Intakely Operations",
      icon: BarChart3,
      children: [
        {
          name: "Internal User Management & Team Assignments",
          icon: UserCog,
          path: "/operations/user-management",
        },
        {
          name: "Market Targeting, Lead Generation & Outreach",
          icon: Target,
          path: "/operations/market-targeting",
        },
        {
          name: "Sales Demos & Conversion Tracking",
          icon: PresentationChart,
          path: "/operations/sales-demos",
        },
        {
          name: "AI-Led Onboarding & Workspace Provisioning",
          icon: BotIcon,
          path: "/operations/ai-onboarding",
        },
        {
          name: "Subscription, Contract & Billing Terms",
          icon: CreditCard,
          path: "/operations/subscription",
        },
        {
          name: "Customer Success & Lifecycle Nurturing",
          icon: HeartHandshake,
          path: "/operations/customer-success",
        },
        {
          name: "Intakely Internal Operations - Task Management, Automation & Logs",
          icon: ClipboardList,
          path: "/operations/internal-operations",
        },
        {
          name: "Internal Automation & AI Workflows",
          icon: Workflow,
          path: "/operations/internal-automation",
        },
        {
          name: "Internal Activity & Event Logging",
          icon: Activity,
          path: "/operations/activity-logging",
        },
        {
          name: "Internal Performance Metrics & KPIs",
          icon: BarChart2,
          path: "/operations/performance-metrics",
        },
      ],
    },
  ]

  const bottomMenuItems: MainMenuItem[] = [
    {
      name: "Contacts",
      icon: Users,
      path: "/contacts",
    },
    {
      name: "Channels",
      icon: MessagesSquare,
      path: "/channels",
    },
    {
      name: "Notifications",
      icon: Bell,
      path: "/notifications",
      badge: "3",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ]

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-black border-r border-border transition-all duration-200",
        expanded ? "w-64" : "w-16",
      )}
    >
      <div className="flex items-center justify-end p-2">
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
                      {expanded && expandedSection === item.name && <ChevronLeft className="h-4 w-4" />}
                      {expanded && expandedSection !== item.name && <ChevronRight className="h-4 w-4" />}
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
                          {item.recentFirms.map((firm) => (
                            <button
                              key={firm.name}
                              className="flex items-center w-full rounded-md p-2 text-xs font-medium transition-colors hover:bg-purple-900/30 hover:text-purple-300"
                              onClick={() => handleLawFirmSelect(firm.name)}
                            >
                              <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span className="truncate text-left">{firm.name}</span>
                            </button>
                          ))}
                        </div>
                        <Button
                          className="w-full mt-2 bg-purple-600 hover:bg-purple-700 text-white"
                          onClick={() => {
                            /* Handle create new space */
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" /> Create New Space
                        </Button>
                      </div>
                    )}
                  </>
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
                      {expanded && expandedSection === item.name && <ChevronLeft className="h-4 w-4" />}
                      {expanded && expandedSection !== item.name && <ChevronRight className="h-4 w-4" />}
                    </button>
                    {expanded && expandedSection === item.name && (
                      <div className="mt-1 ml-8 space-y-1">
                        {item.children.map((child) => (
                          <button
                            key={child.name}
                            className="flex items-center justify-start w-full rounded-md p-2 text-xs font-medium transition-colors hover:bg-purple-900/30 hover:text-purple-300"
                            onClick={() => (child.name.includes("Law Firm") ? handleLawFirmSelect(child.name) : null)}
                          >
                            {child.icon && <child.icon className="h-4 w-4 mr-2 text-muted-foreground" />}
                            <span className="truncate text-left">{child.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.path || "#"}
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
              className="flex items-center justify-start w-full rounded-md p-2 text-xs font-medium transition-colors hover:bg-purple-900/30 hover:text-purple-300"
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
            </Link>
          ))}
        </TooltipProvider>
      </div>
    </div>
  )
}
