import asyncHandler from "express-async-handler";
import ApiError from "#shared/lib/ApiError.js";
import { hashPassword, generateOTP } from "../services/password.service.js";
import authRepository from "../repositorys/auth.repository.js";
import { sendOtpEmailQueue } from "../queues/emailQueue.js";
import { queueConst } from "../lib/const.js";
import redis from "../../../shared/configs/redis.js";

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const auth = await authRepository.checkAuthExists({ email });

  if (!auth) {
    throw new ApiError(404, "User not found");
  }

  const otp = generateOTP();

  //! send otp email
  await sendOtpEmailQueue.add(queueConst.SEND_OTP_EMAIL, { email, otp });

  // save otp to redis
  redis.set(`otp:${email}`, otp, "EX", 900); //// 15 mins

  return res.json({
    message: "OTP sent to your email",
    success: true,
  });
});

const verifyOTP = asyncHandler(async (req, res) => {
  const { otp, email } = req.body;

  const otpFromRedis = await redis.get(`otp:${email}`);

  if (!otpFromRedis || otpFromRedis !== otp) {
    throw new ApiError(404, "Invalid OTP");
  }

  return res.json({ message: "OTP verified", success: true });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { otp, password, email } = req.body;

  const otpFromRedis =  await redis.get(`otp:${email}`);

  if (!otpFromRedis || otpFromRedis !== otp) {
    throw new ApiError(404, "Invalid OTP");
  }

  const hashedPassword = await hashPassword(password);

  await authRepository.findUserByEmailAndUpdate(email, {
    password: hashedPassword,
    refreshToken: null,
    $inc: { tokenVersion: 1 },
  });

  return res.json({ message: "Password reset successful", success: true });
});

export default {
  forgotPassword,
  verifyOTP,
  resetPassword,
};
