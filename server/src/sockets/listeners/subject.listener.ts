import type { Server, Socket } from "socket.io";

import { subjectService } from "#features/timetable-designer/subject/subject.service.js";
import { asyncSocketHandler } from "../lib/async-socket-handler.js";
import { errors } from "#utils/errors.js";

export const registerSubjectListeners = (io: Server, socket: Socket) => {
  socket.on(
    "subject:create",
    asyncSocketHandler("subject:create", async (payload, callback) => {
      const { designerId, subject } = payload;

      if (!designerId) {
        throw errors.badRequest("Designer ID is required");
      }

      if (!subject) {
        throw errors.badRequest("Subject is required");
      }

      const createdSubject = await subjectService.create(designerId, subject);

      callback({
        success: true,
        data: createdSubject,
      });
    }),
  );

  socket.on(
    "subject:update",
    asyncSocketHandler("subject:update", async (payload, callback) => {
      const { designerId, subjectId, data } = payload;

      if (!designerId) {
        throw errors.badRequest("Designer ID is required");
      }

      if (!subjectId) {
        throw errors.badRequest("Subject ID is required");
      }

      const updatedSubject = await subjectService.update(
        designerId,
        subjectId,
        data,
      );

      if (!updatedSubject) {
        throw errors.internal("Failed to update subject");
      }

      callback({
        success: true,
        data: updatedSubject,
      });
    }),
  );

  socket.on(
    "subject:delete",
    asyncSocketHandler("subject:delete", async (payload, callback) => {
      const { designerId, subjectId } = payload;

      if (!designerId) {
        throw errors.badRequest("Designer ID is required");
      }

      if (!subjectId) {
        throw errors.badRequest("Subject ID is required");
      }

      const deleted = await subjectService.delete(designerId, subjectId);

      if (!deleted) {
        throw errors.internal("Failed to delete subject");
      }

      callback({
        success: true,
        data: {
          subjectId,
        },
      });
    }),
  );
};
