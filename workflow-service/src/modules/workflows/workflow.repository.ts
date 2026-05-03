import mongoose from "mongoose";
import workflowModel,{type IWorkflow} from "./workflow.model.js";

interface GetWorkflowsOptions {
  skip?: number;
  limit?: number;
  query?: string;
}


const getAllUserWorkflowsByUserId = async (
  userId: IWorkflow["userId"],
  options: GetWorkflowsOptions = {},
) => {
  const { skip = 0, limit = 10, query = "" } = options;

  const filters: any = { userId };

  if (query) {
    filters.title = { $regex: query, $options: "i" };
  }


  if (!userId) throw new Error("User id not found");

  return await workflowModel
    .find(filters)
    .select("title createdAt updatedAt _id")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();
};

const getRecentWorkflowsByUserId = async (userId: IWorkflow["userId"]) => {
  return workflowModel
    .find({ userId })
    .select("title createdAt updatedAt _id")
    .sort({ updatedAt: -1 })
    .limit(5)
    .lean();
};

const createWorkflow = async (workflow: Partial<IWorkflow>) => {
  return await workflowModel.create(workflow);
};

const getWorkflowById = async (workflowId: IWorkflow["_id"]) => {
  if (!mongoose.Types.ObjectId.isValid(workflowId)) {
    throw new Error("Invalid workflowId");
  }

  const [workflow] = await workflowModel.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(workflowId),
      },
    },

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

    {
      $project: {
        __v: 0,
        "nodes.__v": 0,
        "edges.__v": 0,
        "faculties.__v": 0,
        "subjects.__v": 0,
        "rooms.__v": 0,
      },
    },
  ]);

  return workflow || null;
};

export default {
  getAllUserWorkflowsByUserId,
  createWorkflow,
  getWorkflowById,
  getRecentWorkflowsByUserId,
};
