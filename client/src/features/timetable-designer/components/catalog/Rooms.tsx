import { memo, useMemo, useState } from "react";
import { Plus, DoorOpen } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

import { useDesignerStore } from "../../store/designer.store";
import { roomService } from "../../services/room.service";

const Rooms = () => {
  const [search, setSearch] = useState("");

  const rooms = useDesignerStore((state) => state.rooms);
  const setRooms = useDesignerStore((state) => state.setRooms);

  const filteredRooms = useMemo(() => {
    const query = search.toLowerCase();

    return rooms.filter((room) => room.name.toLowerCase().includes(query));
  }, [rooms, search]);

  const handleAddRoom = async () => {
    const room = {
      id: crypto.randomUUID(),
      name: "New Room",
    };

    const createdRoom = await roomService.add(room);

    setRooms([...rooms, createdRoom]);
  };

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search room..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button size="icon" onClick={handleAddRoom}>
          <Plus size={18} />
        </Button>
      </div>

      <div className="scrollbar flex flex-col gap-2 overflow-y-auto">
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            className="flex cursor-pointer items-center justify-between rounded-md border px-3 py-2 transition hover:bg-muted"
          >
            <div className="flex items-center gap-2">
              <DoorOpen size={16} />

              <span className="text-sm font-medium">{room.name}</span>
            </div>
          </div>
        ))}

        {!filteredRooms.length && (
          <div className="py-6 text-center text-sm text-muted-foreground">
            No rooms found
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Rooms);
