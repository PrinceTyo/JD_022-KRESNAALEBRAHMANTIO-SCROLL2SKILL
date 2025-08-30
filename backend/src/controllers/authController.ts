import { Request, Response } from "express";
import { registerService, loginService } from "../services/authService";
import { sendSuccess, sendError } from "../utils/response";

export const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await registerService(req.body);
    return sendSuccess(res, user, "User registered successfully");
  } catch (error) {
    return sendError(res, error);
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const token = await loginService(req.body);
    return sendSuccess(res, token, "Login successful");
  } catch (error) {
    return sendError(res, error);
  }
};
