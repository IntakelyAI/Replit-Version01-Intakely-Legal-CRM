import { useState } from "react";
import { useLocation } from "wouter";
import { 
  Building2, 
  MessageSquare, 
  Calendar, 
  ListTodo, 
  List, 
  FileText, 
  CreditCard, 
  Briefcase,
  Users,
  Settings,
  Crown,
  Layers,
  BarChart,
  UserCircle,
  ClipboardList,
  Building,
  LinkIcon,
  FileCheck,
  Clock,
  UserCog,
  Presentation,
  Target,
  ChevronDown,
  Star,
  Lock,
  Pin
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { useFirm } from "@/components/providers/firm-provider";

interface FirmNavigationItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  isActive?: boolean;
  badge?: number;
}

const FirmNavigationItem = ({ icon, label, path, isActive, badge }: FirmNavigationItemProps) => {
  return (
    <div
      onClick={() => window.location.href = path}
      className={cn(
        "flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors cursor-pointer",
        isActive 
          ? "bg-primary/10 text-primary hover:bg-primary/20" 
          : "hover:bg-accent/50"
      )}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span>{label}</span>
      </div>
      {badge !== undefined && (
        <Badge variant="secondary">{badge}</Badge>
      )}
    </div>
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
        "flex items-center gap-3 rounded-md px-3 py-2 text-xs transition-colors cursor-pointer ml-6",
        isActive 
          ? "bg-primary/10 text-primary hover:bg-primary/20" 
          : "hover:bg-accent/50"
      )}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
};

interface ExpandableMenuItemProps {
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  badge?: number;
}

const ExpandableMenuItem = ({ 
  icon, 
  label, 
  isOpen, 
  onToggle, 
  children,
  badge
}: ExpandableMenuItemProps) => {
  return (
    <Collapsible open={isOpen} onOpenChange={onToggle} className="w-full">
      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-accent/50 transition-colors">
        <div className="flex items-center gap-3">
          {icon}
          <span>{label}</span>
        </div>
        <div className="flex items-center">
          {badge !== undefined && (
            <Badge variant="secondary" className="mr-2">{badge}</Badge>
          )}
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              isOpen ? "rotate-180" : "rotate-0"
            )}
          />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-1 pt-1">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

interface SubsectionLabelProps {
  label: string;
}

const SubsectionLabel = ({ label }: SubsectionLabelProps) => {
  return (
    <div className="px-3 py-1 text-xs font-semibold text-muted-foreground mt-3 mb-1">
      {label}
    </div>
  );
};

