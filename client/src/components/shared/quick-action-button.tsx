import { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type QuickActionButtonProps = {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  className?: string;
};

export default function QuickActionButton({
  icon: Icon,
  label,
  onClick,
  className,
}: QuickActionButtonProps) {
  return (
    <button 
      className={cn(
        "flex w-full items-center justify-between rounded-md p-2 text-sm font-medium hover:bg-secondary/50 transition-colors",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary" />
        <span>{label}</span>
      </div>
      <ChevronRight className="h-4 w-4" />
    </button>
  );
}
