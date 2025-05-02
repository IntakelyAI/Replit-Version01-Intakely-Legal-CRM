"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  Building2,
  Calendar,
  MessageSquare,
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
  ListTodo,
  LinkIcon,
  FileCheck,
  BarChart,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

type SidebarItemType = {
  name: string
  icon: React.ElementType
  path?: string
  children?: SidebarItemType[]
}

export function AppSidebar() {
  const [expanded, setExpanded] = useState<string[]>([])
  const [activeSpace, setActiveSpace] = useState("Oakwood Law Firm")

  const toggleExpand = (name: string) => {
    if (expanded.includes(name)) {
      setExpanded(expanded.filter((item) => item !== name))
    } else {
      setExpanded([...expanded, name])
    }
  }

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
      name: "Interactions/Tasks",
      icon: ListTodo,
      path: "/interactions",
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
      name: "Intake/Matter/Cases",
      icon: Briefcase,
      path: "/cases",
    },
    {
      name: "Leads/Clients/Companies/Contacts",
      icon: Users,
      children: [
        {
          name: "Leads",
          icon: Crown,
          children: [
            { name: "Leads", icon: Crown, path: "/leads" },
            { name: "LeadType", icon: Layers, path: "/leads/types" },
            { name: "LeadSource", icon: Layers, path: "/leads/sources" },
            { name: "LeadStatuses", icon: Layers, path: "/leads/statuses" },
            { name: "LeadPipelineCategory", icon: Layers, path: "/leads/pipeline-categories" },
            { name: "LeadPipelineStages", icon: Layers, path: "/leads/pipeline-stages" },
            { name: "LeadNurturing", icon: Layers, path: "/leads/nurturing" },
            { name: "LeadConversion", icon: Layers, path: "/leads/conversion" },
            { name: "MarketingCampaignManagement", icon: BarChart, path: "/leads/marketing" },
          ],
        },
        {
          name: "Clients",
          icon: Users,
          children: [
            { name: "Clients", icon: Users, path: "/clients" },
            { name: "ClientType", icon: Layers, path: "/clients/types" },
            { name: "ClientStatuses", icon: Layers, path: "/clients/statuses" },
            { name: "ClientPipelineCategory", icon: Layers, path: "/clients/pipeline-categories" },
            { name: "ClientPipelineStages", icon: Layers, path: "/clients/pipeline-stages" },
            { name: "ClientOnboarding", icon: ClipboardList, path: "/clients/onboarding" },
          ],
        },
        {
          name: "Company",
          icon: Building,
          children: [
            { name: "Company", icon: Building, path: "/companies" },
            { name: "CompanyType", icon: Layers, path: "/companies/types" },
            { name: "CompanyStatuses", icon: Layers, path: "/companies/statuses" },
          ],
        },
        {
          name: "Contacts",
          icon: UserCircle,
          children: [
            { name: "Contacts", icon: UserCircle, path: "/contacts" },
            { name: "ContactTypes", icon: Layers, path: "/contacts/types" },
          ],
        },
        {
          name: "Linked Info",
          icon: LinkIcon,
          children: [
            { name: "Addresses", icon: Building2, path: "/linked-info/addresses" },
            { name: "City", icon: Building2, path: "/linked-info/cities" },
            { name: "State/Region", icon: Building2, path: "/linked-info/states" },
            { name: "Zip Code", icon: Building2, path: "/linked-info/zip-codes" },
            { name: "Country", icon: Building2, path: "/linked-info/countries" },
            { name: "SocialLinksInfo", icon: LinkIcon, path: "/linked-info/social" },
            { name: "AdditionalInfo", icon: FileText, path: "/linked-info/additional" },
            { name: "EmploymentInfo", icon: Briefcase, path: "/linked-info/employment" },
            { name: "SpouseInfo", icon: Users, path: "/linked-info/spouse" },
            { name: "FinancialInfo", icon: CreditCard, path: "/linked-info/financial" },
            { name: "FinancialResponsibleParty", icon: CreditCard, path: "/linked-info/financial-responsible" },
            { name: "EmergencyContact", icon: Users, path: "/linked-info/emergency" },
            { name: "DateInformation", icon: Calendar, path: "/linked-info/dates" },
          ],
        },
        {
          name: "Referrals&Compliance",
          icon: FileCheck,
          children: [
            { name: "ComplianceChecks", icon: FileCheck, path: "/compliance/checks" },
            { name: "ComplianceTypes", icon: Layers, path: "/compliance/types" },
            { name: "Referrals", icon: Users, path: "/compliance/referrals" },
          ],
        },
      ],
    },
    {
      name: "AccountSettings",
      icon: Settings,
      children: [
        {
          name: "LawFirm",
          icon: Building,
          children: [
            { name: "LawFirmDetails", icon: FileText, path: "/settings/law-firm/details" },
            { name: "OfficeTimings", icon: Clock, path: "/settings/law-firm/office-timings" },
            { name: "PrimaryPracticeAreas", icon: Briefcase, path: "/settings/law-firm/practice-areas" },
            { name: "Specialization", icon: Briefcase, path: "/settings/law-firm/specialization" },
            { name: "Branches", icon: Building2, path: "/settings/law-firm/branches" },
          ],
        },
        {
          name: "Staff",
          icon: UserCircle,
          children: [
            { name: "StaffAIAgents", icon: UserCircle, path: "/settings/staff/ai-agents" },
            { name: "StaffUsers", icon: UserCircle, path: "/settings/staff/users" },
            { name: "StaffRoles", icon: Layers, path: "/settings/staff/roles" },
            { name: "EmploymentTypes", icon: Briefcase, path: "/settings/staff/employment-types" },
            { name: "Departments", icon: Building, path: "/settings/staff/departments" },
            { name: "Teams", icon: Users, path: "/settings/staff/teams" },
            { name: "TimeCards", icon: Clock, path: "/settings/staff/time-cards" },
            { name: "StaffCaseAssignments", icon: Briefcase, path: "/settings/staff/case-assignments" },
          ],
        },
        {
          name: "Onboarding-Forms",
          icon: ClipboardList,
          children: [
            { name: "Step01-LawFirmDetails-Form", icon: FileText, path: "/settings/onboarding/law-firm-details" },
          ],
        },
      ],
    },
  ]

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
            <item.icon className="h-4 w-4" />
            <span className="flex-1 truncate">{item.name}</span>
            {expanded.includes(item.name) ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        ) : (
          <Link
            href={item.path || "#"}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-purple-900/30 hover:text-purple-300"
          >
            <item.icon className="h-4 w-4" />
            <span className="flex-1 truncate">{item.name}</span>
          </Link>
        )}
        {item.children && expanded.includes(item.name) && (
          <div className="mt-1">{renderSidebarItems(item.children, depth + 1)}</div>
        )}
      </div>
    ))
  }

  return (
    <div className="w-64 border-r border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-purple-600 flex items-center justify-center">
            <Building2 className="h-4 w-4 text-white" />
          </div>
          <span className="font-semibold text-lg text-purple-300">Intakely</span>
        </div>
      </div>

      <div className="p-3">
        <Button
          variant="outline"
          className="w-full justify-start gap-2 bg-purple-950/30 text-purple-300 border-purple-800"
        >
          <Building2 className="h-4 w-4" />
          <span className="truncate">{activeSpace}</span>
        </Button>
      </div>

      <div className="flex gap-1 px-3 py-1">
        <Button variant="ghost" size="sm" className="flex-1 h-8">
          Team
        </Button>
        <Button variant="ghost" size="sm" className="flex-1 h-8">
          Private
        </Button>
        <Button variant="ghost" size="sm" className="flex-1 h-8">
          Pin
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-3 space-y-1">{renderSidebarItems(sidebarItems)}</div>
      </ScrollArea>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback className="bg-purple-700 text-white">IN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Admin User</span>
            <span className="text-xs text-muted-foreground">admin@intakely.com</span>
          </div>
        </div>
      </div>
    </div>
  )
}
