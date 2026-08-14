import { memo, useMemo, useState } from "react";
import { BookOpen, Plus } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

import { useDesignerStore } from "../../store/designer.store";
import { facultyService } from "../../services/faculty.service";

const Faculties = () => {
  const [search, setSearch] = useState("");

  const faculties = useDesignerStore((state) => state.faculties);

  const setFaculties = useDesignerStore((state) => state.setFaculties);

  const filteredFaculties = useMemo(() => {
    const query = search.toLowerCase();

    return faculties.filter((faculty) =>
      faculty.name.toLowerCase().includes(query),
    );
  }, [faculties, search]);

  const handleAddFaculty = async () => {
    const faculty = {
      id: crypto.randomUUID(),
      name: "New Faculty",
      subjects: [],
    };

    const createdFaculty = await facultyService.add(faculty);

    setFaculties([...faculties, createdFaculty]);
  };

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search faculty..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button size="icon" onClick={handleAddFaculty}>
          <Plus size={18} />
        </Button>
      </div>

      <div className="scrollbar flex flex-col gap-2 overflow-y-auto">
        {filteredFaculties.map((faculty) => (
          <div
            key={faculty.id}
            className="flex cursor-pointer items-center justify-between rounded-md border px-3 py-2 transition hover:bg-muted"
          >
            <span className="text-sm font-medium">{faculty.name}</span>

            <div className="flex items-center gap-1 rounded bg-muted px-2 py-1 text-xs">
              <BookOpen size={12} />
              {faculty.subjects?.length ?? 0}
            </div>
          </div>
        ))}

        {!filteredFaculties.length && (
          <div className="py-6 text-center text-sm text-muted-foreground">
            No faculties found
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Faculties);
