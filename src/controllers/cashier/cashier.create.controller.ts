import { Request, Response, NextFunction } from "express";
import { cashierCreateService } from "../../services/cashier";

export const cashierCreateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req
    const cashierCreate = await cashierCreateService(body);

    return res.status(201).json(cashierCreate);
  } catch (error) {
    next(error);
  }
};