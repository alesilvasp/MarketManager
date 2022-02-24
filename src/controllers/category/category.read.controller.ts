import { Request, Response, NextFunction } from "express";
import { categoryReadService } from "../../services/category/category.read.service";

export const categoryReadController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryList = await categoryReadService();
    return res.status(200).json(categoryList);
  } catch (error) {
    next(error);
  }
};
