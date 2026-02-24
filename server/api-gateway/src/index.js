import express from "express";
import cors from "cors";
import proxy from "express-http-proxy";
import morgan from "morgan";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(express.json());

const MICROSERVICES = {
  auth: "http://localhost:3001",
};

app.get("/", (req, res) => {
  res.send("API Gateway");
});

app.use(
  "/api/auth",
  proxy(MICROSERVICES.auth, {
    proxyReqOptDecorator(proxyReqOpts) {
      proxyReqOpts.headers["X-Forwarded-Host"] = "localhost:3000";
      return proxyReqOpts;
    },
  }),
);

app.use((err, req, res, next) => {
  console.error("Gateway Error:", err);
  res.status(500).json({ message: "Gateway Error" });
});

app.listen(3000, () => {
  console.log("API Gateway running on port 3000");
});
