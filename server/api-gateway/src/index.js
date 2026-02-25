import express from "express";
import cors from "cors";
import proxy from "express-http-proxy";
import morgan from "morgan";
import errorHandler from "./middleWares/errorHandler.js";
import { MICROSERVICES } from "./lib/consts.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(express.json());


const proxyOptions = {
  proxyReqOptDecorator(proxyReqOpts) {
    proxyReqOpts.headers["X-Forwarded-Host"] = "localhost:3000";
    return proxyReqOpts;
  },
};


app.get("/", (req, res) => {
  res.send("API Gateway");
});

app.use("/api/auth", proxy(MICROSERVICES.auth, proxyOptions) );

app.use("/api/user", proxy(MICROSERVICES.user, proxyOptions));

app.use(errorHandler);

app.listen(3000, () => {
  console.log("API Gateway running on port 3000");
});
