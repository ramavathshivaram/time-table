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

  tokenVersion: {
    type: Number,
    default: 0,
  },

  refreshToken: {
    type: String,
  },

  otp: {
    type: String,
  },

  otpExpiry: {
    type: Date,
  },
});
authSchema.methods.isPasswordMatched = async (password) => {
  return await bcrypt.compare(password, this.password);
};

authSchema.methods.isOtpMatched = async (otp) => {
  return await bcrypt.compare(otp, this.otp);
};

const AuthModel = mongoose.model("auth", authSchema);

export default AuthModel;
