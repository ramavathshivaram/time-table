import { DESIGNER_TTL } from "#configs/constants.js";
import redis from "#configs/redis.js";

import type { Room } from "./room.types.js";

import { roomQueue } from "./room.queue.js";
import { roomRepository } from "./room.repository.js";

const key = (designerId: string) => `designer:${designerId}:rooms`;

export const roomCache = {
  // -----------------------------------------
  // GET BY ID - READ THROUGH
  // -----------------------------------------

  getById: async (designerId: string, id: string): Promise<Room | null> => {
    const redisKey = key(designerId);

    const cached = await redis.hget(redisKey, id);

    if (cached) {
      return JSON.parse(cached);
    }

    const room = await roomRepository.findById(designerId, id);

    if (!room) {
      return null;
    }

    await redis
      .multi()
      .hset(redisKey, id, JSON.stringify(room))
      .expire(redisKey, DESIGNER_TTL)
      .exec();

    return room;
  },

  // -----------------------------------------
  // GET ALL - READ THROUGH
  // -----------------------------------------

  getAll: async (designerId: string): Promise<Room[]> => {
    const redisKey = key(designerId);

    const cached = await redis.hgetall(redisKey);

    if (Object.keys(cached).length > 0) {
      return Object.values(cached).map((room) => JSON.parse(room));
    }

    const rooms = await roomRepository.findAll(designerId);

    if (rooms.length === 0) {
      return [];
    }

    const pipeline = redis.multi();

    for (const room of rooms) {
      pipeline.hset(redisKey, room.id, JSON.stringify(room));
    }

    pipeline.expire(redisKey, DESIGNER_TTL);

    await pipeline.exec();

    return rooms;
  },

  // -----------------------------------------
  // CREATE - WRITE BEHIND
  // -----------------------------------------

  create: async (designerId: string, room: Room) => {
    const redisKey = key(designerId);

    const newRoom: Room = {
      ...room,
      id: crypto.randomUUID(),
      designerId,
    };

    await redis
      .multi()
      .hset(redisKey, newRoom.id, JSON.stringify(newRoom))
      .expire(redisKey, DESIGNER_TTL)
      .exec();

    await roomQueue.add(designerId, newRoom);

    return newRoom;
  },

  // -----------------------------------------
  // UPDATE - WRITE BEHIND
  // -----------------------------------------

  updateById: async (designerId: string, id: string, data: Partial<Room>) => {
    const redisKey = key(designerId);

    let existing = await redis.hget(redisKey, id);

    if (!existing) {
      const room = await roomRepository.findById(designerId, id);

      if (!room) {
        return null;
      }

      existing = JSON.stringify(room);
    }

    const updatedRoom: Room = {
      ...JSON.parse(existing),
      ...data,
      id,
      designerId,
    };

    await redis
      .multi()
      .hset(redisKey, id, JSON.stringify(updatedRoom))
      .expire(redisKey, DESIGNER_TTL)
      .exec();

    await roomQueue.update(designerId, data);

    return updatedRoom;
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

    await roomQueue.remove(designerId, id);

    return true;
  },
};
