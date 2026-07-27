import { Router } from "express";
import { db } from "../db.js";
import { siteSettingsTable } from "../db.js";
import { eq } from "drizzle-orm";
import { requireAdmin } from "./auth.js";

const router = Router();

router.get("/", requireAdmin, async (req, res) => {
  try {
    const rows = await db.select().from(siteSettingsTable);
    const settings: Record<string, string> = {};
    for (const row of rows) settings[row.key] = row.value;
    return res.json(settings);
  } catch (err) {
    req.log.error({ err }, "Failed to load settings");
    return res.status(500).json({ error: "Failed to load settings" });
  }
});

router.put("/", requireAdmin, async (req, res) => {
  try {
    const updates = req.body as Record<string, string>;
    for (const [key, value] of Object.entries(updates)) {
      await db.insert(siteSettingsTable)
        .values({ key, value, updatedAt: new Date() })
        .onConflictDoUpdate({ target: siteSettingsTable.key, set: { value, updatedAt: new Date() } });
    }
    return res.json({ ok: true });
  } catch (err) {
    req.log.error({ err }, "Failed to save settings");
    return res.status(500).json({ error: "Failed to save settings" });
  }
});

router.get("/:key", requireAdmin, async (req, res) => {
  try {
    const [row] = await db.select().from(siteSettingsTable).where(eq(siteSettingsTable.key, req.params.key));
    return res.json({ key: req.params.key, value: row?.value ?? "" });
  } catch (err) {
    req.log.error({ err }, "Failed to load setting");
    return res.status(500).json({ error: "Failed to load setting" });
  }
});

export default router;
