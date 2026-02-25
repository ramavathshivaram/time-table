import dotEnv from "dotenv";
dotEnv.config();

import connectDB from "./configs/mongoDB.js";
import app from "./app.js";

const port = 3002;

const userInit = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`user server started on ${port}`);
  });
};

userInit();
