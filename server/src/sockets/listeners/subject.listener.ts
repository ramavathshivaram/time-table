import type { Server, Socket } from "socket.io";

import logger from "#configs/logger.js";
import { subjectService } from "#features/timetable-designer/subject/subject.service.js";

export const registerSubjectListeners = (io: Server, socket: Socket) => {
  // -----------------------------------------
  // CREATE
  // -----------------------------------------

  socket.on("subject:create", async (payload, callback) => {
    try {
      logger.info(`subject:create | socket=${socket.id}`);

      const { designerId, subject } = payload;

      if (!designerId) {
        callback?.({
          success: false,
          message: "Designer ID is required",
        });

        return;
      }

      if (!subject) {
        callback?.({
          success: false,
          message: "Subject data is required",
        });

        return;
      }

      const createdSubject = await subjectService.create(designerId, subject);

      callback?.({
        success: true,
        data: createdSubject,
      });
    } catch (error) {
      logger.error("subject:create failed", error);

      callback?.({
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to create subject",
      });
    }
  });

  // -----------------------------------------
  // UPDATE
  // -----------------------------------------

  socket.on("subject:update", async (payload, callback) => {
    try {
      logger.info(`subject:update | socket=${socket.id}`);

      const { designerId, subjectId, data } = payload;

      if (!designerId) {
        callback?.({
          success: false,
          message: "Designer ID is required",
        });

        return;
      }

      if (!subjectId) {
        callback?.({
          success: false,
          message: "Subject ID is required",
        });

        return;
      }

      const updatedSubject = await subjectService.update(
        designerId,
        subjectId,
        data,
      );

      if (!updatedSubject) {
        callback?.({
          success: false,
          message: "Subject not found",
        });

        return;
      }

      callback?.({
        success: true,
        data: updatedSubject,
      });
    } catch (error) {
      logger.error("subject:update failed", error);

      callback?.({
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to update subject",
      });
    }
  });

  // -----------------------------------------
  // DELETE
  // -----------------------------------------

  socket.on("subject:delete", async (payload, callback) => {
    try {
      logger.info(`subject:delete | socket=${socket.id}`);

      const { designerId, subjectId } = payload;

      if (!designerId) {
        callback?.({
          success: false,
          message: "Designer ID is required",
        });

        return;
      }

      if (!subjectId) {
        callback?.({
          success: false,
          message: "Subject ID is required",
        });

        return;
      }

      const deleted = await subjectService.delete(designerId, subjectId);

      if (!deleted) {
        callback?.({
          success: false,
          message: "Subject not found",
        });

        return;
      }

      callback?.({
        success: true,
        data: {
          subjectId,
        },
      });
    } catch (error) {
      logger.error("subject:delete failed", error);

      callback?.({
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to delete subject",
      });
    }
  });
};
