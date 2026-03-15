import { facultyController } from "#services/workflow-service/routes/workflow.grpc.js";
import { WORKFLOW_EVENTS } from "../../lib/const.js";

const facutySocket = (io, socket) => {
  socket.on(WORKFLOW_EVENTS.FACULTY_ADD, (workflowId, faculty) => {
    facultyController.addFacultyGRPC(workflowId, faculty);
    console.log(WORKFLOW_EVENTS.FACULTY_ADD, workflowId, faculty);
  });

  socket.on(
    WORKFLOW_EVENTS.FACULTY_UPDATE,
    (workflowId, facultyId, faculty) => {
      facultyController.updateFacultyGRPC(workflowId, facultyId, faculty);
      console.log(
        WORKFLOW_EVENTS.FACULTY_UPDATE,
        workflowId,
        facultyId,
        faculty,
      );
    },
  );

  socket.on(WORKFLOW_EVENTS.FACULTY_REMOVE, (workflowId, facultyId) => {
    facultyController.removeFacultyGRPC(workflowId, facultyId);
    console.log(WORKFLOW_EVENTS.FACULTY_REMOVE, workflowId, facultyId);
  });
};

export default facutySocket;
