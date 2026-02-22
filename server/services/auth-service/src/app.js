import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRouter from "./routes/auth.route.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use(authRouter);

app.use(errorHandler);

export default app;
