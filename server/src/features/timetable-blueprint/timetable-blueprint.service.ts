import { timetableBlueprintRepository } from "./timetable-blueprint.repository.js";

export const timetableBlueprintService = {
  create: async (): Promise<string> => {
    const timetableBlueprint = await timetableBlueprintRepository.create();

    return timetableBlueprint._id;
  },
};
