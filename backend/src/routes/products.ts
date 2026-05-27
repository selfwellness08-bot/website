import { Router } from "express";
import { db, productsTable } from "../db/index.js";
import { eq } from "drizzle-orm";
import { requireAdmin } from "./auth.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await db.select().from(productsTable).orderBy(productsTable.createdAt);
    return res.json(products);
  } catch (err) { req.log.error({ err }, "Failed to fetch products"); return res.status(500).json({ error: "Failed to fetch products" }); }
});

router.get("/:id", async (req, res) => {
  try {
    const [product] = await db.select().from(productsTable).where(eq(productsTable.id, req.params.id));
    if (!product) return res.status(404).json({ error: "Product not found" });
    return res.json(product);
  } catch (err) { req.log.error({ err }, "Failed to fetch product"); return res.status(500).json({ error: "Failed to fetch product" }); }
});

router.post("/", requireAdmin, async (req, res) => {
  try {
    const body = req.body as Record<string, unknown>;
    const [product] = await db.insert(productsTable).values({
      id: (body.id as string) || `prod-${Date.now()}`,
      name: body.name as string,
      category: body.category as string,
      priceUsd: String(body.priceUsd || 0),
      description: (body.description as string) || "",
      shortDesc: (body.shortDesc as string) || "",
      ingredients: (body.ingredients as string[]) || [],
      benefits: (body.benefits as string[]) || [],
      usage: (body.usage as string[]) || [],
      compatibility: (body.compatibility as string) || "",
      images: (body.images as string[]) || [],
      rating: String(body.rating || "4.5"),
      reviews: (body.reviews as Record<string, unknown>[]) || [],
      inStock: (body.inStock as boolean) ?? true,
      stock: (body.stock as number) || 0,
      badge: (body.badge as string) || null,
      featured: (body.featured as boolean) || false,
      bundles: (body.bundles as Record<string, unknown>[]) || [],
    }).returning();
    return res.status(201).json(product);
  } catch (err) { req.log.error({ err }, "Failed to create product"); return res.status(500).json({ error: "Failed to create product" }); }
});

router.put("/:id", requireAdmin, async (req, res) => {
  try {
    const body = req.body as Record<string, unknown>;
    const updateData: Record<string, unknown> = { updatedAt: new Date() };
    const fields = ["name","category","priceUsd","description","shortDesc","ingredients","benefits","usage","compatibility","images","rating","inStock","stock","badge","featured"] as const;
    for (const f of fields) {
      if (body[f] !== undefined) updateData[f] = (f === "priceUsd" || f === "rating") ? String(body[f]) : body[f];
    }
    const [product] = await db.update(productsTable).set(updateData as Parameters<typeof db.update>[0]).where(eq(productsTable.id, req.params.id)).returning();
    if (!product) return res.status(404).json({ error: "Product not found" });
    return res.json(product);
  } catch (err) { req.log.error({ err }, "Failed to update product"); return res.status(500).json({ error: "Failed to update product" }); }
});

router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const [product] = await db.delete(productsTable).where(eq(productsTable.id, req.params.id)).returning();
    if (!product) return res.status(404).json({ error: "Product not found" });
    return res.json({ success: true });
  } catch (err) { req.log.error({ err }, "Failed to delete product"); return res.status(500).json({ error: "Failed to delete product" }); }
});

export default router;
