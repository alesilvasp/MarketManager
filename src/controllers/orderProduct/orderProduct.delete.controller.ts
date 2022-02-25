import { Request, Response, NextFunction } from "express";
import { orderProductDeleteService } from "../../services/orderProduct";

export const orderProductDeleteController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const { product_id } = req.params;

    const orderProductCreate = await orderProductDeleteService(
      Number(product_id),
      body
    );

    return res.status(200).json({ message: orderProductCreate });
  } catch (error) {
    next(error);
  }
};
