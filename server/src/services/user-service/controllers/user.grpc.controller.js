import userRepository from "../repositorys/user.repository.js";
import { sendRegisterEmailQueue } from "../queues/email.queue.js";
import { queueConst } from "../lib/const.js";

const createUser = async (user) => {
  console.log(user);
  const newUser = await userRepository.createUser(user);
  console.log("new user created");

  await sendRegisterEmailQueue.add(queueConst.SEND_REGISTER_EMAIL, newUser);

  return newUser._id;
};

const getUserIdByEmail = async (email) => {
  return await userRepository.getUserIdByEmail(email);
};

export default { createUser, getUserIdByEmail };
