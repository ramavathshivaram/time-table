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

const deleteWorkflow = async (workflowId) => {
  await workflowModel.findByIdAndDelete(workflowId);
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
  return await workflowModel.findById(workflowId);
};

const updateWorkflowById = async (workflowId, data) => {
  await workflowModel.findByIdAndUpdate(workflowId, data);
};

const addNode = async (workflowId, node) => {
  await workflowModel.findByIdAndUpdate(workflowId, { $push: { nodes: node } });
};

const addNodes = async (workflowId, nodes) => {
  await workflowModel.findByIdAndUpdate(workflowId, {
    $push: { nodes: { $each: nodes } },
  });
};

const removeNode = async (workflowId, nodeId) => {
  await workflowModel.findByIdAndUpdate(workflowId, {
    $pull: { nodes: { id: nodeId } },
  });
};

const updateNode = async (workflowId, nodeId, nodeData) => {
  const r = await workflowModel.findOneAndUpdate(
    {
      _id: workflowId,
      "nodes.id": nodeId,
    },
    {
      $set: {
        "nodes.$.data": nodeData,
      },
    },
  );
};

const addEdge = async (workflowId, edge) => {
  await workflowModel.findByIdAndUpdate(workflowId, { $push: { edges: edge } });
};

const addEdges = async (workflowId, edges) => {
  await workflowModel.findByIdAndUpdate(workflowId, {
    $push: { edges: { $each: edges } },
  });
};

const removeEdge = async (workflowId, edgeId) => {
  await workflowModel.findByIdAndUpdate(workflowId, {
    $pull: { edges: { id: edgeId } },
  });
};

const addFaculty = async (workflowId, faculty) => {
  await workflowModel.findByIdAndUpdate(workflowId, {
    $push: { faculties: faculty },
  });
};

const removeFaculty = async (workflowId, faculty) => {
  await workflowModel.findByIdAndUpdate(workflowId, {
    $pull: { faculties: { id: faculty } },
  });
};

const updateFaculty = async (workflowId, facultyId, facultyData) => {
  await workflowModel.findOneAndUpdate(
    {
      _id: workflowId,
      "faculties.id": facultyId,
    },
    {
      $set: {
        "faculties.$": facultyData,
      },
    },
  );
};

const addSubject = async (workflowId, subject) => {
  await workflowModel.findByIdAndUpdate(workflowId, {
    $push: { subjects: subject },
  });
};

const removeSubject = async (workflowId, subjectId) => {
  await workflowModel.findByIdAndUpdate(workflowId, {
    $pull: { subjects: { id: subjectId } },
  });
};

const updateSubject = async (workflowId, subjectId, subjectData) => {
  await workflowModel.findOneAndUpdate(
    {
      _id: workflowId,
      "subjects.id": subjectId,
    },
    {
      $set: {
        "subjects.$": subjectData,
      },
    },
  );
};

const addRoom = async (workflowId, room) => {
  await workflowModel.findByIdAndUpdate(workflowId, {
    $push: { rooms: room },
  });
};

const removeRoom = async (workflowId, roomId) => {
  await workflowModel.findByIdAndUpdate(workflowId, {
    $pull: { rooms: { id: roomId } },
  });
};

const updateRoom = async (workflowId, roomId, roomData) => {
  await workflowModel.findOneAndUpdate(
    {
      _id: workflowId,
      "rooms.id": roomId,
    },
    {
      $set: {
        "rooms.$": roomData,
      },
    },
  );
};

const sendMessage = async (workflowId, message) => {
  await workflowModel.findByIdAndUpdate(workflowId, {
    $push: { messages: message },
  });
};

export default {
  getAllUserWorkflowsByUserId,
  createWorkflow,
  deleteWorkflow,
  getWorkflowById,
  updateWorkflowById,
  getRecentWorkflowsByUserId,

  addNode,
  addNodes,
  removeNode,
  updateNode,

  addEdge,
  addEdges,
  removeEdge,

  addFaculty,
  removeFaculty,
  updateFaculty,

  addSubject,
  removeSubject,
  updateSubject,

  addRoom,
  removeRoom,
  updateRoom,

  sendMessage,
};
