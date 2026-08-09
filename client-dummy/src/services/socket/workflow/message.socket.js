import { MESSAGE } from "./events.js";
import { getSocket } from "../socket.js";
import useWorkflowStore from "@/store/workflow.store.js";
import emit from "./emit.js";

export const messageEmit = {
  send(message) {
    emit(MESSAGE.SEND, message);
  },

  getAll(page, limit, callback) {
    emit(MESSAGE.GET_ALL, page, limit, callback);
  },
};

export const registerMessageHandlers = () => {
  const socket = getSocket();

  // Final response (non-stream fallback)
  socket.on(MESSAGE.RESPONSE, (response) => {
    console.log("⬇️ MESSAGE.RESPONSE", response);
    useWorkflowStore.getState().addMessageLocal(response);
  });

  // Streaming start
  socket.on(MESSAGE.STREAM_START, () => {
    console.log("⬇️ MESSAGE.STREAM_START");
    useWorkflowStore.getState().startStreamingMessage();
  });

  // Streaming chunks
  socket.on(MESSAGE.STREAM_CHUNK, (chunk) => {
    console.log("⬇️ MESSAGE.STREAM_CHUNK", chunk);
    useWorkflowStore.getState().appendStreamChunk(chunk);
  });

  // Streaming end
  socket.on(MESSAGE.STREAM_END, () => {
    console.log("⬇️ MESSAGE.STREAM_END");
    useWorkflowStore.getState().endStreamingMessage();
  });
};

export const cleanupMessageListeners = () => {
  const socket = getSocket();

  socket.off(MESSAGE.RESPONSE);
  socket.off(MESSAGE.STREAM_START);
  socket.off(MESSAGE.STREAM_CHUNK);
  socket.off(MESSAGE.STREAM_END);
};