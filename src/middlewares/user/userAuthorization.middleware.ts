import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../../errors/errorHandler";
import jwt from "jsonwebtoken";
import { config } from "../../config/jwt.config";

export const userAuthorization = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    jwt.verify(req.token, config.secret, (err: any, decoded: any) => {
      if (err) {
        throw new ErrorHandler(401, "Invalid token.");
      }

      const { user_id } = req.params;

      if (!decoded.isAdm && decoded.id !== user_id) {
        throw new ErrorHandler(
          403,
          "Unauthorized, user is neither an Admin nor the Owner."
        );
      }

      return next();
    });
  } catch (err) {
    return next(err);
  }
};
