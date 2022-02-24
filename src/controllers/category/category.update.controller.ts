import { Request, Response, NextFunction } from "express";
import { categoryUpdateService } from "../../services/category/category.update.service";

export const categoryUpdateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { category_id } = req.params;
    const { body } = req;

    const categoryUpdate = await categoryUpdateService(
      Number(category_id),
      body
    );

    return res.status(200).json(categoryUpdate);
  } catch (error) {
    next(error);
  }
};
