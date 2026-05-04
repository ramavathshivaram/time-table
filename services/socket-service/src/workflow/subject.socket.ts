import { SUBJECT } from "./events.js";
import type { Socket } from "socket.io";
import logger from "#configs/logger.js";
import emitToWorkflow from "./emit-to-workflow.js";
import subjectApi from "#services/subject.api.js";

interface SocketData {
  workflowId: string;
}

type WorkflowSocket = Socket<{}, {}, {}, SocketData>;

export const registerSubjectHandlers = (socket: WorkflowSocket) => {
  const workflowId = socket.data.workflowId;
  if (!workflowId) return;

  socket.on(SUBJECT.ADD, (subject) => {
    subjectApi.add(workflowId, subject);
  });

  socket.on(SUBJECT.UPDATE, (subjectId, subject) => {
    subjectApi.update( subjectId, subject);
  });

  socket.on(SUBJECT.REMOVE, (subjectId) => {
    subjectApi.remove( subjectId);
  });
};

// ----------------------
// EMITTERS
// ----------------------
export const subjectEmitter = {
  add(workflowId: string, subject: any) {
    logger.info("emit subject add", { workflowId });
    emitToWorkflow(workflowId, SUBJECT.ADD, subject);
  },

  remove(workflowId: string, subjectId: string) {
    logger.info("emit subject remove", { workflowId, subjectId });
    emitToWorkflow(workflowId, SUBJECT.REMOVE, subjectId);
  },

  update(workflowId: string, subjectId: string, subjectData: any) {
    logger.info("emit subject update", { workflowId, subjectId });
    emitToWorkflow(workflowId, SUBJECT.UPDATE, subjectId, subjectData);
  },
};
