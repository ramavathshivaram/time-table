import { v4 as uuid } from "uuid";

export const generateId = (type: string) => `${type}-${uuid()}`;

export const generateNodeId = () => generateId("node");
export const generateEdgeId = () => generateId("edge");