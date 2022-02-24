import { NextFunction, Request, Response } from "express";
import { saleProductService } from "../../services/sale_product/sale_product.service";
import AppError from "../../errors/appError";

export const saleProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;

    if (typeof body.quantity !== "number") {
      throw new AppError("Quantity must be a number.", 400);
    }

    const forSaleProduct = await saleProductService(body);

    return res.status(200).json({
      message: "For each batch will be tranfered the current quantity:",
      info: forSaleProduct,
    });
  } catch (error) {
    next(error);
  }
};
