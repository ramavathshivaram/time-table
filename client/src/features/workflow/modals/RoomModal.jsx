import useResourcesModalStore from "@/store/recources.modal.store.js";
import roomService from "@/services/workflow/room.service.js";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { generateRoomId } from "@/lib/utils.js";
import useWorkflowStore from "@/store/workflow.store.js";

const RoomModal = ({ closeModal }) => {
  const isNew = useResourcesModalStore((s) => s.isNew);
  const current = useResourcesModalStore((s) => s.current);

  const rooms = useWorkflowStore((s) => s.rooms);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: current?.name || "",
      roomNumber: current?.roomNumber || "",
      isLab: current?.isLab || false,
    },
  });

  const handleDelete = () => {
    roomService.removeRoom(current.id);
    closeModal();
  };

  const onSubmit = (data) => {
    const payload = {
      ...data,
      id: current?.id || generateRoomId(),
    };

    if (isNew) {
      roomService.addRoom(payload);
    } else {
      roomService.updateRoom(current.id, payload);
    }

    reset();
    closeModal();
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {isNew ? "Add Room" : "Edit Room"}
        </h2>

        {!isNew && (
          <Button variant="destructive" size="icon" onClick={handleDelete}>
            <Trash2 size={16} />
          </Button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Room Name */}
        <div>
          <label className="text-sm font-medium">Room Name</label>
          <Input
            placeholder="Enter room name"
            {...register("name", {
              required: "Room name is required",
              validate: (value) => {
                const roomName = value.trim().toLowerCase();
                const duplicate = rooms.some(
                  (room) => room.name.toLowerCase() === roomName,
                );

                return !duplicate || "Room already exists";
              },
            })}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Room Number */}
        <div>
          <label className="text-sm font-medium">Room Number</label>
          <Input
            placeholder="Enter room number"
            {...register("roomNumber", {
              required: "Room number is required",
              validate: (value) => {
                const roomNumber = value.trim().toLowerCase();
                const duplicate = rooms.some(
                  (room) => room.roomNumber.toLowerCase() === roomNumber,
                );

                return !duplicate || "Room number already exists";
              },
            })}
          />
          {errors.roomNumber && (
            <p className="text-sm text-red-500">{errors.roomNumber.message}</p>
          )}
        </div>

        {/* Is Lab */}
        <div className="flex items-center gap-2">
          <input type="checkbox" {...register("isLab")} className="h-4 w-4" />
          <label className="text-sm font-medium">Is Lab</label>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={closeModal}>
            Cancel
          </Button>

          <Button type="submit">{isNew ? "Create Room" : "Update Room"}</Button>
        </div>
      </form>
    </div>
  );
};

export default RoomModal;
