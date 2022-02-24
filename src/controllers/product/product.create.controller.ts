import { Request, Response, NextFunction } from "express";
import { productCreateService } from "../../services/product/index";

export const productCreateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productCreate = await productCreateService(req.body);

    return res.status(201).json(productCreate);
  } catch (error) {
    next(error);
  }
};