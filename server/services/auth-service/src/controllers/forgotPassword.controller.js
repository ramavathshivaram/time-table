import AuthModel from "../models/Auth.model.js";
import asyncHandler from "express-async-handler";
import ApiError from "../lib/ApiError.js";
import sendOTPEmail from "../services/sendMail.js";
import { hashPassword } from "../lib/utils.js";

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await AuthModel.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }
  // generate otp
  const otp = generateOTP();

  // send otp to user email
  await sendOTPEmail(email, otp);

  // update otp in db
  await AuthModel.findOneAndUpdate(
    { email },
    { otp, otpExpiry: Date.now() + 15 * 60 * 1000 },
  );

  // send response
  return res.json({
    message: "OTP sent to your email",
    success: true,
  });
});

const verifyOTP = asyncHandler(async (req, res) => {
  const { otp, email } = req.body;

  const user = await AuthModel.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.otp !== otp || user.otpExpiry < Date.now()) {
    throw new ApiError(400, "Invalid OTP");
  }

  return res.json({ message: "OTP verified", success: true });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { otp, password, email } = req.body;

  const user = await AuthModel.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.otp !== otp || user.otpExpiry < Date.now()) {
    throw new ApiError(400, "Invalid OTP");
  }

  const hashedPassword = await hashPassword(password);

  user.password = hashedPassword;

  user.tokenVersion += 1;

  user.refreshToken = null;

  await user.save();

  return res.json({ message: "Password reset successful", success: true });
});

const generateOTP = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let otp = "";

  for (let i = 0; i < 6; i++) {
    otp += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return otp;
};

export default {
  forgotPassword,
  verifyOTP,
  resetPassword,
};
