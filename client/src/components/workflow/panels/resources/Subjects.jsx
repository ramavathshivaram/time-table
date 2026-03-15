import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, FlaskConical, BookOpen } from "lucide-react";
import React, { useMemo, useState } from "react";

import useResourcesModalStore from "@/store/recources.modal.store";
import useWorkflowStore from "@/store/workflow.store.js";
import { cn } from "@/lib/utils";

const Subjects = () => {
  const [search, setSearch] = useState("");

  const subjects = useWorkflowStore((state) => state.subjects);
  const openModal = useResourcesModalStore((state) => state.openModal);

  const filteredSubjects = useMemo(() => {
    return subjects.filter((subject) =>
      subject.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [subjects, search]);

  const handleAddSubject = () => {
    openModal("subject", null, true);
  };

  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Search */}
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button size="icon" onClick={handleAddSubject}>
          <Plus size={18} />
        </Button>
      </div>

      {/* Subject List */}
      <div className="flex flex-col gap-1 overflow-y-auto scrollbar">
        {filteredSubjects.map((subject) => (
          <div
            key={subject.id}
            onClick={() => openModal("subject", subject)}
            className="border rounded-md px-2 py-1 flex w-full justify-between items-center cursor-pointer hover:bg-muted transition"
          >
            {/* Subject name */}
            <div className="flex flex-col justify-between gap-1">
              <h2 className="text-sm font-medium">{subject.name}</h2>
              <span className="text-xs text-muted-foreground">
                {subject.duration} periods
              </span>
            </div>
            <span
              className={cn(
                "flex items-center gap-1 text-xs px-1 py-1 rounded bg-green-500/20 text-green-600",
                subject.isLab && "bg-blue-500/20 text-blue-600",
              )}
            >
              {subject.isLab ? (
                <>
                  <FlaskConical size={12} /> Lab
                </>
              ) : (
                <>
                  <BookOpen size={12} /> Theory
                </>
              )}
            </span>
          </div>
        ))}

        {filteredSubjects.length === 0 && (
          <div className="text-sm text-muted-foreground text-center py-6">
            No subjects found
          </div>
        )}
      </div>
    </div>
  );
};

export default Subjects;
