import { Schema, model, type InferSchemaType } from "mongoose";

const facultySchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    
    designerId: {
      type: String,
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    department: {
      type: String,
      trim: true,
    },

    subjectIds: {
      type: [String],
      default: [],
    },

    unavailablePeriods: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

export type FacultyDocument = InferSchemaType<typeof facultySchema>;

export const FacultyModel = model("Faculty", facultySchema);
