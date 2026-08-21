import { io } from "../../../server.js";
import { socketRegistry } from "../../../sockets/socket-registry.js";

type MessageEmitter = {
  start: (userId: string, { messageId }: { messageId: string }) => void;
  token: (
    userId: string,
    {
      messageId,
      content,
      seq,
      timestamp,
    }: { messageId: string; content: string; seq: number; timestamp: number },
  ) => void;
  finish: (userId: string, { messageId }: { messageId: string }) => void;
  error: (userId: string, { message }: { message: string }) => void;
};

export const messageEmitter: MessageEmitter = {
  start: async (userId: string, { messageId }) => {
    const socketId = await socketRegistry.getSocketId(userId);

    if (!socketId) return;

    io.to(socketId).emit("message:start", { messageId });
  },

  token: async (userId: string, { messageId, content, seq, timestamp }) => {
    const socketId = await socketRegistry.getSocketId(userId);

    if (!socketId) return;

    io.to(socketId).emit("message:token", {
      messageId,
      content,
      seq,
      timestamp,
    });
  },

  finish: async (userId: string, { messageId }) => {
    const socketId = await socketRegistry.getSocketId(userId);

    if (!socketId) return;

    io.to(socketId).emit("message:finish", { messageId });
  },

  error: async (userId: string, { message }) => {
    const socketId = await socketRegistry.getSocketId(userId);

    if (!socketId) return;

    io.to(socketId).emit("message:error", { message });
  },
};
