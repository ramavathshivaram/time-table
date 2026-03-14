import useResourcesModalStore from "@/store/recources.modal.store.js";
import useWorkflowStore from "@/store/workflow.store.js";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import { Delete } from "lucide-react";
import { generateRoomId } from "@/lib/utils.js";

const RoomModal = ({ closeModal }) => {
  const isNew = useResourcesModalStore((s) => s.isNew);
  const current = useResourcesModalStore((s) => s.current);

  const addRoom = useWorkflowStore((s) => s.addRoom);
  const updateRoom = useWorkflowStore((s) => s.updateRoom);
  const removeRoom = useWorkflowStore((s) => s.removeRoom);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: current?.name || "",
      roomNumber: current?.roomNumber || "",
      isLab: current?.isLab || false,
    },
  });

  const handleDelete = () => {
    removeRoom(current.id);
    closeModal();
  };

  const onSubmit = (data) => {
    const payload = {
      ...data,
      id: current?.id || generateRoomId(),
    };

    if (isNew) {
      addRoom(payload);
    } else {
      updateRoom(current.id, payload);
    }

    reset();
    closeModal();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {isNew ? "Add Room" : "Edit Room"}
        </h2>

        {!isNew && (
          <Button variant="destructive" size="icon" onClick={handleDelete}>
            <Delete size={16} />
          </Button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Room Name */}
        <div>
          <label className="text-sm font-medium">Room Name</label>
          <Input placeholder="Enter room name" {...register("name")} />
        </div>

        {/* Room Number */}
        <div>
          <label className="text-sm font-medium">Room Number</label>
          <Input
            placeholder="Enter room number"
            {...register("roomNumber")}
          />
        </div>

        {/* Is Lab */}
        <div className="flex items-center gap-2">
          <Input
            type="checkbox"
            {...register("isLab")}
            className="h-4 w-4"
          />
          <label className="text-sm font-medium">Is Lab</label>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={closeModal}>
            Cancel
          </Button>

          <Button type="submit">
            {isNew ? "Create Room" : "Update Room"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RoomModal;