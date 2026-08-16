import {
  CalendarDays,
  Clock3,
  Users,
  BookOpen,
  DoorOpen,
  Layers3,
} from "lucide-react";

interface NodeInfoProps {
  icon: React.ElementType;
  children: React.ReactNode;
}

export const NodeInfo = ({ icon: Icon, children }: NodeInfoProps) => {
  return (
    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
      <Icon className="size-3.5 shrink-0" />
      <span>{children}</span>
    </div>
  );
};

interface NodeBadgeProps {
  children: React.ReactNode;
}

export const NodeBadge = ({ children }: NodeBadgeProps) => {
  return (
    <span className="rounded-md bg-muted px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground">
      {children}
    </span>
  );
};
