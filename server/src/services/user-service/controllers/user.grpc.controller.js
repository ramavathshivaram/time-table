import logger from "#configs/logger.js";
import loadHtml from "#utils/loadHtml.js";
import userRepository from "../repositorys/user.repository.js";
import { emailQueue } from "#shared/queues/email.queue.js";

const createUser = async (user) => {
  logger.info(user);
  const newUser = await userRepository.createUser(user);
  logger.info("new user created");

  await emailQueue.add("send-register-email", {
    email: user.email,
    subject: "Registration Successful",
    html: await loadHtml("user-service/templetes/email.register.ejs", {
      userName: user.userName,
      email: user.email,
      avatar: user.avatar,
    }),
  });

  return newUser._id;
};

const getUserIdByEmail = async (email) => {
  return await userRepository.getUserIdByEmail(email);
};

export default { createUser, getUserIdByEmail };
