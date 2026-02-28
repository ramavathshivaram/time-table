import asyncHandler from "express-async-handler";
import ApiError from "../lib/ApiError.js";
import crypto from "crypto";
// import sendOTPEmail from "../services/sendMail.js";
import { hashPassword } from "../lib/utils.js";
import authRepository from "../repositorys/auth.repository.js";

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await authRepository.getUserByEmail(email);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // generate otp
  const otp = generateOTP();

  //! send otp email
  // await sendOTPEmail(email, otp);

  // update otp in DB (reuse existing user object)
  user.otp = otp;
  user.otpExpiry = Date.now() + 15 * 60 * 1000; //// 15 mins

  await user.save();

  return res.json({
    message: "OTP sent to your email",
    success: true,
  });
});

const verifyOTP = asyncHandler(async (req, res) => {
  const { otp, email } = req.body;

  const user = await authRepository.getUserByEmail(email);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.otp !== otp || !user.otpExpiry || user.otpExpiry < Date.now()) {
    throw new ApiError(400, "Invalid OTP");
  }

  return res.json({ message: "OTP verified", success: true });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { otp, password, email } = req.body;

  const user = await authRepository.getUserByEmail(email);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.otp !== otp || !user.otpExpiry || user.otpExpiry < Date.now()) {
    throw new ApiError(400, "Invalid OTP");
  }

  const hashedPassword = await hashPassword(password);

  user.password = hashedPassword;
  user.tokenVersion += 1;
  user.refreshToken = null;

  user.otp = null;
  user.otpExpiry = null;

  await user.save();

  return res.json({ message: "Password reset successful", success: true });
});

const generateOTP = () => crypto.randomBytes(3).toString("hex");

export default {
  forgotPassword,
  verifyOTP,
  resetPassword,
};
