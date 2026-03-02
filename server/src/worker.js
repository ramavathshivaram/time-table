import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

// import auth workers
import "./services/auth-service/workers/index.js";

// import workflow workers
import "./services/workflow-service/workers/index.js";
