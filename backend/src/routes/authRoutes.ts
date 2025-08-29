import { Router } from "express";
import { register, login } from "../controllers/authController";
import { validate } from "../middlewares/validate";
import { registerSchema, loginSchema } from "../validations/authValidation";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

export default router;