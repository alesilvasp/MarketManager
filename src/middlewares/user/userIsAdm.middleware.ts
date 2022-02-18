import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../../errors/errorHandler";
import jwt from "jsonwebtoken";
import { config } from "../../config/jwt.config";

declare global {
  namespace Express {
    interface Request {
      adm_id: string;
    }
  }
}

export const userIsAdm = (req: Request, res: Response, next: NextFunction) => {
  try {
    jwt.verify(req.token, config.secret, (err: any, decoded: any) => {
      if (err) {
        throw new ErrorHandler(401, "Invalid token.");
      }

      if (!decoded.isAdm) {
        throw new ErrorHandler(403, "Unauthorized, user is not an Admin.");
      }

      req.adm_id = decoded.id;

      return next();
    });
  } catch (err) {
    return next(err);
  }
};
