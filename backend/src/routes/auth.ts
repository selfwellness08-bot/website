import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || "self-wellness-secret-key";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@selfwellness.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "selfwellness786#";

let adminPasswordHash: string | null = null;

async function getAdminHash(): Promise<string> {
  if (!adminPasswordHash) {
    adminPasswordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
  }
  return adminPasswordHash;
}

router.post("/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body as { email?: string; password?: string };
    if (!email || !password) return res.status(400).json({ error: "Email and password are required" });
    if (email !== ADMIN_EMAIL) return res.status(401).json({ error: "Invalid credentials" });
    const hash = await getAdminHash();
    const valid = await bcrypt.compare(password, hash);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });
    const token = jwt.sign({ email, role: "admin" }, JWT_SECRET, { expiresIn: "24h" });
    return res.json({ token, email });
  } catch (err) {
    req.log.error({ err }, "Login error");
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/admin/me", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.status(401).json({ error: "Unauthorized" });
  const token = authHeader.slice(7);
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { email: string; role: string };
    return res.json({ email: payload.email, role: payload.role });
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
});

export function requireAdmin(
  req: import("express").Request,
  res: import("express").Response,
  next: import("express").NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.status(401).json({ error: "Unauthorized" });
  const token = authHeader.slice(7);
  try {
    jwt.verify(token, JWT_SECRET);
    return next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

export default router;
