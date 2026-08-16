import { memo, useMemo, useState } from "react";

import RoomCard from "./RoomCard";

import { roomService } from "@/features/timetable-designer/services/room.service";
import { Input } from "@/shared/ui/input";

type props = {
  onEdit: (room: Room) => void;
};

const RoomList = ({ onEdit }: props) => {
  const [query, setQuery] = useState("");

  const filteredRooms = roomService.getAll(query);

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search room..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {filteredRooms.map((room) => (
        <RoomCard key={room.id} room={room} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default memo(RoomList);
