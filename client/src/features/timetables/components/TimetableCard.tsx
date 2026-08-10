import { ArrowRight, CalendarDays, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

import type { Timetable } from "../types/timetable.types";
import { useTimetableMutation } from "../hooks/timetable.query";

interface TimetableCardProps {
  timetable: Timetable;
}

const TimetableCard = ({ timetable }: TimetableCardProps) => {
  const navigate = useNavigate();
  const { mutate: deleteTimetable } = useTimetableMutation.useDeleteTimetable();

  const createdAgo = formatDistanceToNow(new Date(timetable.createdAt), {
    addSuffix: true,
  });

  const handleOpen = () => {
    navigate(`/timetables/${timetable._id}`);
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    deleteTimetable({ timetableId: timetable._id });
  };

  return (
    <article
      onClick={handleOpen}
      className="
        group relative cursor-pointer overflow-hidden
        rounded-2xl border border-border/50
        bg-background/50 p-5
        backdrop-blur-sm
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-lg
      "
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="
              rounded-xl bg-muted p-2.5
              transition-colors
              group-hover:bg-muted/70
            "
          >
            <CalendarDays size={18} />
          </div>

          <h2 className="truncate text-base font-semibold">
            {timetable.title}
          </h2>
        </div>

        {/* Actions */}
        <button
          type="button"
          onClick={handleDelete}
          aria-label="Delete timetable"
          className="
            rounded-lg p-2
            opacity-0 transition
            group-hover:opacity-100
            hover:bg-destructive/10
            hover:text-destructive
          "
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Footer */}
      <div
        className="
          mt-4 flex items-center justify-between
          text-xs text-muted-foreground
        "
      >
        <span>{createdAgo.replace("about ", "")}</span>

        <span
          className="
            flex items-center gap-1
            transition-all
            group-hover:gap-2
          "
        >
          Open
          <ArrowRight
            size={14}
            className="
              transition-transform
              group-hover:translate-x-1
            "
          />
        </span>
      </div>
    </article>
  );
};

export default TimetableCard;
