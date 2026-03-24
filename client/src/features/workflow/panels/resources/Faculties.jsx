import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useResourcesModalStore from "@/store/recources.modal.store";
import useWorkflowStore from "@/store/workflow.store.js";
import { Plus, BookOpen } from "lucide-react";
import React, { useMemo, useState } from "react";

const Faculties = () => {
  const [search, setSearch] = useState("");

  const faculties = useWorkflowStore((state) => state.faculties);
  const openModal = useResourcesModalStore((state) => state.openModal);

  const filteredFaculties = useMemo(() => {
    return faculties.filter((faculty) =>
      faculty.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [faculties, search]);

  const handleAddFaculty = () => {
    openModal("faculty", null, true);
  };

  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Search */}
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search faculty..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button size="icon" onClick={handleAddFaculty} className="cursor-pointer">
          <Plus size={18} />
        </Button>
      </div>

      {/* Faculty List */}
      <div className="flex flex-col gap-2 overflow-y-auto scrollbar">
        {filteredFaculties.map((faculty) => (
          <div
            key={faculty.id}
            onClick={() => openModal("faculty", faculty)}
            className="border rounded-md px-3 py-2 cursor-pointer transition hover:bg-muted flex items-center justify-between"
          >
            {/* Faculty Name */}
            <span className="font-medium text-sm">{faculty.name}</span>

            {/* Subject Count */}
            <div className="flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded">
              <BookOpen size={12} />
              {faculty.subjects?.length || 0}
            </div>
          </div>
        ))}

        {filteredFaculties.length === 0 && (
          <div className="text-sm text-muted-foreground text-center py-6">
            No faculties found
          </div>
        )}
      </div>
    </div>
  );
};

export default Faculties;
