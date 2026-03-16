import { subjectController } from "#services/workflow-service/routes/workflow.grpc.js";
import { WORKFLOW_EVENTS } from "../../lib/const.js";
import logger from "#configs/logger.js";

const subjectSocket = (io, socket) => {
  socket.on(WORKFLOW_EVENTS.SUBJECT_ADD, (workflowId, subject) => {
    subjectController.addSubjectGRPC(workflowId, subject);
    logger.info(WORKFLOW_EVENTS.SUBJECT_ADD, workflowId, subject);
  });

  socket.on(
    WORKFLOW_EVENTS.SUBJECT_UPDATE,
    (workflowId, subjectId, subject) => {
      subjectController.updateSubjectGRPC(workflowId, subjectId, subject);
      logger.info(
        WORKFLOW_EVENTS.SUBJECT_UPDATE,
        workflowId,
        subjectId,
        subject,
      );
    },
  );

  socket.on(WORKFLOW_EVENTS.SUBJECT_REMOVE, (workflowId, subjectId) => {
    subjectController.removeSubjectGRPC(workflowId, subjectId);
    logger.info(WORKFLOW_EVENTS.SUBJECT_REMOVE, workflowId, subjectId);
  });
};

export default subjectSocket;
