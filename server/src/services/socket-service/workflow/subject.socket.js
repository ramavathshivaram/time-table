import workflowGRPC from "../../workflow-service/routes/workflow.grpc.js";
import { WORKFLOW_EVENTS } from "../lib/const.js";

const subjectSocket = (io, socket) => {
  socket.on(WORKFLOW_EVENTS.SUBJECT_ADD, (workflowId, subject) => {
    workflowGRPC.addSubjectGRPC(workflowId, subject);
    console.log(WORKFLOW_EVENTS.SUBJECT_ADD, workflowId, subject);
  });

  socket.on(
    WORKFLOW_EVENTS.SUBJECT_UPDATE,
    (workflowId, subjectId, subject) => {
      workflowGRPC.updateSubjectGRPC(workflowId, subjectId, subject);
      console.log(
        WORKFLOW_EVENTS.SUBJECT_UPDATE,
        workflowId,
        subjectId,
        subject,
      );
    },
  );

  socket.on(WORKFLOW_EVENTS.SUBJECT_REMOVE, (workflowId, subjectId) => {
    workflowGRPC.removeSubjectGRPC(workflowId, subjectId);
    console.log(WORKFLOW_EVENTS.SUBJECT_REMOVE, workflowId, subjectId);
  });
};

export default subjectSocket;
