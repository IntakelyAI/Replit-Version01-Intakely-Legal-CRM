import { Bell, Menu } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

type HeaderProps = {
  setSidebarOpen: (value: boolean) => void;
};

export function Header({ setSidebarOpen }: HeaderProps) {
  const [location] = useLocation();

  // Extract the current page name from the location
  const getPageName = () => {
    switch(location) {
      case '/':
      case '/assistant':
        return 'Personal Assistant';
      case '/agent-builder':
        return 'Agent Builder';
      case '/spaces':
        return 'Spaces: Law Firms';
      case '/contacts':
        return 'Contacts';
      case '/channels':
        return 'Channels';
      case '/notifications':
        return 'Notifications';
      case '/settings':
        return 'Settings';
      default:
        return 'Personal Assistant';
    }
  };

  return (
    <header className="bg-card/50 border-b border-border shadow-sm sticky top-0 z-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button 
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-6 w-6" />
            </button>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <nav className="flex" aria-label="Breadcrumb">
                <Link href="/">
                  <a className="text-muted-foreground hover:text-foreground text-sm font-medium">
                    {getPageName()}
                  </a>
                </Link>
              </nav>
            </div>
          </div>
          
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative text-muted-foreground hover:text-foreground"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive"></span>
            </Button>
            
            <Avatar className="h-8 w-8 ml-4">
              <AvatarFallback className="bg-primary text-primary-foreground">AH</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}
