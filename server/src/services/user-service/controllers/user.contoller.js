import userRepository from "../repositorys/user.repository.js";
import asyncHandler from "express-async-handler";

const getUserById = asyncHandler(async (req, res) => {
  const userId = req.userId;
  console.log(userId);
  const user = await userRepository.getUserById(userId);
  return res.status(200).json({
    success: true,
    data: user,
  });
});

const updateDarkMode = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { darkMode } = req.body;
  const user = await userRepository.updateDarkMode(userId, darkMode);
  return res.status(200).json({
    success: true,
    data: user,
  });
});

export default { getUserById,updateDarkMode };
