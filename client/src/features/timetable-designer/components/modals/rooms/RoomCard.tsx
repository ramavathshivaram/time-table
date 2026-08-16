import { memo } from "react";
import {
  ChevronRight,
  Clock3,
  DoorOpen,
  FlaskConical,
  Layers3,
  MoreHorizontal,
  Users,
} from "lucide-react";

import { Button } from "@/shared/ui/button";

import { roomService } from "../../../services/room.service";
import type { Room } from "../../../types";

interface Props {
  room: Room;
  onEdit: (roomId: string) => void;
}

const RoomCard = ({ room, onEdit }: Props) => {
  const handleDelete = async (roomId: Room["id"]) => {
    await roomService.remove(roomId);
  };

  return (
    <div
      onClick={() => onEdit(room.id)}
      className="group relative flex cursor-pointer items-center gap-3 rounded-md border px-2.5 py-2 transition-colors hover:border-border hover:bg-muted/40"
    >
      <div
        className={`flex size-8 shrink-0 items-center justify-center rounded-md ${
          room.isLab
            ? "bg-violet-500/10 text-violet-600 dark:text-violet-400"
            : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
        }`}
      >
        {room.isLab ? <FlaskConical size={15} /> : <DoorOpen size={15} />}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-xs font-medium">{room.name}</p>

          <span
            className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-medium ${
              room.isLab
                ? "bg-violet-500/10 text-violet-600 dark:text-violet-400"
                : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
            }`}
          >
            {room.isLab ? "LAB" : "ROOM"}
          </span>
        </div>

        <div className="mt-1 flex items-center gap-2 text-[10px] text-muted-foreground">
          <span>{room.roomNumber || "No number"}</span>

          <span className="text-border">•</span>

          <span className="flex items-center gap-1">
            <Users size={10} />
            {room.capacity}
          </span>

          <span className="text-border">•</span>

          <span className="flex items-center gap-1">
            <Layers3 size={10} />F{room.floor}
          </span>
        </div>

        <div className="mt-1.5 flex items-center gap-2">
          {room.facilities.length > 0 && (
            <span className="text-[9px] text-muted-foreground">
              {room.facilities.length} facilities
            </span>
          )}

          {room.availability && (
            <span className="flex items-center gap-1 text-[9px] text-muted-foreground">
              <Clock3 size={9} />
              {room.availability.startTime}–{room.availability.endTime}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-0.5">
        <Button
          variant="ghost"
          size="icon"
          className="size-7 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={(event) => {
            event.stopPropagation();
            handleDelete(room.id);
          }}
        >
          <MoreHorizontal size={14} />
        </Button>

        <ChevronRight
          size={14}
          className="text-muted-foreground/50 transition-transform group-hover:translate-x-0.5"
        />
      </div>
    </div>
  );
};

export default memo(RoomCard);
