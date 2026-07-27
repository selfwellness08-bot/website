import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import authRouter from "./auth.js";
import productsRouter from "./products.js";
import ordersRouter from "./orders.js";
import analyticsRouter from "./analytics.js";
import settingsRouter from "./settings.js";
import couponsRouter from "./coupons.js";
import newsletterRouter from "./newsletter.js";
import uploadRouter from "./upload.js";
import aiRouter from "./ai.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/auth", authRouter);
router.use("/products", productsRouter);
router.use("/orders", ordersRouter);
router.use("/analytics", analyticsRouter);
router.use("/settings", settingsRouter);
router.use("/coupons", couponsRouter);
router.use("/newsletter", newsletterRouter);
router.use("/upload", uploadRouter);
router.use("/ai", aiRouter);

export default router;
