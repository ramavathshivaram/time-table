import asyncHandler from "express-async-handler";
import type { Request, Response } from "express";

import userServise from "./user.service.js";

const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const user = await userServise.getUserById(req.userId);
  return res.status(200).json({ success: true, data: user });
});

const updateDarkMode = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.userId;
  const darkMode = req.body.darkMode;
  const user = await userServise.updateDarkMode(userId, darkMode);

  return res.status(200).json({ success: true,data: user });
});

interface RegisterBody {
  userName: string;
  email: string;
  password: string;
}

const createUser = asyncHandler(async (req: Request<{}, {}, RegisterBody>, res: Response) => {
  const user = await userServise.createUser(req.body);
  return res.status(201).json({ success: true, data: user });
});

export default {
  getUserById,
  updateDarkMode,
  createUser,
};
