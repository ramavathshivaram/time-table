import redis from "#configs/redis.js";

const TTL = 3600;

const getKey = (workflowId) => `workflow:${workflowId}:nodes`;

const addNodeCache = async (workflowId, node) => {
  const key = getKey(workflowId);

  await redis.hset(key, node.id, JSON.stringify(node));
  await redis.expire(key, TTL);
};

const updateNodeCache = async (workflowId, node) => {
  const key = getKey(workflowId);

  await redis.hset(key, node.id, JSON.stringify(node));
  await redis.expire(key, TTL);
};

const removeNodeCache = async (workflowId, nodeId) => {
  const key = getKey(workflowId);

  await redis.hdel(key, nodeId);
};

const removeNodesCache = async (workflowId, nodeIds) => {
  const key = getKey(workflowId);

  await redis.hdel(key, ...nodeIds);
};

const getNodesCache = async (workflowId) => {
  const key = getKey(workflowId);

  const nodes = await redis.hgetall(key);

  return Object.keys(nodes).length ? Object.values(nodes).map(JSON.parse) : [];
};

const getNodeCache = async (workflowId, nodeId) => {
  const key = getKey(workflowId);

  const node = await redis.hget(key, nodeId);

  return node ? JSON.parse(node) : null;
};

const clearNodesCache = async (workflowId) => {
  const key = getKey(workflowId);

  await redis.del(key);
};

export default {
  addNodeCache,
  updateNodeCache,
  removeNodeCache,
  removeNodesCache,
  getNodesCache,
  getNodeCache,
  clearNodesCache,
};
