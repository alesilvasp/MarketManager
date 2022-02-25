import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../../config/jwt.config";
import AppError from "../../errors/appError";

export const userAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const headerAuth = req.headers.authorization;

    if (!headerAuth) {
      throw new AppError("Missing authorization headers", 401);
    }

    const token = req.headers.authorization?.split(" ")[1] || "";

    jwt.verify(token, config.secret, (err: any, decoded: any) => {
      if (err) {
        throw new AppError("Invalid token", 401);
      }

      const userid = decoded.id;

      req.user = { uuid: userid }

    });

    req.token = token;

    return next();
  } catch (err) {
    return next(err);
  }
};
