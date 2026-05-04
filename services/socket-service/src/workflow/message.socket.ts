import type { Socket } from "socket.io";

import messageApi from "#services/message.api.js";
import { MESSAGE } from "./events.js";
import logger from "#configs/logger.js";
import emitToWorkflow from "./emit-to-workflow.js";

interface SocketData {
  workflowId: string;
}

type WorkflowSocket = Socket<{}, {}, {}, SocketData>;

export const registerMessageHandlers = (socket: WorkflowSocket) => {
  const workflowId = socket.data.workflowId;
  if (!workflowId) return;

  // SEND MESSAGE
  socket.on(MESSAGE.SEND, async (message) => {
    try {
      await messageApi.add(workflowId, message);
    } catch (err) {
      logger.error("message send error", { workflowId, err });
    }
  });

  // GET MESSAGES (with ack callback)
  socket.on(
    MESSAGE.GET_ALL,
    async (page: number, limit: number, callback: Function) => {
      try {
        const { messages, hasMore } =
          await messageApi.getAll(workflowId, page, limit);

        callback({ messages, hasMore });
      } catch (err) {
        logger.error("get messages error", { workflowId, err });
        callback({ messages: [], hasMore: false });
      }
    },
  );
};
