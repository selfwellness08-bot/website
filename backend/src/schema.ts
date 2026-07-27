import { pgTable, text, serial, integer, boolean, timestamp, jsonb, decimal, varchar, index } from "drizzle-orm/pg-core";

export const productsTable = pgTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  category: varchar("category", { length: 50 }).notNull(),
  priceUsd: decimal("price_usd", { precision: 10, scale: 2 }).notNull(),
  description: text("description").notNull(),
  shortDesc: text("short_desc").notNull().default(""),
  ingredients: jsonb("ingredients").$type<string[]>().notNull().default([]),
  benefits: jsonb("benefits").$type<string[]>().notNull().default([]),
  usage: jsonb("usage_steps").$type<string[]>().notNull().default([]),
  compatibility: text("compatibility").notNull().default(""),
  images: jsonb("images").$type<string[]>().notNull().default([]),
  rating: decimal("rating", { precision: 3, scale: 2 }).notNull().default("4.5"),
  reviews: jsonb("reviews").$type<Record<string, unknown>[]>().notNull().default([]),
  inStock: boolean("in_stock").notNull().default(true),
  stock: integer("stock").notNull().default(0),
  badge: text("badge"),
  featured: boolean("featured").notNull().default(false),
  bundles: jsonb("bundles").$type<Record<string, unknown>[]>().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Product = typeof productsTable.$inferSelect;

export const ordersTable = pgTable("orders", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull().default(""),
  address: jsonb("address").$type<Record<string, string>>().notNull(),
  items: jsonb("items").$type<{ id: string; name: string; quantity: number; priceUsd: number }[]>().notNull(),
  subtotalUsd: decimal("subtotal_usd", { precision: 10, scale: 2 }).notNull(),
  shippingUsd: decimal("shipping_usd", { precision: 10, scale: 2 }).notNull().default("0"),
  totalUsd: decimal("total_usd", { precision: 10, scale: 2 }).notNull(),
  status: varchar("status", { length: 30 }).notNull().default("pending"),
  paymentMethod: text("payment_method").notNull().default("cod"),
  paymentId: text("payment_id"),
  couponCode: text("coupon_code"),
  discountUsd: decimal("discount_usd", { precision: 10, scale: 2 }).default("0"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Order = typeof ordersTable.$inferSelect;

export const newsletterSubscribersTable = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
});

export type NewsletterSubscriber = typeof newsletterSubscribersTable.$inferSelect;

export const siteSettingsTable = pgTable("site_settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull().default(""),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type SiteSetting = typeof siteSettingsTable.$inferSelect;

export const discountCodesTable = pgTable("discount_codes", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  discountType: varchar("discount_type", { length: 20 }).notNull().default("percent"),
  discountValue: decimal("discount_value", { precision: 10, scale: 2 }).notNull(),
  minOrderUsd: decimal("min_order_usd", { precision: 10, scale: 2 }).notNull().default("0"),
  maxUsage: integer("max_usage"),
  usageCount: integer("usage_count").notNull().default(0),
  active: boolean("active").notNull().default(true),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type DiscountCode = typeof discountCodesTable.$inferSelect;

export const orderItemsTable = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull().references(() => ordersTable.id, { onDelete: "cascade" }),
  productId: text("product_id").notNull(),
  productName: text("product_name").notNull(),
  quantity: integer("quantity").notNull(),
  unitPriceUsd: decimal("unit_price_usd", { precision: 10, scale: 2 }).notNull(),
  totalPriceUsd: decimal("total_price_usd", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (t) => [
  index("order_items_order_id_idx").on(t.orderId),
  index("order_items_product_id_idx").on(t.productId),
]);

export type OrderItem = typeof orderItemsTable.$inferSelect;

export const adminUsersTable = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull().default("Admin"),
  role: varchar("role", { length: 20 }).notNull().default("admin"),
  active: boolean("active").notNull().default(true),
  lastLoginAt: timestamp("last_login_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type AdminUser = typeof adminUsersTable.$inferSelect;
