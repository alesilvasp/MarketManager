import { Request, Response, NextFunction } from "express";
import { productUpdateService } from "../../services/product";

export const productUpdateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { product_id } = req.params;
    const { body } = req;

    const productUpdate = await productUpdateService(Number(product_id), body);


    return res.status(200).json(productUpdate);
  } catch (error) {
    next(error);
  }
};