import EdgeModel, {type IEdge } from "./edge.model.js";

const getEdge = async ( edgeId: IEdge["id"]) => {
    const edge = await EdgeModel.findOne({
      id: edgeId,
    });
    return edge || null;
};

const getEdges = async (workflowId: IEdge["workflowId"]) => {
  
    return await EdgeModel.find({ workflowId }).lean();
};

const addEdge = async (workflowId: IEdge["workflowId"], edge: IEdge) => {

    return await EdgeModel.create({
      ...edge,
      workflowId,
    });
};

const addEdges = async (workflowId: IEdge["workflowId"], edges: IEdge[]) => {

    const docs = edges.map((edge) => ({
      ...edge,
      workflowId,
    }));

    return await EdgeModel.insertMany(docs);
 
};

const removeEdge = async (edgeId: IEdge["id"]) => {

    return await EdgeModel.deleteOne({
    
      id: edgeId,
    });
 
};

const updateEdge = async ( edgeId: IEdge["id"],updateFields: Partial<IEdge>) => {
    return await EdgeModel.findOneAndUpdate(
      {  id: edgeId },
      { $set: updateFields },
      { new: true,},
    );
};

export default {
  getEdge,
  getEdges,
  addEdge,
  addEdges,
  removeEdge,
  updateEdge,
};
