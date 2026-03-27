import { subjectController } from "#services/workflow-service/routes/workflow.grpc.js";
import { WORKFLOW_EVENTS } from "../../lib/const.js";

const subjectSocket = (io, socket) => {
  socket.on(WORKFLOW_EVENTS.SUBJECT_ADD, (subject) => {
    subjectController.addSubjectGRPC(socket.workflowId, subject);
  });

  socket.on(WORKFLOW_EVENTS.SUBJECT_UPDATE, (subjectId, subject) => {
    subjectController.updateSubjectGRPC(socket.workflowId, subjectId, subject);
  });

  socket.on(WORKFLOW_EVENTS.SUBJECT_REMOVE, (subjectId) => {
    subjectController.removeSubjectGRPC(socket.workflowId, subjectId);
  });
};

export default subjectSocket;
