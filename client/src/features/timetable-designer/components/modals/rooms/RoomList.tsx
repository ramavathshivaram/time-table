import { memo, useState } from "react";

import RoomCard from "./RoomCard";

import { roomService } from "@/features/timetable-designer/services/room.service";
import { Input } from "@/shared/ui/input";

type Props = {
  onEdit: (roomId: string) => void;
};

const RoomList = ({ onEdit }: Props) => {
  const [query, setQuery] = useState("");

  const filteredRooms = roomService.getAll(query);

  return (
    <div className="flex h-[70vh] flex-col gap-3">
      <Input
        placeholder="Search room..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="flex flex-col h-full gap-2 overflow-y-auto">
        {filteredRooms.map((room) => (
          <RoomCard key={room.id} room={room} onEdit={onEdit} />
        ))}
      </div>
    </div>
  );
};

export default memo(RoomList);
