import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useState } from "react";

const Faculties = () => {
  const [search, setSearch] = useState("");

  const faculties = [
    "Faculty of Science",
    "Faculty of Commerce",
    "Faculty of Arts",
    "Faculty of Medicine",
    "Faculty of Law",
    "Faculty of Education",
  ];

  const filteredFaculties = faculties.filter((faculty) =>
    faculty.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-2">
      {/* Search */}
      <div className="flex items-center gap-2">
        <Input
          placeholder="Enter faculty name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button size="sm">
          <Search size={16} />
        </Button>
      </div>

      {/* Faculty List */}
      <ul className="space-y-1 mt-2 overflow-y-auto">
        {filteredFaculties.map((faculty) => (
          <li
            key={faculty}
            className="border px-2 py-1 hover:bg-white/20 rounded-sm cursor-pointer"
          >
            {faculty}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Faculties;