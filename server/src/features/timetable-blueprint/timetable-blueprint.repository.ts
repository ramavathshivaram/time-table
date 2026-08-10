import { errors } from "#utils/errors.js";

import { TimetableBlueprintModel } from "./timetable-blueprint.model.js";

export const timetableBlueprintRepository = {
  create: async () => {
    try {
      return await TimetableBlueprintModel.create({});
    } catch {
      throw errors.internal("Failed to create timetable blueprint");
    }
  },
};
