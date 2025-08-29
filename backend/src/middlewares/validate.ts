import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";

export const validate = (schema: AnySchema) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await schema.validate(
      {
        body: req.body,
        params: req.params,
        query: req.query,
      },
      { abortEarly: false }
    );
    next();
  } catch (error: any) {
    return res.status(400).json({ errors: error.errors });
  }
};