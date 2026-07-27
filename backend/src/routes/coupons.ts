import { Router } from "express";
import { db } from "../db.js";
import { discountCodesTable } from "../db.js";
import { eq } from "drizzle-orm";
import { requireAdmin } from "./auth.js";

const router = Router();

router.get("/", requireAdmin, async (req, res) => {
  try {
    const codes = await db.select().from(discountCodesTable).orderBy(discountCodesTable.createdAt);
    return res.json(codes);
  } catch (err) {
    req.log.error({ err }, "Failed to load coupons");
    return res.status(500).json({ error: "Failed to load coupons" });
  }
});

router.post("/", requireAdmin, async (req, res) => {
  try {
    const { code, discountType, discountValue, minOrderUsd, maxUsage, active, expiresAt } = req.body;
    if (!code || !discountValue) return res.status(400).json({ error: "code and discountValue required" });
    const [created] = await db.insert(discountCodesTable).values({
      code: String(code).toUpperCase(),
      discountType: discountType || "percent",
      discountValue: String(discountValue),
      minOrderUsd: String(minOrderUsd || "0"),
      maxUsage: maxUsage ? Number(maxUsage) : null,
      active: active !== false,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
    }).returning();
    return res.json(created);
  } catch (err: unknown) {
    if ((err as { code?: string })?.code === "23505") return res.status(409).json({ error: "Coupon code already exists" });
    req.log.error({ err }, "Failed to create coupon");
    return res.status(500).json({ error: "Failed to create coupon" });
  }
});

router.put("/:id", requireAdmin, async (req, res) => {
  try {
    const { active, discountType, discountValue, minOrderUsd, maxUsage, expiresAt } = req.body;
    const updates: Record<string, unknown> = {};
    if (active !== undefined) updates.active = active;
    if (discountType !== undefined) updates.discountType = discountType;
    if (discountValue !== undefined) updates.discountValue = String(discountValue);
    if (minOrderUsd !== undefined) updates.minOrderUsd = String(minOrderUsd);
    if (maxUsage !== undefined) updates.maxUsage = maxUsage ? Number(maxUsage) : null;
    if (expiresAt !== undefined) updates.expiresAt = expiresAt ? new Date(expiresAt) : null;
    const [updated] = await db.update(discountCodesTable)
      .set(updates as Parameters<typeof db.update>[0])
      .where(eq(discountCodesTable.id, Number(req.params.id)))
      .returning();
    if (!updated) return res.status(404).json({ error: "Coupon not found" });
    return res.json(updated);
  } catch (err) {
    req.log.error({ err }, "Failed to update coupon");
    return res.status(500).json({ error: "Failed to update coupon" });
  }
});

router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    await db.delete(discountCodesTable).where(eq(discountCodesTable.id, Number(req.params.id)));
    return res.json({ ok: true });
  } catch (err) {
    req.log.error({ err }, "Failed to delete coupon");
    return res.status(500).json({ error: "Failed to delete coupon" });
  }
});

router.post("/validate", async (req, res) => {
  try {
    const { code, orderTotal } = req.body;
    if (!code) return res.status(400).json({ error: "code required" });
    const [coupon] = await db.select().from(discountCodesTable).where(eq(discountCodesTable.code, String(code).toUpperCase()));
    if (!coupon) return res.status(404).json({ error: "Invalid coupon code" });
    if (!coupon.active) return res.status(400).json({ error: "Coupon is inactive" });
    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) return res.status(400).json({ error: "Coupon has expired" });
    if (coupon.maxUsage && coupon.usageCount >= coupon.maxUsage) return res.status(400).json({ error: "Coupon usage limit reached" });
    if (orderTotal !== undefined && Number(orderTotal) < Number(coupon.minOrderUsd)) {
      return res.status(400).json({ error: `Minimum order $${Number(coupon.minOrderUsd).toFixed(2)} required` });
    }
    return res.json(coupon);
  } catch (err) {
    req.log.error({ err }, "Failed to validate coupon");
    return res.status(500).json({ error: "Failed to validate coupon" });
  }
});

export default router;
