import userRepository from "../repositorys/user.repository.js";

const createUser = async (user) => {
  console.log(user);
  const newUser = await userRepository.createUser(user);
  console.log("new user created");

  return newUser._id;
};

const getUserIdByEmail = async (email) => {
  return await userRepository.getUserIdByEmail(email);
};

export default { createUser, getUserIdByEmail };
