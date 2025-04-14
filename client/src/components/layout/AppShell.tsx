import { useState, useEffect, PropsWithChildren } from "react";
import { useLocation, Link } from "wouter";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { ChatWidget } from "../ai/ChatWidget";
import { 
  Building2, 
  ChevronDown, 
  Star, 
  Lock, 
  Pin, 
  Plus, 
  Import, 
  Folder,
  MessageCircle,
  Calendar,
  ListTodo,
  FileText,
  CreditCard,
  Briefcase,
  Users,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SecondaryNavItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  isActive?: boolean;
  hasSubmenu?: boolean;
  children?: React.ReactNode;
}

interface TertiaryNavItemProps {
  label: string;
  path: string;
  isActive?: boolean;
}

const TertiaryNavItem = ({ label, path, isActive }: TertiaryNavItemProps) => {
  return (
    <Link href={path}>
      <div 
        className={`
          flex items-center px-3 py-1.5 rounded-sm mb-0.5 cursor-pointer border-l-2 transition-all
          ${isActive 
            ? 'border-primary bg-primary/5 font-medium' 
            : 'border-transparent hover:bg-accent/30 hover:border-primary'
          }
        `}
      >
        <span className="text-xs ml-1">{label}</span>
      </div>
    </Link>
  );
};

