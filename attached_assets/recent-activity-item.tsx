import { LucideIcon } from "lucide-react";

type RecentActivityItemProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  timestamp: string;
  href?: string;
  onClick?: () => void;
};

export default function RecentActivityItem({
  icon: Icon,
  title,
  description,
  timestamp,
  href,
  onClick,
}: RecentActivityItemProps) {
  const WrapperComponent = ({ children }: { children: React.ReactNode }) => {
    if (href) {
      return (
        <a 
          href={href} 
          className="flex items-start gap-4 rounded-md p-3 hover:bg-secondary/50 transition-colors cursor-pointer" 
          onClick={onClick}
        >
          {children}
        </a>
      );
    }
    
    return (
      <div 
        className="flex items-start gap-4 rounded-md p-3 hover:bg-secondary/50 transition-colors"
        onClick={onClick}
        style={onClick ? { cursor: 'pointer' } : {}}
      >
        {children}
      </div>
    );
  };

  return (
    <WrapperComponent>
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-muted-foreground">{timestamp}</p>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </div>
    </WrapperComponent>
  );
}
