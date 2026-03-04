import workflowGRPC from "../../workflow-service/routes/workflow.grpc.js";

const workflowSocketInit = (io, socket) => {

  socket.on("workflow:update", (workflowId, data) => {
    workflowGRPC.updateWorkflowGRPC({ workflowId, data }, (err, response) => {
      if (err) {
        console.error("Error updating workflow via gRPC:", err);
        return;
      }
    });
  });

  
};

export default workflowSocketInit;
