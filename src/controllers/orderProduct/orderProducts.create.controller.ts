import { Request, Response, NextFunction } from "express";
import { orderProductCreateService } from "../../services/orderProduct";

export const orderProductCreateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req
    const { cashier_id } = req.params

    const orderProductCreate = await orderProductCreateService(body, Number(cashier_id));

    return res.status(201).json(orderProductCreate);
  } catch (error) {
    next(error);
  }
};