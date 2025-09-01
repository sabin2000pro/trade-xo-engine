import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import hpp from "hpp";
import cors from "cors";
import helmet from "helmet";
import rateLimiter from "express-rate-limit";
import { z } from "zod";
import winston from "winston";
import { connectDatabaseAsync } from "./database/conn-db";

connectDatabaseAsync();

const app = express();
const port = process.env.PORT || 5560;
const devMode = process.env.DEV_MODE || "development";

// Security - Rate Limiter Middleware
const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 350,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

app.use(limiter);
app.use(hpp());

app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
    methods: ["PUT", "POST", "GET", "DELETE", "PATCH"],
  })
);

app.set("trust proxy", 1); // Used for load balancing

app.use(helmet());

app.get("/", (request: Request, response: Response, next: NextFunction) => {
  return response
    .status(200)
    .json({ success: true, message: "Root Route - Trading XO" });
});

app.get("/healthz", (_req: Request, res: Response) =>
  res.status(200).json({ ok: true })
);
app.get("/readyz", (_req: any, res: Response) =>
  res.status(200).json({ ready: true })
);

const server = app.listen(port, (error) => {
  if (!error) {
    return console.log(
      `Trade XO System listening for HTTP requests on port ${port} in mode ${devMode}`
    );
  }
});

process.on("SIGINT", () => server.close(() => process.exit(0)));
process.on("SIGTERM", () => server.close(() => process.exit(0)));
