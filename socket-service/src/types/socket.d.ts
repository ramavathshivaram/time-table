import type { Types } from "mongoose";






declare module "socket.io" {
  interface Socket {
    userId: Types.ObjectId;
      tokenVersion: number;
      type: "access";
  }
}