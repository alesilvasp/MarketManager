import { Request, Response, NextFunction } from "express";
import { productReadByIdService } from "../../services/product";

export const productReadByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { product_id } = req.params;

  try {
    const productsList = await productReadByIdService(Number(product_id));
    return res.status(200).json(productsList);
  } catch (error) {
    next(error);
  }
};
