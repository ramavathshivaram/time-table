import userRepository from "../repositorys/user.repository.js";
import asyncHandler from "express-async-handler";

const createUser = async (user) => {
  console.log(user);
  const newUser = await userRepository.createUser(user);
  console.log("new user created");
};

const getUserById = asyncHandler(async (req, res) => {
  const authId=req.userId
  const user = await userRepository.getUserByAuthId(authId);
  return res.status(200).json({
    success: true,
    data: user,
  });
});

export default { createUser, getUserById };
