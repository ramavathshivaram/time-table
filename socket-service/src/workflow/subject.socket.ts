import { subjectController } from "#services/workflow-service/routes/workflow.grpc.js";
import { WORKFLOW_EVENTS } from "./events.js";
import type { Socket } from "socket.io";
import logger from "#configs/logger.js";
import emitToWorkflow from "./emit-to-workflow.js";

interface SocketData {
  workflowId: string;
}

type WorkflowSocket = Socket<{}, {}, {}, SocketData>;

// ----------------------
// LISTENERS
// ----------------------
export const registerSubjectHandlers = (socket: WorkflowSocket) => {
  const workflowId = socket.data.workflowId;
  if (!workflowId) return;

  const { SUBJECT } = WORKFLOW_EVENTS;

  socket.on(SUBJECT.ADD, (subject) => {
    subjectController.addSubjectGRPC(workflowId, subject);
  });

  socket.on(SUBJECT.UPDATE, (subjectId, subject) => {
    subjectController.updateSubjectGRPC(workflowId, subjectId, subject);
  });

  socket.on(SUBJECT.REMOVE, (subjectId) => {
    subjectController.removeSubjectGRPC(workflowId, subjectId);
  });
};

// ----------------------
// EMITTERS
// ----------------------
export const subjectEmitter = {
  add(workflowId: string, subject: any) {
    logger.info("emit subject add", { workflowId });
    emitToWorkflow(workflowId, WORKFLOW_EVENTS.SUBJECT.ADD, subject);
  },

  remove(workflowId: string, subjectId: string) {
    logger.info("emit subject remove", { workflowId, subjectId });
    emitToWorkflow(workflowId, WORKFLOW_EVENTS.SUBJECT.REMOVE, subjectId);
  },

  update(workflowId: string, subjectId: string, subjectData: any) {
    logger.info("emit subject update", { workflowId, subjectId });
    emitToWorkflow(
      workflowId,
      WORKFLOW_EVENTS.SUBJECT.UPDATE,
      subjectId,
      subjectData,
    );
  },
};
