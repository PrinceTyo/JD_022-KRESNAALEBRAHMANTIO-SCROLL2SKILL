import { Response } from "express";

export const sendSuccess = (
  res: Response,
  data: any,
  message = "Success",
  statusCode = 200
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const sendError = (
  res: Response,
  error: any,
  statusCode = 400
) => {
  return res.status(statusCode).json({
    success: false,
    message: error?.message || "Something went wrong",
    errors: error?.errors || null,
  });
};