export default function LawFirmNavigationEnhanced() {
  const [location] = useLocation();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  
  const { selectedFirm, clearSelectedFirm } = useFirm();
  
  if (!selectedFirm) {
    return null;
  }
  
  const toggleExpandedItem = (item: string) => {
    if (expandedItem === item) {
      setExpandedItem(null);
    } else {
      setExpandedItem(item);
    }
  };
  
  // Helper function to check if a path is active
  const isActivePath = (path: string) => {
    return location === path || location.startsWith(path + '/');
  };
  
  // Firm-specific paths
  const getPath = (path: string) => {
    return `/firms/${selectedFirm.id}${path}`;
  };
  
  return (
    <div className="fixed inset-y-0 left-[280px] z-20 w-[280px] border-r bg-background">
      {/* Firm header */}
      <div className="flex h-16 items-center justify-between border-b px-3">
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-primary" />
          <h2 className="font-semibold truncate">{selectedFirm.name}</h2>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" title="Team">
            <Users className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" title="Private">
            <Lock className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" title="Pin">
            <Pin className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" title="Close" onClick={() => clearSelectedFirm()}>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Navigation items */}
      <div className="flex flex-col h-[calc(100%-4rem)] overflow-auto">
        <div className="flex-1 p-3 space-y-1">
          <FirmNavigationItem
            icon={<MessageSquare className="h-4 w-4" />}
            label="Communications"
            path={getPath("/communications")}
            isActive={isActivePath(getPath("/communications"))}
          />
          
          <FirmNavigationItem
            icon={<Calendar className="h-4 w-4" />}
            label="Appointments"
            path={getPath("/appointments")}
            isActive={isActivePath(getPath("/appointments"))}
            badge={5}
          />
          
          <FirmNavigationItem
            icon={<ListTodo className="h-4 w-4" />}
            label="Interactions/Tasks/Tags"
            path={getPath("/interactions")}
            isActive={isActivePath(getPath("/interactions"))}
          />
          
          <FirmNavigationItem
            icon={<List className="h-4 w-4" />}
            label="Agenda"
            path={getPath("/agenda")}
            isActive={isActivePath(getPath("/agenda"))}
          />
          
          <FirmNavigationItem
            icon={<FileText className="h-4 w-4" />}
            label="Documents"
            path={getPath("/documents")}
            isActive={isActivePath(getPath("/documents"))}
          />
          
          <FirmNavigationItem
            icon={<CreditCard className="h-4 w-4" />}
            label="Billing"
            path={getPath("/billing")}
            isActive={isActivePath(getPath("/billing"))}
          />
          
          <FirmNavigationItem
            icon={<Briefcase className="h-4 w-4" />}
            label="Intake/Matter/Cases"
            path={getPath("/cases")}
            isActive={isActivePath(getPath("/cases"))}
          />
          
          {/* Leads/Clients/Companies/Contacts (Expandable) */}
          <ExpandableMenuItem
            icon={<Users className="h-4 w-4" />}
            label="Leads/Clients/Companies/Contacts"
            isOpen={expandedItem === "contacts"}
            onToggle={() => toggleExpandedItem("contacts")}
            badge={12}
          >
            <SubsectionLabel label="LEADS" />
            <SubMenuItem
              icon={<Crown className="h-3.5 w-3.5" />}
              label="Leads"
              path={getPath("/leads")}
              isActive={isActivePath(getPath("/leads"))}
            />
            <SubMenuItem
              icon={<Layers className="h-3.5 w-3.5" />}
              label="Lead Type"
              path={getPath("/leads/types")}
              isActive={isActivePath(getPath("/leads/types"))}
            />
            <SubMenuItem
              icon={<Layers className="h-3.5 w-3.5" />}
              label="Lead Source"
              path={getPath("/leads/sources")}
              isActive={isActivePath(getPath("/leads/sources"))}
            />
            <SubMenuItem
              icon={<Layers className="h-3.5 w-3.5" />}
              label="Lead Statuses"
              path={getPath("/leads/statuses")}
              isActive={isActivePath(getPath("/leads/statuses"))}
            />
            <SubMenuItem
              icon={<Layers className="h-3.5 w-3.5" />}
              label="Lead Pipeline Category"
              path={getPath("/leads/pipeline-categories")}
              isActive={isActivePath(getPath("/leads/pipeline-categories"))}
            />
            <SubMenuItem
              icon={<Layers className="h-3.5 w-3.5" />}
              label="Lead Pipeline Stages"
              path={getPath("/leads/pipeline-stages")}
              isActive={isActivePath(getPath("/leads/pipeline-stages"))}
            />
            <SubMenuItem
              icon={<Layers className="h-3.5 w-3.5" />}
              label="Lead Nurturing"
              path={getPath("/leads/nurturing")}
              isActive={isActivePath(getPath("/leads/nurturing"))}
            />
            <SubMenuItem
              icon={<Layers className="h-3.5 w-3.5" />}
              label="Lead Conversion"
              path={getPath("/leads/conversion")}
              isActive={isActivePath(getPath("/leads/conversion"))}
            />
            <SubMenuItem
              icon={<BarChart className="h-3.5 w-3.5" />}
              label="Marketing Campaign Management"
              path={getPath("/leads/marketing")}
              isActive={isActivePath(getPath("/leads/marketing"))}
            />
            
            <SubsectionLabel label="CLIENTS" />
            <SubMenuItem
              icon={<Users className="h-3.5 w-3.5" />}
              label="Clients"
              path={getPath("/clients")}
              isActive={isActivePath(getPath("/clients"))}
            />
            <SubMenuItem
              icon={<Layers className="h-3.5 w-3.5" />}
              label="Client Type"
              path={getPath("/clients/types")}
              isActive={isActivePath(getPath("/clients/types"))}
            />
            <SubMenuItem
              icon={<Layers className="h-3.5 w-3.5" />}
              label="Client Statuses"
              path={getPath("/clients/statuses")}
              isActive={isActivePath(getPath("/clients/statuses"))}
            />
            <SubMenuItem
              icon={<Layers className="h-3.5 w-3.5" />}
              label="Client Pipeline Category"
              path={getPath("/clients/pipeline-categories")}
              isActive={isActivePath(getPath("/clients/pipeline-categories"))}
            />
            <SubMenuItem
              icon={<Layers className="h-3.5 w-3.5" />}
              label="Client Pipeline Stages"
              path={getPath("/clients/pipeline-stages")}
              isActive={isActivePath(getPath("/clients/pipeline-stages"))}
            />
            <SubMenuItem
              icon={<ClipboardList className="h-3.5 w-3.5" />}
              label="Client Onboarding"
              path={getPath("/clients/onboarding")}
              isActive={isActivePath(getPath("/clients/onboarding"))}
            />
            
            <SubsectionLabel label="COMPANY" />
            <SubMenuItem
              icon={<Building className="h-3.5 w-3.5" />}
              label="Company"
              path={getPath("/companies")}
              isActive={isActivePath(getPath("/companies"))}
            />
            <SubMenuItem
              icon={<Layers className="h-3.5 w-3.5" />}
              label="Company Type"
              path={getPath("/companies/types")}
              isActive={isActivePath(getPath("/companies/types"))}
            />
            <SubMenuItem
              icon={<Layers className="h-3.5 w-3.5" />}
              label="Company Statuses"
              path={getPath("/companies/statuses")}
              isActive={isActivePath(getPath("/companies/statuses"))}
            />
            
            <SubsectionLabel label="CONTACTS" />
            <SubMenuItem
              icon={<UserCircle className="h-3.5 w-3.5" />}
              label="Contacts"
              path={getPath("/contacts")}
              isActive={isActivePath(getPath("/contacts"))}
            />
            <SubMenuItem
              icon={<Layers className="h-3.5 w-3.5" />}
              label="Contact Types"
              path={getPath("/contacts/types")}
              isActive={isActivePath(getPath("/contacts/types"))}
            />
            
            <SubsectionLabel label="LINKED INFO" />
            <SubMenuItem
              icon={<Building2 className="h-3.5 w-3.5" />}
              label="Addresses"
              path={getPath("/linked-info/addresses")}
              isActive={isActivePath(getPath("/linked-info/addresses"))}
            />
            <SubMenuItem
              icon={<Building2 className="h-3.5 w-3.5" />}
              label="City"
              path={getPath("/linked-info/cities")}
              isActive={isActivePath(getPath("/linked-info/cities"))}
            />
            <SubMenuItem
              icon={<Building2 className="h-3.5 w-3.5" />}
              label="State/Region"
              path={getPath("/linked-info/states")}
              isActive={isActivePath(getPath("/linked-info/states"))}
            />
            <SubMenuItem
              icon={<Building2 className="h-3.5 w-3.5" />}
              label="Zip Code"
              path={getPath("/linked-info/zip-codes")}
              isActive={isActivePath(getPath("/linked-info/zip-codes"))}
            />
            <SubMenuItem
              icon={<Building2 className="h-3.5 w-3.5" />}
              label="Country"
              path={getPath("/linked-info/countries")}
              isActive={isActivePath(getPath("/linked-info/countries"))}
            />
            <SubMenuItem
              icon={<LinkIcon className="h-3.5 w-3.5" />}
              label="Social Links Info"
              path={getPath("/linked-info/social")}
              isActive={isActivePath(getPath("/linked-info/social"))}
            />
            <SubMenuItem
              icon={<FileText className="h-3.5 w-3.5" />}
              label="Additional Info"
              path={getPath("/linked-info/additional")}
              isActive={isActivePath(getPath("/linked-info/additional"))}
            />
            <SubMenuItem
              icon={<Briefcase className="h-3.5 w-3.5" />}
              label="Employment Info"
              path={getPath("/linked-info/employment")}
              isActive={isActivePath(getPath("/linked-info/employment"))}
            />
            <SubMenuItem
              icon={<Users className="h-3.5 w-3.5" />}
              label="Spouse Info"
              path={getPath("/linked-info/spouse")}
              isActive={isActivePath(getPath("/linked-info/spouse"))}
            />
            <SubMenuItem
              icon={<CreditCard className="h-3.5 w-3.5" />}
              label="Financial Info"
              path={getPath("/linked-info/financial")}
              isActive={isActivePath(getPath("/linked-info/financial"))}
            />
            <SubMenuItem
              icon={<CreditCard className="h-3.5 w-3.5" />}
              label="Financial Responsible Party"
              path={getPath("/linked-info/financial-responsible")}
              isActive={isActivePath(getPath("/linked-info/financial-responsible"))}
            />
            <SubMenuItem
              icon={<Users className="h-3.5 w-3.5" />}
              label="Emergency Contact"
              path={getPath("/linked-info/emergency")}
              isActive={isActivePath(getPath("/linked-info/emergency"))}
            />
            <SubMenuItem
              icon={<Calendar className="h-3.5 w-3.5" />}
              label="Date Information"
              path={getPath("/linked-info/dates")}
              isActive={isActivePath(getPath("/linked-info/dates"))}
            />
            
            <SubsectionLabel label="REFERRALS & COMPLIANCE" />
            <SubMenuItem
              icon={<FileCheck className="h-3.5 w-3.5" />}
              label="Compliance Checks"
              path={getPath("/compliance/checks")}
              isActive={isActivePath(getPath("/compliance/checks"))}
            />
            <SubMenuItem
              icon={<Layers className="h-3.5 w-3.5" />}
              label="Compliance Types"
              path={getPath("/compliance/types")}
              isActive={isActivePath(getPath("/compliance/types"))}
            />
            <SubMenuItem
              icon={<Users className="h-3.5 w-3.5" />}
              label="Referrals"
              path={getPath("/compliance/referrals")}
              isActive={isActivePath(getPath("/compliance/referrals"))}
            />
          </ExpandableMenuItem>
          
          {/* Account Settings (Expandable) */}
          <ExpandableMenuItem
            icon={<Settings className="h-4 w-4" />}
            label="Account Settings"
            isOpen={expandedItem === "settings"}
            onToggle={() => toggleExpandedItem("settings")}
          >
            <SubsectionLabel label="LAW FIRM" />
            <SubMenuItem
              icon={<FileText className="h-3.5 w-3.5" />}
              label="Law Firm Details"
              path={getPath("/settings/law-firm/details")}
              isActive={isActivePath(getPath("/settings/law-firm/details"))}
            />
            <SubMenuItem
              icon={<Clock className="h-3.5 w-3.5" />}
              label="Office Timings"
              path={getPath("/settings/law-firm/office-timings")}
              isActive={isActivePath(getPath("/settings/law-firm/office-timings"))}
            />
            <SubMenuItem
              icon={<Briefcase className="h-3.5 w-3.5" />}
              label="Primary Practice Areas"
              path={getPath("/settings/law-firm/practice-areas")}
              isActive={isActivePath(getPath("/settings/law-firm/practice-areas"))}
            />
            <SubMenuItem
              icon={<Briefcase className="h-3.5 w-3.5" />}
              label="Specialization"
              path={getPath("/settings/law-firm/specialization")}
              isActive={isActivePath(getPath("/settings/law-firm/specialization"))}
            />
            <SubMenuItem
              icon={<Building2 className="h-3.5 w-3.5" />}
              label="Branches"
              path={getPath("/settings/law-firm/branches")}
              isActive={isActivePath(getPath("/settings/law-firm/branches"))}
            />
            
            <SubsectionLabel label="STAFF" />
            <SubMenuItem
              icon={<UserCircle className="h-3.5 w-3.5" />}
              label="Staff AI Agents"
              path={getPath("/settings/staff/ai-agents")}
              isActive={isActivePath(getPath("/settings/staff/ai-agents"))}
            />
            <SubMenuItem
              icon={<UserCircle className="h-3.5 w-3.5" />}
              label="Staff Users"
              path={getPath("/settings/staff/users")}
              isActive={isActivePath(getPath("/settings/staff/users"))}
            />
            <SubMenuItem
              icon={<Layers className="h-3.5 w-3.5" />}
              label="Staff Roles"
              path={getPath("/settings/staff/roles")}
              isActive={isActivePath(getPath("/settings/staff/roles"))}
            />
            <SubMenuItem
              icon={<Briefcase className="h-3.5 w-3.5" />}
              label="Employment Types"
              path={getPath("/settings/staff/employment-types")}
              isActive={isActivePath(getPath("/settings/staff/employment-types"))}
            />
            <SubMenuItem
              icon={<Building className="h-3.5 w-3.5" />}
              label="Departments"
              path={getPath("/settings/staff/departments")}
              isActive={isActivePath(getPath("/settings/staff/departments"))}
            />
            <SubMenuItem
              icon={<Users className="h-3.5 w-3.5" />}
              label="Teams"
              path={getPath("/settings/staff/teams")}
              isActive={isActivePath(getPath("/settings/staff/teams"))}
            />
            <SubMenuItem
              icon={<Clock className="h-3.5 w-3.5" />}
              label="Time Cards"
              path={getPath("/settings/staff/time-cards")}
              isActive={isActivePath(getPath("/settings/staff/time-cards"))}
            />
            <SubMenuItem
              icon={<Briefcase className="h-3.5 w-3.5" />}
              label="Staff Case Assignments"
              path={getPath("/settings/staff/case-assignments")}
              isActive={isActivePath(getPath("/settings/staff/case-assignments"))}
            />
            
            <SubsectionLabel label="ONBOARDING FORMS" />
            <SubMenuItem
              icon={<FileText className="h-3.5 w-3.5" />}
              label="Step 01: Law Firm Details Form"
              path={getPath("/settings/onboarding/law-firm-details")}
              isActive={isActivePath(getPath("/settings/onboarding/law-firm-details"))}
            />
          </ExpandableMenuItem>
        </div>
      </div>
    </div>
  );
}