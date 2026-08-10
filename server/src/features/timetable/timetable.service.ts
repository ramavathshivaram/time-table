import { timetableRepository } from "./timetable.reposistory.js";

export const timetableService = {
  create: async ({ userId }: { userId: string }) => {
    const title = crypto.randomUUID().toString();
    return await timetableRepository.create({ title, userId });
  },

  getTimetables: async ({ userId, pageParam, query }: any) => {
    const limit = 20;
    const skip = (pageParam - 1) * limit;
    return await timetableRepository.getTimetables({
      userId,
      query,
      skip,
      limit,
    });
  },

  getRecentTimetables: async (userId: string) => {
    return await timetableRepository.getRecentTimetables(userId, 5);
  },

  delete: async (timetableId: string) => {
    return await timetableRepository.delete(timetableId);
  },
};
