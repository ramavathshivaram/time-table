import UserModel from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import ApiError from "../lib/ApiError.js";

const getUserDetails = asyncHandler(async (req, res) => {
  const { authId } = req.query;

  const user = await UserModel.findOne({ authId });

  res.status(200).json({ data: user });
});

const createUser = asyncHandler(async (req, res) => {
  console.log(req.body)
  const { userName, email, authId } = req.body;

  const userExists = await UserModel.findOne({ authId, email });

  if (userExists) {
    throw new ApiError(400, "User already exists");
  }

  const user = await UserModel.create({ userName, email, authId });

  res.status(201).json({ data: user });
});

export default { getUserDetails, createUser };
