import express from "express";
import userContoller from "../controllers/user.contoller.js";
import emitter from "../../../shared/configs/emitter.js";

//! emitter
emitter.on("createUser", (user) => {
  userContoller.createUser(user);
});

const router = express.Router();

router.get("/", userContoller.getUserById);

export default router;
