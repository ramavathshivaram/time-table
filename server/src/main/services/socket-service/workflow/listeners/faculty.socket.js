import { facultyController } from "#services/workflow-service/routes/workflow.grpc.js";
import { WORKFLOW_EVENTS } from "../../lib/const.js";

const facutySocket = (io, socket) => {
  socket.on(WORKFLOW_EVENTS.FACULTY_ADD, (faculty) => {
    facultyController.addFacultyGRPC(socket.workflowId, faculty);
  });

  socket.on(WORKFLOW_EVENTS.FACULTY_UPDATE, (facultyId, faculty) => {
    facultyController.updateFacultyGRPC(socket.workflowId, facultyId, faculty);
  });

  socket.on(WORKFLOW_EVENTS.FACULTY_REMOVE, (facultyId) => {
    facultyController.removeFacultyGRPC(socket.workflowId, facultyId);
  });
};

export default facutySocket;
