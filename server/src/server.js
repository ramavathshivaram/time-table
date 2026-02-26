import dotEnv from "dotenv";
dotEnv.config();

import connectDB from "./configs/mongoDB.js";
import app from "./app.js";

const port = 3001;

const serverInit = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`auth server started on ${port}`);
  });
};

serverInit();
