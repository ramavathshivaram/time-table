import env from "#configs/env.js";

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

import morganMiddleware from "#middlewares/morganMiddleware.js";
import notFoundRoute from "#middlewares/notFoundRoute.js";
import errorHandler from "#middlewares/errorHandler.js";

import { authenticate } from "#middlewares/authenticate.js";

import { authRouter } from "#features/auth/auth.routes.js";
import { userRouter } from "#features/user/user.router.js";
import { timetableRouter } from "#features/timetable/timetable.router.js";

const corsOptions = {
  origin: env.ORIGIN_URL,
  credentials: true,
};

const app = express();

app.set("view engine", "ejs");
app.set("trust proxy", 1);

//! Middlewares
app.use(morganMiddleware);
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  compression({
    threshold: 1024,
    level: 6,
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/user", authenticate, userRouter);
app.use("/api/timetable", authenticate, timetableRouter);

app.use(errorHandler);
app.use(notFoundRoute);

export default app;
