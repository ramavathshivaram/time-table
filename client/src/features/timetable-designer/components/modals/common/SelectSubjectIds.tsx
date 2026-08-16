import { useEffect, useMemo, useState } from "react";
import { Check, X } from "lucide-react";

import { Button } from "@/shared/ui/button";

import { subjectService } from "@/features/timetable-designer/services/subject.service";
import type { Subject } from "@/features/timetable-designer/types";

export type SelectedSubject = {
  id: string;
  name: string;
};

interface Props {
  initialSelectedIds?: string[];
  setSelectedSubjectIds: (subjectIds: string[]) => void;
}

const SelectSubjectIds = ({
  initialSelectedIds = [],
  setSelectedSubjectIds,
}: Props) => {
  const [query, setQuery] = useState("");

  const [selectedSubjects, setSelectedSubjects] = useState<SelectedSubject[]>(
    () => {
      return subjectService
        .getAll("")
        .filter((subject) => initialSelectedIds.includes(subject.id))
        .map((subject) => ({
          id: subject.id,
          name: subject.name,
        }));
    },
  );

  useEffect(() => {
    setSelectedSubjectIds(selectedSubjects.map((subject) => subject.id));
  }, [selectedSubjects]);

  const subjects = useMemo(() => {
    const value = query.trim();

    if (!value) return [];

    return subjectService.getAll(value);
  }, [query]);

  const isSelected = (subjectId: string) => {
    return selectedSubjects.some((subject) => subject.id === subjectId);
  };

  const handleToggle = (subject: Subject) => {
    setSelectedSubjects((current) => {
      const exists = current.some((item) => item.id === subject.id);

      if (exists) {
        return current.filter((item) => item.id !== subject.id);
      }

      return [
        ...current,
        {
          id: subject.id,
          name: subject.name,
        },
      ];
    });

    setQuery("");
  };

  const handleRemove = (subjectId: string) => {
    setSelectedSubjects((current) =>
      current.filter((subject) => subject.id !== subjectId),
    );
  };

  return (
    <div className="space-y-3">
      {/* Multi select */}
      <div className="relative">
        <div className="flex min-h-10 flex-wrap items-center gap-1.5 rounded-md border bg-background px-2 py-1.5 focus-within:ring-1 focus-within:ring-ring">
          {/* Selected */}
          {selectedSubjects.map((subject) => (
            <div
              key={subject.id}
              className="flex items-center gap-1 rounded bg-muted px-2 py-1 text-xs"
            >
              <span className="max-w-40 truncate">{subject.name}</span>

              <button
                type="button"
                onClick={() => handleRemove(subject.id)}
                className="rounded-sm text-muted-foreground hover:text-foreground"
              >
                <X size={12} />
              </button>
            </div>
          ))}

          {/* Search */}
          <input
            type="text"
            value={query}
            placeholder={
              selectedSubjects.length === 0
                ? "Search subjects..."
                : "Add subject..."
            }
            onChange={(event) => setQuery(event.target.value)}
            className="min-w-32 flex-1 bg-transparent px-1 py-1 text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        {/* Search results */}
        {query.trim() && (
          <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-y-auto rounded-md border bg-popover p-1 shadow-md">
            {subjects.length > 0 ? (
              subjects.map((subject) => {
                const selected = isSelected(subject.id);

                return (
                  <button
                    key={subject.id}
                    type="button"
                    onClick={() => handleToggle(subject)}
                    className="flex w-full items-center justify-between rounded-sm px-2.5 py-2 text-left transition-colors hover:bg-muted"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium">
                        {subject.name}
                      </p>

                      <p className="mt-0.5 text-[10px] text-muted-foreground">
                        {subject.code}
                        {" • "}
                        {subject.labDetails.isLab ? "Laboratory" : "Theory"}
                      </p>
                    </div>

                    {selected && (
                      <Check size={14} className="ml-3 shrink-0 text-primary" />
                    )}
                  </button>
                );
              })
            ) : (
              <div className="px-3 py-6 text-center text-xs text-muted-foreground">
                No subjects found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectSubjectIds;
