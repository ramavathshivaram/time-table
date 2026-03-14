import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import React, { useState } from "react";

import useResourcesModalStore from "@/store/recources.modal.store";
import useWorkflowStore from "@/store/workflow.store.js";

const Subjects = () => {
  const [search, setSearch] = useState("");

  const subjects = useWorkflowStore((state) => state.subjects);
  const openModal = useResourcesModalStore((state) => state.openModal);

  console.log(subjects)


  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleAddSubject = () => {
    openModal("subject", null, true);
  };

  return (
    <div className="flex flex-col gap-2 h-full">
      {/* Search */}
      <div className="flex items-center gap-2">
        <Input
          placeholder="Enter subject name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button className="p-0" onClick={handleAddSubject}>
          <Plus />
        </Button>
      </div>

      {/* Subject List */}
      <ul className="space-y-1 overflow-y-auto scrollbar">
        {filteredSubjects.map((subject) => (
          <li
            key={subject.id}
            onClick={() => openModal("faculty", subject)}
            className="border p-1 hover:bg-white/20 rounded-sm cursor-pointer"
          >
            {subject.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Subjects;
