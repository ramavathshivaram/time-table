import { memo, useMemo, useState } from "react";
import {
  Plus,
  DoorOpen,
  FlaskConical,
  MoreHorizontal,
  Users,
  Layers3,
  Clock3,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

import { useDesignerStore } from "../../store/designer.store";
import { roomService } from "../../services/room.service";
import type { Room } from "../../types";

const Rooms = () => {
  const [search, setSearch] = useState("");

  const rooms = useDesignerStore((state) => state.rooms);
  const setRooms = useDesignerStore((state) => state.setRooms);

  const filteredRooms = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return rooms;

    return rooms.filter(
      (room) =>
        room.name.toLowerCase().includes(query) ||
        room.roomNumber.toLowerCase().includes(query),
    );
  }, [rooms, search]);

  const handleAddRoom = async () => {
    const room: Room = {
      id: crypto.randomUUID(),
      name: "New Room",
      roomNumber: "",
      capacity: 60,
      floor: 1,
      isLab: false,
      facilities: [],
      availability: {
        workingDays: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        startTime: "09:00",
        endTime: "16:30",
        unavailableSlots: [],
      },
    };

    const createdRoom = await roomService.add(room);

    setRooms([...rooms, createdRoom]);
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Header */}
      <div className="shrink-0 space-y-3 border-b pb-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold tracking-tight">Rooms</h3>

              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                {rooms.length}
              </span>
            </div>

            <p className="mt-0.5 text-[11px] text-muted-foreground">
              Classrooms and laboratories
            </p>
          </div>

          <Button
            size="sm"
            onClick={handleAddRoom}
            className="h-8 gap-1.5 rounded-md"
          >
            <Plus size={14} />
            Add Room
          </Button>
        </div>

        <Input
          placeholder="Search by name or room number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-8 bg-muted/30 text-xs"
        />
      </div>

      {/* List */}
      <div className="scrollbar min-h-0 flex-1 overflow-y-auto py-3">
        <div className="space-y-1.5">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="group relative flex cursor-pointer items-center gap-3 rounded-md border px-2.5 py-2 transition-colors hover:border-border hover:bg-muted/40"
            >
              {/* Room icon */}
              <div
                className={`flex size-8 shrink-0 items-center justify-center rounded-md ${
                  room.isLab
                    ? "bg-violet-500/10 text-violet-600 dark:text-violet-400"
                    : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                }`}
              >
                {room.isLab ? (
                  <FlaskConical size={15} />
                ) : (
                  <DoorOpen size={15} />
                )}
              </div>

              {/* Main content */}
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

                {/* Facilities / availability */}
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

              {/* Actions */}
              <div className="flex items-center gap-0.5">
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <MoreHorizontal size={14} />
                </Button>

                <ChevronRight
                  size={14}
                  className="text-muted-foreground/50 transition-transform group-hover:translate-x-0.5"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Empty */}
        {!filteredRooms.length && (
          <div className="flex h-full min-h-48 flex-col items-center justify-center px-6 text-center">
            <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-muted">
              {search ? (
                <DoorOpen size={17} className="text-muted-foreground" />
              ) : (
                <Plus size={17} className="text-muted-foreground" />
              )}
            </div>

            <p className="text-xs font-medium">
              {search ? "No rooms found" : "No rooms yet"}
            </p>

            <p className="mt-1 max-w-52 text-[10px] leading-relaxed text-muted-foreground">
              {search
                ? "Try searching with another room name or number."
                : "Add classrooms and laboratories to use them in your timetable."}
            </p>

            {!search && (
              <Button
                size="sm"
                variant="outline"
                className="mt-3 h-7 text-[11px]"
                onClick={handleAddRoom}
              >
                <Plus size={13} />
                Add Room
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Rooms);
