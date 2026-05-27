import { Router } from "express";
import { db, ordersTable } from "../db/index.js";
import { eq, desc } from "drizzle-orm";
import { requireAdmin } from "./auth.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const body = req.body as { customerName: string; customerEmail: string; customerPhone?: string; address: Record<string, string>; items: { id: string; name: string; quantity: number; priceUsd: number }[]; subtotalUsd: number; shippingUsd: number; totalUsd: number; paymentMethod?: string; couponCode?: string; notes?: string; };
    if (!body.customerName || !body.customerEmail || !body.items?.length) return res.status(400).json({ error: "Missing required order fields" });
    const [order] = await db.insert(ordersTable).values({ customerName: body.customerName, customerEmail: body.customerEmail, customerPhone: body.customerPhone || "", address: body.address || {}, items: body.items, subtotalUsd: String(body.subtotalUsd), shippingUsd: String(body.shippingUsd || 0), totalUsd: String(body.totalUsd), status: "pending", paymentMethod: body.paymentMethod || "cod", couponCode: body.couponCode || null, notes: body.notes || null }).returning();
    return res.status(201).json(order);
  } catch (err) { req.log.error({ err }, "Failed to create order"); return res.status(500).json({ error: "Failed to create order" }); }
});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid order ID" });
    const [order] = await db.select().from(ordersTable).where(eq(ordersTable.id, id));
    if (!order) return res.status(404).json({ error: "Order not found" });
    return res.json(order);
  } catch (err) { req.log.error({ err }, "Failed to fetch order"); return res.status(500).json({ error: "Failed to fetch order" }); }
});

router.get("/admin/all", requireAdmin, async (req, res) => {
  try {
    const orders = await db.select().from(ordersTable).orderBy(desc(ordersTable.createdAt));
    return res.json(orders);
  } catch (err) { req.log.error({ err }, "Failed to fetch orders"); return res.status(500).json({ error: "Failed to fetch orders" }); }
});

router.put("/admin/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { status } = req.body as { status: string };
    const [order] = await db.update(ordersTable).set({ status, updatedAt: new Date() }).where(eq(ordersTable.id, id)).returning();
    if (!order) return res.status(404).json({ error: "Order not found" });
    return res.json(order);
  } catch (err) { req.log.error({ err }, "Failed to update order"); return res.status(500).json({ error: "Failed to update order" }); }
});

export default router;
