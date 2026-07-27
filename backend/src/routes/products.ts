import { Router } from "express";
import { db } from "../db.js";
import { productsTable } from "../db.js";
import { eq } from "drizzle-orm";
import { requireAdmin } from "./auth.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await db.select().from(productsTable).orderBy(productsTable.createdAt);
    return res.json(products);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch products");
    return res.status(500).json({ error: "Failed to fetch products" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const [product] = await db.select().from(productsTable).where(eq(productsTable.id, req.params.id));
    if (!product) return res.status(404).json({ error: "Product not found" });
    return res.json(product);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch product");
    return res.status(500).json({ error: "Failed to fetch product" });
  }
});

router.post("/", requireAdmin, async (req, res) => {
  try {
    const body = req.body as Record<string, unknown>;
    const id = (body.id as string) || `prod-${Date.now()}`;
    const [product] = await db.insert(productsTable).values({
      id,
      name: (body.name as string) || "New Product",
      category: (body.category as string) || "soap",
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
      inStock: body.inStock as boolean ?? true,
      stock: (body.stock as number) || 0,
      badge: (body.badge as string) || null,
      featured: (body.featured as boolean) || false,
      bundles: (body.bundles as Record<string, unknown>[]) || [],
    }).returning();
    return res.status(201).json(product);
  } catch (err) {
    req.log.error({ err }, "Failed to create product");
    return res.status(500).json({ error: "Failed to create product" });
  }
});

router.put("/:id", requireAdmin, async (req, res) => {
  try {
    const body = req.body as Record<string, unknown>;
    const updateData: Record<string, unknown> = { updatedAt: new Date() };
    const stringFields = ["priceUsd", "rating"];
    const fields = ["name","category","priceUsd","description","shortDesc","ingredients","benefits","usage","compatibility","images","rating","inStock","stock","badge","featured","bundles"];
    for (const f of fields) {
      if (body[f] !== undefined) updateData[f] = stringFields.includes(f) ? String(body[f]) : body[f];
    }
    const [product] = await db.update(productsTable)
      .set(updateData as Parameters<typeof db.update>[0])
      .where(eq(productsTable.id, req.params.id))
      .returning();
    if (!product) return res.status(404).json({ error: "Product not found" });
    return res.json(product);
  } catch (err) {
    req.log.error({ err }, "Failed to update product");
    return res.status(500).json({ error: "Failed to update product" });
  }
});

router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const [product] = await db.delete(productsTable).where(eq(productsTable.id, req.params.id)).returning();
    if (!product) return res.status(404).json({ error: "Product not found" });
    return res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "Failed to delete product");
    return res.status(500).json({ error: "Failed to delete product" });
  }
});

router.post("/:id/duplicate", requireAdmin, async (req, res) => {
  try {
    const [original] = await db.select().from(productsTable).where(eq(productsTable.id, req.params.id));
    if (!original) return res.status(404).json({ error: "Product not found" });
    const newId = `${original.id}-copy-${Date.now()}`;
    const [copy] = await db.insert(productsTable).values({
      ...original,
      id: newId,
      name: `${original.name} (Copy)`,
      featured: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();
    return res.status(201).json(copy);
  } catch (err) {
    req.log.error({ err }, "Failed to duplicate product");
    return res.status(500).json({ error: "Failed to duplicate product" });
  }
});

router.post("/bulk/delete", requireAdmin, async (req, res) => {
  try {
    const { ids } = req.body as { ids: string[] };
    if (!ids?.length) return res.status(400).json({ error: "ids required" });
    for (const id of ids) {
      await db.delete(productsTable).where(eq(productsTable.id, id));
    }
    return res.json({ success: true, deleted: ids.length });
  } catch (err) {
    req.log.error({ err }, "Bulk delete failed");
    return res.status(500).json({ error: "Bulk delete failed" });
  }
});

router.post("/bulk/update", requireAdmin, async (req, res) => {
  try {
    const { ids, updates } = req.body as { ids: string[]; updates: Record<string, unknown> };
    if (!ids?.length) return res.status(400).json({ error: "ids required" });
    for (const id of ids) {
      await db.update(productsTable).set({ ...updates, updatedAt: new Date() } as Parameters<typeof db.update>[0]).where(eq(productsTable.id, id));
    }
    return res.json({ success: true, updated: ids.length });
  } catch (err) {
    req.log.error({ err }, "Bulk update failed");
    return res.status(500).json({ error: "Bulk update failed" });
  }
});

export default router;
