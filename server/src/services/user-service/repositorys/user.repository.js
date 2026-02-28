import UserModel from "../models/user.model.js";

const createUser = async (user) => {
  return await UserModel.create(user);
};

const getUserByAuthId = async (authId) => {
  return await UserModel.findOne({ authId });
};

const getUserById = async (id) => {
  return await UserModel.findById(id);
};

const getUserIdByEmail = async (email) => {
  const user = await UserModel.findOne({ email });
  return user._id;
};

export default { createUser, getUserByAuthId, getUserById, getUserIdByEmail };
