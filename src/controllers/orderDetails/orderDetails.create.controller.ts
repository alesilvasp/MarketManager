import { Request, Response, NextFunction } from "express";
import AppError from "../../errors/appError";
import { orderDetailsCreateService } from "../../services/orderDetails/orderDetails.create.service";

export const orderDetailsCreateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cashier_id } = req.params;

    const orderDetailsCreate = await orderDetailsCreateService(
      Number(cashier_id)
    );

    return res.status(201).json(orderDetailsCreate);
  } catch (error) {
    next(error);
  }
};
