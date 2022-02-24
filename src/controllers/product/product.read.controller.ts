import { Request, Response, NextFunction } from "express";
import { productReadService } from "../../services/product";

export const productReadController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productsList = await productReadService();
    return res.status(200).json(productsList);
  } catch (error) {
    next(error);
  }
};
