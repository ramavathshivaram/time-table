import { roomController } from "#services/workflow-service/routes/workflow.grpc.js";
import { tool } from "langchain";
import { z } from "zod";
import { generateRoomId } from "../../libs/workflow.lib.js";

const addRoomTool = tool(
  async ({ workflowId, room }) => {
    try {
      const newRoom = {
        ...room,
        id: generateRoomId(),
      };

      await roomController.addRoomGRPC(workflowId, newRoom);

      return {
        success: true,
        action: "room_added",
        room: newRoom,
      };
    } catch (error) {
      console.error("add room tool error:", error);

      return {
        success: false,
        action: "room_add_failed",
        error: error.message,
      };
    }
  },
  {
    name: "add_room",
    description: "Add a room to the workflow timetable system",
    schema: z.object({
      workflowId: z
        .string()
        .describe("Workflow identifier where the room will be added"),

      room: z.object({
        name: z.string().describe("Name of the room"),

        roomNumber: z.string().describe("Room number identifier"),

        isLab: z.boolean().describe("Whether the room is a lab room"),
      }),
    }),
  },
);

const removeRoomTool = tool(
  async ({ workflowId, roomId }) => {
    try {
      await roomController.removeRoomGRPC(workflowId, roomId);

      return {
        success: true,
        action: "room_removed",
        roomId,
      };
    } catch (error) {
      console.error("remove room tool error:", error);

      return {
        success: false,
        action: "room_remove_failed",
        error: error.message,
      };
    }
  },
  {
    name: "remove_room",
    description: "Remove a room from the workflow",
    schema: z.object({
      workflowId: z
        .string()
        .describe("Workflow identifier containing the room"),

      roomId: z.string().describe("Unique identifier of the room to remove"),
    }),
  },
);

const updateRoomTool = tool(
  async ({ workflowId, roomId, roomData }) => {
    try {
      await roomController.updateRoomGRPC(workflowId, roomId, roomData);

      return {
        success: true,
        action: "room_updated",
        roomId,
        updates: roomData,
      };
    } catch (error) {
      console.error("update room tool error:", error);

      return {
        success: false,
        action: "room_update_failed",
        error: error.message,
      };
    }
  },
  {
    name: "update_room",
    description: "Update room details in the workflow",
    schema: z.object({
      workflowId: z
        .string()
        .describe("Workflow identifier containing the room"),

      roomId: z.string().describe("Unique identifier of the room"),

      roomData: z.object({
        name: z.string().optional().describe("Updated room name"),

        roomNumber: z.string().optional().describe("Updated room number"),

        isLab: z.boolean().optional().describe("Updated lab status"),
      }),
    }),
  },
);

export default [addRoomTool, removeRoomTool, updateRoomTool];
