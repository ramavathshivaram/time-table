import { httpClient } from "@/shared/api/httpClient";

export const timetableApi = {
  create: async () => {
    const { data } = await httpClient.post("/timetable/create");

    return data.timetable;
  },

  getTimetables: async (pageParam: number, query: string) => {
    const { data } = await httpClient.get(
      `/timetable?pageParam=${pageParam}&query=${query}`,
    );

    return data.timetables;
  },

  getRecentTimetables: async () => {
    const { data } = await httpClient.get("/timetable/recent");

    return data.timetables;
  },
};
