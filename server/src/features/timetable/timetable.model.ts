import {
  Schema,
  model,
  type HydratedDocument,
  type InferSchemaType,
} from "mongoose";

const timetableSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export type Timetable = InferSchemaType<typeof timetableSchema>;

export type timetableDocument = HydratedDocument<Timetable>;

export const TimetableModel = model<Timetable>("Timetable", timetableSchema);
