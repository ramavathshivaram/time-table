import { Schema, model, type InferSchemaType } from "mongoose";

const messageSchema = new Schema(
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

    content: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
      enum: ["system", "user", "assistant"],
      default: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export type Message = InferSchemaType<typeof messageSchema>;

export const MessageModel = model("Message", messageSchema);
