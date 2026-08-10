import {
  Schema,
  model,
  type HydratedDocument,
  type InferSchemaType,
} from "mongoose";

const timetableBlueprintSchema = new Schema({});

export type TimetableBlueprint = InferSchemaType<
  typeof timetableBlueprintSchema
>;

export type TimetableBlueprintDocument = HydratedDocument<TimetableBlueprint>;

export const TimetableBlueprintModel = model(
  "TimetableBlueprint",
  timetableBlueprintSchema,
);
