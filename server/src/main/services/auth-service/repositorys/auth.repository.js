import AuthModel from "../models/Auth.model.js";

const getUserWithPasswordByEmail = async (email) => {
  return AuthModel.findOne({ email }).select("+password");
};

const getUserByEmail = async (email) => {
  return await AuthModel.findOne({ email });
};

const checkAuthExists = async (user) => {
  return await AuthModel.exists(user);
};

const createAuth = async (user) => {
  return await AuthModel.create(user);
};

const findUserById = async (userId) => {
  return await AuthModel.findById(userId);
};

const findUserByIdAndUpdate = async (id, user) => {
  return await AuthModel.findByIdAndUpdate(id, user);
};

const findUserByEmailAndUpdate = async (email, user) => {
  return await AuthModel.findOneAndUpdate({ email }, user, { new: true });
};

const updateRefreshToken = async (authId, refreshToken) => {
  return await AuthModel.findOneAndUpdate({ _id: authId }, { refreshToken });
};

const deleteRefreshToken = async (authId) => {
  return await AuthModel.findOneAndUpdate(
    { _id: authId },
    { refreshToken: null },
  );
};

export default {
  getUserWithPasswordByEmail,
  getUserByEmail,
  createAuth,
  findUserById,
  findUserByIdAndUpdate,
  checkAuthExists,
  findUserByEmailAndUpdate,
  updateRefreshToken,
  deleteRefreshToken,
};
