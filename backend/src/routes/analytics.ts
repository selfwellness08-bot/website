import { Router } from "express";
import { db, ordersTable, productsTable, newsletterSubscribersTable } from "../db/index.js";
import { sql, count, sum } from "drizzle-orm";
import { requireAdmin } from "./auth.js";

const router = Router();

router.get("/", requireAdmin, async (req, res) => {
  try {
    const [orderStats] = await db.select({ totalOrders: count(ordersTable.id), totalRevenue: sum(ordersTable.totalUsd) }).from(ordersTable);
    const [productStats] = await db.select({ totalProducts: count(productsTable.id) }).from(productsTable);
    const [newsletterStats] = await db.select({ totalSubscribers: count(newsletterSubscribersTable.id) }).from(newsletterSubscribersTable);
    const statusBreakdown = await db.select({ status: ordersTable.status, count: count(ordersTable.id) }).from(ordersTable).groupBy(ordersTable.status);
    const recentOrders = await db.select().from(ordersTable).orderBy(sql`${ordersTable.createdAt} DESC`).limit(5);
    const lowStockProducts = await db.select().from(productsTable).where(sql`${productsTable.stock} < 10 AND ${productsTable.inStock} = true`).limit(10);
    return res.json({ totalOrders: Number(orderStats?.totalOrders || 0), totalRevenue: Number(orderStats?.totalRevenue || 0), totalProducts: Number(productStats?.totalProducts || 0), totalSubscribers: Number(newsletterStats?.totalSubscribers || 0), statusBreakdown, recentOrders, lowStockProducts });
  } catch (err) { req.log.error({ err }, "Failed to fetch analytics"); return res.status(500).json({ error: "Failed to fetch analytics" }); }
});

export default router;
