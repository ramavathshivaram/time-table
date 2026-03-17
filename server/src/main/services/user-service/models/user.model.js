import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    authId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
      unique: true,
      index: true,
    },

    avatar: {
      type: String,
      default: "",
    },

    settings: {
      darkMode: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
