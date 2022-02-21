import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../../config/jwt.config";
import AppError from "../../errors/appError";

export const userAuthorization = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    jwt.verify(req.token, config.secret, (err: any, decoded: any) => {
      if (err) {
        throw new AppError("Invalid token.", 401);
      }

      const { user_id } = req.params;

      if (!decoded.isAdm && decoded.id !== user_id) {
        throw new AppError(
          "Unauthorized, user is neither an Admin nor the Owner.",
          403
        );
      }

      return next();
    });
  } catch (err) {
    return next(err);
  }
};
