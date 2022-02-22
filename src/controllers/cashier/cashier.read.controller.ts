import { Request, Response, NextFunction } from "express";
import { cashierReadService } from "../../services/cashier";

export const cashierReadController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cashierList = await cashierReadService();
    return res.status(200).json(cashierList);
  } catch (error) {
    next(error);
  }
};
