import { Router } from "express";
import { register, login, getUser } from "../controllers/authController";
import { validate } from "../middlewares/validate";
import { registerSchema, loginSchema } from "../validations/authValidation";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/get-user", authMiddleware, getUser);

export default router;