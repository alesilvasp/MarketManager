import { NextFunction, Request, Response } from "express";
import { saleProductService } from "../../services/sale_product/sale_product.service";

export const saleProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const forSaleProduct = await saleProductService(req.body);

    return res.status(201).json({
      message: "For each batch will be tranfered the current quantity:",
      info: forSaleProduct,
    });
  } catch (error) {
    next(error);
  }
};
