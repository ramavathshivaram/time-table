import { memo, useState } from "react";

import { Button } from "@/shared/ui/button";

import RoomList from "./RoomList";
import AddRoomForm from "./AddRoomForm";
import EditRoomForm from "./EditRoomForm";

const Rooms = () => {
  const [type, setType] = useState<"list" | "add-form" | "edit-form">("list");
  const [roomId, setRoomId] = useState<string | null>(null);

  return (
    <div className="flex h-full min-h-0 flex-col">
      {type === "list" && (
        <>
          <div className="flex items-center justify-between border-b pb-3">
            <h2 className="text-sm font-semibold">Rooms</h2>

            <Button size="sm" onClick={() => setType("add-form")}>
              Add Room
            </Button>
          </div>

          <RoomList
            onEdit={(room_id) => {
              setRoomId(room_id);
              setType("edit-form");
            }}
          />
        </>
      )}

      {type === "add-form" && (
        <AddRoomForm
          onCancel={() => setType("list")}
          onSave={() => setType("list")}
        />
      )}

      {type === "edit-form" && roomId && (
        <EditRoomForm
          roomId={roomId}
          onCancel={() => {
            setRoomId(null);
            setType("list");
          }}
          onSave={() => {
            setRoomId(null);
            setType("list");
          }}
        />
      )}
    </div>
  );
};

export default memo(Rooms);
