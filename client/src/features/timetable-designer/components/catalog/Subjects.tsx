import { memo, useMemo, useState } from "react";
import { Plus, BookOpen } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

import { useDesignerStore } from "../../store/designer.store";
import { subjectService } from "../../services/subject.service";

const Subjects = () => {
  const [search, setSearch] = useState("");

  const subjects = useDesignerStore((state) => state.subjects);
  const setSubjects = useDesignerStore((state) => state.setSubjects);

  const filteredSubjects = useMemo(() => {
    const query = search.toLowerCase();

    return subjects.filter((subject) =>
      subject.name.toLowerCase().includes(query),
    );
  }, [subjects, search]);

  const handleAddSubject = async () => {
    const subject = {
      id: crypto.randomUUID(),
      name: "New Subject",
    };

    const createdSubject = await subjectService.add(subject);

    setSubjects([...subjects, createdSubject]);
  };

  return (
    <div className="flex h-full flex-col gap-3">
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

      <div className="scrollbar flex flex-col gap-2 overflow-y-auto">
        {filteredSubjects.map((subject) => (
          <div
            key={subject.id}
            className="flex cursor-pointer items-center justify-between rounded-md border px-3 py-2 transition hover:bg-muted"
          >
            <div className="flex items-center gap-2">
              <BookOpen size={16} />

              <span className="text-sm font-medium">{subject.name}</span>
            </div>
          </div>
        ))}

        {!filteredSubjects.length && (
          <div className="py-6 text-center text-sm text-muted-foreground">
            No subjects found
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Subjects);
