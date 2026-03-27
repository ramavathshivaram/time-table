import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, FlaskConical, DoorOpen } from "lucide-react";
import React, { memo, useMemo, useState } from "react";
import useResourcesModalStore from "@/store/recources.modal.store";
import useWorkflowStore from "@/store/workflow.store.js";

const Rooms = () => {
  const [search, setSearch] = useState("");

  const rooms = useWorkflowStore((state) => state.rooms);
  const openModal = useResourcesModalStore((state) => state.openModal);

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) =>
      room.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [rooms, search]);

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

        <Button size="icon" onClick={handleAddRoom} className="cursor-pointer">
          <Plus size={18} />
        </Button>
      </div>

      {/* Room List */}
      <div className="flex flex-col gap-2 overflow-y-auto scrollbar">
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            onClick={() => openModal("room", room)}
            className="border rounded-md px-3 py-2 cursor-pointer transition hover:bg-muted flex items-center justify-between"
          >
            {/* Left */}
            <div className="flex flex-col">
              <span className="text-sm font-medium">{room.name}</span>

              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <DoorOpen size={12} />
                Room {room.roomNumber}
              </span>
            </div>

            {/* Right badge */}
            <span
              className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${
                room.isLab
                  ? "bg-blue-500/20 text-blue-600"
                  : "bg-green-500/20 text-green-600"
              }`}
            >
              {room.isLab ? (
                <>
                  <FlaskConical size={12} /> Lab
                </>
              ) : (
                "Class"
              )}
            </span>
          </div>
        ))}

        {filteredRooms.length === 0 && (
          <div className="text-sm text-muted-foreground text-center py-6">
            No rooms found
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Rooms);