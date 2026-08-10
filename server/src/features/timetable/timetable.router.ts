import express from "express";
import { timetableController } from "./timetable.controller.js";

export const timetableRouter = express.Router();

timetableRouter.post("/create", timetableController.create);

timetableRouter.get("/", timetableController.getTimetables);

timetableRouter.get("/recent", timetableController.getRecentTimetables);

timetableRouter.delete("/", timetableController.delete);
