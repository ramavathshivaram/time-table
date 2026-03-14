import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import React, { useState } from "react";

const Rooms = () => {
  const [search, setSearch] = useState("");

  const rooms = [
    "room 101","room 102","room 103","room 104","room 105",
    "room 106","room 107","room 108","room 109","room 110",
    "room 111","room 112","room 113","room 114","room 115",
    "room 116","room 117","room 118","room 119","room 120",
  ];

  const filteredRooms = rooms.filter((room) =>
    room.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-3 h-full">
      
      {/* Search */}
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search room..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button className="p-0">
          <Plus />
        </Button>
      </div>

      {/* Room List */}
      <ul className="space-y-1 overflow-y-auto scrollbar">
        {filteredRooms.map((room) => (
          <li
            key={room}
            className="border px-2 py-1 rounded-md cursor-pointer hover:bg-accent transition"
          >
            {room}
          </li>
        ))}
      </ul>

    </div>
  );
};

export default Rooms;