import workflowGRPC from "#services/workflow-service/routes/workflow.grpc.js";
import { WORKFLOW_EVENTS } from "../../lib/const.js";

const facutySocket = (io, socket) => {
  socket.on(WORKFLOW_EVENTS.FACULTY_ADD, (workflowId, faculty) => {
    workflowGRPC.addFacultyGRPC(workflowId, faculty);
    console.log(WORKFLOW_EVENTS.FACULTY_ADD, workflowId, faculty);
  });

  socket.on(
    WORKFLOW_EVENTS.FACULTY_UPDATE,
    (workflowId, facultyId, faculty) => {
      workflowGRPC.updateFacultyGRPC(workflowId, facultyId, faculty);
      console.log(
        WORKFLOW_EVENTS.FACULTY_UPDATE,
        workflowId,
        facultyId,
        faculty,
      );
    },
  );

  socket.on(WORKFLOW_EVENTS.FACULTY_REMOVE, (workflowId, facultyId) => {
    workflowGRPC.removeFacultyGRPC(workflowId, facultyId);
    console.log(WORKFLOW_EVENTS.FACULTY_REMOVE, workflowId, facultyId);
  });
};

export default facutySocket;
