import { errors } from "#utils/errors.js";
import { Timetable, TimetableModel } from "./timetable.model.js";

interface GetTimetablesParams {
  userId: string;
  query?: string;
  skip: number;
  limit: number;
}

export const timetableRepository = {
  create: async ({ title, userId }: Partial<Timetable>) => {
    try {
      return await TimetableModel.create({
        title,
        userId,
      });
    } catch {
      throw errors.internal("Failed to create timetable");
    }
  },

  getTimetables: async ({
    userId,
    query = "",
    skip,
    limit,
  }: GetTimetablesParams) => {
    try {
      return await TimetableModel.find({
        userId,
        title: {
          $regex: query,
          $options: "i",
        },
      })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    } catch {
      throw errors.internal("Failed to get timetables");
    }
  },

  getRecentTimetables: async (userId: string, limit = 5) => {
    try {
      return await TimetableModel.find({
        userId,
      })
        .sort({ updatedAt: -1 })
        .limit(limit);
    } catch {
      throw errors.internal("Failed to get recent timetables");
    }
  },
};
