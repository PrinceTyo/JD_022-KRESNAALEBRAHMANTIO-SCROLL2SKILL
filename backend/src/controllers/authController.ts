
import { Request, Response } from "express";
import { registerService, loginService, getUserService } from "../services/authService";
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

export const getUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.user?.id;
    if (!userId) return sendError(res, new Error("Unauthorized"), 401);

    const user = await getUserService(userId);
    return sendSuccess(res, user, "User retrieved successfully");
  } catch (error) {
    return sendError(res, error);
  };
};
