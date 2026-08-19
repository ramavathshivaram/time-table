import { DESIGNER_TTL } from "#configs/constants.js";
import redis from "#configs/redis.js";

import { Faculty } from "./faculty.model.js";
import { facultyQueue } from "./faculty.queue.js";
import { facultyRepository } from "./faculty.repository.js";

const key = (designerId: string) => `designer:${designerId}:faculties`;

export const facultyCache = {
  getById: async (designerId: string, id: string): Promise<Faculty | null> => {
    const redisKey = key(designerId);

    const cached = await redis.hget(redisKey, id);

    if (cached) {
      return JSON.parse(cached);
    }

    const faculty = await facultyRepository.findById(designerId, id);

    if (!faculty) {
      return null;
    }

    await redis
      .multi()
      .hset(redisKey, id, JSON.stringify(faculty))
      .expire(redisKey, DESIGNER_TTL)
      .exec();

    return faculty;
  },

  getAll: async (designerId: string): Promise<Faculty[]> => {
    const redisKey = key(designerId);

    const cached = await redis.hgetall(redisKey);

    if (Object.keys(cached).length > 0) {
      return Object.values(cached).map((faculty) => JSON.parse(faculty));
    }

    const faculties = await facultyRepository.findAll(designerId);

    if (faculties.length === 0) {
      return [];
    }

    const pipeline = redis.multi();

    for (const faculty of faculties) {
      pipeline.hset(redisKey, faculty.id, JSON.stringify(faculty));
    }

    pipeline.expire(redisKey, DESIGNER_TTL);

    await pipeline.exec();

    return faculties;
  },

  create: async (designerId: string, faculty: Faculty) => {
    const redisKey = key(designerId);

    const newFaculty: Faculty = {
      ...faculty,
      id: crypto.randomUUID(),
      designerId,
    };

    await redis
      .multi()
      .hset(redisKey, newFaculty.id, JSON.stringify(newFaculty))
      .expire(redisKey, DESIGNER_TTL)
      .exec();

    await facultyQueue.add(designerId, newFaculty);

    return newFaculty;
  },

  updateById: async (
    designerId: string,
    id: string,
    data: Partial<Faculty>,
  ) => {
    const redisKey = key(designerId);

    let existing = await redis.hget(redisKey, id);

    if (!existing) {
      const faculty = await facultyRepository.findById(designerId, id);

      if (!faculty) {
        return null;
      }

      existing = JSON.stringify(faculty);
    }

    const updatedFaculty: Faculty = {
      ...JSON.parse(existing),
      ...data,
      id,
      designerId,
    };

    await redis
      .multi()
      .hset(redisKey, id, JSON.stringify(updatedFaculty))
      .expire(redisKey, DESIGNER_TTL)
      .exec();

    await facultyQueue.update(designerId, id, data);

    return updatedFaculty;
  },

  deleteById: async (designerId: string, id: string) => {
    const redisKey = key(designerId);

    const deleted = await redis.hdel(redisKey, id);

    if (!deleted) {
      return false;
    }

    await facultyQueue.remove(designerId, id);

    return true;
  },
};
