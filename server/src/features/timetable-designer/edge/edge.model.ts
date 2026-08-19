import { Schema, model, type InferSchemaType } from "mongoose";

const edgeSchema = new Schema(
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

    source: {
      type: String,
      required: true,
      index: true,
    },

    target: {
      type: String,
      required: true,
      index: true,
    },

    sourceHandle: {
      type: String,
      default: undefined,
    },

    targetHandle: {
      type: String,
      default: undefined,
    },

    type: {
      type: String,
      default: undefined,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

edgeSchema.index({
  designerId: 1,
  id: 1,
});

edgeSchema.index({
  designerId: 1,
  source: 1,
});

edgeSchema.index({
  designerId: 1,
  target: 1,
});

export type Edge = InferSchemaType<typeof edgeSchema>;

export const EdgeModel = model("Edge", edgeSchema);
