import { Router } from "express";
import { getAllActivities, getActivityById, createActivity, updateActivity, deleteActivity, searchActivity } from "../controllers/activityController";
import { validate } from "../middlewares/validate";
import { createActivitySchema, updateActivitySchema, deleteActivitySchema } from "../validations/activityValidation";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, getAllActivities);
router.get("/search", authMiddleware, searchActivity);

router.post("/create", authMiddleware, validate(createActivitySchema), createActivity);
router.put("/:id/edit", authMiddleware, validate(updateActivitySchema), updateActivity);
router.delete("/:id/delete", authMiddleware, validate(deleteActivitySchema), deleteActivity);

router.get("/:id", authMiddleware, getActivityById);


export default router;