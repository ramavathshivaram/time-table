import { ArrowRight, CalendarDays, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

import type { Timetable } from "../types/timetable.types";

interface RecentTimetableCardProps {
  timetable: Timetable;
}

const RecentTimetableCard = ({ timetable }: RecentTimetableCardProps) => {
  const navigate = useNavigate();

  const updatedAgo = formatDistanceToNow(new Date(timetable.updatedAt), {
    addSuffix: true,
  });

  const handleOpen = () => {
    navigate(`/timetables/${timetable._id}`);
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    console.log("Delete", timetable._id);
  };

  return (
    <article
      onClick={handleOpen}
      className="group relative w-64 cursor-pointer overflow-hidden rounded-2xl border border-border/50 bg-surface-muted/5 p-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex min-w-0 items-center gap-2">
          <div className="rounded-xl bg-surface-muted/10 p-2 transition group-hover:bg-surface-muted/20">
            <CalendarDays size={18} />
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold">
              {timetable.title}
            </h2>

            <p className="text-xs text-muted-foreground">Timetable</p>
          </div>
        </div>

        {/* Delete */}
        <button
          type="button"
          onClick={handleDelete}
          aria-label="Delete timetable"
          className="rounded-lg p-2 opacity-0 transition group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>{updatedAgo.replace("about ", "")}</span>

        <span className="flex items-center gap-1 transition-all group-hover:gap-2">
          Open
          <ArrowRight
            size={13}
            className="transition-transform group-hover:translate-x-1"
          />
        </span>
      </div>
    </article>
  );
};

export default RecentTimetableCard;
