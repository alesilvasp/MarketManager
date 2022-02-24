import { Request, Response, NextFunction } from "express";
import { orderDetailsReadByIdService } from "../../services/orderDetails/orderDetails.readById.service";

export const orderDetailsreadByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { order_id } = req.params;
    const orderDetailsRead = await orderDetailsReadByIdService(
      Number(order_id)
    );

    return res.status(200).json(orderDetailsRead);
  } catch (error) {
    next(error);
  }
};
