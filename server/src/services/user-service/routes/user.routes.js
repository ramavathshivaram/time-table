import express from "express";
import userContoller from "../controllers/user.contoller.js";

import getUserId from "../middlewares/getUserId.js";

const router = express.Router();

router.get("/", getUserId, userContoller.getUserById);

export default router;
