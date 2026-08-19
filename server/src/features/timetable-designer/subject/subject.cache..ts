import { DESIGNER_TTL } from "#configs/constants.js";
import redis from "#configs/redis.js";
import { Subject } from "./subject.model.js";

import { subjectQueue } from "./subject.queue.js";
import { subjectRepository } from "./subject.repository.js";

const key = (designerId: string) => `designer:${designerId}:subjects`;

export const subjectCache = {
  // -----------------------------------------
  // GET BY ID - READ THROUGH
  // -----------------------------------------

  getById: async (designerId: string, id: string): Promise<Subject | null> => {
    const redisKey = key(designerId);

    const cached = await redis.hget(redisKey, id);

    if (cached) {
      return JSON.parse(cached);
    }

    const subject = await subjectRepository.findById(designerId, id);

    if (!subject) {
      return null;
    }

    await redis
      .multi()
      .hset(redisKey, id, JSON.stringify(subject))
      .expire(redisKey, DESIGNER_TTL)
      .exec();

    return subject;
  },

  // -----------------------------------------
  // GET ALL - READ THROUGH
  // -----------------------------------------

  getAll: async (designerId: string): Promise<Subject[]> => {
    const redisKey = key(designerId);

    const cached = await redis.hgetall(redisKey);

    if (Object.keys(cached).length > 0) {
      return Object.values(cached).map((subject) => JSON.parse(subject));
    }

    const subjects = await subjectRepository.findAll(designerId);

    if (subjects.length === 0) {
      return [];
    }

    const pipeline = redis.multi();

    for (const subject of subjects) {
      pipeline.hset(redisKey, subject.id, JSON.stringify(subject));
    }

    pipeline.expire(redisKey, DESIGNER_TTL);

    await pipeline.exec();

    return subjects;
  },

  // -----------------------------------------
  // CREATE - WRITE BEHIND
  // -----------------------------------------

  create: async (designerId: string, subject: Subject) => {
    const redisKey = key(designerId);

    const newSubject: Subject = {
      ...subject,
      id: crypto.randomUUID(),
      designerId,
    };

    await redis
      .multi()
      .hset(redisKey, newSubject.id, JSON.stringify(newSubject))
      .expire(redisKey, DESIGNER_TTL)
      .exec();

    await subjectQueue.add(designerId, newSubject);

    return newSubject;
  },

  // -----------------------------------------
  // UPDATE - WRITE BEHIND
  // -----------------------------------------

  updateById: async (
    designerId: string,
    id: string,
    data: Partial<Subject>,
  ) => {
    const redisKey = key(designerId);

    let existing = await redis.hget(redisKey, id);

    // Redis miss → MongoDB
    if (!existing) {
      const subject = await subjectRepository.findById(designerId, id);

      if (!subject) {
        return null;
      }

      existing = JSON.stringify(subject);
    }

    const updatedSubject: Subject = {
      ...JSON.parse(existing),
      ...data,
      id,
      designerId,
    };

    await redis
      .multi()
      .hset(redisKey, id, JSON.stringify(updatedSubject))
      .expire(redisKey, DESIGNER_TTL)
      .exec();

    await subjectQueue.update(designerId, id, data);

    return updatedSubject;
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

    await subjectQueue.remove(designerId, id);

    return true;
  },
};
