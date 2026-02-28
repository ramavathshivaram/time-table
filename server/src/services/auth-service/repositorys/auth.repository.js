import AuthModel from "../models/Auth.model.js";

const getUserWithPasswordByEmail = async (email) => {
  return AuthModel.findOne({ email }).select("+password");
};

const getUserByEmail = async (email) => {
  return await AuthModel.findOne({ email });
};

const createUser = async (user) => {
  return await AuthModel.create(user);
};

const findUserById = async (userId) => {
  return await AuthModel.findById(userId);
};

const findUserByIdAndUpdate = async (id, user) => {
  return await AuthModel.findByIdAndUpdate(id, user);
};

export default {
  getUserWithPasswordByEmail,
  getUserByEmail,
  createUser,
  findUserById,
  findUserByIdAndUpdate
};
