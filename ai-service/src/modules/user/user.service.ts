import logger from "#configs/logger.js";
import loadHtml from "#utils/loadHtml.js";
import type { Types } from "mongoose";

import userRepository from "./user.repository.js";
import { emailQueue } from "#services/queues.js";
import ApiError from "#utils/ApiError.js";

const createUser = async (user: any) => {
  if(!user) throw new ApiError(404, "User not found");

  const newUser = await userRepository.createUser(user);
  
  await emailQueue.add("send-register-email", {
    email: user.email,
    subject: "Registration Successful",
    html: await loadHtml("../templetes/email.register.ejs", {
      userName: user.userName,
      email: user.email,
      avatar: user.avatar,
    }),
  });

  return newUser._id;
};

const getUserIdByEmail = async (email: string|undefined) => {
  if (!email) throw new ApiError(404, "Email not found");
  return await userRepository.getUserIdByEmail(email);
};

const getUserById = async (userId: Types.ObjectId | undefined): Promise<any> => {
  if (!userId) throw new ApiError(404, "User id not found");
  return await userRepository.getUserById(userId);
};

const updateDarkMode = async (userId: Types.ObjectId | undefined, darkMode: boolean): Promise<any> => {
  if (!userId ) throw new ApiError(404, "user id not found");
  return await userRepository.updateDarkMode(userId, darkMode);
};

export default { createUser, getUserIdByEmail, getUserById, updateDarkMode };
