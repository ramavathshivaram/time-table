import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

// import auth workers
import "./services/auth-service/workers/index.js";
