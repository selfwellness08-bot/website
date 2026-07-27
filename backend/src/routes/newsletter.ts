import { Router } from "express";
import { db } from "../db.js";
import { newsletterSubscribersTable } from "../db.js";
import { desc } from "drizzle-orm";
import { requireAdmin } from "./auth.js";

const router = Router();

router.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body as { email?: string };
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Valid email is required" });
    }
    await db.insert(newsletterSubscribersTable)
      .values({ email: email.toLowerCase() })
      .onConflictDoNothing();
    return res.json({ success: true, message: "Subscribed successfully" });
  } catch (err) {
    req.log.error({ err }, "Newsletter subscribe error");
    return res.status(500).json({ error: "Failed to subscribe" });
  }
});

router.get("/subscribers", requireAdmin, async (req, res) => {
  try {
    const subscribers = await db.select().from(newsletterSubscribersTable).orderBy(desc(newsletterSubscribersTable.subscribedAt));
    return res.json(subscribers);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch subscribers");
    return res.status(500).json({ error: "Failed to fetch subscribers" });
  }
});

export default router;
