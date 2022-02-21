import { Request, Response, NextFunction } from "express";
import { categoryCreateService } from "../../services/category/category.create.service";
import AppError from "../../errors/appError";

export const categoryCreateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (typeof req.body.category !== "string") {
      throw new AppError("Category must be string.", 400);
    }
    const category = await categoryCreateService(req.body.category);
    res.status(201).send(category);
  } catch (error) {
    next(error);
  }
};
