import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },

  userId:{
    type: mongoose.Types.ObjectId,
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
});

const AuthModel = mongoose.model("auth", authSchema);

export default AuthModel;
