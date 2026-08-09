import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

import { userService } from "./user.service.js";

export const userController = {
  me: expressAsyncHandler(async (req: Request, res: Response) => {
    const user = await userService.findById(req.userId as string);

    res.status(200).json({
      success: true,
      user: user,
    });
  }),
};
