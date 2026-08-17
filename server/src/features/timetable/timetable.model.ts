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

    description: {
      type: String,
      trim: true,
      maxlength: 200,
    },

    stage: {
      type: String,
      enum: ["incomplete", "editing", "complete"],
      default: "incomplete",
      index: true,
    },

    blueprintId: {
      type: Schema.Types.ObjectId,
      ref: "TimetableBlueprint",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

export type Timetable = InferSchemaType<typeof timetableSchema>;

export type TimetableDocument = HydratedDocument<Timetable>;

export const TimetableModel = model("Timetable", timetableSchema);
