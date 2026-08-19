import { DESIGNER_TTL } from "#configs/constants.js";
import redis from "#configs/redis.js";

import type { Node } from "./node.model.js";

import { nodeQueue } from "./node.queue.js";
import { nodeRepository } from "./node.repository.js";

const key = (designerId: string) => `designer:${designerId}:nodes`;

export const nodeCache = {
  // -----------------------------------------
  // GET BY ID - READ THROUGH
  // -----------------------------------------

  getById: async (designerId: string, id: string): Promise<Node | null> => {
    const redisKey = key(designerId);

    const cached = await redis.hget(redisKey, id);

    if (cached) {
      return JSON.parse(cached);
    }

    const node = await nodeRepository.findById(designerId, id);

    if (!node) {
      return null;
    }

    await redis
      .multi()
      .hset(redisKey, id, JSON.stringify(node))
      .expire(redisKey, DESIGNER_TTL)
      .exec();

    return node;
  },

  // -----------------------------------------
  // GET ALL - READ THROUGH
  // -----------------------------------------

  getAll: async (designerId: string): Promise<Node[]> => {
    const redisKey = key(designerId);

    const cached = await redis.hgetall(redisKey);

    if (Object.keys(cached).length > 0) {
      return Object.values(cached).map((node) => JSON.parse(node));
    }

    const nodes = await nodeRepository.findAll(designerId);

    if (nodes.length === 0) {
      return [];
    }

    const pipeline = redis.multi();

    for (const node of nodes) {
      pipeline.hset(redisKey, node.id, JSON.stringify(node));
    }

    pipeline.expire(redisKey, DESIGNER_TTL);

    await pipeline.exec();

    return nodes;
  },

  // -----------------------------------------
  // CREATE - WRITE BEHIND
  // -----------------------------------------

  create: async (designerId: string, node: Node) => {
    const redisKey = key(designerId);

    const newNode: Node = {
      ...node,
      id: node.id || crypto.randomUUID(),
      designerId,
    };

    await redis
      .multi()
      .hset(redisKey, newNode.id, JSON.stringify(newNode))
      .expire(redisKey, DESIGNER_TTL)
      .exec();

    await nodeQueue.add(designerId, newNode);

    return newNode;
  },

  // -----------------------------------------
  // CREATE MANY - WRITE BEHIND
  // -----------------------------------------

  createMany: async (designerId: string, nodes: Node[]) => {
    const redisKey = key(designerId);

    const newNodes: Node[] = nodes.map((node) => ({
      ...node,
      id: node.id || crypto.randomUUID(),
      designerId,
    }));

    const pipeline = redis.multi();

    for (const node of newNodes) {
      pipeline.hset(redisKey, node.id, JSON.stringify(node));
    }

    pipeline.expire(redisKey, DESIGNER_TTL);

    await pipeline.exec();

    await nodeQueue.addMany(designerId, newNodes);

    return newNodes;
  },

  // -----------------------------------------
  // UPDATE - WRITE BEHIND
  // -----------------------------------------

  updateById: async (designerId: string, id: string, data: Partial<Node>) => {
    const redisKey = key(designerId);

    let existing = await redis.hget(redisKey, id);

    if (!existing) {
      const node = await nodeRepository.findById(designerId, id);

      if (!node) {
        return null;
      }

      existing = JSON.stringify(node);
    }

    const updatedNode: Node = {
      ...JSON.parse(existing),
      ...data,
      id,
      designerId,
    };

    await redis
      .multi()
      .hset(redisKey, id, JSON.stringify(updatedNode))
      .expire(redisKey, DESIGNER_TTL)
      .exec();

    await nodeQueue.update(updatedNode);

    return updatedNode;
  },

  // -----------------------------------------
  // DELETE - WRITE BEHIND
  // -----------------------------------------

  deleteById: async (designerId: string, id: string) => {
    const redisKey = key(designerId);

    const deleted = await redis.hdel(redisKey, id);

    if (!deleted) {
      return false;
    }

    await nodeQueue.remove(designerId, id);

    return true;
  },

  // -----------------------------------------
  // DELETE MANY - WRITE BEHIND
  // -----------------------------------------

  deleteMany: async (designerId: string, ids: string[]) => {
    if (ids.length === 0) {
      return 0;
    }

    const redisKey = key(designerId);

    const deleted = await redis.hdel(redisKey, ...ids);

    await nodeQueue.removeMany(designerId, ids);

    return deleted;
  },
};
