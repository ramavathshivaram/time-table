import { facultyController } from "#services/workflow-service/routes/workflow.grpc.js";
import { FACULTY } from "./events.js";
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
export const registerFacultyHandlers = (socket: WorkflowSocket) => {
  const workflowId = socket.data.workflowId;
  if (!workflowId) return;

  socket.on(FACULTY.ADD, (faculty) => {
    facultyController.addFacultyGRPC(workflowId, faculty);
  });

  socket.on(FACULTY.UPDATE, (facultyId, faculty) => {
    facultyController.updateFacultyGRPC(workflowId, facultyId, faculty);
  });

  socket.on(FACULTY.REMOVE, (facultyId) => {
    facultyController.removeFacultyGRPC(workflowId, facultyId);
  });
};

// ----------------------
// EMITTERS
// ----------------------
export const facultyEmitter = {
  add(workflowId: string, faculty: any) {
    logger.info("emit faculty add", { workflowId });
    emitToWorkflow(workflowId, FACULTY.ADD, faculty);
  },

  remove(workflowId: string, facultyId: string) {
    logger.info("emit faculty remove", { workflowId, facultyId });
    emitToWorkflow(workflowId, FACULTY.REMOVE, facultyId);
  },

  update(workflowId: string, facultyId: string, facultyData: any) {
    logger.info("emit faculty update", { workflowId, facultyId });
    emitToWorkflow(
      workflowId,
      FACULTY.UPDATE,
      facultyId,
      facultyData,
    );
  },
};
