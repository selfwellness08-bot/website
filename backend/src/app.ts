import express, { type Express, type Request } from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes/index.js";

declare module "express" {
  interface Request {
    log: {
      info: (...args: unknown[]) => void;
      error: (...args: unknown[]) => void;
      warn: (...args: unknown[]) => void;
    };
  }
}

const app: Express = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use((req: Request, _res, next) => {
  req.log = {
    info: (...args) => console.log("[INFO]", ...args),
    error: (...args) => console.error("[ERROR]", ...args),
    warn: (...args) => console.warn("[WARN]", ...args),
  };
  next();
});

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/api", router);

const frontendDist = path.resolve(__dirname, "../../frontend/dist");
app.use(express.static(frontendDist));
app.get("*", (_req, res) => {
  res.sendFile(path.join(frontendDist, "index.html"));
});

export default app;
