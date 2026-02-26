import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const authSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },

  password: {
    type: String,
    select: false,
  },

  isEmailVerified: {
    type: Boolean,
    default: false,
  },

  tokenVersion: {
    type: Number,
    default: 0,
  },

  refreshToken: String,

  otp: String,

  otpExpiry: Date,
});

const AuthModel = mongoose.model("auth", authSchema);

export default AuthModel;
