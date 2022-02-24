import { Request, Response, NextFunction } from "express";
import { orderDetailsReadService } from "../../services/orderDetails/orderDetails.read.service";

export const orderDetailsReadController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cashier_id } = req.params;
    const orderDetailsRead = await orderDetailsReadService(Number(cashier_id));

    return res.status(200).json(orderDetailsRead);
  } catch (error) {
    next(error);
  }
};
