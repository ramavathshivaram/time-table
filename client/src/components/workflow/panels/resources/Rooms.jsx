import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import useResourcesModalStore from "@/store/recources.modal.store";
import useWorkflowStore from "@/store/workflow.store.js";

const Rooms = () => {
  const [search, setSearch] = useState("");

  const rooms = useWorkflowStore((state) => state.rooms);
  const openModal = useResourcesModalStore((state) => state.openModal);

  console.log(rooms);

  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleAddRoom = () => {
    openModal("room", null, true);
  };

  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Search */}
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search room..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button className="p-0" onClick={handleAddRoom}>
          <Plus />
        </Button>
      </div>

      {/* Room List */}
      <ul className="space-y-1 overflow-y-auto scrollbar">
        {filteredRooms.map((room) => (
          <li
            key={room.id}
            onClick={() => openModal("room", room)}
            className="border px-2 py-1 rounded-md cursor-pointer hover:bg-accent transition"
          >
            {room.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rooms;
