import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../../config/jwt.config";
import AppError from "../../errors/appError";

export const userIsAdm = (req: Request, res: Response, next: NextFunction) => {
  try {
    jwt.verify(req.token, config.secret, (err: any, decoded: any) => {
      if (err) {
        throw new AppError("Invalid token.", 401);
      }

      if (!decoded.isAdm) {
        throw new AppError("Unauthorized, user is not an Admin.", 403);
      }

      req.adm_id = decoded.id;

      return next();
    });
  } catch (err) {
    return next(err);
  }
};
