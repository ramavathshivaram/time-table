import expressAsyncHandler from "express-async-handler";
import { timetableService } from "./timetable.service.js";

export const timetableController = {
  create: expressAsyncHandler(async (req, res) => {
    const userId = req.userId;
    const timetable = await timetableService.create({ userId });

    console.log(timetable);

    res.status(201).json({ success: true, timetable });
  }),

  getTimetables: expressAsyncHandler(async (req, res) => {
    const userId = req.userId;
    const { pageParam, query = "" } = req.query;

    const timetables = await timetableService.getTimetables({
      userId,
      pageParam,
      query,
    });

    console.log(timetables);
    res.status(200).json({ success: true, timetables });
  }),

  getRecentTimetables: expressAsyncHandler(async (req, res) => {
    const timetables = await timetableService.getRecentTimetables(req.userId);
    res.status(200).json({ success: true, timetables });
  }),

  delete: expressAsyncHandler(async (req, res) => {
    const { timetableId } = req.query;
    await timetableService.delete(timetableId);
    res.status(200).json({ success: true, message: "Timetable deleted" });
  }),
};
