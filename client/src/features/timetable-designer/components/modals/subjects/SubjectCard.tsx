import { memo } from "react";
import {
  BookOpen,
  Clock3,
  GraduationCap,
  FlaskConical,
  Users,
  MoreHorizontal,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/shared/ui/button";

import type { Subject } from "../../../types";
import { subjectService } from "../../../services/subject.service";

interface Props {
  subject: Subject;
  onEdit: (subjectId: string) => void;
}

const SubjectCard = ({ subject, onEdit }: Props) => {
  const handleDelete = async (subjectId: string) => {
    await subjectService.remove(subjectId);
  };

  return (
    <div
      onClick={() => onEdit(subject.id)}
      className="group relative flex cursor-pointer items-center gap-3 rounded-md border px-2.5 py-2 transition-colors hover:border-border hover:bg-muted/40"
    >
      <div
        className={`flex size-8 shrink-0 items-center justify-center rounded-md ${
          subject.isLab
            ? "bg-violet-500/10 text-violet-600 dark:text-violet-400"
            : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
        }`}
      >
        {subject.isLab ? <FlaskConical size={15} /> : <BookOpen size={15} />}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-xs font-medium">{subject.name}</p>

          <span
            className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-medium ${
              subject.isLab
                ? "bg-violet-500/10 text-violet-600 dark:text-violet-400"
                : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
            }`}
          >
            {subject.isLab ? "LAB" : "THEORY"}
          </span>
        </div>

        <div className="mt-1 flex items-center gap-2 text-[10px] text-muted-foreground">
          <span>{subject.code || "No code"}</span>

          <span className="text-border">•</span>

          <span className="flex items-center gap-1">
            <Clock3 size={10} />
            {subject.duration} min
          </span>

          <span className="text-border">•</span>

          <span>{subject.credits} credits</span>
        </div>

        <div className="mt-1.5 flex items-center gap-3 text-[9px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <GraduationCap size={10} />
            {subject.weeklyPeriods} periods/week
          </span>

          <span className="flex items-center gap-1">
            <Users size={10} />
            {subject.facultyIds.length} faculty
          </span>
        </div>
      </div>

      <div className="flex items-center gap-0.5">
        <Button
          variant="ghost"
          size="icon"
          className="size-7 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={(event) => {
            event.stopPropagation();
            handleDelete(subject.id);
          }}
        >
          <MoreHorizontal size={14} />
        </Button>

        <ChevronRight
          size={14}
          className="text-muted-foreground/50 transition-transform group-hover:translate-x-0.5"
        />
      </div>
    </div>
  );
};

export default memo(SubjectCard);
