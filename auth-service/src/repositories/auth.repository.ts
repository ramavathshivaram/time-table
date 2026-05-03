import AuthModel from "../models/Auth.model.js";
import type { Types } from "mongoose";

// ---------- TYPES ----------
interface AuthUser {
  email: string;
  password?: string;
  isEmailVerifyed?: boolean | null;
  userId: Types.ObjectId;
  [key: string]: unknown;
}

// ---------- METHODS ----------
const getUserWithPasswordByEmail = async (
  email: AuthUser["email"],
): Promise<AuthUser | null> => {
  return AuthModel.findOne({ email }).select("+password");
};

const getUserByEmail = async (
  email: AuthUser["email"],
): Promise<AuthUser | null> => {
  return AuthModel.findOne({ email });
};

const checkAuthExists = async (user: Partial<AuthUser>): Promise<boolean> => {
  const exists = await AuthModel.exists(user);
  return !!exists;
};

const createAuth = async (user: AuthUser): Promise<AuthUser> => {
  return AuthModel.create(user);
};

const findUserById = async (
  userId: string | Types.ObjectId,
): Promise<AuthUser | null> => {
  return AuthModel.findById(userId);
};

const findUserByIdAndUpdate = async (
  id: string | Types.ObjectId,
  user: Partial<AuthUser>,
): Promise<AuthUser | null> => {
  return AuthModel.findByIdAndUpdate(id, user, { new: true });
};

const findUserByEmailAndUpdate = async (
  email: string,
  user: Partial<AuthUser>,
): Promise<AuthUser | null> => {
  return AuthModel.findOneAndUpdate({ email }, user, { new: true });
};

export default {
  getUserWithPasswordByEmail,
  getUserByEmail,
  createAuth,
  findUserById,
  findUserByIdAndUpdate,
  checkAuthExists,
  findUserByEmailAndUpdate,
};
