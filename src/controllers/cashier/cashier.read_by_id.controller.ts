import { Request, Response, NextFunction } from "express";
import { cashierReadByIdService } from "../../services/cashier";

export const cashierReadByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { cashier_id } = req.params;

  try {
    const cashier = await cashierReadByIdService(Number(cashier_id));
    return res.status(200).json(cashier);
  } catch (error) {
    next(error);
  }
};