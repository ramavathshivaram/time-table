import dotEnv from "dotenv";
dotEnv.config();

import connectDB from "./shared/configs/mongoDB.js";
import app from "./services/app.js";

const port = process.env.PORT || 8080;

const serverInit = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`auth server started on ${port}`);
  });
};

serverInit();
