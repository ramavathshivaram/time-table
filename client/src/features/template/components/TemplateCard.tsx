import { ArrowUpRight, Globe2, Lock, MoreHorizontal } from "lucide-react";

import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";

interface Props {
  template: {
    id: string;
    name: string;
    description?: string;
    visibility: "private" | "public";
    createdAt: string;
    updatedAt: string;
  };
}

const TemplateCard = ({ template }: Props) => {
  const isPublic = template.visibility === "public";

  return (
    <Card
      className="
        group overflow-hidden rounded-xl
        border-border bg-card
        transition-all duration-200
        hover:border-border
        hover:shadow-sm
      "
    >
      {/* Preview */}
      <div
        className="
          relative h-20 overflow-hidden
          border-b border-border
          bg-muted/20
        "
      >
        {/* Grid */}
        <div
          className="
            absolute inset-0 opacity-40
            [background-image:linear-gradient(to_right,hsl(var(--border)/0.35)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.35)_1px,transparent_1px)]
            [background-size:20px_20px]
          "
        />

        {/* Mini graph */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center">
            <div className="h-7 w-14 rounded-md border bg-background shadow-sm" />

            <div className="h-px w-4 bg-border" />

            <div className="h-7 w-14 rounded-md border bg-background shadow-sm" />

            <div className="h-px w-4 bg-border" />

            <div className="h-7 w-14 rounded-md border bg-background shadow-sm" />
          </div>
        </div>

        {/* Visibility */}
        <div className="absolute left-2.5 top-2">
          <Badge
            variant="secondary"
            className="
              h-5 gap-1 rounded-md
              border bg-background/90
              px-1.5 text-[9px]
              font-medium backdrop-blur
            "
          >
            {isPublic ? (
              <Globe2 className="size-2.5" />
            ) : (
              <Lock className="size-2.5" />
            )}

            {isPublic ? "Public" : "Private"}
          </Badge>
        </div>

        {/* More */}
        <div className="absolute right-2 top-2">
          <Button
            variant="secondary"
            size="icon"
            className="
              size-6 rounded-md
              border bg-background/90
              opacity-0 shadow-sm
              backdrop-blur
              transition-opacity
              group-hover:opacity-100
            "
          >
            <MoreHorizontal className="size-3.5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Title + description */}
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold">{template.name}</h3>

          <p className="mt-1 line-clamp-2 min-h-8 text-xs leading-4 text-muted-foreground">
            {template.description || "No description provided."}
          </p>
        </div>

        {/* Meta */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <span>
              Updated{" "}
              {new Date(template.updatedAt).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          <span className="text-[10px] text-muted-foreground">Timetable</span>
        </div>

        {/* Action */}
        <Button
          variant="outline"
          size="sm"
          className="
            mt-3 h-8 w-full
            justify-between
            px-3 text-xs
            group-hover:border-primary/30
            group-hover:bg-primary/5
          "
        >
          <span>Use Template</span>

          <ArrowUpRight
            className="
              size-3.5
              transition-transform
              group-hover:translate-x-0.5
              group-hover:-translate-y-0.5
            "
          />
        </Button>
      </div>
    </Card>
  );
};

export default TemplateCard;
