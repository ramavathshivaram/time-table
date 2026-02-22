import dotEnv from "dotenv";

dotEnv.config();
import connectDB from "./configs/mongoDB.js";
import app from "./app.js";

console.log(process.env.JWT_SECRET);

const authInit = async () => {
  await connectDB();

  app.listen(3001, () => {
    console.log("auth server started on 3001");
  });
};

authInit();
