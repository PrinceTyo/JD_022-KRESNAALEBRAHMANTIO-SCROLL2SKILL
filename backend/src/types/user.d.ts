import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface UserPayload extends JwtPayload {
      id: string;
      email?: string;
    }

    export interface Request {
      user?: UserPayload;
    }
  }
}