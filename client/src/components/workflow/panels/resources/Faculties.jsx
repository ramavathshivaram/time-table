import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useResourcesModalStore from "@/store/recources.modal.store";
import useWorkflowStore from "@/store/workflow.store.js";
import { Plus } from "lucide-react";
import React, { useState } from "react";

const Faculties = () => {
  const [search, setSearch] = useState("");

  const faculties = useWorkflowStore((state) => state.faculties);
  const openModal = useResourcesModalStore((state) => state.openModal);

  const filteredFaculties = faculties.filter((faculty) =>
    faculty.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleAddFaculty = () => {
    openModal("faculty", null, true);
  };

  return (
    <div className="flex flex-col gap-2 h-full">
      {/* Search */}
      <div className="flex items-center gap-2">
        <Input
          placeholder="Enter faculty name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button className="p-0" onClick={handleAddFaculty}>
          <Plus />
        </Button>
      </div>

      {/* Faculty List */}
      <ul className="space-y-1 mt-2 overflow-y-auto scrollbar">
        {filteredFaculties.map((faculty) => (
          <li
            key={faculty.id}
            className="border px-2 py-1 hover:bg-white/20 rounded-sm cursor-pointer"
            onClick={() => openModal("faculty", faculty)}
          >
            {faculty.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Faculties;
