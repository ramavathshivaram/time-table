import { Schema, model, type InferSchemaType } from "mongoose";

const roomSchema = new Schema({
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

  roomNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  capacity: {
    type: Number,
    required: true,
    min: 1,
  },

  floor: {
    type: Number,
    required: true,
  },

  type: {
    type: String,
    required: true,
    enum: ["classroom", "laboratory", "seminar-hall"],
  },
});

export type Room = InferSchemaType<typeof roomSchema>;

export const RoomModel = model("Room", roomSchema);
