import { roomService } from "./room/room.service.js";
import { subjectService } from "./subject/subject.service.js";
import { timetableDesignerRepository } from "./timetable-designer.repository.js";

export const timetableDesignerService = {
  create: async (timetableId: string) => {
    const timetableDesigner =
      await timetableDesignerRepository.create(timetableId);

    return timetableDesigner;
  },

  get: async (timetableId: string) => {
    const timetableDesigner =
      await timetableDesignerRepository.get(timetableId);

    if (!timetableDesigner) {
      return null;
    }

    const rooms = await roomService.getAll(timetableDesigner._id.toString());
    const subjects = await subjectService.getAll(
      timetableDesigner._id.toString(),
    );

    return {
      ...timetableDesigner,

      nodes: timetableDesigner.nodes ?? [],
      edges: timetableDesigner.edges ?? [],

      faculties: timetableDesigner.faculties ?? [],
      subjects: subjects ?? [],
      rooms: rooms ?? [],
    };
  },

  getOrCreate: async (timetableId: string) => {
    const existing = await timetableDesignerService.get(timetableId);

    if (existing) {
      return existing;
    }

    return timetableDesignerService.create(timetableId);
  },
};
