import { Router } from "express";
import authRoutes from "./authRoutes";
import activityRoutes from "./activityRoutes";
import targetRoutes from "./targetRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/activities", activityRoutes);
router.use("/targets", targetRoutes);

export default router;