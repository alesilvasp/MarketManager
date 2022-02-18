import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../../errors/errorHandler";
import jwt from "jsonwebtoken";
import { config } from "../../config/jwt.config";

declare global {
  namespace Express {
    interface Request {
      token: string;
    }
  }
}

export const userAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const headerAuth = req.headers.authorization;

    if (!headerAuth) {
      throw new ErrorHandler(401, "Missing authorization headers");
    }

    const token = req.headers.authorization?.split(" ")[1] || "";

    jwt.verify(token, config.secret, (err: any, decoded: any) => {
      if (err) {
        throw new ErrorHandler(401, "Invalid token");
      }
    });
    req.token = token;

    return next();
  } catch (err) {
    return next(err);
  }
};
