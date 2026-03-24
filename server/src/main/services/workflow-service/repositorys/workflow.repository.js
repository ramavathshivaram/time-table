import workflowModel from "../models/workflow.model.js";

const getAllUserWorkflowsByUserId = async (userId, options = {}) => {
  const { skip = 0, limit = 10, sort = { title: 1 } } = options;

  return workflowModel
    .find({ userId })
    .select("title createdAt updatedAt _id")
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .lean();
};

const getRecentWorkflowsByUserId = async (userId) => {
  return workflowModel
    .find({ userId })
    .select("title createdAt updatedAt _id")
    .sort({ updatedAt: -1 })
    .limit(5)
    .lean();
};

const createWorkflow = async (workflow) => {
  return await workflowModel.create(workflow);
};

const getWorkflowById = async (workflowId) => {
  return await workflowModel.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(workflowId) } },

    {
      $lookup: {
        from: "nodes",
        localField: "_id",
        foreignField: "workflowId",
        as: "nodes",
      },
    },
    {
      $lookup: {
        from: "edges",
        localField: "_id",
        foreignField: "workflowId",
        as: "edges",
      },
    },
    {
      $lookup: {
        from: "faculties",
        localField: "_id",
        foreignField: "workflowId",
        as: "faculties",
      },
    },
    {
      $lookup: {
        from: "subjects",
        localField: "_id",
        foreignField: "workflowId",
        as: "subjects",
      },
    },
    {
      $lookup: {
        from: "rooms",
        localField: "_id",
        foreignField: "workflowId",
        as: "rooms",
      },
    },
  ]);
};

export default {
  getAllUserWorkflowsByUserId,
  createWorkflow,
  getWorkflowById,
  getRecentWorkflowsByUserId,
};
