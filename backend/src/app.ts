import express, { type Express } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import pinoHttp from "pino-http";
import router from "./routes/index.js";
import { logger } from "./lib/logger.js";

const app: Express = express();
app.set("trust proxy", 1);

app.use(pinoHttp({
  logger,
  serializers: {
    req(req) { return { id: req.id, method: req.method, url: req.url?.split("?")[0] }; },
    res(res) { return { statusCode: res.statusCode }; },
  },
}));

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",").map(o => o.trim()) || [];
app.use(cors({
  origin: allowedOrigins.length > 0 ? allowedOrigins : true,
  credentials: true,
}));

app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 300, standardHeaders: true, legacyHeaders: false }));
app.use("/api/auth", rateLimit({ windowMs: 15 * 60 * 1000, max: 20, standardHeaders: true, legacyHeaders: false }));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

export default app;
