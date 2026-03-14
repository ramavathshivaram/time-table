import workflowGRPC from "../../workflow-service/routes/workflow.grpc.js";
import { workflowSocketConst } from "../lib/const.js";

const workflowSocketInit = (io, socket) => {
  socket.on(workflowSocketConst.NODE_ADD, (workflowId, node) => {
    workflowGRPC.addNodeGRPC(workflowId, node);
    console.log(workflowSocketConst.NODES_ADD, workflowId, node);
  });

  socket.on(workflowSocketConst.NODES_ADD, (workflowId, nodes) => {
    workflowGRPC.addNodesGRPC(workflowId, nodes);
    console.log(workflowSocketConst.NODES_ADD, workflowId, nodes);
  });

  socket.on(workflowSocketConst.NODE_REMOVE, (workflowId, nodeId) => {
    workflowGRPC.removeNodeGRPC(workflowId, nodeId);
    console.log(workflowSocketConst.NODE_REMOVE, workflowId, nodeId);
  });

  socket.on(workflowSocketConst.NODE_UPDATE, (workflowId, nodeId, nodeData) => {
    workflowGRPC.updateNodeGRPC(workflowId, nodeId, nodeData);
    console.log(workflowSocketConst.NODE_UPDATE, workflowId, nodeId, nodeData);
  });

  socket.on(workflowSocketConst.EDGE_ADD, (workflowId, edge) => {
    workflowGRPC.addEdgeGRPC(workflowId, edge);
    console.log(workflowSocketConst.EDGE_ADD, workflowId, edge);
  });

  socket.on(workflowSocketConst.EDGES_ADD, (workflowId, edges) => {
    workflowGRPC.addEdgesGRPC(workflowId, edges);
    console.log(workflowSocketConst.EDGES_ADD, workflowId, edges);
  });

  socket.on(workflowSocketConst.EDGE_REMOVE, (workflowId, edgeId) => {
    workflowGRPC.removeEdgeGRPC(workflowId, edgeId);
    console.log(workflowSocketConst.EDGE_REMOVE, workflowId, edgeId);
  });

  socket.on(workflowSocketConst.FACULTY_ADD, (workflowId, faculty) => {
    workflowGRPC.addFacultyGRPC(workflowId, faculty);
    console.log(workflowSocketConst.FACULTY_ADD, workflowId, faculty);
  });

  socket.on(
    workflowSocketConst.FACULTY_UPDATE,
    (workflowId, facultyId, faculty) => {
      workflowGRPC.updateFacultyGRPC(workflowId, facultyId, faculty);
      console.log(
        workflowSocketConst.FACULTY_UPDATE,
        workflowId,
        facultyId,
        faculty,
      );
    },
  );

  socket.on(workflowSocketConst.FACULTY_REMOVE, (workflowId, facultyId) => {
    workflowGRPC.removeFacultyGRPC(workflowId, facultyId);
    console.log(workflowSocketConst.FACULTY_REMOVE, workflowId, facultyId);
  });

  socket.on(workflowSocketConst.SUBJECT_ADD, (workflowId, subject) => {
    workflowGRPC.addSubjectGRPC(workflowId, subject);
    console.log(workflowSocketConst.SUBJECT_ADD, workflowId, subject);
  });

  socket.on(
    workflowSocketConst.SUBJECT_UPDATE,
    (workflowId, subjectId, subject) => {
      workflowGRPC.updateSubjectGRPC(workflowId, subjectId, subject);
      console.log(
        workflowSocketConst.SUBJECT_UPDATE,
        workflowId,
        subjectId,
        subject,
      );
    },
  );

  socket.on(workflowSocketConst.SUBJECT_REMOVE, (workflowId, subjectId) => {
    workflowGRPC.removeSubjectGRPC(workflowId, subjectId);
    console.log(workflowSocketConst.SUBJECT_REMOVE, workflowId, subjectId);
  });

  socket.on(workflowSocketConst.ROOM_ADD, (workflowId, room) => {
    workflowGRPC.addRoomGRPC(workflowId, room);
    console.log(workflowSocketConst.ROOM_ADD, workflowId, room);
  });

  socket.on(workflowSocketConst.ROOM_REMOVE, (workflowId, roomId) => {
    workflowGRPC.removeRoomGRPC(workflowId, roomId);
    console.log(workflowSocketConst.ROOM_REMOVE, workflowId, roomId);
  });

  socket.on(workflowSocketConst.ROOM_UPDATE, (workflowId, roomId, room) => {
    workflowGRPC.updateRoomGRPC(workflowId, roomId, room);
    console.log(workflowSocketConst.ROOM_UPDATE, workflowId, roomId, room);
  });
};

export default workflowSocketInit;
