import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useState } from "react";

const Subjects = () => {
  const [search, setSearch] = useState("");

  const subjects = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Operating Systems",
    "Database Management System",
    "Computer Networks",
    "Artificial Intelligence",
    "Machine Learning",
    "Software Engineering",
    "Data Structures",
  ];

  const filteredSubjects = subjects.filter((subject) =>
    subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-2">
      {/* Search */}
      <div className="flex items-center gap-2">
        <Input
          placeholder="Enter subject name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button size="sm">
          <Search size={16} />
        </Button>
      </div>

      {/* Subject List */}
      <ul className="space-y-1 mt-2 overflow-y-auto">
        {filteredSubjects.map((subject) => (
          <li
            key={subject}
            className="border p-2 hover:bg-white/20 rounded-sm cursor-pointer"
          >
            {subject}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Subjects;