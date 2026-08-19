import { DESIGNER_TTL } from "#configs/constants.js";
import redis from "#configs/redis.js";

import type { Edge } from "./edge.model.js";

import { edgeQueue } from "./edge.queue.js";
import { edgeRepository } from "./edge.repository.js";

const key = (designerId: string) => `designer:${designerId}:edges`;

export const edgeCache = {
  // -----------------------------------------
  // GET BY ID - READ THROUGH
  // -----------------------------------------

  getById: async (designerId: string, id: string): Promise<Edge | null> => {
    const redisKey = key(designerId);

    const cached = await redis.hget(redisKey, id);

    if (cached) {
      return JSON.parse(cached);
    }

    const edge = await edgeRepository.findById(designerId, id);

    if (!edge) {
      return null;
    }

    await redis
      .multi()
      .hset(redisKey, id, JSON.stringify(edge))
      .expire(redisKey, DESIGNER_TTL)
      .exec();

    return edge;
  },

  // -----------------------------------------
  // GET ALL - READ THROUGH
  // -----------------------------------------

  getAll: async (designerId: string): Promise<Edge[]> => {
    const redisKey = key(designerId);

    const cached = await redis.hgetall(redisKey);

    if (Object.keys(cached).length > 0) {
      return Object.values(cached).map((edge) => JSON.parse(edge));
    }

    const edges = await edgeRepository.findAll(designerId);

    if (edges.length === 0) {
      return [];
    }

    const pipeline = redis.multi();

    for (const edge of edges) {
      pipeline.hset(redisKey, edge.id, JSON.stringify(edge));
    }

    pipeline.expire(redisKey, DESIGNER_TTL);

    await pipeline.exec();

    return edges;
  },

  // -----------------------------------------
  // CREATE - WRITE BEHIND
  // -----------------------------------------

  create: async (designerId: string, edge: Edge) => {
    const redisKey = key(designerId);

    const newEdge: Edge = {
      ...edge,
      id: edge.id || crypto.randomUUID(),
      designerId,
    };

    await redis
      .multi()
      .hset(redisKey, newEdge.id, JSON.stringify(newEdge))
      .expire(redisKey, DESIGNER_TTL)
      .exec();

    await edgeQueue.add(designerId, newEdge);

    return newEdge;
  },

  // -----------------------------------------
  // CREATE MANY - WRITE BEHIND
  // -----------------------------------------

  createMany: async (designerId: string, edges: Edge[]) => {
    const redisKey = key(designerId);

    const newEdges: Edge[] = edges.map((edge) => ({
      ...edge,
      id: edge.id || crypto.randomUUID(),
      designerId,
    }));

    const pipeline = redis.multi();

    for (const edge of newEdges) {
      pipeline.hset(redisKey, edge.id, JSON.stringify(edge));
    }

    pipeline.expire(redisKey, DESIGNER_TTL);

    await pipeline.exec();

    await edgeQueue.addMany(designerId, newEdges);

    return newEdges;
  },

  // -----------------------------------------
  // DELETE
  // -----------------------------------------

  deleteById: async (designerId: string, id: string) => {
    const redisKey = key(designerId);

    const deleted = await redis.hdel(redisKey, id);

    if (!deleted) {
      return false;
    }

    await edgeQueue.remove(designerId, id);

    return true;
  },

  // -----------------------------------------
  // DELETE MANY
  // -----------------------------------------

  deleteMany: async (designerId: string, ids: string[]) => {
    if (ids.length === 0) {
      return 0;
    }

    const redisKey = key(designerId);

    const deleted = await redis.hdel(redisKey, ...ids);

    await edgeQueue.removeMany(designerId, ids);

    return deleted;
  },
};
