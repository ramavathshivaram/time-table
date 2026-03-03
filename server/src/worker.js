import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

// import auth workers
import authWorkers from "./services/auth-service/workers/index.js";

// import workflow workers
import workflowWorkers from "./services/workflow-service/workers/index.js";

const workers = [...authWorkers, ...workflowWorkers];

const gracefulShutdown = async () => {
  console.log("Shutting down email worker...");
  for (const worker of workers) {
    await worker.close();
  }
  console.log("All workers shut down. Exiting process.");
  process.exit(0);
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
