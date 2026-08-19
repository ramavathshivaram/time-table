import { Schema, model, type InferSchemaType } from "mongoose";

const subjectSchema = new Schema(
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

    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    duration: {
      type: Number,
      required: true,
      min: 1,
    },

    labDetails: {
      isLab: {
        type: Boolean,
        required: true,
        default: false,
      },

      weeklyPeriods: {
        type: Number,
        min: 0,
      },
    },

    weeklyPeriods: {
      type: Number,
      required: true,
      min: 1,
    },

    periodsPerDay: {
      type: Number,
      min: 1,
    },

    consecutivePeriods: {
      type: Number,
      min: 1,
    },

    roomRequirements: {
      type: {
        type: String,
        enum: ["classroom", "laboratory", "seminar-hall"],
      },

      minimumCapacity: {
        type: Number,
        min: 1,
      },
    },
  },
  {
    timestamps: true,
  },
);

export type SubjectDocument = InferSchemaType<typeof subjectSchema>;

export const SubjectModel = model("Subject", subjectSchema);
