import { Router } from "express";
import { getAllTargets, getTargetById, createTarget, updateTarget, deleteTarget, searchTarget, updatePinned } from "../controllers/targetController";
import { validate } from "../middlewares/validate";
import { createTargetSchema, updateTargetSchema, deleteTargetSchema, updatePinnedSchema } from "../validations/targetValidation";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, getAllTargets);
router.get("/search", authMiddleware, searchTarget);

router.post("/create", authMiddleware, validate(createTargetSchema), createTarget);
router.put("/:id/edit", authMiddleware, validate(updateTargetSchema), updateTarget);
router.put("/:id/update-pinned", authMiddleware, validate(updatePinnedSchema), updatePinned)
router.delete("/:id/delete", authMiddleware, validate(deleteTargetSchema), deleteTarget);

router.get("/:id", authMiddleware, getTargetById);

export default router;