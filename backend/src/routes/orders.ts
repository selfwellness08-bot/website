import { Router } from "express";
import { db } from "../db.js";
import { ordersTable, orderItemsTable } from "../db.js";
import { eq, desc } from "drizzle-orm";
import { requireAdmin } from "./auth.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const body = req.body as {
      customerName: string;
      customerEmail: string;
      customerPhone?: string;
      address: Record<string, string>;
      items: { id: string; name: string; quantity: number; priceUsd: number }[];
      subtotalUsd: number;
      shippingUsd: number;
      totalUsd: number;
      paymentMethod?: string;
      couponCode?: string;
      discountUsd?: number;
      notes?: string;
    };
    if (!body.customerName || !body.customerEmail || !body.items?.length) {
      return res.status(400).json({ error: "Missing required order fields" });
    }
    const [order] = await db.insert(ordersTable).values({
      customerName: body.customerName,
      customerEmail: body.customerEmail,
      customerPhone: body.customerPhone || "",
      address: body.address || {},
      items: body.items,
      subtotalUsd: String(body.subtotalUsd),
      shippingUsd: String(body.shippingUsd || 0),
      totalUsd: String(body.totalUsd),
      status: "pending",
      paymentMethod: body.paymentMethod || "cod",
      couponCode: body.couponCode || null,
      discountUsd: body.discountUsd ? String(body.discountUsd) : "0",
      notes: body.notes || null,
    }).returning();
    if (body.items?.length) {
      await db.insert(orderItemsTable).values(
        body.items.map((item) => ({
          orderId: order.id,
          productId: item.id,
          productName: item.name,
          quantity: item.quantity,
          unitPriceUsd: String(item.priceUsd),
          totalPriceUsd: String(item.priceUsd * item.quantity),
        }))
      );
    }
    return res.status(201).json(order);
  } catch (err) {
    req.log.error({ err }, "Failed to create order");
    return res.status(500).json({ error: "Failed to create order" });
  }
});

router.get("/admin/all", requireAdmin, async (req, res) => {
  try {
    const orders = await db.select().from(ordersTable).orderBy(desc(ordersTable.createdAt));
    return res.json(orders);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch orders");
    return res.status(500).json({ error: "Failed to fetch orders" });
  }
});

router.put("/admin/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { status } = req.body as { status: string };
    const validStatuses = ["pending","processing","shipped","delivered","cancelled"];
    if (!validStatuses.includes(status)) return res.status(400).json({ error: "Invalid status" });
    const [order] = await db.update(ordersTable).set({ status, updatedAt: new Date() }).where(eq(ordersTable.id, id)).returning();
    if (!order) return res.status(404).json({ error: "Order not found" });
    return res.json(order);
  } catch (err) {
    req.log.error({ err }, "Failed to update order");
    return res.status(500).json({ error: "Failed to update order" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid order ID" });
    const [order] = await db.select().from(ordersTable).where(eq(ordersTable.id, id));
    if (!order) return res.status(404).json({ error: "Order not found" });
    const items = await db.select().from(orderItemsTable).where(eq(orderItemsTable.orderId, id));
    return res.json({ ...order, orderItems: items });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch order");
    return res.status(500).json({ error: "Failed to fetch order" });
  }
});

export default router;
