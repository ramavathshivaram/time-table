import workflowModel from "../models/workflow.model.js";


const sendMessage = async (workflowId, message) => {
  await workflowModel.findByIdAndUpdate(workflowId, {
    $push: { messages: message },
  });
};

export default { sendMessage };