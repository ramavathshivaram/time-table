import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import ejs from "ejs";

import authRouter from "./routes/auth.route.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");

app.use(authRouter);

app.use(errorHandler);

export default app;
