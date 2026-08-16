import { useForm } from "react-hook-form";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

import type { Room } from "../../../types";
import { roomService } from "@/features/timetable-designer/services/room.service";

interface Props {
  onSave: () => void;
  onCancel: () => void;
}

type RoomFormData = {
  name: string;
  roomNumber: string;
  capacity: number;
  floor: number;
  isLab: boolean;
};

const AddRoomForm = ({ onSave, onCancel }: Props) => {
  const { register, handleSubmit } = useForm<RoomFormData>({
    defaultValues: {
      name: "",
      roomNumber: "",
      capacity: 60,
      floor: 1,
      isLab: false,
    },
  });

  const onSubmit = (data: RoomFormData) => {
    const room: Room = {
      id: crypto.randomUUID(),
      name: data.name.trim() || "New Room",
      roomNumber: data.roomNumber.trim(),
      capacity: data.capacity,
      floor: data.floor,
      isLab: data.isLab,
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

    roomService.add(room);
    onSave();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-3">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold">Add Room</h3>

          <p className="text-[11px] text-muted-foreground">
            Create a classroom or laboratory.
          </p>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="name">Room Name</Label>

          <Input
            id="name"
            placeholder="e.g. CSE Classroom 1"
            {...register("name")}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="roomNumber">Room Number</Label>

          <Input
            id="roomNumber"
            placeholder="e.g. CSE-101"
            {...register("roomNumber")}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="capacity">Capacity</Label>

            <Input
              id="capacity"
              type="number"
              min={1}
              {...register("capacity", {
                valueAsNumber: true,
              })}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="floor">Floor</Label>

            <Input
              id="floor"
              type="number"
              min={0}
              {...register("floor", {
                valueAsNumber: true,
              })}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            id="isLab"
            type="checkbox"
            {...register("isLab")}
            className="size-4 rounded border"
          />

          <Label htmlFor="isLab" className="cursor-pointer text-sm">
            Laboratory
          </Label>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" size="sm" onClick={onCancel}>
            Cancel
          </Button>

          <Button type="submit" size="sm">
            Add Room
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddRoomForm;
