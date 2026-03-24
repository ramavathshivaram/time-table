import bcrypt from "bcryptjs";
import crypto from "crypto";

export const hashPassword = async (password) => {
  if (!password) throw new Error("Password is required");
  return await bcrypt.hash(password, 10);
};

export const isPasswordMatched = async (password, hashedPassword) => {
  if (!password || !hashedPassword)
    throw new Error("Password and hashedPassword required");

  return await bcrypt.compare(password, hashedPassword);
};

export const generateRandomPassword = async () => {
  const randomPassword = crypto.randomBytes(16).toString("hex");
  return hashPassword(randomPassword);
};

export const generateOTP = () => crypto.randomBytes(3).toString("hex");