const SecondaryNavItem = ({ icon, label, path, isActive, hasSubmenu = false, children }: SecondaryNavItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const [location] = useLocation();
  
  // Toggle the submenu
  const toggleSubmenu = (e: React.MouseEvent) => {
    if (hasSubmenu) {
      e.preventDefault();
      setExpanded(!expanded);
    }
  };
  
  // Check if path is part of the current location
  const isPathActive = isActive || location.includes(path);
  
  return (
    <div className="mb-1">
      <Link href={hasSubmenu ? '#' : path}>
        <div 
          onClick={toggleSubmenu}
          className={`
            flex items-center px-3 py-2 rounded-sm cursor-pointer border-l-2 transition-all
            ${isPathActive 
              ? 'border-primary bg-primary/5 font-medium' 
              : 'border-transparent hover:bg-accent/30 hover:border-primary'
            }
          `}
        >
          <span className={`mr-2 ${isPathActive ? 'text-primary' : ''}`}>{icon}</span>
          <span className="text-sm flex-1">{label}</span>
          {hasSubmenu && (
            <span className={`transition-transform duration-200 ${expanded ? 'rotate-180' : 'rotate-0'}`}>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </span>
          )}
        </div>
      </Link>
      
      {hasSubmenu && expanded && (
        <div className="ml-6 mt-1 space-y-0.5 border-l border-border/40 pl-2 py-1">
          {children ? children : (
            <>
              <TertiaryNavItem 
                label="All Items" 
                path={`${path}`} 
                isActive={location === path}
              />
              <TertiaryNavItem 
                label="Active Items" 
                path={`${path}/active`} 
                isActive={location.includes(`${path}/active`)}
              />
              <TertiaryNavItem 
                label="Archived Items" 
                path={`${path}/archived`} 
                isActive={location.includes(`${path}/archived`)}
              />
              <TertiaryNavItem 
                label="Add New" 
                path={`${path}/new`} 
                isActive={location.includes(`${path}/new`)}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export function AppShell({ children }: PropsWithChildren) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [location] = useLocation();
  const [secondaryMenuVisible, setSecondaryMenuVisible] = useState(false);
  const [mainMenuCollapsed, setMainMenuCollapsed] = useState(false);
  const [currentFirm, setCurrentFirm] = useState("Oakwood Law Firm");
  
  // Check if we're in a law firm specific page
  useEffect(() => {
    // Example check for firm-specific paths
    const isFirmPath = location.startsWith('/spaces/') && location.split('/').length > 2;
    setSecondaryMenuVisible(isFirmPath);
    
    // Collapse main menu when secondary menu appears
    if (isFirmPath) {
      setMainMenuCollapsed(true);
    }
  }, [location]);
  
  // Watch for changes in mainMenuCollapsed state to manage secondary menu
  useEffect(() => {
    if (!mainMenuCollapsed && secondaryMenuVisible) {
      // Temporarily hide secondary menu when main menu is expanded
      setSecondaryMenuVisible(false);
      
      // Set a timeout to check if we should show it again after animation completes
      const timeoutId = setTimeout(() => {
        const isFirmPath = location.startsWith('/spaces/') && location.split('/').length > 2;
        if (isFirmPath) {
          setSecondaryMenuVisible(true);
        }
      }, 350); // This should match the transition duration
      
      return () => clearTimeout(timeoutId);
    }
  }, [mainMenuCollapsed, location]);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen}
        isCollapsed={mainMenuCollapsed}
        setIsCollapsed={setMainMenuCollapsed}
      />
      
      {/* Secondary menu rendered when a law firm is selected */}
      {secondaryMenuVisible && (
        <div className="fixed inset-y-0 left-12 z-20 w-[260px] bg-background border-r border-border/30">
          <div className="flex h-10 items-center justify-between px-3 border-b border-border/30">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground mr-1" 
                title="Back to main menu"
                onClick={() => {
                  setMainMenuCollapsed(false);
                  setSecondaryMenuVisible(false);
                }}
              >
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
                  </svg>
                </div>
              </Button>
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              <span className="text-sm font-medium">California Regional Space</span>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground" title="Search">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                </svg>
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground" title="Options">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                </svg>
              </Button>
            </div>
          </div>
          
          {/* Tab options */}
          <div className="flex border-b border-border/30">
            <div className="flex-1 text-center py-2 bg-accent/50 text-sm border-r border-border/30">Team</div>
            <div className="flex-1 text-center py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/30">Private</div>
            <div className="flex-1 text-center py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/30">Pin</div>
          </div>
          
          {/* Action buttons */}
          <div className="flex border-b border-border/30">
            <div className="flex-1 text-center py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/30 border-r border-border/30 flex items-center justify-center gap-1 cursor-pointer">
              <Plus className="h-3.5 w-3.5" /> Add
            </div>
            <div className="flex-1 text-center py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/30 border-r border-border/30 flex items-center justify-center gap-1 cursor-pointer">
              <Import className="h-3.5 w-3.5" /> Import
            </div>
            <div className="flex-1 text-center py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/30 flex items-center justify-center gap-1 cursor-pointer">
              <Folder className="h-3.5 w-3.5" /> Folder
            </div>
          </div>
          
          <ScrollArea className="h-[calc(100vh-8rem)]">
            {/* Law firm name */}
            <div className="bg-[#1c1c29] mx-2 my-2 px-3 py-2 rounded-md text-purple-400 flex items-center">
              <Building2 className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">{currentFirm}</span>
            </div>
            
            {/* Law firm navigation items */}
            <div className="px-2 space-y-1">
              <SecondaryNavItem 
                icon={<MessageCircle className="h-4 w-4" />} 
                label="Communications" 
                path={`${location}/communications`}
                isActive={location.includes('/communications')}
                hasSubmenu={true}
              />
              
              <SecondaryNavItem 
                icon={<Calendar className="h-4 w-4" />} 
                label="Appointments" 
                path={`${location}/appointments`}
                isActive={location.includes('/appointments')}
                hasSubmenu={true}
              />
              
              <SecondaryNavItem 
                icon={<ListTodo className="h-4 w-4" />} 
                label="Interactions/Tasks/Tags/CustomFields" 
                path={`${location}/interactions`}
                isActive={location.includes('/interactions')}
              />
              
              <SecondaryNavItem 
                icon={<Calendar className="h-4 w-4" />} 
                label="Agenda" 
                path={`${location}/agenda`}
                isActive={location.includes('/agenda')}
                hasSubmenu={true}
              />
              
              <SecondaryNavItem 
                icon={<FileText className="h-4 w-4" />} 
                label="Documents" 
                path={`${location}/documents`}
                isActive={location.includes('/documents')}
                hasSubmenu={true}
              />
              
              <SecondaryNavItem 
                icon={<CreditCard className="h-4 w-4" />} 
                label="Billing" 
                path={`${location}/billing`}
                isActive={location.includes('/billing')}
                hasSubmenu={true}
              />
              
              <SecondaryNavItem 
                icon={<Briefcase className="h-4 w-4" />} 
                label="Intake/Matter/Cases" 
                path={`${location}/cases`}
                isActive={location.includes('/cases')}
                hasSubmenu={true}
              />
              
              <SecondaryNavItem 
                icon={<Users className="h-4 w-4" />} 
                label="Leads/Clients/Companies/Contacts" 
                path={`${location}/contacts`}
                isActive={location.includes('/contacts')}
                hasSubmenu={true}
              >
                {/* Leads Subsection */}
                <div className="text-[10px] uppercase font-semibold text-muted-foreground mb-1 pl-1 pt-1">
                  Leads
                </div>
                <TertiaryNavItem 
                  label="Leads" 
                  path={`${location}/contacts/leads`} 
                  isActive={location.includes(`${location}/contacts/leads`)}
                />
                <TertiaryNavItem 
                  label="Lead Types" 
                  path={`${location}/contacts/leads/types`} 
                  isActive={location.includes(`${location}/contacts/leads/types`)}
                />
                <TertiaryNavItem 
                  label="Lead Sources" 
                  path={`${location}/contacts/leads/sources`} 
                  isActive={location.includes(`${location}/contacts/leads/sources`)}
                />
                <TertiaryNavItem 
                  label="Lead Statuses" 
                  path={`${location}/contacts/leads/statuses`} 
                  isActive={location.includes(`${location}/contacts/leads/statuses`)}
                />
                <TertiaryNavItem 
                  label="Pipeline Categories" 
                  path={`${location}/contacts/leads/pipeline-categories`} 
                  isActive={location.includes(`${location}/contacts/leads/pipeline-categories`)}
                />
                <TertiaryNavItem 
                  label="Pipeline Stages" 
                  path={`${location}/contacts/leads/pipeline-stages`} 
                  isActive={location.includes(`${location}/contacts/leads/pipeline-stages`)}
                />
                <TertiaryNavItem 
                  label="Lead Nurturing" 
                  path={`${location}/contacts/leads/nurturing`} 
                  isActive={location.includes(`${location}/contacts/leads/nurturing`)}
                />
                <TertiaryNavItem 
                  label="Lead Conversion" 
                  path={`${location}/contacts/leads/conversion`} 
                  isActive={location.includes(`${location}/contacts/leads/conversion`)}
                />
                <TertiaryNavItem 
                  label="Marketing Campaigns" 
                  path={`${location}/contacts/leads/marketing`} 
                  isActive={location.includes(`${location}/contacts/leads/marketing`)}
                />
                
                {/* Clients Subsection */}
                <div className="text-[10px] uppercase font-semibold text-muted-foreground my-1 pl-1 pt-2">
                  Clients
                </div>
                <TertiaryNavItem 
                  label="Clients" 
                  path={`${location}/contacts/clients`} 
                  isActive={location.includes(`${location}/contacts/clients`)}
                />
                <TertiaryNavItem 
                  label="Client Types" 
                  path={`${location}/contacts/clients/types`} 
                  isActive={location.includes(`${location}/contacts/clients/types`)}
                />
                <TertiaryNavItem 
                  label="Client Statuses" 
                  path={`${location}/contacts/clients/statuses`} 
                  isActive={location.includes(`${location}/contacts/clients/statuses`)}
                />
                <TertiaryNavItem 
                  label="Pipeline Categories" 
                  path={`${location}/contacts/clients/pipeline-categories`} 
                  isActive={location.includes(`${location}/contacts/clients/pipeline-categories`)}
                />
                <TertiaryNavItem 
                  label="Pipeline Stages" 
                  path={`${location}/contacts/clients/pipeline-stages`} 
                  isActive={location.includes(`${location}/contacts/clients/pipeline-stages`)}
                />
                <TertiaryNavItem 
                  label="Client Onboarding" 
                  path={`${location}/contacts/clients/onboarding`} 
                  isActive={location.includes(`${location}/contacts/clients/onboarding`)}
                />
                
                {/* Company Subsection */}
                <div className="text-[10px] uppercase font-semibold text-muted-foreground my-1 pl-1 pt-2">
                  Companies
                </div>
                <TertiaryNavItem 
                  label="Companies" 
                  path={`${location}/contacts/companies`} 
                  isActive={location.includes(`${location}/contacts/companies`)}
                />
                <TertiaryNavItem 
                  label="Company Types" 
                  path={`${location}/contacts/companies/types`} 
                  isActive={location.includes(`${location}/contacts/companies/types`)}
                />
                <TertiaryNavItem 
                  label="Company Statuses" 
                  path={`${location}/contacts/companies/statuses`} 
                  isActive={location.includes(`${location}/contacts/companies/statuses`)}
                />
                
                {/* Contacts Subsection */}
                <div className="text-[10px] uppercase font-semibold text-muted-foreground my-1 pl-1 pt-2">
                  Contacts
                </div>
                <TertiaryNavItem 
                  label="Contacts" 
                  path={`${location}/contacts/individual`} 
                  isActive={location.includes(`${location}/contacts/individual`)}
                />
                <TertiaryNavItem 
                  label="Contact Types" 
                  path={`${location}/contacts/individual/types`} 
                  isActive={location.includes(`${location}/contacts/individual/types`)}
                />
                
                {/* Linked Info Subsection */}
                <div className="text-[10px] uppercase font-semibold text-muted-foreground my-1 pl-1 pt-2">
                  Linked Information
                </div>
                <TertiaryNavItem 
                  label="Addresses" 
                  path={`${location}/contacts/linked-info/addresses`} 
                  isActive={location.includes(`${location}/contacts/linked-info/addresses`)}
                />
                <TertiaryNavItem 
                  label="Cities" 
                  path={`${location}/contacts/linked-info/cities`} 
                  isActive={location.includes(`${location}/contacts/linked-info/cities`)}
                />
                <TertiaryNavItem 
                  label="States/Regions" 
                  path={`${location}/contacts/linked-info/states`} 
                  isActive={location.includes(`${location}/contacts/linked-info/states`)}
                />
                <TertiaryNavItem 
                  label="Zip Codes" 
                  path={`${location}/contacts/linked-info/zip-codes`} 
                  isActive={location.includes(`${location}/contacts/linked-info/zip-codes`)}
                />
                <TertiaryNavItem 
                  label="Countries" 
                  path={`${location}/contacts/linked-info/countries`} 
                  isActive={location.includes(`${location}/contacts/linked-info/countries`)}
                />
                <TertiaryNavItem 
                  label="Social Links" 
                  path={`${location}/contacts/linked-info/social`} 
                  isActive={location.includes(`${location}/contacts/linked-info/social`)}
                />
                <TertiaryNavItem 
                  label="Additional Info" 
                  path={`${location}/contacts/linked-info/additional`} 
                  isActive={location.includes(`${location}/contacts/linked-info/additional`)}
                />
                <TertiaryNavItem 
                  label="Employment" 
                  path={`${location}/contacts/linked-info/employment`} 
                  isActive={location.includes(`${location}/contacts/linked-info/employment`)}
                />
                <TertiaryNavItem 
                  label="Spouse Info" 
                  path={`${location}/contacts/linked-info/spouse`} 
                  isActive={location.includes(`${location}/contacts/linked-info/spouse`)}
                />
                <TertiaryNavItem 
                  label="Financial Info" 
                  path={`${location}/contacts/linked-info/financial`} 
                  isActive={location.includes(`${location}/contacts/linked-info/financial`)}
                />
                <TertiaryNavItem 
                  label="Financial Responsibility" 
                  path={`${location}/contacts/linked-info/financial-responsible`} 
                  isActive={location.includes(`${location}/contacts/linked-info/financial-responsible`)}
                />
                <TertiaryNavItem 
                  label="Emergency Contacts" 
                  path={`${location}/contacts/linked-info/emergency`} 
                  isActive={location.includes(`${location}/contacts/linked-info/emergency`)}
                />
                <TertiaryNavItem 
                  label="Important Dates" 
                  path={`${location}/contacts/linked-info/dates`} 
                  isActive={location.includes(`${location}/contacts/linked-info/dates`)}
                />
                
                {/* Referrals & Compliance Subsection */}
                <div className="text-[10px] uppercase font-semibold text-muted-foreground my-1 pl-1 pt-2">
                  Referrals & Compliance
                </div>
                <TertiaryNavItem 
                  label="Compliance Checks" 
                  path={`${location}/contacts/compliance/checks`} 
                  isActive={location.includes(`${location}/contacts/compliance/checks`)}
                />
                <TertiaryNavItem 
                  label="Compliance Types" 
                  path={`${location}/contacts/compliance/types`} 
                  isActive={location.includes(`${location}/contacts/compliance/types`)}
                />
                <TertiaryNavItem 
                  label="Referrals" 
                  path={`${location}/contacts/compliance/referrals`} 
                  isActive={location.includes(`${location}/contacts/compliance/referrals`)}
                />
              </SecondaryNavItem>
              
              <SecondaryNavItem 
                icon={<Settings className="h-4 w-4" />} 
                label="Account Settings" 
                path={`${location}/settings`}
                isActive={location.includes('/settings')}
                hasSubmenu={true}
              >
                {/* LawFirm Subsection */}
                <div className="text-[10px] uppercase font-semibold text-muted-foreground mb-1 pl-1 pt-1">
                  Law Firm
                </div>
                <TertiaryNavItem 
                  label="Firm Details" 
                  path={`${location}/settings/law-firm/details`} 
                  isActive={location.includes(`${location}/settings/law-firm/details`)}
                />
                <TertiaryNavItem 
                  label="Office Timings" 
                  path={`${location}/settings/law-firm/office-timings`} 
                  isActive={location.includes(`${location}/settings/law-firm/office-timings`)}
                />
                <TertiaryNavItem 
                  label="Practice Areas" 
                  path={`${location}/settings/law-firm/practice-areas`} 
                  isActive={location.includes(`${location}/settings/law-firm/practice-areas`)}
                />
                <TertiaryNavItem 
                  label="Specialization" 
                  path={`${location}/settings/law-firm/specialization`} 
                  isActive={location.includes(`${location}/settings/law-firm/specialization`)}
                />
                <TertiaryNavItem 
                  label="Branches" 
                  path={`${location}/settings/law-firm/branches`} 
                  isActive={location.includes(`${location}/settings/law-firm/branches`)}
                />
                
                {/* Staff Subsection */}
                <div className="text-[10px] uppercase font-semibold text-muted-foreground my-1 pl-1 pt-2">
                  Staff
                </div>
                <TertiaryNavItem 
                  label="AI Agents" 
                  path={`${location}/settings/staff/ai-agents`} 
                  isActive={location.includes(`${location}/settings/staff/ai-agents`)}
                />
                <TertiaryNavItem 
                  label="Users" 
                  path={`${location}/settings/staff/users`} 
                  isActive={location.includes(`${location}/settings/staff/users`)}
                />
                <TertiaryNavItem 
                  label="Roles" 
                  path={`${location}/settings/staff/roles`} 
                  isActive={location.includes(`${location}/settings/staff/roles`)}
                />
                <TertiaryNavItem 
                  label="Employment Types" 
                  path={`${location}/settings/staff/employment-types`} 
                  isActive={location.includes(`${location}/settings/staff/employment-types`)}
                />
                <TertiaryNavItem 
                  label="Departments" 
                  path={`${location}/settings/staff/departments`} 
                  isActive={location.includes(`${location}/settings/staff/departments`)}
                />
                <TertiaryNavItem 
                  label="Teams" 
                  path={`${location}/settings/staff/teams`} 
                  isActive={location.includes(`${location}/settings/staff/teams`)}
                />
                <TertiaryNavItem 
                  label="Time Cards" 
                  path={`${location}/settings/staff/time-cards`} 
                  isActive={location.includes(`${location}/settings/staff/time-cards`)}
                />
                <TertiaryNavItem 
                  label="Case Assignments" 
                  path={`${location}/settings/staff/case-assignments`} 
                  isActive={location.includes(`${location}/settings/staff/case-assignments`)}
                />
                
                {/* Onboarding-Forms Subsection */}
                <div className="text-[10px] uppercase font-semibold text-muted-foreground my-1 pl-1 pt-2">
                  Onboarding Forms
                </div>
                <TertiaryNavItem 
                  label="Firm Details Form" 
                  path={`${location}/settings/onboarding/law-firm-details`} 
                  isActive={location.includes(`${location}/settings/onboarding/law-firm-details`)}
                />
              </SecondaryNavItem>
            </div>
          </ScrollArea>
          
          {/* Bottom action buttons */}
          <div className="absolute bottom-0 w-full border-t border-border/30 flex">
            <div className="flex-1 flex items-center justify-center p-3 text-muted-foreground hover:text-white border-r border-border/30 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1 flex items-center justify-center p-3 text-muted-foreground hover:text-white border-r border-border/30 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M3.505 2.365A41.369 41.369 0 019 2c1.863 0 3.697.124 5.495.365 1.247.167 2.18 1.108 2.435 2.268a4.45 4.45 0 00-.577-.069 43.141 43.141 0 00-4.706 0C9.229 4.696 7.5 6.727 7.5 9.1c0 2.25 1.5 4.25 3.75 5.325V17h-1.35c-.958 0-1.85-.328-2.548-.884l-1.464-1.153A1.5 1.5 0 004.5 13.5v-1.325c0-2.248 1.51-4.251 3.75-5.325v-3.5a1.25 1.25 0 011.25-1.25c1.035 0 1.83.132 2.371.223 1.476.237 2.905-.106 3.625-1.083a.5.5 0 01.857.518 4.006 4.006 0 01-2.377 2.08c-.563.208-1.139.39-1.729.537-.211.051-.42.107-.633.162-1.14.291-2.271.372-3.368.363a1.53 1.53 0 00-.274.03 39.068 39.068 0 014.369-.587c.265 0 .526.013.785.038 1.488.15 2.615 1.448 2.615 2.949V8.5c0 2.069-1.386 3.91-3.388 4.444C10.875 13.75 12.169 14.5 13.5 14.5h1a1.5 1.5 0 011.5 1.5v1a1.5 1.5 0 01-1.5 1.5h-2C7.596 18.5 3.5 14.404 3.5 9.5c0-2.116.752-4.125 2.088-5.713A1.505 1.505 0 013.505 2.365z" />
              </svg>
            </div>
            <div className="flex-1 flex items-center justify-center p-3 text-muted-foreground hover:text-white cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
              </svg>
            </div>
          </div>
        </div>
      )}
      
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-10 bg-background/80 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <div className={`flex-1 transition-all duration-300 ${
        secondaryMenuVisible ? 'md:ml-[272px]' : mainMenuCollapsed ? 'md:ml-12' : 'md:ml-56'
      }`}>
        <main className="flex-1 pb-8">
          <div className="px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
        <Footer />
      </div>
      
      <ChatWidget voiceEnabled={true} />
    </div>
  );
}
