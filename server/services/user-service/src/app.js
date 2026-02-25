import express from "express";
import morgan from "morgan";

import errorHandler from "./middlewares/errorHandler.js";

import userRoutes from "./routes/user.route.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => res.send("User Service"));

app.use(userRoutes);

app.use(errorHandler);

export default app;
